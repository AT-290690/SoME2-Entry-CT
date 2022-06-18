'use strict';

type Roles = 'node' | 'edge';

interface Seleciton {
  id?: string;
  type: Roles;
  label: string;
}

interface Coordinates2D {
  x: number;
  y: number;
}

interface State {
  lastSelection: Seleciton;
  selectedPairs: string[];
  mousePosition: Coordinates2D;
  nodeIndex: number;
  edgeIndex: number;
}

const COLORS: Record<string, string> = {
  nodes: '#efefef',
  text: '#1b1b1b',
  stroke: '#efefef',
  nodesBG: '#efefef',
  edges: '#1b1b1b',
  selection: '#83e665',
  selectionOutgoing: '#fc6262',
  selectionIncoming: '#57b3f7',
  selectionBox: '#83e665'
};

const DEFAULT_TOKEN = '·';
const OPERATORS = '+-<>=*!()[]%&|/{}:.,'
  .split('')
  .reduce((acc, item) => ({ ...acc, [item]: true }), {});

const memo: State = {
  lastSelection: { id: undefined, type: 'node', label: '' },
  selectedPairs: [],
  mousePosition: { x: 0, y: 0 },
  nodeIndex: 0,
  edgeIndex: 0
};

const elements: Record<string, any> = {
  selectedIndex: document.getElementById('selectedIndex'),
  treeContainer: document.getElementById('tree'),
  variableInput: document.getElementById('variableInput')
};

const cy = cytoscape({
  elements: [],
  container: elements.treeContainer,
  style: [
    {
      selector: 'core',
      style: {
        'selection-box-opacity': 0.5,
        'selection-box-color': COLORS.selectionBox,
        'selection-box-border-color': 'transparent',
        'active-bg-color': COLORS.selectionBox,
        'active-bg-opacity': 0.8,
        'active-bg-size': 10,
        'selection-box-border-width': 0,
        'outside-texture-bg-color': 'transparent',
        'outside-texture-bg-opacity': 0.5
      }
    },
    // {
    //   selector: '.autorotate',
    //   style: { 'edge-text-rotation': 'autorotate' }
    // },

    {
      selector: 'edge',
      style: {
        width: 1,
        'curve-style': 'bezier',
        'line-color': COLORS.edges,
        color: COLORS.text
      }
    },
    {
      selector: 'edge[label]',
      style: {
        label: 'data(label)',
        'text-outline-color': COLORS.nodes,
        'text-outline-width': 2,
        'font-family': 'Fantasque'
      }
    },
    {
      selector: 'edge[arrow]',
      style: {
        'target-arrow-fill': 'filled',
        'target-arrow-shape': 'vee',
        'target-arrow-color': COLORS.edges
      }
    },
    {
      selector: 'node',
      style: {
        'text-valign': 'center',
        shape: 'rectangle',
        // 'border-style': 'solid',
        color: COLORS.text,
        'text-outline-color': COLORS.selection,
        'text-outline-width': 0,
        // 'border-color': COLORS.stroke,
        // 'border-width': '2',
        'background-opacity': 0,
        'font-family': 'Fantasque',
        content: 'data(label)'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'text-outline-color': COLORS.selection,
        'text-outline-width': 3
      }
    },
    {
      selector: 'node:active',
      style: {
        'text-outline-width': 3
      }
    }
  ],
  layout: { name: 'breadthfirst' },

  // initial viewport state:
  zoom: 1,
  pan: { x: 0, y: 0 },
  // interaction options:
  minZoom: 0.4,
  maxZoom: 6,
  zoomingEnabled: true,
  userZoomingEnabled: true,
  panningEnabled: true, // drag
  userPanningEnabled: true,
  boxSelectionEnabled: true,
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: false,
  autounselectify: false,

  // rendering options:
  headless: false,
  styleEnabled: true,
  hideEdgesOnViewport: false,
  textureOnViewport: false,
  motionBlur: false,
  motionBlurOpacity: 0.2,
  pixelRatio: 'auto'
});

const setIndex = v => {
  memo.nodeIndex = +v;
  memo.edgeIndex += memo.nodeIndex;
};

const incIndex = (v = 1) => {
  memo.nodeIndex += v;
};

const addNode = (index, x = 0, y = 0, label) => {
  const node = cy
    .add({
      group: 'nodes',
      data: {
        index,
        label,
        id: 'n' + index,
        type: 'node'
      }
    })
    .position({ x, y });
  incIndex();
  return node;
};

const addEdge = (index, prevId, nextId, label) => {
  const edge = cy.add({
    group: 'edges',
    // classes: 'autorotate',
    data: {
      id: `e${index}`,
      label,
      source: `${prevId}`,
      target: `${nextId}`,
      arrow: 'vee'
    }
  });
  memo.edgeIndex += 1;
  return edge;
};

const inspectSelectionIndex = (selection, opt = '') =>
  (elements.selectedIndex.innerHTML = `${selection.label || 'none'} : ${
    selection.type || 'not selected'
  } ${opt}`);

const clickEdges = e => {
  clearSelection();
  memo.lastSelection = {
    type: 'edge',
    id: e.target.id(),
    label: e.target.data().label
  };
  elements.variableInput.value = memo.lastSelection.label;
  memo.selectedPairs.length = 0;
};

const connectNodes = (style?: Record<string, unknown>, label?: string) => {
  const couple = memo.selectedPairs;
  if (!couple[0] && !couple[1]) {
    resetColorOfSelectedNodes(couple);
  } else if (
    couple.length > 1 &&
    couple[0] !== couple[1] // don't connect self to avoid bad user experience
  ) {
    const edge = addEdge(memo.edgeIndex, couple[0], couple[1], label);
    if (style) {
      edge.style(style);
    }
    resetColorOfSelectedNodes(couple);

    //  memo.selectedPairs.push(memo.lastSelection.id);
  } else if (couple[0] === couple[1]) {
    addEdge(memo.edgeIndex, couple[0], couple[0], label);
    resetColorOfSelectedNodes(couple);

    //  memo.selectedPairs.push(memo.lastSelection.id);
  }
  clearSelection();
};

const clickNodes = e => {
  const current = e.target.data();
  memo.lastSelection = {
    type: current.type,
    id: e.target.id(),
    label: current.label
  };
  elements.variableInput.value =
    current.label === DEFAULT_TOKEN ? '' : current.label;
  memo.selectedPairs.push(memo.lastSelection.id);
  const couple = memo.selectedPairs;
  const outgoing = cy.nodes(`#${couple[1]}`).first();
  e.target.style({
    'text-outline-width': 3,
    'text-outline-color': COLORS.selectionIncoming
  });
  outgoing.style({
    'text-outline-width': 3,
    'text-outline-color': COLORS.selectionOutgoing
  });

  inspectSelectionIndex(
    memo.lastSelection,
    couple[1]
      ? '[ ' + e.target.data().label + ' -> ' + outgoing.data().label + ' ]'
      : '[ ' + e.target.data().label + ' -> ? ]'
  );
  if (memo.selectedPairs.length > 2) {
    clearSelection();
    clickNodes(e);
  }
};

const hasEdges = id => cy.nodes(`#${id}`).connectedEdges().size();

const removeNode = id => {
  cy.nodes(`#${id}`).remove();
};

const removeNodeEdges = id => {
  cy.nodes(`#${id}`).connectedEdges().remove();
};

const removeEdge = id => {
  cy.edges(`#${id}`).remove();
};

const resetColorOfSelectedNodes = (nodes = memo.selectedPairs) => {
  nodes.map(id =>
    cy.nodes(`#${id}`).style({
      'text-outline-width': 0,
      'text-outline-color': COLORS.selection
    })
  );
};

const clearSelection = () => {
  resetColorOfSelectedNodes();
  cy.$(':selected')
    .nodes()
    .map(n =>
      n
        .style({
          'text-outline-width': 0,
          'text-outline-color': COLORS.selection
        })
        .unselect()
    );
  memo.selectedPairs.length = 0;
  memo.lastSelection.id = null;
};

const renameVariable = (value = DEFAULT_TOKEN) => {
  const label = value.trim();
  if (memo.lastSelection.type === 'node') {
    cy.nodes(`#${memo.lastSelection.id}`)
      .first()
      .data({
        label: label === '' ? DEFAULT_TOKEN : label
      });
  } else if (memo.lastSelection.type === 'edge') {
    cy.edges(`#${memo.lastSelection.id}`).first().data({
      label
    });
  }
};
cy.ready(() => {
  document.addEventListener('mousemove', e => {
    const zoom = cy.zoom();
    const pan = cy.pan();
    memo.mousePosition.x = (e.clientX - pan.x) / zoom;
    memo.mousePosition.y = (e.clientY - pan.y) / zoom;
  });

  document.addEventListener('keydown', e => {
    if (
      ((memo.selectedPairs.length === 1 ||
        memo.lastSelection.type === 'edge') &&
        /^[a-z0-9]$/i.test(e.key)) ||
      OPERATORS[e.key] ||
      e.key === ' ' ||
      e.key === 'Backspace'
    ) {
      if (e.key === 'Backspace') {
        elements.variableInput.value = elements.variableInput.value.substring(
          0,
          elements.variableInput.value.length - 1
        );
      } else {
        elements.variableInput.value += e.key;
      }
    }
    if (e.key === 'Enter') {
      renameVariable(elements.variableInput.value);
      elements.variableInput.value = '';
      clearSelection();
    }
    if (
      !memo.selectedPairs.length &&
      !memo.lastSelection.id &&
      e.key.toLowerCase() === 'n'
    ) {
      memo.lastSelection.id = null;
      inspectSelectionIndex({ type: 'not selected', id: 'none' });
      clearSelection();
      return addNode(
        memo.nodeIndex,
        memo.mousePosition.x,
        memo.mousePosition.y,
        DEFAULT_TOKEN
      );
    }

    if (memo.selectedPairs.length === 2) {
      if (e.key === 'c') {
        connectNodes();
      } else if (e.key === 'C') {
        const path = cy
          .elements()
          .aStar({
            root: `#${memo.selectedPairs[0]}`,
            goal: `#${memo.selectedPairs[1]}`
          })
          .path.edges()
          .map(x => x.data().label);

        const label = path.every(x => x) ? path.reverse().join(' o ') : '';
        connectNodes({ 'curve-style': 'unbundled-bezier' }, label);
      } else if (e.key.toLowerCase() === 'u') {
        connectNodes({
          'line-style': 'dashed',
          'line-dash-pattern': [6, 3],
          'line-dash-offset': 1
        });
      }
    }
    if (e.key === 'Escape') {
      clearSelection();
      inspectSelectionIndex({ type: 'not selected', id: 'none' });
    }

    if (e.key === 'Delete' || (e.ctrlKey && e.key === 'Backspace')) {
      if (memo.lastSelection.type !== 'edge') {
        hasEdges(memo.lastSelection.id)
          ? removeNodeEdges(memo.lastSelection.id)
          : removeNode(memo.lastSelection.id);
      } else {
        removeEdge(memo.lastSelection.id);
      }
      clearSelection();
      inspectSelectionIndex({ type: 'not selected', id: 'none' });
    }
  });

  cy.on('dragfree', 'node', e => {
    clearSelection();
    inspectSelectionIndex({ type: 'not selected', id: 'none' });
  });

  cy.on('select', 'node', e => {
    e.target.style('text-outline-width', 3);
    // memo.selectedPairs.push(e.target.id());
  });

  cy.on('click', 'node', clickNodes);

  cy.on('click', 'edge', e => {
    clickEdges(e);
    const data = e.target.data();
    const incomming = cy.nodes(`#${data.source}`).first();
    const outgoing = cy.nodes(`#${data.target}`).first();

    inspectSelectionIndex(
      memo.lastSelection,
      '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]'
    );
  });
  elements.treeContainer.focus();
});
