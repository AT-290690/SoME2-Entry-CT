//PREDIFINED_TREES[0] = {...}
//PREDIFINED_TREES[2] = {...}
//PREDIFINED_TREES[4] = {...}

PREDIFINED_TREES[0] = {
  elements: {
    nodes: [
      {
        data: {
          index: 0,
          label: 'c',
          comment: '',
          id: 'n0',
          type: 'node',
          variant: 'Object'
        },
        position: { x: 253.3345770772019, y: 118.66132588417216 },
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
          label: 'a',
          comment: '',
          id: 'n1',
          type: 'node',
          variant: 'Object'
        },
        position: { x: 195.33669875791887, y: 184.66081375434393 },
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
          label: 'b',
          comment: '',
          id: 'n2',
          type: 'node',
          variant: 'Object'
        },
        position: { x: 314.66593505262625, y: 187.9939276034651 },
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
          label: 'f',
          comment: '',
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
          id: 'e2',
          index: 2,
          label: 'd',
          comment: '',
          source: 'n2',
          target: 'n0',
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
          id: 'e3',
          index: 3,
          label: 'f∘d',
          comment: '',
          source: 'n2',
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
        shape: 'rectangle',
        'background-opacity': '0',
        label: 'data(label)'
      }
    },
    {
      selector: 'node[label]',
      style: {
        color: 'rgb(27,27,27)',
        'text-outline-color': 'rgb(131,230,101)',
        'text-outline-width': '0px',
        'text-valign': 'center',
        'font-size': '15px'
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
  zoomingEnabled: false,
  userZoomingEnabled: false,
  zoom: 1.5,
  minZoom: 0.4,
  maxZoom: 6,
  panningEnabled: false,
  userPanningEnabled: false,
  pan: { x: 0, y: 0 },
  boxSelectionEnabled: true,
  renderer: { name: 'canvas' },
  hideEdgesOnViewport: false,
  textureOnViewport: false,
  motionBlur: false
};
