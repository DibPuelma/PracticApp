var monthNames = [
  "Enero", "Febrero", "Marzo",
  "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre",
  "Noviembre", "Deciembre"
];

module.exports = {
  getDateSpanish : function(date){
    var date = new Date(date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + " de " + monthNames[monthIndex] + " de " + year;
  }
}
