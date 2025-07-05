const { exec } = require('child_process');  

// 1. Verify directory structure  
const requiredDirs = ['public', 'netlify/functions'];  
requiredDirs.forEach(dir => {  
  if (!fs.existsSync(dir)) {  
    console.error(`MISSING CRITICAL DIRECTORY: ${dir}`);  
    process.exit(1);  
  }  
});  

// 2. Validate environment variables  
const requiredEnvVars = ['INFLUX_URL', 'INFLUX_TOKEN'];  
requiredEnvVars.forEach(env => {  
  if (!process.env[env]) {  
    console.error(`MISSING ENVIRONMENT VARIABLE: ${env}`);  
    process.exit(1);  
  }  
});  

// 3. Test function syntax  
exec('node -c netlify/functions/log.js', (error) => {  
  if (error) {  
    console.error(`FUNCTION SYNTAX ERROR: ${error.message}`);  
    process.exit(1);  
  }  
  console.log('✅ DEPLOYMENT PRE-VALIDATION SUCCESSFUL');  
});  
