/**
 * @param {string} TG_TOKEN  Bot's token
 */
require('dotenv').config();

const { Telegraf } = require('telegraf');
const { generateBigWaifu, randomSeed } = require('waifulabs');
const { join } = require('path');

const client = new Telegraf(process.env.TG_TOKEN);

const cooldown = new Set();

const { log, error } = require(join(__dirname, 'util'));

client.on('message', async ctx => {
    if(cooldown.has(ctx.chat.id)) return;
    cooldown.add(ctx.chat.id);
    try{
        log(ctx);
        const waifu = await generateBigWaifu(randomSeed());
        await ctx.replyWithPhoto({
            source: Buffer.from(waifu.image, 'base64'),
            filename: 'waifu.png',
        });
    }catch(err){
        error(ctx);
        await ctx.reply('Error occurred').catch(() => {});
    }
    cooldown.delete(ctx.chat.id);
});

client.launch()
.then(() => console.log('Connected'))
.catch(() => process.exit(0));
