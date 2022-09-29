var fs = require('fs');

var logger = {
  maliciousUser: function (ip, requested, datetime) {
    fs.appendFile(
      __dirname + '/../../model/logs/maliciousUsers.txt',
      '================' +
        '\n\tDATETIME -> ' +
        datetime +
        '\n\tIP -> ' +
        ip +
        '\n\tREQUESTED -> ' +
        requested +
        '\n================',
      function (err) {
        if (err) throw err;
      }
    );
  },
  compliantUser: function (ip, requested, datetime) {
    fs.appendFile(
      __dirname + '/../../model/logs/compliantUsers.txt',
      '================' +
        '\n\tDATETIME -> ' +
        datetime +
        '\n\tIP -> ' +
        ip +
        '\n\tREQUESTED -> ' +
        requested +
        '\n================',
      function (err) {
        if (err) throw err;
      }
    );
  },
  lostUser: function (ip, requested, datetime) {
    fs.appendFile(
      __dirname + '/../../model/logs/lostUsers.txt',
      '================' +
        '\n\tDATETIME -> ' +
        datetime +
        '\n\tIP -> ' +
        ip +
        '\n\tREQUESTED -> ' +
        requested +
        '\n================',
      function (err) {
        if (err) throw err;
      }
    );
  },
};

module.exports = logger;
