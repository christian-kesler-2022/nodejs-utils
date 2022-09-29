var fs = require('fs');
var fsi = require('./fsi.js');
var xmllint = require('xmllint');

var xml_validator = {
  execute: function () {
    fs.readdir(__dirname + '/../../model/input/', function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
        if (file.includes('.xml')) {
          var xmlData = fs.readFileSync(
            __dirname + '/../../model/input/' + file,
            'utf8'
          );
          var schemaData = fs.readFileSync(
            __dirname + '/../../model/xml/schema.xsd',
            'utf8'
          );

          var result = xmllint.validateXML(
            {
              xml: xmlData,
              schema: schemaData,
            },
            function (err) {
              if (err) {
                console.log(err);
                fsi.move(
                  __dirname + '/../../model/input/' + file,
                  __dirname + '/../../model/output/error/' + file,
                  function (err) {
                    if (err) throw err;
                    console.log('ERROR  --> ' + file);
                  }
                );
              }
            }
          );

          if (!result.errors) {
            console.log('looks good!');
          } else {
            console.log('errors!');
            console.log(result.errors);
          }

          if (!result.errors) {
            fsi.move(
              __dirname + '/../../model/input/' + file,
              __dirname + '/../../model/output/pass/' + file,
              function (err) {
                if (err) throw err;
                console.log('PASS   --> ' + file);
              }
            );
          } else {
            fsi.move(
              __dirname + '/../../model/input/' + file,
              __dirname + '/../../model/output/fail/' + file,
              function (err) {
                if (err) throw err;
                console.log('FAIL   --> ' + file);
              }
            );
          }
        } else {
          fsi.move(
            __dirname + '/../../model/input/' + file,
            __dirname + '/../../model/output/ignore/' + file,
            function (err) {
              if (err) throw err;
              console.log('IGNORE --> ' + file);
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
          if (file.includes('.xml')) {
            var xmlData = fs.readFileSync(
              __dirname + '/../../model/input/' + file,
              'utf8'
            );
            var schemaData = fs.readFileSync(
              __dirname + '/../../model/xml/schema.xsd',
              'utf8'
            );

            var result = xmllint.validateXML(
              {
                xml: xmlData,
                schema: schemaData,
              },
              function (err) {
                if (err) {
                  console.log(err);
                  fsi.move(
                    __dirname + '/../../model/input/' + file,
                    __dirname + '/../../model/output/error/' + file,
                    function (err) {
                      if (err) throw err;
                      console.log('ERROR  --> ' + file);
                    }
                  );
                }
              }
            );

            if (!result.errors) {
              console.log('looks good!');
            } else {
              console.log('errors!');
              console.log(result.errors);
            }

            if (!result.errors) {
              fsi.move(
                __dirname + '/../../model/input/' + file,
                __dirname + '/../../model/output/pass/' + file,
                function (err) {
                  if (err) throw err;
                  console.log('PASS   --> ' + file);
                }
              );
            } else {
              fsi.move(
                __dirname + '/../../model/input/' + file,
                __dirname + '/../../model/output/fail/' + file,
                function (err) {
                  if (err) throw err;
                  console.log('FAIL   --> ' + file);
                }
              );
            }
          } else {
            fsi.move(
              __dirname + '/../../model/input/' + file,
              __dirname + '/../../model/output/ignore/' + file,
              function (err) {
                if (err) throw err;
                console.log('IGNORE --> ' + file);
              }
            );
          }
        });
      });
      xml_validator.cycle();
    }, 8000);
  },
};

module.exports = xml_validator;
