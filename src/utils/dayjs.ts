import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(duration)
dayjs.extend(LocalizedFormat)

const WEEKS: { [key: number]: string } = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  0: '星期日',
}

export const weekToday = () => {
  const week = dayjs().get('days')
  return WEEKS[week]
}

// 给出生日的月份和日期，计算还有多少天过生日
export const getDaysToBirthday = (month: number, day: number | undefined) => {
  const nowTime = new Date()
  const thisYear = nowTime.getFullYear()
  // 今年的生日
  const birthday = new Date(thisYear, month - 1, day)
  // 今年生日已过，则计算距离明年生日的天数
  if (birthday < nowTime)
    birthday.setFullYear(nowTime.getFullYear() + 1)
  const timeDec = Number(birthday) - Number(nowTime)
  const days = timeDec / (24 * 60 * 60 * 1000)
  return Math.ceil(days)
}

export default dayjs
