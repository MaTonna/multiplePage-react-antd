const fs = require('fs');

function DynamicPublicPathPlugin(options) {
  this.publicPath = options.publicPath;
  this.oldPublicPath = options.oldPublicPath;
  this.outputPath = options.outputPath;
}

DynamicPublicPathPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', params => {

    Object.keys(params.compilation.assets)
      .filter(name => name.includes('.js') && !name.includes('.js.map'))
      .forEach(name => {
        const oldName = `${this.outputPath}/${name}`;
        fs.readFile(oldName, (err, data) => {
          if (err) throw err;
          const newBundle = data
            .toString()
            .replace(new RegExp(`[\"\']${this.oldPublicPath}[\"\']`), `${this.publicPath}+'/'`);
          fs.writeFile(oldName, newBundle, err => {
            if (err) throw err
          });
        });
      });
  });
};

module.exports = DynamicPublicPathPlugin;
