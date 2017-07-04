let transform = [
  [
    "babelify",
    {
      "presets": [
        "es2015"
      ],
      "plugins": [
        "add-module-exports" // to ensure dist files are exported without the "default" property
      ]
    }
  ]
];

module.exports = {
  build: {
    files: {
      'dist/wait-for-element-transition.js': ['src/wait-for-element-transition.js']
    },
    browserifyOptions: {
      standalone: 'waitForElementTransition',
      transform
    },
    minifyFiles:{
      'dist/wait-for-element-transition-min.js': ['dist/wait-for-element-transition.js']
    },
    bannerFiles: ['dist/*']
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
