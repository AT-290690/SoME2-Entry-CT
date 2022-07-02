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
const COLORS = {
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
    treeContainer: document.getElementById('tree'),
    variableInput: document.getElementById('variableInput'),
    autocompleteContainer: document.getElementById('autocomplete'),
    compositionButton: document.getElementById('composition-button'),
    connectionButton: document.getElementById('connection-button'),
    connectionA: document.getElementById('connection-node-A'),
    connectionB: document.getElementById('connection-node-B'),
    save: document.getElementById('save'),
    load: document.getElementById('load'),
    commentsSection: document.getElementById('comments-section'),
    lessonSection: document.getElementById('lesson-section'),
    lessonContent: document.getElementById('lesson-content'),
    lessonPrev: document.getElementById('lesson-button-right'),
    lessonNext: document.getElementById('lesson-button-left'),
    tutorialButton: document.getElementById('tutorial-button')
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
                'target-arrow-fill': 'filled',
                'target-arrow-shape': 'vee',
                'target-arrow-color': COLORS.edges,
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
                'font-size': '15px'
            }
        },
        {
            selector: 'edge[label]:selected',
            style: {
                'text-outline-color': COLORS.selection,
                'text-outline-width': 3
            }
        },
        {
            selector: 'node',
            style: {
                shape: 'rectangle',
                // 'border-style': 'solid',
                // 'border-color': COLORS.stroke,
                // 'border-width': '2',
                'background-opacity': 0,
                content: 'data(label)'
            }
        },
        {
            selector: 'node[label]',
            style: {
                color: COLORS.text,
                'text-outline-color': COLORS.selection,
                'text-outline-width': 0,
                'text-valign': 'center',
                'font-size': '15px'
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
    zoom: 1.5,
    pan: { x: 0, y: 0 },
    // interaction options:
    minZoom: 0.4,
    maxZoom: 6,
    zoomingEnabled: false,
    userZoomingEnabled: false,
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
const inspectSelectionIndex = (selection, opt = '') => (elements.selectedIndex.innerHTML = `${selection.label || 'none'} : ${selection.type} ${opt}`);
const clickEdges = (e) => {
    resetColorOfSelectedNodes();
    const { label, comment } = e.target.data();
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
const connectNodes = (label) => {
    const couple = memo.nodePairsSelections;
    if (!couple[0] && !couple[1]) {
        resetColorOfSelectedNodes(couple);
        clearSelection();
    }
    else if (couple.length > 1) {
        const edge = addEdge({ source: couple[0], target: couple[1] }, label);
        resetColorOfSelectedNodes(couple);
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
        'text-outline-color': COLORS.selectionIncoming
    });
    outgoing.style({
        'text-outline-width': 3,
        'text-outline-color': COLORS.selectionOutgoing
    });
    inspectSelectionIndex(memo.lastSelection, couple[1]
        ? '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]'
        : '[ ' + incomming.data().label + ' -> ? ]');
    if (memo.nodePairsSelections.length > 2) {
        clearSelection();
        clickNodes(e);
    }
    else if (memo.nodePairsSelections.length === 2) {
        elements.connectionButton.style.display = 'block';
        elements.connectionA.textContent = incomming.data().label;
        elements.connectionB.textContent = outgoing.data().label;
        positionAbsoluteElement(elements.connectionButton, offsetPosition(memo.mousePosition, -50, 50));
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
        'text-outline-color': COLORS.selection
    }));
};
const offsetPosition = (position, x, y) => ({ x: position.x + x, y: position.y + y });
const positionAbsoluteElement = (element, coordinates) => {
    element.style.left = coordinates.x + 'px';
    element.style.top = coordinates.y + 'px';
};
const autocomplete = (words = []) => {
    elements.autocompleteContainer.innerHTML = '';
    words.forEach(word => {
        const option = document.createElement('button');
        option.classList.add('autocomplete-option');
        option.textContent = word;
        option.addEventListener('click', () => {
            elements.autocompleteContainer.innerHTML = '';
            elements.variableInput.value = elements.variableInput.value.substring(0, elements.variableInput.value.length - 1);
            elements.variableInput.value += word;
        });
        elements.autocompleteContainer.appendChild(option);
    });
};
const clearSelection = () => {
    resetColorOfSelectedNodes();
    elements.autocompleteContainer.innerHTML = '';
    elements.compositionButton.style.display = 'none';
    elements.connectionButton.style.display = 'none';
    cy.$(':selected')
        .nodes()
        .map(n => n
        .style({
        'text-outline-width': 0,
        'text-outline-color': COLORS.selection
    })
        .unselect());
    cy.edges().map(e => e
        .style({
        'line-color': COLORS.edges,
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
const seedGraph = (nodes, edges) => {
    (edges === null || edges === void 0 ? void 0 : edges.length) ? cy.add([...nodes, ...edges]) : cy.add([...nodes]);
};
const graphFromJson = (input) => {
    const data = input;
    // clearTree();
    offsetElementsIndexes(data.elements);
    if (data.elements.nodes) {
        seedGraph(data.elements.nodes, data.elements.edges);
        cy.edges().forEach(edge => {
            const data = edge.data();
            if (data.variant === 'Universal') {
                edge.style({
                    'line-style': 'dashed',
                    'line-dash-pattern': [6, 3],
                    'line-dash-offset': 1
                });
                edge.data({ variant: 'Universal' });
            }
            if (data.properties.includes('Composition')) {
                edge.style({
                    'curve-style': 'unbundled-bezier'
                });
            }
        });
        cy.zoom({
            level: data.zoom,
            position: cy.nodes().first().position()
        });
        cy.pan(data.pan);
        incIndex();
    }
};
const displayLesson = () => {
    const element = lesson.interface.show();
    const object = lesson.content[lesson.interface.index].object;
    clearSelection();
    clearTree();
    if (object) {
        graphFromJson(object);
    }
    positionAbsoluteElement(element, { x: 0, y: 0 });
};
cy.ready(() => {
    cy.on('pan', () => {
        const currentLesson = lesson.content[lesson.interface.index].text;
        if (currentLesson) {
            const pan = cy.pan();
            positionAbsoluteElement(currentLesson, pan);
        }
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
    });
    elements.lessonNext.addEventListener('click', () => {
        lesson.interface.incIndex();
        displayLesson();
    });
    elements.connectionButton.addEventListener('click', () => {
        if (memo.nodePairsSelections.length === 2) {
            connectNodes(elements.connectionA.textContent !== DEFAULT_TOKEN &&
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
                    'line-color': COLORS.selection,
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
            const first = edges[0];
            const last = edges[edges.length - 1];
            const fId = first.connectedNodes().first().id();
            const lId = last.connectedNodes().last().id();
            if (!fId || !lId)
                return;
            memo.nodePairsSelections = [fId, lId];
            const label = edges
                .map(x => x.data().label)
                .filter(Boolean)
                .reverse()
                .join(COMPOSITION_TOKEN);
            const edge = connectNodes(label).style({
                'curve-style': 'unbundled-bezier'
            });
            const data = edge.data();
            edge.data({ properties: [...data.properties, 'Composition'] });
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
            inspectSelectionIndex({
                type: 'none',
                id: 'none',
                label: '',
                comment: ''
            });
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
        const data = cy.json();
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
        reader.onload = (e) => __awaiter(void 0, void 0, void 0, function* () { return graphFromJson(JSON.parse(e.target.result.toString())); });
        upload.addEventListener('change', (e) => reader.readAsText(e.currentTarget.files[0]));
        upload.click();
    };
    elements.save.addEventListener('click', () => saveFile());
    elements.load.addEventListener('click', () => loadFile());
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
            inspectSelectionIndex({
                type: 'none',
                id: 'none',
                label: '',
                comment: ''
            });
        }
        if (e.key === 'Delete' || (e.ctrlKey && e.key === 'Backspace')) {
            if (memo.lastSelection.type !== 'edge') {
                hasEdges(memo.lastSelection.id)
                    ? removeNodeEdges(memo.lastSelection.id)
                    : removeNode(memo.lastSelection.id);
            }
            else {
                removeEdge(memo.lastSelection.id);
            }
            clearSelection();
            inspectSelectionIndex({
                type: 'none',
                id: 'none',
                label: '',
                comment: ''
            });
        }
    });
    cy.on('dragfree', 'node', e => {
        clearSelection();
        inspectSelectionIndex({ type: 'none', id: 'none', label: '', comment: '' });
    });
    cy.on('select', 'edge', e => {
        // const connections = edges.connectedNodes().map(
        //   x => x.data().id
        //   // x.connectedEdges().map(x => {
        //   //   const data = x.data();
        //   //   return { source: data.source, target: data.target };
        //   // })
        // );
        e.target.style({ 'line-color': COLORS.selection, width: 3 });
        memo.edgeSelections.add(e.target.id());
        if (memo.edgeSelections.size > 1) {
            elements.compositionButton.style.display = 'block';
            positionAbsoluteElement(elements.compositionButton, offsetPosition(memo.mousePosition, -50, 50));
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
    elements.treeContainer.focus();
});
