const urlParams = new URLSearchParams(window.location.search);
const lessonContentNode = document.getElementById('lesson-content');
const href = window.location.href.split('/').filter(Boolean);
const envi = href.slice(1, 2);
const protocol = envi[0].includes('localhost') ? 'http://' : 'https://';
const API = protocol + envi.join('/');
const APP = 'SoME2-Entry-CT';
const GIST = 'https://gist.githubusercontent.com/';
const lesson = {
  interface: {
    index: 0,
    show: (): HTMLElement => {
      const currentLesson = lesson.content[lesson.interface.index].text;
      currentLesson.style.display = 'block';
      return currentLesson;
    },
    incIndex: () => {
      lesson.content[lesson.interface.index].text.style.display = 'none';
      lesson.interface.index < lesson.content.length - 1
        ? lesson.interface.index++
        : 0;
    },
    decIndex: () => {
      lesson.content[lesson.interface.index].text.style.display = 'none';
      lesson.interface.index > 0 ? lesson.interface.index-- : 0;
    }
  },
  content: [],
  diagrams: {}
};

fetch(
  urlParams.has('g') ? `${GIST}${urlParams.get('g')}` : './lesson/lesson.json'
)
  .then(buffer => {
    if (buffer.status >= 400) console.error(buffer.status);
    return buffer.json();
  })
  .then(
    ({
      CONTENT,
      GRAPH,
      META
    }: {
      CONTENT: string;
      GRAPH: object;
      META: object;
    }) => {
      const META_DATA = window['PREDIFINED_TREES_METADATA'];
      const DIAGRAMS = window['PREDIFINED_TREES_DRAWING'];
      for (const key in GRAPH) {
        DIAGRAMS[key] = GRAPH[key];
      }
      for (const key in META) {
        META_DATA[key] = META[key];
      }
      lesson.diagrams = DIAGRAMS;
      lessonContentNode.innerHTML = window.atob(CONTENT);
    }
  )
  .then(() => {
    const META_DATA = window['PREDIFINED_TREES_METADATA'];
    const DIAGRAMS = window['PREDIFINED_TREES_DRAWING'];
    for (const key in META_DATA) {
      META_DATA[key].forEach(meta => {
        const isNode = meta.id[0] === 'n';

        const current = isNode
          ? DIAGRAMS[key].elements.nodes?.find(node => node.data.id === meta.id)
          : DIAGRAMS[key].elements.edges?.find(
              edge => edge.data.id === meta.id
            );
        if (current) current.data.meta = meta;
      });
    }
    if (window['MathJax'] && 'typeset' in window['MathJax'])
      window['MathJax'].typeset();
    [...document.getElementsByClassName('slide')].forEach((text, index) => {
      lesson.content[index] = { text };
    });
  })
  .then(() => {
    if (urlParams.get('r')) document.getElementById('lesson-button').click();
  });
// .catch(err => printErrors(err));
