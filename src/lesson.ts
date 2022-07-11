const CONTENT = [];
const META = window['PREDIFINED_TREES_METADATA'];
const DIAGRAMS = window['PREDIFINED_TREES_DRAWING'];
for (const key in META) {
  META[key].forEach(meta => {
    const isNode = meta.id[0] === 'n';
    const current = isNode
      ? DIAGRAMS[key].elements.nodes.find(node => node.data.id === meta.id)
      : DIAGRAMS[key].elements.edges.find(edge => edge.data.id === meta.id);
    current.data.meta = meta;
  });
}

[...document.getElementsByClassName('slide')].forEach((text, index) => {
  CONTENT[index] = { text, object: DIAGRAMS[index] };
});

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
  content: CONTENT
};
