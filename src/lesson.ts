const PREDIFINED_TREES = {};
const CONTENT = [];

fetch(`./src/lesson/lesson.tex`)
  .then(buffer => buffer.text())
  .then(text => {
    text
      .split('#Slide')
      .filter(Boolean)
      .forEach((text, index) => {
        CONTENT[index] = { text: text.trim(), object: PREDIFINED_TREES[index] };
      });
  });

let latex;
const lesson = {
  interface: {
    index: 0,
    show: (element: HTMLElement) => {
      element.textContent = lesson.content[lesson.interface.index].text;
      if (!latex) {
        latex = window['MathJax'] as {
          typeset: () => void;
          tex: object;
          svg: object;
        };
      }
      latex.typeset();
    },
    incIndex: () =>
      lesson.interface.index < lesson.content.length - 1
        ? lesson.interface.index++
        : 0,
    decIndex: () => (lesson.interface.index > 0 ? lesson.interface.index-- : 0)
  },
  content: CONTENT
};
