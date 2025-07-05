// ADMIN PURGE FUNCTIONALITY
document.getElementById('admin-purge').addEventListener('click', async () => {
  const auth = prompt('Enter admin token:');
  if (auth !== process.env.ADMIN_TOKEN) return alert('Unauthorized');
  
  try {
    const response = await fetch('/.netlify/functions/purge', {
      method: 'POST',
      headers: { 'Authorization': auth }
    });
    alert(await response.text());
  } catch (e) {
    alert('Purge failed: ' + e.message);
  }
});
