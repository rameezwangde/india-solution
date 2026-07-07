const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const folders = ['corporate-1', 'corporate-2', 'corporate-3'];
const result = {};

folders.forEach(folder => {
  const folderPath = path.join(publicImagesDir, folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    // filter valid media
    const media = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.mp4'));
    result[folder] = media.map(f => `/images/${folder}/${f}`);
  } else {
    result[folder] = [];
  }
});

const fileContent = `export const corporateMedia = ${JSON.stringify(result, null, 2)};`;
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'corporateMedia.js'), fileContent);
console.log('Successfully generated src/data/corporateMedia.js');
