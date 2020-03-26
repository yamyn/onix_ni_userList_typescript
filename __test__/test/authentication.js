const chai = require('chai');
const request = require('supertest');
const app = require('../../src/server/server').default;
const adminRegPos = require('./fixtures/admin/adminForReg.positive.json');
const adminRegNeg = require('./fixtures/admin/adminForReg.negative.json');
const adminLogPos = require('./fixtures/admin/adminForLog.positive.json');
const adminLogNeg = require('./fixtures/admin/adminForLog.negative.json');
const AdminModel = require('../../src/components/Auth/model').default;
chai.should();

/**
 * storing globals to access them in API requests
 */
global.cookie = '';
/**
 * Authentication tests
 */
describe('Authentication: ', () => {
    /**
     * Sign up tests
     */
    describe('Sign up: ', () => {
        it('page _positive_', done => {
            request(app)
                .get('/v1/auth/signup')
                .expect('Content-type', 'text/html; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(200);
                })
                .end(done);
        });

        it('post _positive_', done => {
            request(app)
                .post('/v1/auth/signup')
                .send(adminRegPos)
                .expect('Content-type', 'text/plain; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(302);
                })
                .end(done);
        });

        it('try sign up user with existing email _negative_', done => {
            request(app)
                .post('/v1/auth/signup')
                .send(adminRegPos)
                .expect('Content-type', 'text/plain; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(401);
                })
                .end(done);
        });

        it('attempt to register without a password _negative_', done => {
            request(app)
                .post('/v1/auth/signup')
                .send(adminRegNeg)
                .expect('Content-type', 'text/plain; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(401);
                })
                .end(done);
        });
    });
    /**
     * Login tests
     */
    describe('Login: ', () => {
        it('page _positive_', done => {
            request(app)
                .get('/v1/auth/login')
                .expect('Content-type', 'text/html; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(200);
                })
                .end(done);
        });

        it('try login to app _positive_', done => {
            request(app)
                .post('/v1/auth/login')
                .send(adminLogPos)
                .expect('Content-type', 'text/plain; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(302);
                    global.cookie = res.header['set-cookie'];
                })
                .end(done);
        });

        it('invalid email _negative_', done => {
            request(app)
                .post('/v1/auth/login')
                .send(adminLogNeg)
                .expect('Content-type', 'text/plain; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(401);
                })
                .end(done);
        });

        it('try to go at login-page after login _negative_', done => {
            request(app)
                .get('/v1/auth/login')
                .set('Cookie', global.cookie)
                .expect('Content-type', 'text/plain; charset=utf-8')
                .expect(res => {
                    res.status.should.equal(300);
                })
                .end(done);
        });
    });
    /**
     * logout test
     */
    it('logout', done => {
        request(app)
            .get('/v1/auth/logout')
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(308);
            })
            .end(done);
    });
});

/**
 * clear database after tests
 */
after(async () => {
    try {
        await AdminModel.collection.drop();
    } catch (error) {
        console.log(
            'Something went wrong after tests, seems your database doesnt cleaned',
        );
    }
});
