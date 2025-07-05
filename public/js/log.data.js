// IP GEOLOCATION (No permission required) :cite[1]:cite[5]
async function getPreciseLocation() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      coords: `${data.latitude},${data.longitude} ±${data.accuracy}m`,
      city: data.city,
      ip: data.ip,
      org: data.org
    };
  } catch (error) {
    return { error: "Location unobtainable" };
  }
}

// DEVICE FINGERPRINTING :cite[6]:cite[7]
function generateDeviceId() {
  const components = [
    navigator.userAgent,
    navigator.hardwareConcurrency,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset()
  ];
  
  // Canvas fingerprinting
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('EDU-RESEARCH-PROJECT', 2, 2);
  components.push(canvas.toDataURL());
  
  return btoa(components.join('|')).slice(0, 32);
}

// STEALTH DATA TRANSMISSION
setInterval(async () => {
  const locationData = await getPreciseLocation();
  const payload = {
    timestamp: Date.now(),
    deviceId: generateDeviceId(),
    location: locationData,
    page: window.location.pathname,
    engagement: {
      scrollDepth: window.scrollY / document.body.scrollHeight,
      lastClick: window.lastInteractionTimestamp || null
    }
  };

  // Invisible beacon transmission :cite[5]
  new Image().src = `/.netlify/functions/log?data=${encodeURIComponent(JSON.stringify(payload))}`;
}, 30000); // Transmit every 30 seconds

// Track interactions
document.addEventListener('click', () => window.lastInteractionTimestamp = Date.now());
