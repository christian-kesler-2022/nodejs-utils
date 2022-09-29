var fs = require('fs');
var fsi = require('./fsi.js');

var text_validator = {
  execute: function () {
    fs.readdir(__dirname + '/../../model/input/', function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
        if (file.includes('.')) {
          if (file.includes('.txt')) {
            var content = fs.readFileSync(
              __dirname + '/../../model/input/' + file,
              'utf8'
            );
            if (
              content.includes('1') ||
              content.includes('2') ||
              content.includes('3') ||
              content.includes('4')
            ) {
              fsi.move(
                __dirname + '/../../model/input/' + file,
                __dirname + '/../../model/output/pass/' + file,
                function (err) {
                  if (err) throw err;
                  console.log('Successfully moved!');
                }
              );
            } else {
              fsi.move(
                __dirname + '/../../model/input/' + file,
                __dirname + '/../../model/output/fail/' + file,
                function (err) {
                  if (err) throw err;
                  console.log('Successfully moved!');
                }
              );
            }
          } else {
            fsi.move(
              __dirname + '/../../model/input/' + file,
              __dirname + '/../../model/output/ignore/' + file,
              function (err) {
                if (err) throw err;
                console.log('Successfully moved!');
              }
            );
          }
        } else {
          fsi.move(
            __dirname + '/../../model/input/' + file,
            __dirname + '/../../model/output/error/' + file,
            function (err) {
              if (err) throw err;
              console.log('Successfully moved!');
            }
          );
        }
      });
    });
  },
  cycle: function () {
    setTimeout(function () {
      fs.readdir(__dirname + '/../../model/input/', function (err, files) {
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
          if (file.includes('.')) {
            if (file.includes('.txt')) {
              var content = fs.readFileSync(
                __dirname + '/../../model/input/' + file,
                'utf8'
              );
              if (
                content.includes('1') ||
                content.includes('2') ||
                content.includes('3') ||
                content.includes('4')
              ) {
                fsi.move(
                  __dirname + '/../../model/input/' + file,
                  __dirname + '/../../model/output/pass/' + file,
                  function (err) {
                    if (err) throw err;
                    console.log('Successfully moved!');
                  }
                );
              } else {
                fsi.move(
                  __dirname + '/../../model/input/' + file,
                  __dirname + '/../../model/output/fail/' + file,
                  function (err) {
                    if (err) throw err;
                    console.log('Successfully moved!');
                  }
                );
              }
            } else {
              fsi.move(
                __dirname + '/../../model/input/' + file,
                __dirname + '/../../model/output/ignore/' + file,
                function (err) {
                  if (err) throw err;
                  console.log('Successfully moved!');
                }
              );
            }
          } else {
            fsi.move(
              __dirname + '/../../model/input/' + file,
              __dirname + '/../../model/output/error/' + file,
              function (err) {
                if (err) throw err;
                console.log('Successfully moved!');
              }
            );
          }
        });
      });
      text_validator.cycle();
    }, 8000);
  },
};

module.exports = text_validator;
