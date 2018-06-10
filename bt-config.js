const fs = require('fs');
const babelConfig = JSON.parse(fs.readFileSync('.babelrc', "utf8"));
let transform = [
  [
    "babelify",
    babelConfig
  ]
];

module.exports = {
  build: {
    files: {
      'dist/wait-for-element-transition.js': ['wait-for-element-transition.js']
    },
    browserifyOptions: {
      standalone: 'waitForElementTransition',
      transform
    },
  },
  tests: {
    mocha: {
      files: [
        'tests/wait-for-element-transition-tests.js'
      ],
      transform
    }
  }
};
