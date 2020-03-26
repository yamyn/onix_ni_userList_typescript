const chai = require('chai');
const path = require('path');

// expect path
chai.use(require('chai-fs'));

const { expect } = chai;

/**
 * Exist files tests
 */
describe('EXIST FILES', () => {
    it('CodeStyle', done => {
        expect(path.join(__dirname, '../../tslint.json')).to.be.a.path();

        done();
    });

    it('Package.json', done => {
        expect(path.join(__dirname, '../../package.json')).to.be.a.path();

        done();
    });

    it('Package-lock.json', done => {
        expect(path.join(__dirname, '../../package-lock.json')).to.be.a.path();

        done();
    });

    it('Gitignore', done => {
        expect(path.join(__dirname, '../../.gitignore')).to.be.a.path();

        done();
    });

    it('Nodemon.json', done => {
        expect(path.join(__dirname, '../../nodemon.json')).to.be.a.path();

        done();
    });

    it('Tsconfig.json', done => {
        expect(path.join(__dirname, '../../tsconfig.json')).to.be.a.path();

        done();
    });
});
