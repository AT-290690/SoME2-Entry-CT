const PREDIFINED_TREES = {};
const CONTENT = [];
PREDIFINED_TREES[0] = {
    elements: {
        edges: [
            {
                data: {
                    id: 'e1',
                    index: 0,
                    label: '𝟇',
                    comment: '',
                    source: 'n2',
                    target: 'n3',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e2',
                    index: 1,
                    label: '𝕤',
                    comment: '',
                    source: 'n3',
                    target: 'n4',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e5',
                    index: 4,
                    label: '𝕤∘𝟇',
                    comment: '',
                    source: 'n2',
                    target: 'n4',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            }
        ],
        nodes: [
            {
                data: {
                    index: 2,
                    label: '𝛞',
                    comment: 'This is x',
                    id: 'n2',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 372.3032390362903, y: 90.4782470071685 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            },
            {
                data: {
                    index: 3,
                    label: '𝝷',
                    comment: '',
                    id: 'n3',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 483.00017396155727, y: 188.17891499395395 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            },
            {
                data: {
                    index: 4,
                    label: '𝕕',
                    comment: '',
                    id: 'n4',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 358.93455565027875, y: 210.21040918735076 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            }
        ]
    },
    style: [
        {
            selector: 'core',
            style: {
                'selection-box-opacity': '0.5',
                'selection-box-color': 'rgb(131,230,101)',
                'selection-box-border-color': 'rgb(0,0,0)',
                'active-bg-color': 'rgb(131,230,101)',
                'active-bg-opacity': '0.8',
                'active-bg-size': '10px',
                'selection-box-border-width': '0px',
                'outside-texture-bg-color': 'rgb(0,0,0)',
                'outside-texture-bg-opacity': '0.5'
            }
        },
        {
            selector: 'edge',
            style: {
                width: '1px',
                'target-arrow-fill': 'filled',
                'target-arrow-shape': 'vee',
                'target-arrow-color': 'rgb(27,27,27)',
                'curve-style': 'bezier',
                'line-color': 'rgb(27,27,27)',
                color: 'rgb(27,27,27)'
            }
        },
        {
            selector: 'edge[label]',
            style: {
                label: 'data(label)',
                'text-outline-color': 'rgb(239,239,239)',
                'text-outline-width': '2px',
                'font-family': 'NatoSansMath',
                'font-size': '15px'
            }
        },
        {
            selector: 'edge[label]:selected',
            style: {
                'text-outline-color': 'rgb(131,230,101)',
                'text-outline-width': '3px'
            }
        },
        {
            selector: 'node',
            style: {
                'text-valign': 'center',
                shape: 'rectangle',
                color: 'rgb(27,27,27)',
                'text-outline-color': 'rgb(131,230,101)',
                'text-outline-width': '0px',
                'background-opacity': '0',
                'font-family': 'NatoSansMath',
                'font-size': '15px',
                label: 'data(label)'
            }
        },
        {
            selector: 'node:selected',
            style: {
                'text-outline-color': 'rgb(131,230,101)',
                'text-outline-width': '3px'
            }
        },
        { selector: 'node:active', style: { 'text-outline-width': '3px' } }
    ],
    data: {},
    zoomingEnabled: true,
    userZoomingEnabled: true,
    zoom: 1.757208705124173,
    minZoom: 0.4,
    maxZoom: 6,
    panningEnabled: true,
    userPanningEnabled: true,
    pan: { x: -165.86391788639168, y: -33.500908189250694 },
    boxSelectionEnabled: true,
    renderer: { name: 'canvas' },
    hideEdgesOnViewport: false,
    textureOnViewport: false,
    motionBlur: false
};
PREDIFINED_TREES[1] = {
    elements: {
        nodes: [
            {
                data: {
                    index: 0,
                    label: 'x',
                    id: 'n0',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 382.031931568042, y: 169.33276339536886 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            },
            {
                data: {
                    index: 1,
                    label: 'cx',
                    id: 'n1',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 476.0319165260089, y: 95.99943006203551 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            },
            {
                data: {
                    index: 2,
                    label: 't𝐲',
                    id: 'n2',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 607.3666121378503, y: 96.65568502867589 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            },
            {
                data: {
                    index: 3,
                    label: '𝛘',
                    id: 'n3',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 649.3645955309032, y: 256.6660440815864 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            },
            {
                data: {
                    index: 4,
                    label: '𝕞',
                    id: 'n4',
                    type: 'node',
                    variant: 'Object'
                },
                position: { x: 603.3646669805605, y: 355.33129303663526 },
                group: 'nodes',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: false,
                classes: ''
            }
        ],
        edges: [
            {
                data: {
                    id: 'e0',
                    index: 0,
                    label: 'd',
                    source: 'n0',
                    target: 'n1',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e1',
                    index: 1,
                    label: 'x',
                    source: 'n1',
                    target: 'n2',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e2',
                    index: 2,
                    label: 'sd',
                    source: 'n2',
                    target: 'n3',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e7',
                    index: 7,
                    label: '𝖘',
                    source: 'n3',
                    target: 'n4',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e4',
                    index: 4,
                    label: 'x∘d',
                    source: 'n0',
                    target: 'n2',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e8',
                    index: 8,
                    label: '𝖘∘sd∘x∘d',
                    source: 'n0',
                    target: 'n4',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            },
            {
                data: {
                    id: 'e9',
                    index: 9,
                    label: 'sd∘x∘d',
                    source: 'n0',
                    target: 'n3',
                    type: 'edge',
                    variant: 'Morphism'
                },
                position: { x: 0, y: 0 },
                group: 'edges',
                removed: false,
                selected: false,
                selectable: true,
                locked: false,
                grabbable: true,
                pannable: true,
                classes: ''
            }
        ]
    },
    style: [
        {
            selector: 'core',
            style: {
                'selection-box-opacity': '0.5',
                'selection-box-color': 'rgb(131,230,101)',
                'selection-box-border-color': 'rgb(0,0,0)',
                'active-bg-color': 'rgb(131,230,101)',
                'active-bg-opacity': '0.8',
                'active-bg-size': '10px',
                'selection-box-border-width': '0px',
                'outside-texture-bg-color': 'rgb(0,0,0)',
                'outside-texture-bg-opacity': '0.5'
            }
        },
        {
            selector: 'edge',
            style: {
                width: '1px',
                'target-arrow-fill': 'filled',
                'target-arrow-shape': 'vee',
                'target-arrow-color': 'rgb(27,27,27)',
                'curve-style': 'bezier',
                'line-color': 'rgb(27,27,27)',
                color: 'rgb(27,27,27)'
            }
        },
        {
            selector: 'edge[label]',
            style: {
                label: 'data(label)',
                'text-outline-color': 'rgb(239,239,239)',
                'text-outline-width': '2px',
                'font-family': 'NatoSansMath',
                'font-size': '15px'
            }
        },
        {
            selector: 'edge[label]:selected',
            style: {
                'text-outline-color': 'rgb(131,230,101)',
                'text-outline-width': '3px'
            }
        },
        {
            selector: 'node',
            style: {
                'text-valign': 'center',
                shape: 'rectangle',
                color: 'rgb(27,27,27)',
                'text-outline-color': 'rgb(131,230,101)',
                'text-outline-width': '0px',
                'background-opacity': '0',
                'font-family': 'NatoSansMath',
                'font-size': '15px',
                label: 'data(label)'
            }
        },
        {
            selector: 'node:selected',
            style: {
                'text-outline-color': 'rgb(131,230,101)',
                'text-outline-width': '3px'
            }
        },
        { selector: 'node:active', style: { 'text-outline-width': '3px' } }
    ],
    data: {},
    zoomingEnabled: true,
    userZoomingEnabled: true,
    zoom: 1.5,
    minZoom: 0.4,
    maxZoom: 6,
    panningEnabled: true,
    userPanningEnabled: true,
    pan: { x: -123.0114702781519, y: -14.00959927112267 },
    boxSelectionEnabled: true,
    renderer: { name: 'canvas' },
    hideEdgesOnViewport: false,
    textureOnViewport: false,
    motionBlur: false
};
const COUNT = 3;
for (let i = 0; i < COUNT; i++) {
    fetch(`/src/lessons/${i}.txt`)
        .then(buffer => buffer.text())
        .then(text => {
        CONTENT[i] = { text, object: PREDIFINED_TREES[i] };
    });
}
const latex = window['MathJax'];
const lesson = {
    interface: {
        index: 0,
        show: (element) => {
            element.innerHTML = lesson.content[lesson.interface.index].text;
            latex === null || latex === void 0 ? void 0 : latex.typeset();
        },
        incIndex: () => lesson.interface.index < lesson.content.length - 1
            ? lesson.interface.index++
            : 0,
        decIndex: () => (lesson.interface.index > 0 ? lesson.interface.index-- : 0)
    },
    content: CONTENT
};
