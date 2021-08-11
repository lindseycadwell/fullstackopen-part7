const argon2 = require("argon2");
const randomBytes = require("crypto").randomBytes;

const hash = async (unhashedPassword) => {
  var salt = randomBytes(32);

  const result = await argon2.hash(unhashedPassword, { salt });

  return result;
};

const verify = async (unverifiedUnhashedPassword, storedHashedPassword) => {
  const result = await argon2.verify(
    storedHashedPassword,
    unverifiedUnhashedPassword
  );
  return result;
};

module.exports = { hash, verify };
