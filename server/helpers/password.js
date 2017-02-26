import crypto from 'crypto';

const LEN = 256;  
const SALT_LEN = 64;  
const ITERATIONS = 10000;  
const DIGEST = 'sha256';

//Function adapted from http://blog.robertonodi.me/node-authentication-series-email-and-password/
export function hash(password, salt, cb) {
	const len = LEN / 2;

  if (arguments.length === 3) {
    crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
      if (err) return cb(err);
      return cb(null, derivedKey.toString('hex'));
    });
  } else {
  	cb = salt;
    crypto.randomBytes(SALT_LEN / 2, function(err, salt) {
      if (err) return cb(err);

      salt = salt.toString('hex');
      crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
        if (err) return cb(err);

        return cb(null, derivedKey.toString('hex'), salt);
      });
    });
  }
}