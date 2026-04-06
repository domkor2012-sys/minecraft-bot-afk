const mineflayer = require('mineflayer');
const http = require('http');

// --- 1. SERWER DLA RENDERA (Żeby usługa nie padła) ---
http.createServer((req, res) => {
  res.write("Bot 1.21.11 Active");
  res.end();
}).listen(process.env.PORT || 10000);

// --- 2. KONFIGURACJA BOTA ---
const bot = mineflayer.createBot({
  host: 'placuszekcraftsmp.play.hosting',
  port: 55279, // DOPISAŁEM PORT, żeby bot wiedział gdzie pukać
  username: 'BOTEK',
  version: '1.21.11', // Skoro to 1.21.11, wpiszmy to na sztywno
  auth: 'offline'
});

// Funkcja logowania reagująca na czat
bot.on('message', (jsonMsg) => {
  const message = jsonMsg.toString();
  console.log('Czat: ' + message);

  // Reaguje na prośbę o login
  if (message.toLowerCase().includes('/login') || message.toLowerCase().includes('zaloguj')) {
    bot.chat('/login AFK_1234'); 
    console.log('>>> Wysłano hasło do AuthMe!');
  }
});

bot.on('spawn', () => {
  console.log('Bot na spawnie. Czekam na prośbę o login...');
  
  // Anty-AFK (co 60s)
  if (!bot.afkInterval) {
    bot.afkInterval = setInterval(() => {
      bot.chat('/ping');
      console.log('Anty-AFK: /ping');
    }, 60000);
  }
});

// --- 3. OBSŁUGA BŁĘDÓW I RESTARTU ---
bot.on('kicked', (reason) => {
  console.log('KICK:', reason);
  setTimeout(() => process.exit(1), 5000); // Restart po wykopaniu
});

bot.on('error', (err) => {
  console.log('BŁĄD:', err.message);
  if (err.message.includes('ECONNREFUSED')) {
     console.log('>>> SERWER ODRZUCIŁ POŁĄCZENIE (Blokada IP lub zły Port)');
  }
  setTimeout(() => process.exit(1), 5000); // Restart po błędzie
});
