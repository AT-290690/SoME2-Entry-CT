'use strict';

type Roles = 'node' | 'edge';
type EdgeVariants = 'Morphism' | 'Universal';
type NodeVariants = 'Object';
type Properties = 'Composition-Unbundled' | 'Composition-Bundled';
type Rules =
  | 'No Node Renaming'
  | 'No Node Creation'
  | 'No Node Destruction'
  | 'No Edge Renaming'
  | 'No Edge Creation'
  | 'No Edge Destruction'
  | 'No Composition'
  | 'No Universal Property'
  | 'No Hints'
  | 'No Identity Creation';

type Variant = NodeVariants | EdgeVariants;
interface Seleciton {
  id?: string;
  type: Roles | 'none';
  label: string;
  comment: string;
}

interface Coordinates2D {
  x: number;
  y: number;
}

interface Payload {
  index: number;
  label: string;
  comment: string;
  meta: Record<string, any>;
  id: string;
  type: Roles;
  variant: Variant;
  properties: Properties[];
}

interface Vertex {
  source: string;
  target: string;
}

type NodeData = Payload;
type EdgeData = Payload & Vertex;
interface Elements {
  nodes: { data: NodeData }[];
  edges: { data: EdgeData }[];
}
interface State {
  lastSelection: Seleciton;
  nodePairsSelections: string[];
  edgeSelections: Set<string>;
  mousePosition: Coordinates2D;
  nodeIndex: number;
  edgeIndex: number;
  ruleBook: Rules[];
}
type Theme = 'Light' | 'Dark';
type ThemeSettings = {
  type: string;
  nodes: string;
  text: string;
  stroke: string;
  nodesBG: string;
  edges: string;
  selection: string;
  selectionOutgoing: string;
  selectionIncoming: string;
  selectionBox: string;
  styles: {
    '--background-primary': string;
    '--color-primary': string;
    '--color-outgoing': string;
    '--color-incomming': string;
    '--color-secondary': string;
    '--color-inverted': string;
  };
};

const LIGTH_THEME: ThemeSettings = {
  type: 'Light' as Theme,
  nodes: '#efefef',
  text: '#1b1b1b',
  stroke: '#efefef',
  nodesBG: '#efefef',
  edges: '#1b1b1b',
  selection: '#ffcc00',
  selectionOutgoing: '#fc6262',
  selectionIncoming: '#57b3f7',
  selectionBox: '#ffcc00',
  styles: {
    '--background-primary': '#efefef',
    '--color-primary': '#1b1b1b',

    '--color-secondary': '#ffcc00',
    '--color-outgoing': '#fc6262',
    '--color-incomming': '#57b3f7',
    '--color-inverted': '#1b1b1b'
  }
};
const DARK_THEME: ThemeSettings = {
  type: 'Dark' as Theme,
  nodes: '#1b1b1b',
  text: '#efefef',
  stroke: '#1b1b1b',
  nodesBG: '#1b1b1b',
  edges: '#efefef',
  selection: '#8b12db',
  selectionOutgoing: '#bd2047',
  selectionIncoming: '#2e5ed1',
  selectionBox: '#8b12db',
  styles: {
    '--background-primary': '#1b1b1b',
    '--color-primary': '#efefef',
    '--color-secondary': '#8b12db',
    '--color-outgoing': '#fc6262',
    '--color-incomming': '#57b3f7',
    '--color-inverted': '#efefef'
  }
};
const PAN_STEP = 50;
const LESSON_OFFSET: Coordinates2D = { x: 0, y: PAN_STEP };
const CURRENT_THEME: ThemeSettings = { ...LIGTH_THEME };
const CURVES: Record<
  string,
  'haystack' | 'straight' | 'bezier' | 'unbundled-bezier' | 'segments' | 'taxi'
> = {
  composition1: 'unbundled-bezier',
  composition2: 'bezier',
  morphism: 'bezier'
};
const DEFAULT_TOKEN = '⦁';
const COMPOSITION_TOKEN = '∘';

const memo: State = {
  lastSelection: { id: undefined, type: 'node', label: '', comment: '' },
  nodePairsSelections: [],
  edgeSelections: new Set(),
  mousePosition: { x: 0, y: 0 },
  nodeIndex: 0,
  edgeIndex: 0,
  ruleBook: []
};

const elements: Record<string, any> = {
  selectedIndex: document.getElementById('selectedIndex'),
  infoPannel: document.getElementById('info-pannel'),
  treeContainer: document.getElementById('tree'),
  variableInput: document.getElementById('variableInput'),
  autocompleteContainer: document.getElementById('autocomplete'),
  hintsButton: document.getElementById('hints-button'),
  compositionButton: document.getElementById('composition-button'),
  connectionButton: document.getElementById('connection-button'),
  identityButton: document.getElementById('identity-button'),
  connectionA: document.getElementById('connection-node-A'),
  connectionB: document.getElementById('connection-node-B'),
  save: document.getElementById('save'),
  load: document.getElementById('load'),
  commentsSection: document.getElementById('comments-section'),
  lessonSection: document.getElementById('lesson-section'),
  lessonContent: document.getElementById('lesson-content'),
  lessonPrev: document.getElementById('lesson-button-right'),
  lessonNext: document.getElementById('lesson-button-left'),
  tutorialButton: document.getElementById('tutorial-button'),
  themeButton: document.getElementById('theme-button'),
  upScrollButton: document.getElementById('up'),
  downScrollButton: document.getElementById('down')
};

const changeTheme = (theme: ThemeSettings) => {
  for (const key in CURRENT_THEME) CURRENT_THEME[key] = theme[key];
  const style = document.documentElement.style;
  for (const color in CURRENT_THEME.styles) {
    style.setProperty(color, CURRENT_THEME.styles[color]);
  }
};

const cy = cytoscape({
  elements: [],
  container: elements.treeContainer,
  style: [
    {
      selector: 'core',
      style: {
        'selection-box-opacity': 0.5,
        'selection-box-color': CURRENT_THEME.selectionBox,
        'selection-box-border-color': 'transparent',
        'active-bg-color': CURRENT_THEME.selectionBox,
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
        'target-arrow-fill': 'filled',
        'target-arrow-shape': 'vee',
        'target-arrow-color': CURRENT_THEME.edges,
        'curve-style': CURVES.morphism,
        'line-color': CURRENT_THEME.edges,
        color: CURRENT_THEME.text
      }
    },
    {
      selector: 'edge[label]',
      style: {
        label: 'data(label)',
        'text-outline-color': CURRENT_THEME.nodes,
        'text-outline-width': 2,
        'font-size': '15px'
      }
    },
    {
      selector: 'edge[label]:selected',
      style: {
        'text-outline-color': CURRENT_THEME.selection,
        'text-outline-width': 3
      }
    },
    {
      selector: 'node',
      style: {
        shape: 'rectangle',
        // 'border-style': 'solid',
        // 'border-color': CURRENT_THEME.stroke,
        // 'border-width': '2',
        'background-opacity': 0,
        content: 'data(label)'
      }
    },
    {
      selector: 'node[label]',
      style: {
        color: CURRENT_THEME.text,
        'text-outline-color': CURRENT_THEME.selection,
        'text-outline-width': 0,
        'text-valign': 'center',
        'font-size': '15px'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'text-outline-color': CURRENT_THEME.selection,
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
  zoom: 1.5,
  pan: { x: 0, y: 0 },
  // interaction options:
  minZoom: 0.4,
  maxZoom: 6,
  zoomingEnabled: false,
  userZoomingEnabled: false,
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
// const convertToString = (buffer: ArrayBuffer | string) =>
//   typeof buffer === 'string'
//     ? buffer
//     : String.fromCharCode.apply(null, new Uint16Array(buffer));
// const convertToArrayBuffer = (string: string) => {
//   const buffer = new ArrayBuffer(string.length * 2);
//   const bufferView = new Uint16Array(buffer);
//   for (let i = 0, strLen = string.length; i < strLen; i++)
//     bufferView[i] = string.charCodeAt(i);
//   return buffer;
// };
const setIndex = (v: number) => {
  memo.nodeIndex = +v;
  memo.edgeIndex += memo.nodeIndex;
};

const incIndex = (v = 1) => {
  memo.nodeIndex += v;
};

const addNode = (coordinates: Coordinates2D, label: string) => {
  const data: NodeData = {
    index: memo.nodeIndex,
    label,
    comment: '',
    meta: {},
    id: 'n' + memo.nodeIndex,
    type: 'node',
    variant: 'Object',
    properties: []
  };
  const node = cy
    .add({
      group: 'nodes',
      data
    })
    .position({ x: coordinates.x, y: coordinates.y });
  incIndex();
  return node;
};

const addEdge = (
  vertex: Vertex,
  label: string
): cytoscape.CollectionReturnValue => {
  const data: EdgeData = {
    id: `e${memo.edgeIndex}`,
    index: memo.edgeIndex,
    label,
    comment: '',
    meta: {},
    source: `${vertex.source}`,
    target: `${vertex.target}`,
    type: 'edge',
    variant: 'Morphism',
    properties: []
  };
  const edge = cy.add({
    group: 'edges',
    // classes: 'autorotate',
    data
  });
  memo.edgeIndex += 1;
  return edge;
};
const inspectSelectionIndex = (selection: Seleciton, opt = '') => {
  elements.infoPannel.style.display = 'block';
  elements.selectedIndex.textContent = `${selection.label || 'none'} (${
    selection.id
  }) : ${selection.type} ${opt}`;
};

const deselectIndex = () => {
  elements.selectedIndex.textContent = '';
  elements.infoPannel.style.display = 'none';
};
const clickEdges = (e: cytoscape.EventObjectEdge) => {
  resetColorOfSelectedNodes();
  const { label, comment } = e.target.data();
  // elements.hintsButton.style.display = 'block';
  memo.lastSelection = {
    type: 'edge',
    id: e.target.id(),
    label: label ?? '',
    comment: comment ?? ''
  };
  elements.variableInput.value = memo.lastSelection.label;
  elements.commentsSection.innerHTML = comment ?? '';
  memo.nodePairsSelections.length = 0;
};

const connectNodes = (
  couple: string[] = memo.nodePairsSelections,
  label?: string
) => {
  if (!couple[0] && !couple[1]) {
    resetColorOfSelectedNodes(couple);
    clearSelection();
  } else if (couple.length > 1) {
    const edge = addEdge({ source: couple[0], target: couple[1] }, label);
    resetColorOfSelectedNodes(couple);
    clearSelection();
    return edge;
  }
};

const clickNodes = (e: cytoscape.EventObjectNode) => {
  const current = e.target.data();
  memo.lastSelection = {
    type: current.type,
    id: e.target.id(),
    label: current.label ?? '',
    comment: current.comment ?? ''
  };
  elements.variableInput.value =
    current.label === DEFAULT_TOKEN ? '' : current.label;
  elements.commentsSection.innerHTML = current.comment ?? '';
  memo.nodePairsSelections.push(memo.lastSelection.id);
  const couple = memo.nodePairsSelections;
  const incomming = cy.nodes(`#${couple[0]}`).first();
  const outgoing = cy.nodes(`#${couple[1]}`).first();
  incomming.style({
    'text-outline-width': 3,
    'text-outline-color': CURRENT_THEME.selectionIncoming
  });
  outgoing.style({
    'text-outline-width': 3,
    'text-outline-color': CURRENT_THEME.selectionOutgoing
  });
  inspectSelectionIndex(
    memo.lastSelection,
    couple[1]
      ? '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]'
      : '[ ' + incomming.data().label + ' -> ? ]'
  );

  if (memo.nodePairsSelections.length === 2) {
    elements.hintsButton.style.display = 'block';
    // elements.hintsButton.style.display = 'none';
    elements.connectionA.textContent = incomming.data().label;
    elements.connectionB.textContent = outgoing.data().label;
    if (!memo.ruleBook.includes('No Edge Creation')) {
      elements.connectionButton.style.display = 'block';
      positionAbsoluteElement(
        elements.connectionButton,
        offsetPosition(memo.mousePosition, -50, 50)
      );
    }
    if (
      !memo.ruleBook.includes('No Identity Creation') &&
      elements.connectionA.textContent === elements.connectionB.textContent
    ) {
      elements.identityButton.style.display = 'block';
      positionAbsoluteElement(
        elements.identityButton,
        offsetPosition(memo.mousePosition, -50, 50)
      );
    }
  } else if (memo.nodePairsSelections.length > 2) {
    clearSelection();
    clickNodes(e);
  }
};

const hasEdges = (id: string) => cy.nodes(`#${id}`).connectedEdges().size();

const removeNode = (id: string) => {
  cy.nodes(`#${id}`).remove();
};

const removeNodeEdges = (id: string) => {
  cy.nodes(`#${id}`).connectedEdges().remove();
};

const removeEdge = (id: string) => {
  cy.edges(`#${id}`).remove();
};

const resetColorOfSelectedNodes = (nodes = memo.nodePairsSelections) => {
  nodes.map((id: string) =>
    cy.nodes(`#${id}`).style({
      'text-outline-width': 0,
      'text-outline-color': CURRENT_THEME.selection
    })
  );
};
const offsetPosition = (
  position: Coordinates2D,
  x: number,
  y: number
): Coordinates2D => ({ x: position.x + x, y: position.y + y });
const positionAbsoluteElement = (
  element: HTMLElement,
  coordinates: Coordinates2D
) => {
  element.style.left = coordinates.x + 'px';
  element.style.top = coordinates.y + 'px';
};

const autocomplete = (words: string[] = []) => {
  elements.autocompleteContainer.innerHTML = '';
  if (words.length === 0) {
    return (elements.autocompleteContainer.style.display = 'none');
  }
  elements.autocompleteContainer.style.display = 'block';
  words.forEach(word => {
    const option = document.createElement('button');
    option.classList.add('autocomplete-option');
    option.textContent = word;
    option.addEventListener('click', () => {
      elements.autocompleteContainer.innerHTML = '';
      elements.autocompleteContainer.style.display = 'none';
      elements.variableInput.value = elements.variableInput.value.substring(
        0,
        elements.variableInput.value.length - 1
      );
      elements.variableInput.value += word;
    });
    elements.autocompleteContainer.appendChild(option);
  });
};
const clearSelection = () => {
  resetColorOfSelectedNodes();
  elements.autocompleteContainer.innerHTML = '';
  elements.autocompleteContainer.style.display = 'none';
  elements.compositionButton.style.display = 'none';
  elements.connectionButton.style.display = 'none';
  elements.identityButton.style.display = 'none';

  cy.$(':selected')
    .nodes()
    .map(n =>
      n
        .style({
          'text-outline-width': 0,
          'text-outline-color': CURRENT_THEME.selection
        })
        .unselect()
    );
  cy.edges().map(e =>
    e
      .style({
        'line-color': CURRENT_THEME.edges,
        width: 1
      })
      .unselect()
  );
  memo.nodePairsSelections.length = 0;
  memo.edgeSelections.clear();
  memo.lastSelection.id = undefined;
};

const renameVariable = (value = DEFAULT_TOKEN) => {
  const label = value.trim();
  if (
    memo.lastSelection.type === 'node' &&
    !memo.ruleBook.includes('No Node Renaming')
  ) {
    cy.nodes(`#${memo.lastSelection.id}`)
      .first()
      .data({
        label: label === '' ? DEFAULT_TOKEN : label
      });
  } else if (
    memo.lastSelection.type === 'edge' &&
    !memo.ruleBook.includes('No Edge Renaming')
  ) {
    cy.edges(`#${memo.lastSelection.id}`).first().data({
      label
    });
  }
};
const eraseCharacter = () =>
  elements.variableInput.value.substring(
    0,
    elements.variableInput.value.length - 1
  );

const clearTree = (nodes = true, edges = true) => {
  if (nodes) {
    cy.nodes().remove();
    memo.nodeIndex = 0;
  }
  if (edges) {
    cy.edges().remove();
    memo.edgeIndex = 0;
  }
};

const offsetElementsIndexes = (elements: {
  nodes: { data: NodeData }[];
  edges: { data: EdgeData }[];
}) => {
  const N = memo.nodeIndex;
  const E = memo.edgeIndex;
  const { nodes, edges } = elements;

  let maxNodeIndex = 0;
  let maxEdgeIndex = 0;

  const offsetNodes = nodes?.map(n => {
    n.data.index += N;
    n.data.id = 'n' + n.data.index;
    maxNodeIndex = Math.max(maxNodeIndex, n.data.index);
    return n;
  });

  const offsetEdges = edges?.map(e => {
    const index = Number(e.data.id.substr(1)) + E;
    e.data.id = 'e' + index;
    e.data.source = `n${Number(e.data.source.substr(1)) + N}`;
    e.data.target = `n${Number(e.data.target.substr(1)) + N}`;
    maxEdgeIndex = Math.max(maxEdgeIndex, index, E);
    return e;
  });

  incIndex(maxNodeIndex);
  memo.edgeIndex = Math.max(maxEdgeIndex, memo.edgeIndex) + 1;
  return { nodes: offsetNodes || [], edges: offsetEdges || [] };
};
const invertAllEdges = () =>
  cy.edges().forEach(edge => {
    const { target, source, label, id, ...rest } = edge.data();
    const vertex: Vertex = { target: source, source: target };
    edge.remove();
    const newLabel = label?.includes(COMPOSITION_TOKEN)
      ? label.split(COMPOSITION_TOKEN).reverse().join(COMPOSITION_TOKEN)
      : label;
    const newEdge = addEdge(vertex, newLabel);
    newEdge.data(rest);
    setEdgeVariant(newEdge);
  });
const seedGraph = (
  nodes: { data: NodeData }[],
  edges?: { data: EdgeData }[]
) => {
  edges?.length ? cy.add([...nodes, ...edges]) : cy.add([...nodes]);
};
const setEdgeVariant = (
  edge: cytoscape.EdgeSingular
): cytoscape.EdgeSingular => {
  const data = edge.data();
  if (data.variant === 'Universal') {
    edge.style({
      'line-style': 'dashed',
      'line-dash-pattern': [6, 3],
      'line-dash-offset': 1
    });
    edge.data({ variant: 'Universal' });
  }
  if (data.properties.includes('Composition-Unbundled')) {
    edge.style({
      'curve-style': CURVES.composition1
    });
  }
  if (data.properties.includes('Composition-Bundled')) {
    edge.style({
      'curve-style': CURVES.composition2
    });
  }
  return edge;
};
const graphFromJson = (input: object) => {
  const data = input as {
    elements: Elements;
    zoom: number;
    pan: Coordinates2D;
  };
  // clearTree();
  offsetElementsIndexes(data.elements);
  if (data.elements.nodes) {
    seedGraph(data.elements.nodes, data.elements.edges);
    cy.edges().forEach(edge => {
      setEdgeVariant(edge);
    });
    cy.zoom({
      level: data.zoom,
      position: cy.nodes().first().position()
    });
    cy.pan(data.pan);
    incIndex();
  }
};

const findNodeByMetaId = (id: string): cytoscape.NodeSingular | undefined =>
  cy
    .nodes()
    .toArray()
    .find(node => node.data().meta.id === id);

const findEdgeByMetaId = (id: string): cytoscape.EdgeSingular | undefined =>
  cy
    .edges()
    .toArray()
    .find(edge => edge.data().meta.id === id);
const rules = [...document.getElementsByTagName('rules')].map(
  el =>
    el.textContent
      .trim()
      .split(',')
      .filter(Boolean)
      .map(rule => rule.trim()) as Rules[]
);

const hint = (memo: State): void => {
  const a = cy.nodes(`#${memo.nodePairsSelections[0]}`).first();
  const b = cy.nodes(`#${memo.nodePairsSelections[1]}`).first();
  const dataA = CURRENT_THEME.type === 'Dark' ? b.data() : a.data();
  const dataB = CURRENT_THEME.type === 'Dark' ? a.data() : b.data();

  if (
    dataA.meta.isUniversalSource &&
    dataA.meta.universalProperty &&
    dataB.meta.isUniversalTarget &&
    dataA.meta.universalData
  ) {
    const edge = connectNodes(memo.nodePairsSelections).style({
      'line-style': 'dashed',
      'line-dash-pattern': [6, 3],
      'line-dash-offset': 1
    });
    switch (dataA.meta.universalProperty) {
      case 'Product':
        {
          const leftEdge = findEdgeByMetaId(
            dataA.meta.universalData.leftEdgeId
          );
          const rightEdge = findEdgeByMetaId(
            dataA.meta.universalData.rightEdgeId
          );
          if (leftEdge && rightEdge) {
            edge.data({
              variant: 'Universal',
              label: `<${leftEdge.data().label};${rightEdge.data().label}>`
            });
          }
        }
        break;
      case 'Sum':
        {
          const leftEdge = findEdgeByMetaId(
            dataA.meta.universalData.leftEdgeId
          );
          const rightEdge = findEdgeByMetaId(
            dataA.meta.universalData.rightEdgeId
          );
          if (leftEdge && rightEdge) {
            edge.data({
              variant: 'Universal',
              label: `[${leftEdge.data().label};${rightEdge.data().label}]`
            });
          }
        }
        break;
      default:
        edge.data({
          variant: 'Universal',
          label: ''
        });
        break;
    }
  }
  elements.hintsButton.style.display = 'none';
};

const applyRules = () => {
  memo.ruleBook = rules[lesson.interface.index] ?? [];
};
const displayLesson = () => {
  applyRules();
  const element = lesson.interface.show();
  const object = lesson.content[lesson.interface.index].object;
  clearSelection();
  clearTree();
  if (object) {
    graphFromJson(object);
  }
  positionAbsoluteElement(element, LESSON_OFFSET);
  cy.pan(LESSON_OFFSET);
};

const toggleTagsVisibility = (tags: string, visibility: string) => {
  for (const el of document.getElementsByTagName(tags)) {
    el.setAttribute('style', `visibility: ${visibility}`);
  }
};

const toggleTheme = () => {
  if (CURRENT_THEME.type === 'Dark') {
    changeTheme(LIGTH_THEME);
    toggleTagsVisibility('light', 'visible');
    toggleTagsVisibility('dark', 'hidden');
    elements.themeButton.textContent = '☾';
    invertAllEdges();
  } else {
    changeTheme(DARK_THEME);
    toggleTagsVisibility('dark', 'visible');
    toggleTagsVisibility('light', 'hidden');
    elements.themeButton.textContent = '☼';
    invertAllEdges();
  }
  localStorage.setItem('theme', CURRENT_THEME.type);
};

cy.ready(() => {
  cy.on('pan', () => {
    const currentLesson = lesson.content[lesson.interface.index].text;
    if (currentLesson) {
      const pan = cy.pan();
      positionAbsoluteElement(currentLesson, offsetPosition(pan, 0, 0));
    }
  });

  elements.themeButton.addEventListener('click', () => {
    clearSelection();
    toggleTheme();
    cy.style([
      {
        selector: 'core',
        style: {
          'selection-box-opacity': 0.5,
          'selection-box-color': CURRENT_THEME.selectionBox,
          'selection-box-border-color': 'transparent',
          'active-bg-color': CURRENT_THEME.selectionBox,
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
          'target-arrow-fill': 'filled',
          'target-arrow-shape': 'vee',
          'target-arrow-color': CURRENT_THEME.edges,
          'curve-style': CURVES.morphism,
          'line-color': CURRENT_THEME.edges,
          color: CURRENT_THEME.text
        }
      },
      {
        selector: 'edge[label]',
        style: {
          label: 'data(label)',
          'text-outline-color': CURRENT_THEME.nodes,
          'text-outline-width': 2,
          'font-size': '15px'
        }
      },
      {
        selector: 'edge[label]:selected',
        style: {
          'text-outline-color': CURRENT_THEME.selection,
          'text-outline-width': 3
        }
      },
      {
        selector: 'node',
        style: {
          shape: 'rectangle',
          // 'border-style': 'solid',
          // 'border-color': CURRENT_THEME.stroke,
          // 'border-width': '2',
          'background-opacity': 0,
          content: 'data(label)'
        }
      },
      {
        selector: 'node[label]',
        style: {
          color: CURRENT_THEME.text,
          'text-outline-color': CURRENT_THEME.selection,
          'text-outline-width': 0,
          'text-valign': 'center',
          'font-size': '15px'
        }
      },
      {
        selector: 'node:selected',
        style: {
          'text-outline-color': CURRENT_THEME.selection,
          'text-outline-width': 3
        }
      },
      {
        selector: 'node:active',
        style: {
          'text-outline-width': 3
        }
      }
    ]);
    // if (elements.tutorialButton.style.display === 'none') {
    //   displayLesson();
    // }
  });

  elements.tutorialButton.addEventListener('click', () => {
    elements.tutorialButton.style.display = 'none';
    elements.lessonPrev.style.display = 'block';
    elements.lessonNext.style.display = 'block';
    elements.lessonSection.style.visibility = 'visible';
    displayLesson();
  });

  elements.lessonPrev.addEventListener('click', () => {
    lesson.interface.decIndex();
    displayLesson();
    if (CURRENT_THEME.type === 'Dark') invertAllEdges();
  });

  elements.lessonNext.addEventListener('click', () => {
    lesson.interface.incIndex();
    displayLesson();
    if (CURRENT_THEME.type === 'Dark') invertAllEdges();
  });
  elements.hintsButton.addEventListener('click', () => {
    if (
      !memo.ruleBook.includes('No Hints') &&
      memo.lastSelection &&
      memo.nodePairsSelections.length === 2
    ) {
      hint(memo);
    }
  });
  elements.connectionButton.addEventListener('click', () => {
    if (
      memo.nodePairsSelections.length === 2 &&
      !memo.ruleBook.includes('No Edge Creation')
    ) {
      connectNodes(memo.nodePairsSelections);
    }
  });

  elements.identityButton.addEventListener('click', () => {
    if (
      memo.nodePairsSelections.length === 2 &&
      !memo.ruleBook.includes('No Identity Creation')
    ) {
      connectNodes(
        memo.nodePairsSelections,
        elements.connectionA.textContent !== DEFAULT_TOKEN &&
          elements.connectionA.textContent === elements.connectionB.textContent
          ? toSuperscript('id') + elements.connectionA.textContent
          : undefined
      );
    }
  });
  elements.compositionButton.addEventListener('click', () => {
    if (memo.edgeSelections.size) {
      const edgeSelectionArray = [...memo.edgeSelections];
      const connections = edgeSelectionArray.map(x => {
        const edge = cy.edges(`#${x}`).first();
        edge.style({
          'line-color': CURRENT_THEME.selection,
          width: 3
        });

        const data = edge.data();
        return { source: data.source, target: data.target };
      });

      for (let i = 1; i < connections.length; i += 1) {
        if (connections[i].source !== connections[i - 1].target) {
          return clearSelection();
        }
      }
      if (edgeSelectionArray.length === 0) return;
      const edges = edgeSelectionArray.map(x => cy.edges(`#${x}`).first());
      const firstEdge = edges[0];
      const lastEdge = edges[edges.length - 1];
      const firstNode = firstEdge.connectedNodes().first();
      const lastNode = lastEdge.connectedNodes().last();
      // already existing edges between them
      const exisingEdges = firstNode.edgesWith(lastNode);

      const fId = firstNode.id();
      const lId = lastNode.id();

      if (!fId || !lId) return;
      memo.nodePairsSelections = [fId, lId];
      const label = edges
        .map(x => x.data().label)
        .filter(Boolean)
        .reverse()
        .join(COMPOSITION_TOKEN);

      const edge = connectNodes(memo.nodePairsSelections, label);
      const data = edge.data();
      if (exisingEdges.length) {
        exisingEdges.map(x => {
          x.style({
            'curve-style': CURVES.composition2
          });
          x.data({
            properties: [...x.data().properties, 'Composition-Bundled']
          });
        });
        edge.style({
          'curve-style': CURVES.composition2
        });
        edge.data({ properties: [...data.properties, 'Composition-Bundled'] });
      } else {
        edge.style({
          'curve-style': CURVES.composition1
        });
        edge.data({
          properties: [...data.properties, 'Composition-Unbundled']
        });
      }
      // const size = edges.length;
      // if (edges.length > 2) {
      //   edges.forEach((element, index) => {
      //     if (index > 0 && index < size - 1) {
      //       element.connectedNodes().remove();
      //       element.remove();
      //     }
      //   });
      // } else {
      //   first.connectedNodes().last().remove();
      //   first.remove();
      //   last.remove();
      // }
    }
  });
  document.addEventListener('mousemove', e => {
    memo.mousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  });
  document.addEventListener('dblclick', () => {
    if (
      !memo.ruleBook.includes('No Node Creation') &&
      document.activeElement === document.body &&
      !memo.nodePairsSelections.length &&
      !memo.lastSelection.id
    ) {
      memo.lastSelection.id = null;
      deselectIndex();
      clearSelection();
      const zoom = cy.zoom();
      const pan = cy.pan();
      return addNode(
        {
          x: (memo.mousePosition.x - pan.x) / zoom,
          y: (memo.mousePosition.y - pan.y) / zoom
        },
        DEFAULT_TOKEN
      );
    }
  });

  const saveFile = () => {
    clearSelection();
    const data = cy.json() as {
      elements: Elements;
      zoom: number;
      pan: Coordinates2D;
    };
    const json = JSON.stringify(data);
    const a = document.createElement('a');
    const blob = new Blob([json], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'object.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const loadFile = () => {
    const upload = document.createElement('input');
    document.body.appendChild(upload);
    upload.style.display = 'none';
    upload.type = 'file';
    upload.name = 'object.json';
    const reader = new FileReader();
    reader.onload = async e =>
      graphFromJson(JSON.parse(e.target.result.toString()));
    upload.addEventListener('change', (e: Event) =>
      reader.readAsText((e.currentTarget as HTMLInputElement).files[0])
    );
    upload.click();
  };

  elements.save.addEventListener('click', () => saveFile());
  elements.load.addEventListener('click', () => loadFile());

  elements.upScrollButton.addEventListener('click', () => {
    const pan = cy.pan();
    cy.pan({ x: pan.x, y: pan.y - PAN_STEP });
  });

  elements.downScrollButton.addEventListener('click', () => {
    const pan = cy.pan();
    cy.pan({ x: pan.x, y: pan.y + PAN_STEP });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      renameVariable(elements.variableInput.value);
      elements.variableInput.value = '';
      clearSelection();
    } else if (
      (memo.nodePairsSelections.length === 1 ||
        memo.lastSelection.type === 'edge') &&
      e.key !== 'Shift' &&
      e.key !== 'Command' &&
      e.key !== 'Alt' &&
      e.key !== 'Meta' &&
      e.key !== 'CapsLock' &&
      e.key !== 'Tab' &&
      e.key !== 'Escape' &&
      e.key !== 'Delete' &&
      e.key !== 'Control'
    ) {
      if (e.key === 'Backspace') {
        elements.autocompleteContainer.innerHTML = '';
        elements.autocompleteContainer.style.display = 'none';
        elements.variableInput.value = eraseCharacter();
      } else {
        if (e.key.includes('Arrow')) {
          elements.variableInput.value += ABC[e.key];
        } else {
          elements.variableInput.value += e.key;
          if (e.key === ' ') {
            return autocomplete(ABC.common);
          } else if (e.key === '*') {
            return autocomplete(ABC.other);
          } else {
            return autocomplete(ABC[e.key]);
          }
        }
      }
    }

    if (e.key === 'Escape') {
      clearSelection();
      deselectIndex();
      elements.hintsButton.style.display = 'none';
    }

    if (e.key === 'Delete' || (e.ctrlKey && e.key === 'Backspace')) {
      if (
        memo.lastSelection.type === 'node' &&
        !memo.ruleBook.includes('No Node Destruction')
      ) {
        hasEdges(memo.lastSelection.id)
          ? removeNodeEdges(memo.lastSelection.id)
          : removeNode(memo.lastSelection.id);
      } else if (
        memo.lastSelection.type === 'edge' &&
        !memo.ruleBook.includes('No Edge Destruction')
      ) {
        removeEdge(memo.lastSelection.id);
      }
      clearSelection();
      deselectIndex();
    }
  });
  cy.on('dragfree', 'node', e => {
    clearSelection();
    deselectIndex();
  });
  cy.on('select', 'edge', e => {
    // const connections = edges.connectedNodes().map(
    //   x => x.data().id
    //   // x.connectedEdges().map(x => {
    //   //   const data = x.data();
    //   //   return { source: data.source, target: data.target };
    //   // })
    // );
    e.target.style({ 'line-color': CURRENT_THEME.selection, width: 3 });

    memo.edgeSelections.add(e.target.id());
    if (
      memo.edgeSelections.size > 1 &&
      !memo.ruleBook.includes('No Composition')
    ) {
      elements.compositionButton.style.display = 'block';
      positionAbsoluteElement(
        elements.compositionButton,
        offsetPosition(memo.mousePosition, -50, 50)
      );
    }
  });

  cy.on('select', 'node', e => e.target.style('text-outline-width', 3));
  cy.on('click', 'node', clickNodes);
  cy.on('dblclick', 'edge', e =>
    e.target.data().variant === 'Universal' &&
    !memo.ruleBook.includes('No Universal Property')
      ? e.target
          .style({
            'line-style': 'solid',
            'line-dash-pattern': [0, 0],
            'line-dash-offset': 0
          })
          .data({ variant: 'Morphism' })
      : e.target
          .style({
            'line-style': 'dashed',
            'line-dash-pattern': [6, 3],
            'line-dash-offset': 1
          })
          .data({ variant: 'Universal' })
  );
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
