const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use('/documents', express.static(path.join(__dirname, 'documents')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.folder;
    const folderPath = path.join(__dirname, 'documents', folder);
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('document'), (req, res) => {
  res.send('File uploaded successfully');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
