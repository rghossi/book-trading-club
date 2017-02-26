import chai from 'chai';
import * as passwordHelper from '../server/helpers/password';

const should = chai.should();
const testPassword = "MySuperDifficultPassword12347%$@";

describe('Password Helper', function() {
	describe('hashPassword', function() {
		it('should return hash and salt', function(done){
			passwordHelper.hash(testPassword, function(err, hash, salt){
				if (err) throw err;

				hash.should.be.a("string");
				salt.should.be.a("string");
				hash.should.not.equal(testPassword);
				done();
			});
		})

		it('should return only hash when salt is given', function(done) {
			passwordHelper.hash(testPassword, 'secretSalt', function(err, hash, salt) {
				if (err) throw err;

				should.not.exist(salt);
				hash.should.be.a("string");
				hash.should.not.equal(testPassword);
				done();
			})
		})

		it('should hash and verify if given password match stored hash', function(done) {
			passwordHelper.hash(testPassword, function(err, hash, salt) {
				if (err) throw err;

				passwordHelper.hash(testPassword, salt, function(err, hashWithSalt){
					if (err) throw err;

					hash.should.be.a("string");
					hash.should.not.equal(testPassword);
					hashWithSalt.should.be.a("string");
					hashWithSalt.should.not.equal(testPassword);
					hash.should.equal(hashWithSalt);
					done();
				})
			})
		})
	})
})