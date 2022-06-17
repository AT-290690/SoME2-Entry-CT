export const COLORS = {
  nodes: '#efefef',
  text: '#1b1b1b',
  stroke: '#efefef',
  nodesBG: '#efefef',
  edges: '#1b1b1b',
  selection: '#39A0ED',
  selectionBox: '#39A0ED'
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
  // {
  //   selector: '.autorotate',
  //   style: { 'edge-text-rotation': 'autorotate' }
  // },
  {
    selector: 'edge',
    style: {
      width: 1,
      'curve-style': 'straight',
      'line-color': COLORS.edges,
      color: COLORS.text
    }
  },
  {
    selector: 'edge[label]',
    style: { label: 'data(label)' },
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
      'border-style': 'solid',
      color: COLORS.text,
      'border-color': COLORS.stroke,
      'border-width': '2',
      'background-opacity': 0,
      'font-family': 'Fantasque',
      'text-valign': 'center',
      content: 'data(label)'
    }
  },
  {
    selector: 'node:active',
    style: {
      'background-color': COLORS.nodes
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
  zoom: 1,
  pan: { x: 0, y: 0 },

  // interaction options:
  minZoom: 0.35,
  maxZoom: 6,
  zoomingEnabled: true,
  userZoomingEnabled: true,
  panningEnabled: true,
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
  if (window.pageYOffset !== undefined) {
    return { x: pageXOffset, y: pageYOffset };
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

const setNodeAsRoot = id => {
  if (memo.lastSelection.type === 'node') {
    cy.nodes().map(n => (n.data().type = 'node'));
    cy.nodes(`#${id}`).data().type = 'root';
  }
};

const inspectSelectionIndex = (selection, opt = '') =>
  (elements.selectedIndex.innerHTML = `${selection.id || 'none'} : ${
    selection.type || 'not selected'
  } ${opt}`);

const clickEdges = e => {
  memo.lastSelection.type = 'edge';
  memo.lastSelection.id = e.target.id();
  cy.nodes(`#${memo.selectedPairs[0]}`).style(
    'background-color',
    COLORS.nodesBG
  );

  cy.nodes(`#${memo.selectedPairs[1]}`).style(
    'background-color',
    COLORS.nodesBG
  );
  memo.selectedPairs.length = 0;
};

const connectNodes = () => {
  const couple = memo.selectedPairs;
  if (memo.selectedPairs.length > 1) {
    if (
      couple[0] !== couple[1] &&
      //&& memo.lastSelection.type !== "root"
      !cy
        .edges()
        .find(
          x =>
            (x.data().source === couple[1] && x.data().target === couple[0]) ||
            (x.data().source === couple[0] && x.data().target === couple[1])
        )
    ) {
      addEdge(memo.edgeIndex, couple[0], couple[1], 'f   .');
      resetColorOfSelectedNodes([couple[0]]);
      memo.selectedPairs.length = 0;
      inspectSelectionIndex(
        memo.lastSelection,
        couple[1]
          ? '[ ' + memo.selectedPairs.join(' -> ') + ' ]'
          : '[ ' + memo.lastSelection.id + ' -> ? ]'
      );
      memo.selectedPairs.push(memo.lastSelection.id);
    } else {
      showToolTip("can't connect!");
      clearSelection();
    }
  }
};

const clickNodes = e => {
  memo.lastSelection.type = e.target.data().type === 'root' ? 'root' : 'node';
  memo.lastSelection.id = e.target.id();
  memo.selectedPairs.push(memo.lastSelection.id);
  const couple = memo.selectedPairs;
  if (memo.selectedPairs.length > 2) {
    memo.selectedPairs[0] = memo.selectedPairs[1];
    memo.selectedPairs.length = 1;
    memo.selectedPairs.push(memo.lastSelection.id);
  }
  cy.nodes(`#${memo.selectedPairs[0]}`).style('border-color', COLORS.selected);

  cy.nodes(`#${memo.selectedPairs[1]}`).style('border-color', COLORS.selected);
  inspectSelectionIndex(
    memo.lastSelection,
    couple[1]
      ? '[ ' + memo.selectedPairs.join(' -> ') + ' ]'
      : '[ ' + memo.lastSelection.id + ' -> ? ]'
  );
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
  nodes.map(id => cy.nodes(`#${id}`).style('border-color', COLORS.nodesBG));
};

const clearSelection = () => {
  resetColorOfSelectedNodes();
  cy.$(':selected')
    .nodes()
    .map(n => {
      n.style('border-color', COLORS.nodesBG);
      n.unselect();
    });
  memo.selectedPairs.length = 0;
  memo.lastSelection = { id: null };
};

const objToString = obj =>
  Object.entries(typeof obj === 'object' ? obj : { data: null }).map(
    (item, index) =>
      `${item[0]}: ${
        index > 1 && JSON.stringify(item[1]).length > 25
          ? JSON.stringify(item[1]).toString().substr(0, 25) + '...'
          : JSON.stringify(item[1])
      }`
  );

const displayStats = (obj, footer) =>
  `\n----------------\n${objToString(obj).join('\n')}\n----------------\n`;

const showToolTip = msg => {
  elements.tooltip.innerHTML = msg;
  elements.infoGuide.style.display = 'block';
};
cy.ready(() => {
  // loadSelectedFile('untitled');
  document.addEventListener('mousemove', e => {
    const zoom = cy.zoom();
    const pan = cy.pan();
    const scrollOffset = getScroll();
    memo.mousePosition.x = (e.clientX - pan.x + scrollOffset.x) / zoom;
    memo.mousePosition.y = (e.clientY - pan.y + scrollOffset.y) / zoom;
  });

  const saveData = () => {
    memo.selectedPairs.length = 0;
    memo.zoom = cy.zoom();
    memo.filename = elements.fileNameInput.value.trim();
  };

  document.addEventListener('keydown', e => {
    if (memo.focus !== elements.treeContainer) return;
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
        'X'
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
    memo.selectedPairs.push(e.target.id());
    e.target.style('border-color', COLORS.selection);
  });

  cy.on('click', 'node', e => {
    if (memo.selectedPairs.length > 2) {
      clearSelection();
    }
    clickNodes(e);
  });

  cy.on('mouseout', 'node', e => {
    if (e) {
      elements.infoGuide.style.display = 'none';
    }
  });

  cy.on('click', 'edge', e => {
    clickEdges(e);
    const data = e.target.data();
    inspectSelectionIndex(
      memo.lastSelection,
      '[ ' + data.source + ' -> ' + data.target + ' ]'
    );
  });
  memo.focus = elements.treeContainer;
  window.focus();
});
