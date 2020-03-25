const chai = require('chai');
const request = require('supertest');
const app = require('../../src/server/server').default;
const adminReg = require('../fixtures/admin/adminForReg.json');
const adminLog = require('../fixtures/admin/adminForLog.json');
chai.should();

/**
 * storing globals to access them in API requests
 */
global.cookie = '';
/**
 * Authentication tests
 */
describe('Authentication', () => {
    it('sign up _positive_', done => {
        request(app)
            .post('/v1/auth/signup')
            .send(adminReg)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(302);
                global.cookie = res.header['set-cookie'];
            })
            .end(done);
    });
    it('sign up user with existing email _negative_', done => {
        request(app)
            .post('/v1/auth/signup')
            .send(adminReg)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(400);
            })
            .end(done);
    });
    it('login to app _positive_', done => {
        request(app)
            .post('/v1/auth/login')
            .send(adminLog)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(302);
                global.cookie = res.header['set-cookie'];
            })
            .end(done);
    });
});
