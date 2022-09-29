var fs = require('fs');

var merger = {
  writePage: function (res, file) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    var header = fs.readFileSync(
      __dirname + '/../../views/partial/header.ht',
      'utf8'
    );
    res.write(header);

    var content = fs.readFileSync(__dirname + file, 'utf8');
    res.write(content);

    var footer = fs.readFileSync(
      __dirname + '/../../views/partial/footer.ht',
      'utf8'
    );
    res.write(footer);

    res.end();
  },
};

module.exports = merger;
