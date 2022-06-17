/* 

These functions help evaluate the tree 
Currently they are not used - but might help later

All kinds of operations on the tree - storing, loading, deleting pruning
as well as convertions to adj list and depth first search traversal

*/

import { memo } from './graph';

export const read = async filename =>
  JSON.parse(localStorage.getItem(filename));
export const write = async (filename, data) => {
  localStorage.setItem(
    filename,
    JSON.stringify({
      filename: filename,
      data: JSON.stringify(data)
    })
  );
};
const saveData = () => {
  memo.selectedPairs.length = 0;
  memo.zoom = cy.zoom();
  memo.filename = elements.fileNameInput.value.trim();
};

const seedGraph = (nodes = memo.elements.nodes, edges = memo.elements.edges) =>
  cy.add([...nodes, ...edges]);
const clearFileOptions = () => {
  const opt = elements.fileSelector.querySelector('optgroup');
  elements.fileSelector.innerHTML = '';
  elements.fileSelector.appendChild(opt);
};
const offsetElementsIndexes = elements => {
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
export const loadSelectedFile = filename => {
  const file = JSON.parse(localStorage.getItem(filename));
  clearTree();
  memo.elements = offsetElementsIndexes(file.elements);
  memo.filename = file.filename;
  memo.zoom = file.zoom || 1;
  seedGraph(memo.elements.nodes);
  cy.zoom({ level: memo.zoom, position: cy.nodes('#n0').position() });
};
const deleteTree = filename => {
  localStorage.removeItem(filename);
  clearTree();
};

const clearTree = (nodes = true, edges = true) => {
  if (nodes) {
    memo.nodeIndex = 0;
    cy.nodes().remove();
  }
  if (edges) {
    cy.edges().remove();
    memo.edgeIndex = 0;
  }
};

const pruneTree = () => {
  memo.nodeIndex = 0;
  let max = 0,
    min = 0;
  cy.nodes().map(n => {
    const data = n.data();
    if (!data.prev) removeNode(data.id);
    min = Math.min(data.index, min);
    max = Math.max(data.index, max);
  });
  memo.elements.nodes = cy.nodes().map(x => x.data());
  memo.elements.edges = cy.edges().map(x => x.data());
  memo.edgeIndex = Math.max(memo.edgeIndex, cy.edges().length);
  incIndex(max + 1);
};
// This might be needed if evaluation is implemented
// The idea is to have adjacency list for node -> children queries
const mergeDescisionTree = () => {
  const output = {
    filename: memo.filename,
    type: 'graph',
    nodes: {}
  };

  const existingConnections = cy.edges().reduce((map, fn) => {
    const item = fn.data();
    if (item) {
      const current = map.get(item.source);
      if (current) {
        current.add(item.target);
      } else {
        map.set(item.source, new Set([item.target]));
      }
    }
    return map;
  }, new Map());

  existingConnections.forEach((value, key) => {
    const node = cy.nodes(`#${key}`);
    const data = node.data();
    output.nodes[data.index] = {
      index: data.index,
      id: data.id,
      role: data.type !== 'node' ? data.type : 'branch',
      next: [...value].reduce((o, i) => {
        o.push(+i.substr(1));
        return o;
      }, [])
    };
  });
  cy.nodes()
    .roots()
    .map(current => {
      const data = current.data();
      if (data) {
        if (output.nodes[data.index]) {
          output.nodes[data.index].role =
            data.type !== 'node' ? data.type : 'leaf';
        }
      }
    });
  cy.nodes()
    .leaves()
    .map(current => {
      const data = current.data();
      if (data) {
        output.nodes[data.index] = {
          index: data.index,
          id: data.id,
          role: data.type !== 'node' ? data.type : 'leaf',
          next: null
        };
      }
    });
  for (const nod in output.nodes) {
    output.nodes[nod].next?.forEach(n => (output.nodes[n].prev = +nod));
  }
  return output;
};

const saveEmptyJSONData = () => {
  clearSelection();
  elements.fileNameInput.value = 'untitled';
  write('untitled', {
    version: 1,
    filename: 'untitled',
    zoom: cy.zoom(),
    elements: { nodes: [], edges: [] }
  }).then(() => loadSelectedFile(elements.fileNameInput.value));
};
const saveJSONData = (filename = '', clear = true) => {
  inspectSelectionIndex(memo.lastSelection);
  if (clear) clearSelection();
  const slugName = filename.trim().replaceAll(' ', '_');
  memo.elements = cy.json().elements;
  // const adjList = mergeDescisionTree();
  write(slugName, {
    data: memo.data,
    elements: memo.elements
  });
  // write(slugName + 'adj_list', {
  //   data: memo.data,
  //   nodes: adjList.nodes
  // }).then(() => loadSelectedFile(elements.fileNameInput.value));
};

export const SERVICES = { GLOBAL: {}, FUNCS: [] };
export const f = SERVICES.FUNCS;
const getNodes = () => SERVICES.GLOBAL.NODES;
const shortCircuit = (predicate = res => res === undefined) =>
  SERVICES.FUNCS.forEach((fn, i) => {
    SERVICES.FUNCS[i] = async (...args) => {
      const res = await fn(...args);
      if (predicate(res)) {
        SERVICES.GLOBAL.NODES[i].next = null;
      } else {
        return res;
      }
    };
  });

export const wrap = (callback = res => res, FUNCS = SERVICES.FUNCS) =>
  FUNCS.forEach((fn, i) => (FUNCS[i] = (...args) => callback(fn(...args))));

export const fireFlies = (delay = 100, start = 0, end = f.length) => {
  const flicker = SERVICES.GLOBAL.DEBUG;
  f.slice(start, end).forEach((fn, i) => {
    f[i] = (...args) => {
      flicker(delay)(i);
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(fn(...args));
        }, delay)
      );
    };
  });
};

SERVICES.GLOBAL.DEBUG = (TIME = 100) => {
  const color = (current, color = COLORS.selection) =>
    cy.nodes(`#n${current}`).style('background-color', color);
  const toggleColor = current => {
    color(current);
    setTimeout(() => color(current, COLORS.nodesBG), TIME);
  };
  return toggleColor;
};
SERVICES.GLOBAL.MEMO = {};
const dfs = async (
  node,
  prev,
  nodes,
  parent,
  memo = SERVICES.GLOBAL.MEMO,
  services = SERVICES.FUNCS
) => {
  if (!node) return;
  let result;
  if (typeof services[node.index] === 'function')
    result = await services[node.index](
      prev,
      node.index,
      parent,
      nodes,
      memo,
      services
    );
  if (result !== undefined && node.next) {
    node.next.forEach(n => {
      dfs(nodes[n], result, nodes, node.index, memo, services);
    });
  }
};

export const stateMachine = (FILE = 'untitled') => {
  const list = JSON.stringify(localStorage.getItem(FILE)?.trim() || {});
  if (list.nodes) {
    const root = Object.values(list.nodes).find(node => node.role === 'root');
    root.prev = null;
    dfs(root, undefined, list.nodes);
  }
};
