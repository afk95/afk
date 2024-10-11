function DateUtil(params) {

  var date = new Date()
  var dateDayOfWeek = date.getDay(); //今天本周的第几天 
  var dateDay = date.getDate(); //当前日 
  var dateMonth = date.getMonth(); //当前月 
  var dateYear = date.getFullYear(); //当前年 

  var init = function() {
    date = params
    dateDayOfWeek = date.getDay(); //今天本周的第几天 
    dateDay = date.getDate(); //当前日 
    dateMonth = date.getMonth(); //当前月 
    dateYear = date.getFullYear(); //当前年 
  }

  function df(d) {
    var year = d.getFullYear(); 
    var month = d.getMonth()+1; 
    var day = d.getDate(); 

    if(month < 10){ 
      month = "0" + month; 
    } 
    if(day < 10){ 
      day = "0" + day; 
    } 
    return (year + "-" + month + "-" + day);
  }

  this.dayBegin = function() {
    return df(date) + ' 00:00:00'
  }
  this.dayEnd = function() {
    return df(date) + ' 23:59:59'
  }

  this.weekBegin = function() {
    var weekStartDate = new Date(dateYear, dateMonth, dateDay - dateDayOfWeek)
    return df(weekStartDate) + ' 00:00:00'
  }
  this.weekEnd = function() {
    var weekStartDate = new Date(dateYear, dateMonth, dateDay - dateDayOfWeek + 6)
    return df(weekStartDate) + ' 23:59:59'
  }

  this.monthBegin = function() {
    var monthStartDate = new Date(dateYear, dateMonth, 1)
    return df(monthStartDate) + ' 00:00:00'
  }
  this.monthEnd = function() {
    var monthEndDate = new Date(dateYear, dateMonth + 1, 1); 
    monthEndDate.setDate(monthEndDate.getDate() - 1)
    return df(monthEndDate) + ' 23:59:59'
  }

  this.yearBegin = function() {
    var yearStartDate = new Date(dateYear, 0, 1)
    return df(yearStartDate) + ' 00:00:00'
  }
  this.yearEnd = function() {
    var yearEndDate = new Date(dateYear + 1, 0, 1)
    yearEndDate.setDate(yearEndDate.getDate() - 1)
    return df(yearEndDate) + ' 23:59:59'
  }
  this.halfYearBegin = function() {
    var halfYearBeginDate = new Date(dateYear, dateMonth -6, dateDay)
    return df(halfYearBeginDate) + ' 00:00:00'
  }
  this.df = function() {
    return df(date)
  }

  init()
}

export default DateUtil
