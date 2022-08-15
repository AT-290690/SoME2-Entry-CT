'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const LIGTH_THEME = {
    type: 'Light',
    nodes: '#e4e4e4',
    text: '#1b1b1b',
    stroke: '#e4e4e4',
    nodesBG: '#e4e4e4',
    edges: '#1b1b1b',
    selection: '#74ed24',
    selectionOutgoing: '#fc6262',
    selectionIncoming: '#57b3f7',
    selectionBox: '#74ed24',
    styles: {
        '--background-primary': '#e4e4e4',
        '--color-primary': '#1b1b1b',
        '--color-secondary': '#74ed24',
        '--color-outgoing': '#fc6262',
        '--color-incomming': '#57b3f7',
        '--color-inverted': '#1b1b1b'
    }
};
const DARK_THEME = {
    type: 'Dark',
    nodes: '#1b1b1b',
    text: '#e4e4e4',
    stroke: '#1b1b1b',
    nodesBG: '#1b1b1b',
    edges: '#e4e4e4',
    selection: '#8b12db',
    selectionOutgoing: '#bd2047',
    selectionIncoming: '#2e5ed1',
    selectionBox: '#8b12db',
    styles: {
        '--background-primary': '#1b1b1b',
        '--color-primary': '#e4e4e4',
        '--color-secondary': '#8b12db',
        '--color-outgoing': '#fc6262',
        '--color-incomming': '#57b3f7',
        '--color-inverted': '#e4e4e4'
    }
};
const PAN_STEP = 50;
const ZOOM_STEP = 0.1;
const TUTORIAL_GIFS = 9;
const CURRENT_THEME = Object.assign({}, LIGTH_THEME);
const CURVES = {
    composition1: 'unbundled-bezier',
    composition2: 'bezier',
    morphism: 'bezier'
};
const DEFAULT_TOKEN = '⦁';
const COMPOSITION_TOKEN = '∘';
const memo = {
    lastSelection: { id: undefined, type: 'node', label: '', comment: '' },
    nodePairsSelections: [],
    edgeSelections: new Set(),
    mousePosition: { x: 0, y: 0 },
    nodeIndex: 0,
    edgeIndex: 0
};
const elements = {
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
    lessonPrev: document.getElementById('lesson-button-a'),
    lessonNext: document.getElementById('lesson-button-b'),
    lessonButton: document.getElementById('lesson-button'),
    tutorialButton: document.getElementById('tutorial-button'),
    tutorialImage: document.getElementById('tutorial'),
    tutorialNext: document.getElementById('tutorial-next'),
    tutorialContainer: document.getElementById('tutorial-container'),
    themeButton: document.getElementById('theme-button'),
    invertButton: document.getElementById('invert-button'),
    upScrollButton: document.getElementById('up'),
    downScrollButton: document.getElementById('down'),
    leftScrollButton: document.getElementById('left'),
    rightScrollButton: document.getElementById('right'),
    zoomInButton: document.getElementById('zoom-in'),
    zoomOutButton: document.getElementById('zoom-out')
};
const changeTheme = (theme) => {
    for (const key in CURRENT_THEME)
        CURRENT_THEME[key] = theme[key];
    const style = document.documentElement.style;
    for (const color in CURRENT_THEME.styles) {
        style.setProperty(color, CURRENT_THEME.styles[color]);
    }
};
const debounce = (func) => {
    let timer;
    return (event) => {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
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
    zoom: 1,
    pan: { x: 0, y: 0 },
    // interaction options:
    minZoom: 0.4,
    maxZoom: 6,
    zoomingEnabled: true,
    userZoomingEnabled: false,
    panningEnabled: true,
    userPanningEnabled: false,
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
const setIndex = (v) => {
    memo.nodeIndex = +v;
    memo.edgeIndex += memo.nodeIndex;
};
const incIndex = (v = 1) => {
    memo.nodeIndex += v;
};
const addNode = (coordinates, label) => {
    const data = {
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
const addEdge = (vertex, label) => {
    const data = {
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
const inspectSelectionIndex = (selection, opt = '') => {
    elements.infoPannel.style.display = 'block';
    elements.selectedIndex.textContent = `${selection.label || 'none'} (${selection.id}) : ${selection.type} ${opt}`;
};
const deselectIndex = () => {
    elements.selectedIndex.textContent = '';
    elements.infoPannel.style.display = 'none';
};
const clickEdges = (e) => {
    resetColorOfSelectedNodes();
    const { label, comment } = e.target.data();
    // elements.hintsButton.style.display = 'block';
    memo.lastSelection = {
        type: 'edge',
        id: e.target.id(),
        label: label !== null && label !== void 0 ? label : '',
        comment: comment !== null && comment !== void 0 ? comment : ''
    };
    elements.variableInput.value = memo.lastSelection.label;
    elements.commentsSection.innerHTML = comment !== null && comment !== void 0 ? comment : '';
    memo.nodePairsSelections.length = 0;
};
const connectNodes = (couple = memo.nodePairsSelections, label) => {
    if (!couple[0] && !couple[1]) {
        // resetColorOfSelectedNodes(couple);
        clearSelection();
    }
    else if (couple.length > 1) {
        const edge = addEdge({ source: couple[0], target: couple[1] }, label);
        // resetColorOfSelectedNodes(couple);
        clearSelection();
        return edge;
    }
};
const clickNodes = (e) => {
    var _a, _b, _c;
    const current = e.target.data();
    memo.lastSelection = {
        type: current.type,
        id: e.target.id(),
        label: (_a = current.label) !== null && _a !== void 0 ? _a : '',
        comment: (_b = current.comment) !== null && _b !== void 0 ? _b : ''
    };
    elements.variableInput.value =
        current.label === DEFAULT_TOKEN ? '' : current.label;
    elements.commentsSection.innerHTML = (_c = current.comment) !== null && _c !== void 0 ? _c : '';
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
    inspectSelectionIndex(memo.lastSelection, couple[1]
        ? '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]'
        : '[ ' + incomming.data().label + ' -> ? ]');
    if (memo.nodePairsSelections.length === 2) {
        elements.hintsButton.style.display = 'block';
        // elements.hintsButton.style.display = 'none';
        elements.connectionA.textContent = incomming.data().label;
        elements.connectionB.textContent = outgoing.data().label;
        elements.connectionButton.style.display = 'block';
        positionAbsoluteElement(elements.connectionButton, offsetPosition(memo.mousePosition, -50, 50));
        if (elements.connectionA.textContent === elements.connectionB.textContent) {
            elements.identityButton.style.display = 'block';
        }
    }
    else if (memo.nodePairsSelections.length > 2) {
        clearSelection();
        clickNodes(e);
    }
};
const hasEdges = (id) => cy.nodes(`#${id}`).connectedEdges().size();
const removeNode = (id) => {
    cy.nodes(`#${id}`).remove();
};
const removeNodeEdges = (id) => {
    cy.nodes(`#${id}`).connectedEdges().remove();
};
const removeEdge = (id) => {
    cy.edges(`#${id}`).remove();
};
const resetColorOfSelectedNodes = (nodes = memo.nodePairsSelections) => {
    nodes.map((id) => cy.nodes(`#${id}`).style({
        'text-outline-width': 0,
        'text-outline-color': CURRENT_THEME.selection
    }));
};
const offsetPosition = (position, x, y) => ({ x: position.x + x, y: position.y + y });
const positionAbsoluteElement = (element, coordinates) => {
    element.style.left = coordinates.x + 'px';
    element.style.top = coordinates.y + 'px';
};
const autocomplete = (words = []) => {
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
            elements.variableInput.value = elements.variableInput.value.substring(0, elements.variableInput.value.length - 1);
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
    cy.nodes().map(n => n
        .style({
        'text-outline-width': 0,
        'text-outline-color': CURRENT_THEME.selection
    })
        .unselect());
    cy.edges().map(e => e
        .style({
        'line-color': CURRENT_THEME.edges,
        width: 1
    })
        .unselect());
    memo.nodePairsSelections.length = 0;
    memo.edgeSelections.clear();
    memo.lastSelection.id = undefined;
};
const renameVariable = (value = DEFAULT_TOKEN) => {
    const label = value.trim();
    if (memo.lastSelection.type === 'node') {
        cy.nodes(`#${memo.lastSelection.id}`)
            .first()
            .data({
            label: label === '' ? DEFAULT_TOKEN : label
        });
    }
    else if (memo.lastSelection.type === 'edge') {
        cy.edges(`#${memo.lastSelection.id}`).first().data({
            label
        });
    }
};
const eraseCharacter = () => elements.variableInput.value.substring(0, elements.variableInput.value.length - 1);
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
const offsetElementsIndexes = (elements) => {
    const N = memo.nodeIndex;
    const E = memo.edgeIndex;
    const { nodes, edges } = elements;
    let maxNodeIndex = 0;
    let maxEdgeIndex = 0;
    const offsetNodes = nodes === null || nodes === void 0 ? void 0 : nodes.map(n => {
        n.data.index += N;
        n.data.id = 'n' + n.data.index;
        maxNodeIndex = Math.max(maxNodeIndex, n.data.index);
        return n;
    });
    const offsetEdges = edges === null || edges === void 0 ? void 0 : edges.map(e => {
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
const invertAllEdges = () => cy.edges().forEach(edge => {
    const _a = edge.data(), { target, source, label, id, meta } = _a, rest = __rest(_a, ["target", "source", "label", "id", "meta"]);
    const vertex = { target: source, source: target };
    edge.remove();
    let newLabel;
    if (meta.hasInvertedLabel) {
        newLabel = meta.isInverted ? meta.originalLabel : meta.invertedLabel;
        meta.isInverted = !meta.isInverted;
    }
    else {
        newLabel = (label === null || label === void 0 ? void 0 : label.includes(COMPOSITION_TOKEN))
            ? label.split(COMPOSITION_TOKEN).reverse().join(COMPOSITION_TOKEN)
            : label;
    }
    const newEdge = addEdge(vertex, newLabel);
    rest.meta = meta;
    newEdge.data(rest);
    setEdgeVariant(newEdge);
});
const seedGraph = (nodes, edges) => {
    (edges === null || edges === void 0 ? void 0 : edges.length) ? cy.add([...nodes, ...edges]) : cy.add([...nodes]);
};
const setEdgeVariant = (edge) => {
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
const graphFromJson = (input) => {
    const data = input;
    // clearTree();
    offsetElementsIndexes(data.elements);
    if (data.elements.nodes) {
        seedGraph(data.elements.nodes, data.elements.edges);
        cy.edges().forEach(edge => {
            setEdgeVariant(edge);
        });
        cy.zoom(data.zoom);
        cy.pan(data.pan);
        incIndex();
    }
};
const findNodeByMetaId = (id) => cy
    .nodes()
    .toArray()
    .find(node => node.data().meta.id === id);
const findEdgeByMetaId = (id) => cy
    .edges()
    .toArray()
    .find(edge => edge.data().meta.id === id);
const hint = (memo) => {
    const a = cy.nodes(`#${memo.nodePairsSelections[0]}`).first();
    const b = cy.nodes(`#${memo.nodePairsSelections[1]}`).first();
    const dataA = CURRENT_THEME.type === 'Dark' ? b.data() : a.data();
    const dataB = CURRENT_THEME.type === 'Dark' ? a.data() : b.data();
    if (dataA.meta.isUniversalSource &&
        dataA.meta.universalProperty &&
        dataB.meta.isUniversalTarget &&
        dataA.meta.universalData) {
        const edge = connectNodes(memo.nodePairsSelections).style({
            'line-style': 'dashed',
            'line-dash-pattern': [6, 3],
            'line-dash-offset': 1
        });
        switch (dataA.meta.universalProperty) {
            case 'Product':
                {
                    const leftEdge = findEdgeByMetaId(dataA.meta.universalData.leftEdgeId);
                    const rightEdge = findEdgeByMetaId(dataA.meta.universalData.rightEdgeId);
                    if (leftEdge && rightEdge) {
                        edge.data({
                            variant: 'Universal',
                            label: `⟨ ${leftEdge.data().label} ; ${rightEdge.data().label} ⟩`
                        });
                    }
                }
                break;
            case 'Sum':
                {
                    const leftEdge = findEdgeByMetaId(dataA.meta.universalData.leftEdgeId);
                    const rightEdge = findEdgeByMetaId(dataA.meta.universalData.rightEdgeId);
                    if (leftEdge && rightEdge) {
                        edge.data({
                            variant: 'Universal',
                            label: `[ ${leftEdge.data().label} ; ${rightEdge.data().label} ]`
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
const getElementOffset = (element) => {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top
    };
};
const displayLesson = () => {
    clearSelection();
    clearTree();
    const diagram = lesson.diagrams[lesson.content[lesson.interface.index]];
    if (diagram) {
        graphFromJson(structuredClone(diagram));
    }
};
const toggleTheme = () => {
    if (CURRENT_THEME.type === 'Dark') {
        changeTheme(LIGTH_THEME);
        elements.themeButton.textContent = '☾';
        elements.tutorialImage.style = 'filter: invert(100)';
    }
    else {
        changeTheme(DARK_THEME);
        elements.themeButton.textContent = '☼';
        elements.tutorialImage.style = 'filter:invert(0)';
    }
    cy.nodes().forEach(node => {
        node.style({
            shape: 'rectangle',
            'background-opacity': 0,
            content: 'data(label)'
        });
    });
    cy.edges().forEach(edge => {
        edge.style({
            width: 1,
            'target-arrow-fill': 'filled',
            'target-arrow-shape': 'vee',
            'target-arrow-color': CURRENT_THEME.edges,
            'curve-style': CURVES.morphism,
            'line-color': CURRENT_THEME.edges,
            color: CURRENT_THEME.text
        });
    });
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
    localStorage.setItem('theme', CURRENT_THEME.type);
};
cy.ready(() => {
    elements.themeButton.addEventListener('click', () => {
        clearSelection();
        toggleTheme();
    });
    elements.invertButton.addEventListener('click', () => {
        clearSelection();
        invertAllEdges();
    });
    elements.lessonButton.addEventListener('click', () => {
        if (elements.lessonButton.textContent === 'playground') {
            clearSelection();
            clearTree();
            // window.location.reload();
            elements.lessonButton.textContent = 'lesson';
            // elements.lessonButton.style.display = 'none';
            elements.lessonPrev.style.display = 'none';
            elements.lessonNext.style.display = 'none';
        }
        else {
            elements.lessonButton.textContent = 'playground';
            // elements.lessonButton.style.display = 'none';
            elements.lessonPrev.style.display = 'block';
            elements.lessonNext.style.display = 'block';
            lesson.interface.fetchLesson(displayLesson);
        }
    });
    let currentTutorialIndex = TUTORIAL_GIFS - 2;
    elements.tutorialButton.addEventListener('click', () => {
        if (elements.tutorialContainer.style.display === 'grid') {
            elements.tutorialContainer.style.display = 'none';
            elements.tutorialImage.src = './assets/images/favicon.png';
            elements.tutorialButton.textContent = 'tutorial';
        }
        else {
            elements.tutorialImage.src = `./assets/gifs/${currentTutorialIndex % TUTORIAL_GIFS}.gif`;
            elements.tutorialContainer.style.display = 'grid';
            elements.tutorialButton.textContent = 'close';
        }
    });
    elements.tutorialNext.addEventListener('click', () => (elements.tutorialImage.src = `./assets/gifs/${++currentTutorialIndex % TUTORIAL_GIFS}.gif`));
    elements.lessonPrev.addEventListener('click', () => {
        lesson.interface.decIndex();
        displayLesson();
        // if (CURRENT_THEME.type === 'Dark') invertAllEdges();
    });
    elements.lessonNext.addEventListener('click', () => {
        lesson.interface.incIndex();
        displayLesson();
        // if (CURRENT_THEME.type === 'Dark') invertAllEdges();
    });
    elements.hintsButton.addEventListener('click', () => {
        if (memo.lastSelection && memo.nodePairsSelections.length === 2) {
            hint(memo);
        }
    });
    elements.connectionButton.addEventListener('click', () => {
        if (memo.nodePairsSelections.length === 2) {
            connectNodes(memo.nodePairsSelections);
        }
    });
    elements.identityButton.addEventListener('click', () => {
        if (memo.nodePairsSelections.length === 2) {
            connectNodes(memo.nodePairsSelections, elements.connectionA.textContent !== DEFAULT_TOKEN &&
                elements.connectionA.textContent === elements.connectionB.textContent
                ? toSuperscript('id') + elements.connectionA.textContent
                : undefined);
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
            if (edgeSelectionArray.length === 0)
                return;
            const edges = edgeSelectionArray.map(x => cy.edges(`#${x}`).first());
            const firstEdge = edges[0];
            const lastEdge = edges[edges.length - 1];
            const firstNode = firstEdge.connectedNodes().first();
            const lastNode = lastEdge.connectedNodes().last();
            // already existing edges between them
            const exisingEdges = firstNode.edgesWith(lastNode);
            const fId = firstNode.id();
            const lId = lastNode.id();
            if (!fId || !lId)
                return;
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
            }
            else {
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
        if (document.activeElement === document.body &&
            !memo.nodePairsSelections.length &&
            !memo.lastSelection.id) {
            memo.lastSelection.id = null;
            deselectIndex();
            clearSelection();
            const zoom = cy.zoom();
            const pan = cy.pan();
            return addNode({
                x: (memo.mousePosition.x - pan.x) / zoom,
                y: (memo.mousePosition.y - pan.y) / zoom
            }, DEFAULT_TOKEN);
        }
    });
    const saveFile = () => {
        clearSelection();
        const diryJson = cy.json();
        delete diryJson.style;
        delete diryJson.data;
        delete diryJson.zoomingEnabled;
        delete diryJson.minZoom;
        delete diryJson.maxZoom;
        delete diryJson.panningEnabled;
        delete diryJson.boxSelectionEnabled;
        delete diryJson.renderer;
        delete diryJson.hideEdgesOnViewport;
        delete diryJson.textureOnViewport;
        delete diryJson.motionBlur;
        delete diryJson.userPanningEnabled;
        delete diryJson.userZoomingEnabled;
        const data = diryJson;
        const json = JSON.stringify({
            GRAPH: { main: data },
            META: {}
        });
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
        reader.onload = (e) => __awaiter(void 0, void 0, void 0, function* () { return graphFromJson(JSON.parse(e.target.result.toString()).GRAPH.main); });
        upload.addEventListener('change', (e) => reader.readAsText(e.currentTarget.files[0]));
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
    elements.leftScrollButton.addEventListener('click', () => {
        const pan = cy.pan();
        cy.pan({ x: pan.x - PAN_STEP, y: pan.y });
    });
    elements.rightScrollButton.addEventListener('click', () => {
        const pan = cy.pan();
        cy.pan({ x: pan.x + PAN_STEP, y: pan.y });
    });
    elements.zoomInButton.addEventListener('click', () => {
        const zoom = cy.zoom();
        cy.zoom(zoom + ZOOM_STEP);
    });
    elements.zoomOutButton.addEventListener('click', () => {
        const zoom = cy.zoom();
        cy.zoom(zoom - ZOOM_STEP);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            renameVariable(elements.variableInput.value);
            elements.variableInput.value = '';
            clearSelection();
        }
        else if ((memo.nodePairsSelections.length === 1 ||
            memo.lastSelection.type === 'edge') &&
            e.key !== 'Shift' &&
            e.key !== 'Command' &&
            e.key !== 'Alt' &&
            e.key !== 'Meta' &&
            e.key !== 'CapsLock' &&
            e.key !== 'Tab' &&
            e.key !== 'Escape' &&
            e.key !== 'Delete' &&
            e.key !== 'Control') {
            if (e.key === 'Backspace') {
                elements.autocompleteContainer.innerHTML = '';
                elements.autocompleteContainer.style.display = 'none';
                elements.variableInput.value = eraseCharacter();
            }
            else {
                if (e.key.includes('Arrow')) {
                    elements.variableInput.value += ABC[e.key];
                }
                else {
                    elements.variableInput.value += e.key;
                    if (e.key === ' ') {
                        return autocomplete(ABC.common);
                    }
                    else if (e.key === '*') {
                        return autocomplete(ABC.other);
                    }
                    else {
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
            if (memo.lastSelection.type === 'node') {
                hasEdges(memo.lastSelection.id)
                    ? removeNodeEdges(memo.lastSelection.id)
                    : removeNode(memo.lastSelection.id);
            }
            else if (memo.lastSelection.type === 'edge') {
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
        e.target.style({ 'line-color': CURRENT_THEME.selection, width: 3 });
        memo.edgeSelections.add(e.target.id());
        if (memo.edgeSelections.size > 1) {
            elements.compositionButton.style.display = 'block';
        }
    });
    cy.on('select', 'node', e => e.target.style('text-outline-width', 3));
    cy.on('click', 'node', clickNodes);
    cy.on('dblclick', 'edge', e => e.target.data().variant === 'Universal'
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
            .data({ variant: 'Universal' }));
    cy.on('click', 'edge', e => {
        clickEdges(e);
        const data = e.target.data();
        const incomming = cy.nodes(`#${data.source}`).first();
        const outgoing = cy.nodes(`#${data.target}`).first();
        inspectSelectionIndex(memo.lastSelection, '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]');
    });
    // window.addEventListener(
    //   'resize',
    //   debounce(e => {
    //     if (elements.lessonSection.style.visibility === 'visible') {
    //       displayLesson();
    //     }
    //   })
    // );
    if (localStorage.getItem('theme') === 'Dark') {
        toggleTheme();
    }
    elements.treeContainer.focus();
});
