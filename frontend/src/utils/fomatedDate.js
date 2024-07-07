import moment from 'moment'

export const formatedDate = (time) => {
  const formattedDate = moment(time).format('DD-MM-YYYY')
  return formattedDate
}

export const formatedTime = (time) => {
  const formattedTime = moment(time).format('A-hh.mm')
  return formattedTime
}
