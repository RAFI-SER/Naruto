let handler = async (m, { conn, text }) => {
  let chats = conn.chats.all().filter(v => v.jid.endsWith('.net')).map(v => v.jid).filter(v => !v.startsWith(owner[0]))
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `Send a broadcast message to ${chats.length} chat\nEstimated complete ${chats.length * 1.5} second`, m)
  for (let id of chats) {
    await conn.delay(1500)
    await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : '「 *Naruto Broadcast* 」\n\n' + teks + '\n\n© Naruto By Rafi'), true).catch(_ => _)
  }
  m.reply('*Broadcast Completed*')
}
handler.help = ['broadcast', 'bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i

handler.owner = true

module.exports = handler 
