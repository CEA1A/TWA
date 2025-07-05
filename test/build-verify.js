const fs = require('fs');  

// 1. Check critical files  
const requiredFiles = [  
  'netlify.toml',  
  'netlify/functions/log.js',  
  'netlify/functions/package.json',  
  'public/js/fingerprint.js'  
];  

requiredFiles.forEach(file => {  
  if (!fs.existsSync(file)) {  
    console.error(`❌ Missing required file: ${file}`);  
    process.exit(1);  
  }  
});  

// 2. Validate TOML syntax  
const tomlContent = fs.readFileSync('netlify.toml', 'utf8');  
if (!tomlContent.includes('[build]')) {  
  console.error('❌ Invalid netlify.toml: Missing [build] section');  
  process.exit(1);  
}  

console.log('✅ Build pre-check passed');  
