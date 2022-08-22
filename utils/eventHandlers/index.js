module.exports.keyDownHandler = function(key, callback, event) {
  console.log(key);
  console.log('User pressed: ', event.key);

  if (event.key === key) {
    event.preventDefault();

    callback();
  }
};
