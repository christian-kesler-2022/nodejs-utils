var fs = require('fs');

module.exports = {
  showDir: function showDir(res, dir) {
    fs.readdir(dir, function (err, files) {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      if (err) {
        console.log('Unable to scan directory: ' + err);
        res.write('Unable to scan directory: ' + err);
      } else {
        var fileArray = [];
        files.forEach(function (file) {
          item = {
            name: file,
            link: '/download?dir=' + dir + '&file=' + file,
          };
          fileArray.push(item);
        });
        res.write(JSON.stringify(fileArray));
      }
      res.end();
    });
  },
};
