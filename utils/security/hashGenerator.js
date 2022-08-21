const bcrypt = require('bcrypt');

const ROUNDS = 10;

module.exports.hashGenerator = function (password) {
  const salt = bcrypt.genSaltSync(ROUNDS);
  return bcrypt.hashSync(password, salt);
}
