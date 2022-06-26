const PREDIFINED_TREES = {};
const CONTENT = [];
const COUNT = 3;
for (let i = 0; i < COUNT; i++) {
    fetch(`./src/lessons/${i}.txt`)
        .then(buffer => buffer.text())
        .then(text => {
        CONTENT[i] = { text, object: PREDIFINED_TREES[i] };
    });
}
let latex;
const lesson = {
    interface: {
        index: 0,
        show: (element) => {
            element.textContent = lesson.content[lesson.interface.index].text;
            if (!latex) {
                latex = window['MathJax'];
                latex.tex = {
                    inlineMath: [
                        ['$', '$'],
                        ['\\(', '\\)']
                    ]
                };
                latex.svg = {
                    fontCache: 'global'
                };
            }
            latex.typeset();
        },
        incIndex: () => lesson.interface.index < lesson.content.length - 1
            ? lesson.interface.index++
            : 0,
        decIndex: () => (lesson.interface.index > 0 ? lesson.interface.index-- : 0)
    },
    content: CONTENT
};
