const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regexData = /data:\s*\{\s*([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_]+)\s*\}/g;
  let changed = false;
  content = content.replace(regexData, (match, key, val) => {
    changed = true;
    const cacheKey = `'${file}_${key}'`;
    return `data: typeof window !== 'undefined' ? (window['_tina_data_' + ${cacheKey}] = window['_tina_data_' + ${cacheKey}] || { ${key}: ${val} }) : { ${key}: ${val} }`;
  });
  
  // also fix ServiceDetail which has slightly different formatting maybe
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed data in ' + file);
  }
});
