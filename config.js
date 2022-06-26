window.MathJax = {
  loader: {
    load: ['[tex]/ams', '[tex]/amscd']
  },
  tex: {
    packages: { '[+]': ['ams', 'amscd'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    amscd: {
      colspace: '5pt',
      rowspace: '5pt',
      harrowsize: '2.75em',
      varrowsize: '1.75em',
      hideHorizontalLabels: false
    }
  },
  svg: {
    fontCache: 'global'
  }
};
