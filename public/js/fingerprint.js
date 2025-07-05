// Device fingerprinting with canvas API and hardware characteristics  
function generateDeviceId() {  
  const components = [  
    navigator.userAgent,  
    navigator.hardwareConcurrency,  
    screen.width + 'x' + screen.height,  
    new Date().getTimezoneOffset(),  
    navigator.deviceMemory || 'unknown',  
    navigator.maxTouchPoints || 'unknown'  
  ];  
  
  // Canvas fingerprinting  
  const canvas = document.createElement('canvas');  
  const ctx = canvas.getContext('2d');  
  ctx.textBaseline = 'top';  
  ctx.font = '14px Arial';  
  ctx.fillStyle = '#f60';  
  ctx.fillRect(125, 1, 62, 20);  
  ctx.fillStyle = '#069';  
  ctx.fillText('EDU-RESEARCH-PROJECT', 2, 15);  
  ctx.strokeStyle = 'rgba(102, 204, 0, 0.7)';  
  ctx.strokeRect(0, 0, canvas.width, canvas.height);  
  
  // Add canvas fingerprint to components  
  components.push(canvas.toDataURL());  
  
  // Combine and hash components  
  return btoa(components.join('|')).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);  
}  
