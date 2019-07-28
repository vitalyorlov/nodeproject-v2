const fs = require('fs');

function safeFileRead(filename) {
    console.log('start reading a file...')

    fs.readFile(filename, 'utf-8', function (err, content) {
      if (err) {
        console.log('error happened during reading the file')
        return console.log(err);
      }
    
      console.log(content);
    })
    
    console.log('end of the file')
}

module.exports.safeFileRead = safeFileRead;
