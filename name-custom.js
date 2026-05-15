/* Amy Name Customization - loaded after main app */
(function(){
  // Load saved name
  const savedName = localStorage.getItem('bot_name') || 'Amy';
  document.querySelector('.header h1').textContent = savedName;
  document.title = savedName;

  // Intercept sendMessage to detect name changes
  const origSend = window.sendMessage;
  if (!origSend) return;
  
  window.sendMessage = async function(text) {
    // Detect name change commands
    const nameMatch = text.match(/(?:call yourself|your name is|rename yourself|i'?ll call you|be called|change your name to)\s+([\w\s]{1,20})/i);
    if (nameMatch) {
      const newName = nameMatch[1].trim();
      localStorage.setItem('bot_name', newName);
      document.querySelector('.header h1').textContent = newName;
      document.title = newName;
    }
    return origSend.call(this, text);
  };
})();
