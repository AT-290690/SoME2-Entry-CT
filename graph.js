export const COLORS = {
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
export const memo = {
  lastSelection: { id: null },
  selectedPairs: [],
  mousePosition: { x: 0, y: 0 },
  timer: null,
  nodeIndex: 0,
  edgeIndex: 0,
  elements: {},
  selectedFile: '',
  focus: null,
  data: {
    filename: '',
    id: ''
  }
};

export const elements = {
  selectedIndex: document.getElementById('selectedIndex'),
  treeContainer: document.getElementById('tree'),
  infoGuide: document.getElementById('infoGuide'),
  variableInput: document.getElementById('variableInput'),
  tooltip: document.getElementById('tooltip')
};

const style = [
  {
    selector: 'core',

    style: {
      'selection-box-opacity': 0.5,
      'selection-box-color': COLORS.selectionBox,
      'selection-box-border-color': 'transparent'
    }
  },
  {
    selector: '.autorotate',
    style: { 'edge-text-rotation': 'autorotate' }
  },
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
      'text-outline-width': 1
    },
    label: 'data(label)'
  },
  {
    selector: 'edge[arrow]',
    style: {
      'target-arrow-fill': 'filled ',
      'target-arrow-shape': 'vee',
      'target-arrow-color': COLORS.edges
    }
  },
  {
    selector: 'node',
    style: {
      shape: 'rectangle',
      // 'border-style': 'solid',
      color: COLORS.text,
      'text-outline-color': COLORS.selection,
      'text-outline-width': 0,
      // 'border-color': COLORS.stroke,
      // 'border-width': '2',
      'background-opacity': 0,
      'font-family': 'Fantasque',
      'text-valign': 'center',
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
];
export const cy = cytoscape({
  elements: [],
  container: elements.treeContainer,
  style,
  layout: { name: 'breadthfirst' },
  fit: true,
  padding: 30, // fit padding
  // initial viewport state:
  zoom: 1.2,
  pan: { x: 0, y: 0 },

  // interaction options:
  minZoom: 0.4,
  maxZoom: 6,
  zoomingEnabled: true,
  userZoomingEnabled: true,
  panningEnabled: false, // drag
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
localStorage.setItem(
  'untitled',
  '{"zoom": 1, "filename":"untitled","elements":{"nodes":[],"edges":[]}}'
);

const getScroll = () => {
  if (window.scrollY !== undefined) {
    return { x: scrollX, y: scrollY };
  } else {
    var sx,
      sy,
      d = document,
      r = d.documentElement,
      b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return { x: sx, y: sy };
  }
};

const setIndex = v => {
  memo.nodeIndex = +v;
  memo.edgeIndex += memo.nodeIndex;
};

const incIndex = (v = 1) => {
  memo.nodeIndex += v;
};

const addNode = (index, x = 0, y = 0, label) => {
  if (!cy.nodes(`#${'n' + index}`).id()) {
    const node = cy.add({
      group: 'nodes',
      data: {
        index,
        label,
        id: 'n' + index,
        type: cy.nodes().size() === 0 ? 'root' : 'node'
      }
    });
    node.position({ x, y });
    incIndex();
    return node;
  } else {
    setIndex(index + 1);
    addNode(index + 1, x, y, label);
  }
};

const addEdge = (index, prevId, nextId, label) => {
  const edge = cy.add({
    group: 'edges',
    classes: 'autorotate',
    data: {
      id: `e${index}`,
      label,
      source: `${prevId}`,
      target: `${nextId}`,
      arrow: 'vee'
    }
  });
  // 'line-dash-pattern': [6, 3],
  // 'line-dash-offset': 5,
  // edge.style('line-dash-pattern', [6, 3]).style('line-dash-offset', 24);
  memo.edgeIndex += 1;
  return edge;
};

const setNodeAsRoot = id => {
  if (memo.lastSelection.type === 'node') {
    cy.nodes().map(n => (n.data().type = 'node'));
    cy.nodes(`#${id}`).data().type = 'root';
  }
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

const connectNodes = () => {
  const couple = memo.selectedPairs;
  if (!couple[0] && !couple[1]) {
    resetColorOfSelectedNodes(couple);
  } else if (
    couple.length > 1 &&
    couple[0] !== couple[1] // don't connect self to avoid bad user experience
  ) {
    addEdge(memo.edgeIndex, couple[0], couple[1], '');
    resetColorOfSelectedNodes(couple);

    //  memo.selectedPairs.push(memo.lastSelection.id);
  } else if (couple[0] === couple[1]) {
    addEdge(memo.edgeIndex, couple[0], couple[0], '');
    resetColorOfSelectedNodes(couple);

    //  memo.selectedPairs.push(memo.lastSelection.id);
  }
  clearSelection();
};

const clickNodes = e => {
  const current = e.target.data();
  memo.lastSelection = {
    type: current.type === 'root' ? 'root' : 'node',
    id: e.target.id(),
    label: current.label
  };
  elements.variableInput.value = current.label === '?' ? '' : current.label;
  memo.selectedPairs.push(memo.lastSelection.id);
  const couple = memo.selectedPairs;
  const outgoing = cy.nodes(`#${couple[1]}`);
  e.target
    .style('text-outline-width', 3)
    .style('text-outline-color', COLORS.selectionIncoming);
  outgoing
    .style('text-outline-width', 3)
    .style('text-outline-color', COLORS.selectionOutgoing);

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
    cy
      .nodes(`#${id}`)
      .style('text-outline-width', 0)
      .style('text-outline-color', COLORS.selection)
  );
};

const clearSelection = () => {
  resetColorOfSelectedNodes();
  cy.$(':selected')
    .nodes()
    .map(n =>
      n
        .style('text-outline-width', 0)
        .style('text-outline-color', COLORS.selection)
        .unselect()
    );
  memo.selectedPairs.length = 0;
  memo.lastSelection = { id: null };
};

const renameVariable = (label = '?') => {
  if (
    memo.lastSelection.type === 'node' ||
    memo.lastSelection.type === 'root'
  ) {
    cy.nodes(`#${memo.lastSelection.id}`).data({
      label
    });
  } else if (memo.lastSelection.type === 'edge') {
    cy.edges(`#${memo.lastSelection.id}`).data({
      label
    });
  }
};

cy.ready(() => {
  variableInput.addEventListener('click', () => {
    const temp = memo.lastSelection;
    clearSelection();
    memo.lastSelection = temp;
    cy.nodes(`#${memo.lastSelection.id}`).select();
  });
  document.addEventListener('mousemove', e => {
    const zoom = cy.zoom();
    const pan = cy.pan();
    const scrollOffset = getScroll();
    memo.mousePosition.x = (e.clientX - pan.x + scrollOffset.x) / zoom;
    memo.mousePosition.y = (e.clientY - pan.y + scrollOffset.y) / zoom;
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Delete') {
      elements.variableInput.value += e.key;
    }
    if (e.key === 'Enter') {
      renameVariable(elements.variableInput.value);
      elements.variableInput.value = '';
      clearSelection();
    }
    if (e.key.toLowerCase() === 'c') {
      connectNodes();
    }

    if (e.key.toLowerCase() === 'n') {
      memo.lastSelection = { id: null };
      inspectSelectionIndex({ type: 'not selected', id: 'none' });
      clearSelection();
      return addNode(
        memo.nodeIndex,
        memo.mousePosition.x,
        memo.mousePosition.y,
        '?'
      );
    }

    if (e.key === 'Escape') {
      clearSelection();
      inspectSelectionIndex({ type: 'not selected', id: 'none' });
    }
    if (e.key.toLowerCase() === 'r' && memo.lastSelection.type !== 'edge') {
      setNodeAsRoot(memo.lastSelection.id);
      //  cy.nodes().edgesTo(`#${memo.lastSelection.id}`).remove();
      inspectSelectionIndex({ type: 'root', id: memo.lastSelection.id });
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

  // cy.on('mouseout', 'node', e => {
  //   if (e) {
  //     elements.infoGuide.style.display = 'none';
  //   }
  // });

  cy.on('click', 'edge', e => {
    clickEdges(e);
    const data = e.target.data();
    const incomming = cy.nodes(`#${data.source}`);
    const outgoing = cy.nodes(`#${data.target}`);

    inspectSelectionIndex(
      memo.lastSelection,
      '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]'
    );
  });
  elements.treeContainer.focus();
});
