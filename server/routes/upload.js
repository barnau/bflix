const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  var path = './src/assets/images/';
  // form.keepExtensions = true;
  // form.maxFieldsSize = 10 * 1024 * 1024; //10mb;

  form.on('file', (field, file) => {
      var buffer = fs.readFileSync(file.path);
      console.log(buffer);
      fs.writeFileSync(path + 'test.jpg', buffer);
  });
  form.on('end', () => {
      res.json();
  });
  form.parse(req);
};