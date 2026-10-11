import { Telegraf, Markup } from 'telegraf';

const token = process.env.BOT_TOKEN;
const miniAppUrl = process.env.MINIAPP_URL;

if (!token) throw new Error('BOT_TOKEN is required');
if (!miniAppUrl) throw new Error('MINIAPP_URL is required');

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  await ctx.reply(
    '🏝 Trip Guide\n\nОткрой нашу поездку на Пхукет: план по дням, карта, пляжи, еда и маршруты.',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Пхукет · 13–27 ноября', miniAppUrl)]
    ])
  );
});

bot.command('trip', async (ctx) => {
  await ctx.reply(
    'Открыть поездку:',
    Markup.inlineKeyboard([
      [Markup.button.webApp('🏝 Пхукет 2026', miniAppUrl)]
    ])
  );
});

bot.catch((err) => console.error('Bot error:', err));

bot.launch().then(() => console.log('Trip Guide bot started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
