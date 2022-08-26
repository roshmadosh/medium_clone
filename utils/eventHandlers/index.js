module.exports.keyDownHandler = function(callback, event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    console.log('Default newline behavior prevented');
  } if (event.key === 'Tab') {
    event.preventDefault();
    console.log('Default tab behavior prevented.')
  }
  callback(event);
};
