const chai = require('chai');
const request = require('supertest');
const app = require('../../src/server/server').default;
const AdminModel = require('../../src/components/Auth/model').default;

const admins = require('./fixtures/admins.json');
const invalidTokens = require('./fixtures/tokens.json');

chai.should();

/**
 * storing globals to access them in API requests
 */
global.accsesToken = '';
global.refreshToken = '';

/**
 * Authentication tests
 */
describe('Authentication: ', () => {
    describe('Positive tests: ', () => {
        it('sign up', done => {
            request(app)
                .post('/v1/auth/signup')
                .send(admins.signup)
                .expect('Content-type', /json/)
                .expect(res => {
                    res.status.should.equal(200);
                    res.body.logged.should.equal(true);
                    res.body.message.should.equal('Sign in successfull');
                    global.accsesToken = res.body.tokens.accesToken;
                    global.refreshToken = res.body.tokens.refreshToken;
                })
                .end(done);
        });

        it('login to app', done => {
            request(app)
                .post('/v1/auth/login')
                .send(admins.login)
                .expect('Content-type', /json/)
                .expect(res => {
                    res.status.should.equal(200);
                    res.body.logged.should.equal(true);
                    res.body.message.should.equal('Sign in successfull');
                    global.accsesToken = res.body.tokens.accesToken;
                    global.refreshToken = res.body.tokens.refreshToken;
                })
                .end(done);
        });

        it('Updating with refresh', done => {
            request(app)
                .get('/v1/auth/refreshup')
                .set('refresh-token', global.refreshToken)
                .expect('Content-type', /json/)
                .expect(res => {
                    res.status.should.equal(200);
                    res.body.logged.should.equal(true);
                    res.body.message.should.equal('updating successfull');
                    global.accsesToken = res.body.tokens.accesToken;
                    global.refreshToken = res.body.tokens.refreshToken;
                })
                .end(done);
        });
    });
    describe('Negative tests :', () => {
        it('sign up user with existing email', done => {
            request(app)
                .post('/v1/auth/signup')
                .send(admins.signup)
                .expect('Content-type', /json/)
                .expect(res => {
                    res.status.should.equal(422);
                    res.body.error.should.equal('MongoError');
                })
                .end(done);
        });

        it('login with invalid password', done => {
            request(app)
                .post('/v1/auth/login')
                .send(admins.loginInvalid)
                .expect('Content-type', /json/)
                .expect(res => {
                    res.status.should.equal(422);
                    res.body.error.should.equal('E_MISSING_OR_INVALID_PARAMS');
                    res.body.details.should.equal('Pasword is invalid!');
                })
                .end(done);
        });

        it('Try updating with invalid refresh', done => {
            request(app)
                .get('/v1/auth/refreshup')
                .set('refresh-token', invalidTokens.refresh)
                .expect('Content-type', /json/)
                .expect(res => {
                    res.status.should.equal(422);
                    res.body.error.should.equal('E_MISSING_OR_INVALID_PARAMS');
                })
                .end(done);
        });
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
            'Something went wrong after tests, seems your admins database doesnt cleaned',
        );
    }
});
