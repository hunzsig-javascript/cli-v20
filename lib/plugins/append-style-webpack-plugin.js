const assert = require('assert');
const ConcatSource = require('webpack-sources').ConcatSource;
const fs = require('fs');

/* eslint no-console: 0 */

function convertCharStr2CSS(ch) {
  let code = ch.charCodeAt(0).toString(16);
  while (code.length < 4) {
    code = '0' + code;
  }
  return '\\' + code;
}

module.exports = class AppendStylePlugin {
  constructor(options) {
    assert.ok(
      Object.prototype.toString.call(options) === '[object Object]',
      'First arg: "options" in constructor of AppendStylePlugin should be an object.'
    );

    // ENUM: ['header', 'footer'], 默认 footer，既追加在源 CSS 底部。
    this.appendPosition = options.appendPosition || 'footer';
    this.type = options.type || 'less'; // 源文件类型
    this.srcFile = options.srcFile; // 源文件
    this.distMatch =
      options.distMatch instanceof RegExp // chunkName 去匹配的逻辑，正则或者函数
        ? (chunkName) => options.distMatch.test(chunkName)
        : options.distMatch;
  }

  apply(compiler) {
    const srcFile = String(this.srcFile);
    const distMatch = this.distMatch;
    const compilerEntry = compiler.options.entry;
    if (!srcFile || !distMatch) {
      return;
    }

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, done) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            if (
              distMatch(fileName, compilerEntry, compilation._preparedEntrypoints)
            ) {
              const css = this.compileToCSS(srcFile);
              this.wrapFile(compilation, fileName, css);
            }
          });
        });
        done();
      });
    });
  }

  wrapFile(compilation, fileName, content) {
    // 默认按照底部添加的来
    if (this.appendPosition === 'header') {
      compilation.assets[fileName] = new ConcatSource(
        String(content),
        compilation.assets[fileName]
      );
    } else {
      compilation.assets[fileName] = new ConcatSource(
        compilation.assets[fileName],
        String(content)
      );
    }
  }

  compileToCSS(srcFile) {
    let css = '';
    try {
      css = fs.readFileSync(srcFile, 'utf-8');
    } catch (err) {
      return '';
    }
    return css;
  }
};
