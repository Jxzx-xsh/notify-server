/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs, { weekToday } from '../../../utils/dayjs'
import { getConfig } from '../../../utils/getConfig'
const CONFIG = getConfig().loveMsg

export const textTemplate = (data: TextTemplateProps) => {
  const { caiHongpi, sayLove, songLyrics, oneMagazines, netEaseCloud, oneWord, dayEnglish } = data

  let text = `早上好呀，我的${CONFIG.girl_name}，今天又是爱你的一天哦~\n`

  // 工作日/休息日，需要排除节假日
  const week = weekToday()
  if (!['星期六', '星期日'].includes(week))
    text += `\n如果我的${CONFIG.girl_name}已经起床啦！记得吃早饭呀😆\n\n嗯哼哼~今天可是${week}哦，上班别迟到了哦~\n`
  else
    text += `\n今天是${week}呀，不知道今天能不能睡懒觉呀，要是能睡的话，我的${CONFIG.girl_name}再多睡会哦。爱你哦宝😚\n`

  // 添加笑话
  if (caiHongpi) {
    //     text += `
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (sayLove) {
    text += `
${sayLove.content}\n`
  }

  // 诗句
  if (songLyrics) {
    text += `
『${songLyrics.source}』${songLyrics.content}\n`
  }

  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  // 添加一句一言
  if (oneWord) {
    text += `
『一言』${oneWord.hitokoto}\n`
  }

  // 每日英语
  if (dayEnglish) {
    text += `
『每日英语（${dayjs(dayEnglish.date).format('ll')}』${dayEnglish.content}`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
