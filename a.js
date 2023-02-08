const timeType = {
    '1m': 60,
    '3m': 180,
    '5m': 300,
    '15m': 900,
    '30m': 1800,
    '1h': 3600,
    '1d': 86400,
}

const getTimeDate = (Timezone = null) => {
    let date = null
  if (Timezone){
      date = new Date(Timezone)
  }else {
      date = new Date()
  }
  let Year = date.getFullYear().toString()
  let Month = (date.getUTCMonth()+1).toString()
    if (Month.length == 1){
        Month = `0${Month}`
    }
  let Day = date.getDate().toString()
    if (Day.length == 1){
        Day = `0${Day}`
    }
    return `${Year}${Month}${Day}`
}
console.log(getTimeDate())
const getTypeTime = (type ="1m") => {
    let time = parseInt((new Date()).getTime()/1000);
    let now = parseInt(time/timeType[type])
    return {
        "last":(now - 1) * timeType[type],
        "now":now * timeType[type],
        "second":(now + 1) * timeType[type]
    }
}
console.log(getTypeTime())