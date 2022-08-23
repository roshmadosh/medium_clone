module.exports.keyDownHandler = function(callback, event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
  callback(event);
};
