const urlParams = new URLSearchParams(window.location.search);
const href = window.location.href.split('/').filter(Boolean);
const envi = href.slice(1, 2);
const protocol = envi[0].includes('localhost') ? 'http://' : 'https://';
const API = protocol + envi.join('/');
const APP = 'SoME2-Entry-CT';
const GIST = 'https://gist.githubusercontent.com/';
const lesson = {
    interface: {
        index: 0,
        incIndex: () => {
            lesson.interface.index < lesson.content.length - 1
                ? lesson.interface.index++
                : 0;
        },
        decIndex: () => {
            lesson.interface.index > 0 ? lesson.interface.index-- : 0;
        },
        fetchLesson: (callback) => {
            fetch(urlParams.has('g')
                ? `${GIST}${urlParams.get('g')}`
                : './lesson/lesson.json')
                .then(buffer => {
                if (buffer.status >= 400)
                    console.error(buffer.status);
                return buffer.json();
            })
                .then(({ GRAPH, META }) => {
                const META_DATA = window['PREDIFINED_TREES_METADATA'];
                const DIAGRAMS = window['PREDIFINED_TREES_DRAWING'];
                for (const key in GRAPH) {
                    lesson.content.push(key);
                    DIAGRAMS[key] = GRAPH[key];
                }
                for (const key in META) {
                    META_DATA[key] = META[key];
                }
                lesson.diagrams = DIAGRAMS;
            })
                .then(() => {
                const META_DATA = window['PREDIFINED_TREES_METADATA'];
                const DIAGRAMS = window['PREDIFINED_TREES_DRAWING'];
                for (const key in META_DATA) {
                    META_DATA[key].forEach(meta => {
                        var _a, _b;
                        const isNode = meta.id[0] === 'n';
                        const current = isNode
                            ? (_a = DIAGRAMS[key].elements.nodes) === null || _a === void 0 ? void 0 : _a.find(node => node.data.id === meta.id)
                            : (_b = DIAGRAMS[key].elements.edges) === null || _b === void 0 ? void 0 : _b.find(edge => edge.data.id === meta.id);
                        if (current)
                            current.data.meta = meta;
                    });
                }
            })
                .then(callback);
        }
    },
    content: [],
    diagrams: {}
};
// .catch(err => printErrors(err));
