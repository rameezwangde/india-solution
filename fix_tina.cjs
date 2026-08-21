const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /variables:\s*\{\s*relativePath:\s*(['"][^'"]+['"])\s*\}/g;
  
  let changed = false;
  content = content.replace(regex, (match, p1) => {
    changed = true;
    return "variables: typeof window !== 'undefined' ? (window['_tina_var_' + " + p1 + "] = window['_tina_var_' + " + p1 + "] || { relativePath: " + p1 + " }) : { relativePath: " + p1 + " }";
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed ' + file);
  }
});
