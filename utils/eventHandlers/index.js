module.exports.keyDownHandler = function(key, callback, event) {
  if (event.key === key) {
    event.preventDefault();

    callback();
  }
};
