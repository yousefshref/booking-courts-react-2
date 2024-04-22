export function convertToAMPM(time24) {
  // Splitting the time string into hours and minutes
  var time = time24.split(':');
  var hours = parseInt(time[0]);
  var minutes = parseInt(time[1]);

  // Determining AM or PM
  var period = hours >= 12 ? 'PM' : 'AM';

  // Converting hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be converted to 12

  // Adding leading zero for single digit minutes
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Combining hours, minutes, and period
  var time12 = hours + ':' + minutes + ' ' + period;

  return time12;
}

function padNumber(number) {
  return (number < 10 ? '0' : '') + number;
}

export function getCurrentDate() {
  // Create a new Date object representing the current date and time
  var currentDate = new Date();

  // Extract the year, month, and day from the Date object
  var year = currentDate.getFullYear();
  // Month is zero-indexed, so we add 1 to get the actual month
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();

  // Format the date as 'YYYY-MM-DD' (ISO 8601 format)
  var formattedDate = year + '-' + padNumber(month) + '-' + padNumber(day);

  return formattedDate;
}


export function getCurrentTime() {
  // Create a new Date object representing the current date and time
  var currentTime = new Date();

  // Extract the hours and minutes from the Date object
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  // Format the time as 'HH:MM'
  var formattedTime = padNumber(hours) + ':' + padNumber(minutes);

  return formattedTime;
}





export function convertToK(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k';
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else {
    return number.toString();
  }
}


