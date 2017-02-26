import crypto from 'crypto';

const LEN = 256;  
const SALT_LEN = 64;  
const ITERATIONS = 10000;  
const DIGEST = 'sha256';

//Function adapted from http://blog.robertonodi.me/node-authentication-series-email-and-password/
export function hashPassword(password, salt) {
	const len = LEN / 2;

  if (arguments.length === 2) {
    crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
      if (err) throw err;
      return derivedKey.toString('hex');
    });
  } else {
    crypto.randomBytes(SALT_LEN / 2, function(err, salt) {
      if (err) throw err;

      salt = salt.toString('hex');
      crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
        if (err) throw err;

        return {passwordHash: derivedKey.toString('hex'), salt};
      });
    });
  }
}