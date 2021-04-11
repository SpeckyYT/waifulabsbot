const padSize = 20;
let waifus = 1;

module.exports = {
    log: ctx => {
        console.log(`${`[${ctx.chat.id}]`.padEnd(padSize,' ')} (${waifus++})`);
    },
    error: ctx => {
        console.error(`[${ctx.chat.id}] (ERROR)`);
    }
}
