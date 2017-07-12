/* jshint node:true, browser:false, jquery:false */
/**
  * @desc Contains all gulp configuration settings
  */
var gulpConf = (function() {
  /**
   * @desc Contains all gulp configuration settings
   */
  function GulpConfig() {
    this.source = 'e-recruitment/';
    this.dest = 'build/';

    this.app = this.source + 'app/';

    this.javaScriptModules = this.app + '**/*.module.js';
    this.javaScript = this.app + '**/*.js';
    this.javaScriptOut = this.dest + 'dist/js';

    this.htmlViews = this.app + '**/*.html';
    console.log(this.app + '**/*.html');
    this.index = this.source + 'index.html';

    this.styles = this.app + '**/*.css';
    this.stylesOut = this.dest + 'app/**/*.css';

    this.fonts = this.source + '**/*.{eot,svg,ttf,woff,woff2,otf}';
    this.audio = this.app + 'audio/**/*';
    this.images = this.app + 'images/**/*';
    this.json = this.app + '**/*.json';
    this.flash = this.source + 'scripts/**/*.swf';
    this.configs = this.source + '**/*.config';

    this.jsManifest = 'js-manifest.json';
    this.cssManifest = 'css-manifest.json';
    this.manifests = this.dest + '*-manifest.json';

    this.assets = [
      this.fonts,
      this.audio,
      this.images,
      this.json,
      this.flash,
      this.configs
    ];

    this.styleLibs = this.source + 'Content/**/*.min.css';
    this.javaScriptLibs = this.source + 'scripts/**/*.min.js';
    this.nodeLibs = this.source + 'node_modules/**/*';

    this.dist = '../../../distribution/XpressionWebClient';
    this.sassFiles = this.app + 'styles/xpression.scss';
    this.sassDest = this.dest + 'app/styles';
    this.allSass  = this.app + 'styles/**/*.scss';
  }
  return GulpConfig;
})();

module.exports = gulpConf;
