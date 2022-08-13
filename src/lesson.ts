const urlParams = new URLSearchParams(window.location.search);
const lessonContentNode = document.getElementById('lesson-content');
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
  content: []
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
          ? DIAGRAMS[key].elements.nodes.find(node => node.data.id === meta.id)
          : DIAGRAMS[key].elements.edges.find(edge => edge.data.id === meta.id);
        if (current) current.data.meta = meta;
      });
    }
    window['MathJax'].typeset();
    [...document.getElementsByClassName('slide')].forEach((text, index) => {
      lesson.content[index] = { text, object: DIAGRAMS[index] };
    });
  });
// .catch(err => printErrors(err));
