const mineflayer = require('mineflayer');
const http = require('http');

// --- SEKCJA DLA RENDERA (Żeby bot nie zasnął) ---
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
  res.write("Bot is alive and pinging!");
  res.end();
}).listen(port);
console.log(`Serwer WWW bota odpalił na porcie ${port}`);

// --- KONFIGURACJA BOTA ---
const botOptions = {
  host: 'placuszekcraftsmp.play.hosting', // np. 'twojanazwa.play-hosting.pl'
  port: 55279,                // domyślny port Minecraft
  username: 'BOTEK',  // nick bota
  version: '1.21.11'           // zmień na wersję swojego serwera
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot wszedł na serwer!');
    
    // Pętla wysyłająca /ping co 60 sekund
    setInterval(() => {
      if (bot.entity) {
        bot.chat('/ping');
        console.log('Wysłano /ping do serwera');
      }
    }, 60000);
  });

  // AUTO-RECONNECT (Jeśli bot zostanie wyrzucony)
  bot.on('end', () => {
    console.log('Połączenie przerwane. Reconnect za 10 sekund...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Błąd bota:', err);
  });

  bot.on('kicked', (reason) => {
    console.log('Bot wyrzucony z serwera za:', reason);
  });
}

createBot();
