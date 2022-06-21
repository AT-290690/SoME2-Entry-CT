'use strict';
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
const Shortcuts = {
    Edge: 'c',
    Universal: 'u',
    Node: 'n'
};
const memo = {
    lastSelection: { id: undefined, type: 'node', label: '' },
    selectedPairs: [],
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
    connectionButton: document.getElementById('connection-button')
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
                'font-family': 'NatoSansMath',
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
                'font-family': 'NatoSansMath',
                'font-size': '15px',
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
    zoom: 1.5,
    pan: { x: 0, y: 0 },
    // interaction options:
    minZoom: 0.4,
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
const setIndex = (v) => {
    memo.nodeIndex = +v;
    memo.edgeIndex += memo.nodeIndex;
};
const incIndex = (v = 1) => {
    memo.nodeIndex += v;
};
const addNode = (x, y, label) => {
    const data = {
        index: memo.nodeIndex,
        label,
        id: 'n' + memo.nodeIndex,
        type: 'node'
    };
    const node = cy
        .add({
        group: 'nodes',
        data
    })
        .position({ x, y });
    incIndex();
    return node;
};
const addEdge = (sourceId, targetId, label) => {
    const edge = cy.add({
        group: 'edges',
        // classes: 'autorotate',
        data: {
            id: `e${memo.edgeIndex}`,
            label,
            source: `${sourceId}`,
            target: `${targetId}`,
            arrow: 'vee'
        }
    });
    memo.edgeIndex += 1;
    return edge;
};
const inspectSelectionIndex = (selection, opt = '') => (elements.selectedIndex.innerHTML = `${selection.label || 'none'} : ${selection.type || 'not selected'} ${opt}`);
const clickEdges = (e) => {
    var _a;
    resetColorOfSelectedNodes();
    memo.lastSelection = {
        type: 'edge',
        id: e.target.id(),
        label: (_a = e.target.data().label) !== null && _a !== void 0 ? _a : ''
    };
    elements.variableInput.value = memo.lastSelection.label;
    memo.selectedPairs.length = 0;
};
const connectNodes = (style, label) => {
    const couple = memo.selectedPairs;
    if (!couple[0] && !couple[1]) {
        resetColorOfSelectedNodes(couple);
    }
    else if (couple.length > 1 &&
        couple[0] !== couple[1] // don't connect self to avoid bad user experience
    ) {
        const edge = addEdge(couple[0], couple[1], label);
        if (style) {
            edge.style(style);
        }
        resetColorOfSelectedNodes(couple);
        //  memo.selectedPairs.push(memo.lastSelection.id);
    }
    else if (couple[0] === couple[1]) {
        addEdge(couple[0], couple[0], label);
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
    inspectSelectionIndex(memo.lastSelection, couple[1]
        ? '[ ' + e.target.data().label + ' -> ' + outgoing.data().label + ' ]'
        : '[ ' + e.target.data().label + ' -> ? ]');
    if (memo.selectedPairs.length > 2) {
        clearSelection();
        clickNodes(e);
    }
    else if (memo.selectedPairs.length === 2) {
        elements.connectionButton.style.display = 'block';
        positionAbsoluteElement(elements.connectionButton, memo.mousePosition);
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
const resetColorOfSelectedNodes = (nodes = memo.selectedPairs) => {
    nodes.map((id) => cy.nodes(`#${id}`).style({
        'text-outline-width': 0,
        'text-outline-color': COLORS.selection
    }));
};
const positionAbsoluteElement = (element, coordinates) => {
    element.style.left = coordinates.x - 50 + 'px';
    element.style.top = coordinates.y + 50 + 'px';
};
const autocomplete = (words) => {
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
    memo.selectedPairs.length = 0;
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
cy.ready(() => {
    elements.connectionButton.addEventListener('click', () => {
        if (memo.selectedPairs.length === 2) {
            connectNodes();
        }
        // else if () {
        //   connectNodes({
        //     'line-style': 'dashed',
        //     'line-dash-pattern': [6, 3],
        //     'line-dash-offset': 1
        //   });
        // }
    });
    elements.compositionButton.addEventListener('click', () => {
        if (memo.edgeSelections.size) {
            const edges = [...memo.edgeSelections].map(x => cy.edges(`#${x}`).first());
            const first = edges[0];
            const last = edges[edges.length - 1];
            const fId = first.connectedNodes().first().id();
            const lId = last.connectedNodes().last().id();
            if (!fId || !lId)
                return;
            try {
                memo.selectedPairs = [fId, lId];
                const label = edges
                    .map(x => x.data().label)
                    .filter(Boolean)
                    .reverse()
                    .join(COMPOSITION_TOKEN);
                connectNodes(undefined, label);
            }
            catch (err) {
                return console.error(err);
            }
            const size = edges.length;
            if (edges.length > 2) {
                edges.forEach((element, index) => {
                    if (index > 0 && index < size - 1) {
                        element.connectedNodes().remove();
                        element.remove();
                    }
                });
            }
            else {
                first.connectedNodes().last().remove();
                first.remove();
                last.remove();
            }
        }
    });
    document.addEventListener('mousemove', e => {
        memo.mousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    document.addEventListener('dblclick', e => {
        memo.lastSelection.id = null;
        inspectSelectionIndex({ type: 'not selected', id: 'none' });
        clearSelection();
        const zoom = cy.zoom();
        const pan = cy.pan();
        return addNode((memo.mousePosition.x - pan.x) / zoom, (memo.mousePosition.y - pan.y) / zoom, DEFAULT_TOKEN);
    });
    document.addEventListener('keydown', e => {
        if (!memo.selectedPairs.length &&
            !memo.lastSelection.id &&
            e.key.toLowerCase() === Shortcuts.Node) {
            memo.lastSelection.id = null;
            inspectSelectionIndex({ type: 'not selected', id: 'none' });
            clearSelection();
            const zoom = cy.zoom();
            const pan = cy.pan();
            return addNode((memo.mousePosition.x - pan.x) / zoom, (memo.mousePosition.y - pan.y) / zoom, DEFAULT_TOKEN);
        }
        else if (memo.selectedPairs.length === 2) {
            if (e.key === Shortcuts.Edge) {
                connectNodes();
            }
            else if (e.key.toLowerCase() === Shortcuts.Universal) {
                connectNodes({
                    'line-style': 'dashed',
                    'line-dash-pattern': [6, 3],
                    'line-dash-offset': 1
                });
            }
        }
        if (e.key === 'Enter') {
            renameVariable(elements.variableInput.value);
            elements.variableInput.value = '';
            clearSelection();
        }
        else if ((memo.selectedPairs.length === 1 || memo.lastSelection.type === 'edge') &&
            e.key !== 'Shift' &&
            e.key !== 'Command' &&
            e.key !== 'Alt' &&
            e.key !== 'Meta' &&
            e.key !== 'CapsLock' &&
            e.key !== 'Tab' &&
            e.key !== 'Escape' &&
            e.key !== 'Delete') {
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
            inspectSelectionIndex({ type: 'not selected', id: 'none' });
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
            inspectSelectionIndex({ type: 'not selected', id: 'none' });
        }
    });
    cy.on('dragfree', 'node', e => {
        clearSelection();
        inspectSelectionIndex({ type: 'not selected', id: 'none' });
    });
    cy.on('select', 'edge', e => {
        memo.edgeSelections.add(e.target.id());
        if (memo.edgeSelections.size > 1)
            elements.compositionButton.style.display = 'block';
        positionAbsoluteElement(elements.compositionButton, memo.mousePosition);
    });
    cy.on('select', 'node', e => e.target.style('text-outline-width', 3));
    cy.on('click', 'node', clickNodes);
    cy.on('click', 'edge', e => {
        clickEdges(e);
        const data = e.target.data();
        const incomming = cy.nodes(`#${data.source}`).first();
        const outgoing = cy.nodes(`#${data.target}`).first();
        inspectSelectionIndex(memo.lastSelection, '[ ' + incomming.data().label + ' -> ' + outgoing.data().label + ' ]');
    });
    elements.treeContainer.focus();
});
