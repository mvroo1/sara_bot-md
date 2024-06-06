import fetch from "node-fetch"
import yts from "yt-search"
import ytdl from 'ytdl-core'
import axios from 'axios'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) throw `ادخل عنوان للبحث*\n\n*—◉ مثال:*\n*${usedPrefix + command} انمي ناروتو*`
try {
const yt_play = await search(args.join(" "))
let additionalText = ''
if (command === 'y') {
additionalText = 'الصوت 🔊'
} else if (command === 'y2') {
additionalText = 'الفيديو 🎥'}
let texto1 = `*ꔹ━ꔹ❰🔊 تحميل يوتيوب 🔊❱ꔹ━ꔹ*\n
❏ 📌 *العنوان:* ${yt_play[0].title}
❏ 📆 *وقت النشر:* ${yt_play[0].ago}
❏ ⌚ *المده:* ${secondString(yt_play[0].duration.seconds)}
❏ 👀 *المشاهدات:* ${`${MilesNumber(yt_play[0].views)}`}
❏ 👤 *المؤلف:* ${yt_play[0].author.name}
❏ ⏯️ *القناه:* ${yt_play[0].author.url}
❏ 🆔 *ايدي:* ${yt_play[0].videoId}
❏ 🪬 *النوع:* ${yt_play[0].type}
❏ 🔗 *الرابط:* ${yt_play[0].url}\n
❏ *_جاري تحميل ${additionalText}, لحظات وبرسله لك．．．_*`.trim()
conn.sendMessage(m.chat, { image: { url: yt_play[0].thumbnail }, caption: texto1 }, { quoted: m })
if (command == 'y') {
try {
let q = '128kbps'
let v = yt_play[0].url
const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v)).catch(async _ => await youtubedlv3(v))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' })
} catch {
try {
let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${yt_play[0].url}`)    
let lolh = await lolhuman.json()
let n = lolh.result.title || 'ايرور🙂!'
  
