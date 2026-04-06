const mineflayer = require('mineflayer');
const http = require('http');

// Serwer WWW - bez tego Render wyłączy bota po 2 minutach!
http.createServer((req, res) => {
  res.write("Bot 1.21.11 is running!");
  res.end();
}).listen(process.env.PORT || 10000);

const bot = mineflayer.createBot({
  host: 'placuszekcraftsmp.play.hosting',    // Sprawdź czy IP się nie zmieniło w panelu!
  port: 55279,             // Sprawdź czy PORT się nie zmienił!
  username: 'BOTEK',
  version: '1.21.11'
});

bot.on('spawn', () => {
  console.log('SUKCES! Bot wszedł na serwer 1.21.11');
});

bot.on('error', (err) => {
  console.log('Błąd połączenia:', err.message);
});

bot.on('end', () => {
  console.log('Rozłączono. Próba powrotu za 10s...');
  setTimeout(() => process.exit(1), 10000); // Render sam zrestartuje bota
});
