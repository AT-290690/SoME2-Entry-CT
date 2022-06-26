const CONTENT = [];
[...document.getElementsByClassName('slide')].forEach((text, index) => {
    CONTENT[index] = { text, object: window['PREDIFINED_TREES'][index] };
});
const lesson = {
    interface: {
        index: 0,
        show: () => (lesson.content[lesson.interface.index].text.style.display = 'block'),
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
