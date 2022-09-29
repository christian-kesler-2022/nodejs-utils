const fs = require('fs'),
  os = require('os'),
  path = require('path');

var uploader = {
  save: function (req) {
    // Resolve path/to/temp/file
    var temp = path.resolve(
      os.tmpdir(),
      'temp' + Math.floor(Math.random() * 10)
    );

    // This opens up the writeable stream to temporary file
    var writeStream = fs.createWriteStream(temp);

    // This pipes the POST data to the file
    req.pipe(writeStream);

    // After the temporary file is creates, create real file
    writeStream.on('finish', () => {
      reader = fs.readFileSync(temp);
      filename = reader.slice(
        reader.indexOf('filename="') + 'filename="'.length,
        reader.indexOf('"\r\nContent-Type')
      );
      boundary = reader.slice(0, reader.indexOf('\r\n'));
      content = reader.slice(
        reader.indexOf('\r\n\r\n') + '\r\n\r\n'.length,
        reader.lastIndexOf(Buffer.from('\r\n') + boundary)
      );

      // After real file is created, delete temporary file
      fs.writeFileSync(
        __dirname + '/../../model/input/' + filename.toString(),
        content
      );
      fs.unlinkSync(temp);
    });
  },
};

module.exports = uploader;
