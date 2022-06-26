const CONTENT = [];

[...document.getElementsByClassName('slide')].forEach((text, index) => {
  CONTENT[index] = { text, object: window['PREDIFINED_TREES'][index] };
});

let latex;
const lesson = {
  interface: {
    index: 0,
    show: (element: HTMLElement) => {
      // element.textContent = lesson.content[lesson.interface.index].text;

      lesson.content[lesson.interface.index].text.style.display = 'block';

      if (!latex) {
        latex = window['MathJax'] as {
          typeset: () => void;
          tex: object;
          svg: object;
        };
      }
      latex.typeset();
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
