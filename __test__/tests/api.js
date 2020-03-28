const chai = require('chai');
const request = require('supertest');
const app = require('../../src/server/server').default;
const UserModel = require('../../src/components/User/model').default;

const users = require('./fixtures/users.json');

chai.should();

let id;
let upUser;
/**
 * added new users
 */
before(async () => {
    try {
        await UserModel.create(users.forGET);
        const user = await UserModel.findOne({
            email: users.forGET[0].email,
        });
        id = user.id;
        upUser = { id: user.id, fullName: 'Batya' };
    } catch (error) {
        console.log('Something went wrong');
    }
});

/**
 * API tests
 */
describe('API', () => {
    describe('Positive tests: ', () => {
        it('get all users', done => {
            request(app)
                .get('/v1/users')
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(200);
                    res.body.data.should.be.an('array').and.to.have.length(4);
                })
                .end(done);
        });

        it('get users`s statistic', done => {
            request(app)
                .get('/v1/users/statistic')
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(200);
                    res.body.data.should.have.property('count');
                    res.body.data.labels.should.be.an('array');
                })
                .end(done);
        });

        it('create new user', done => {
            request(app)
                .post('/v1/users')
                .send(users.newUser)
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(201);
                    res.body.data.should.have.property('_id');
                })
                .end(done);
        });

        it('find user by Id', done => {
            request(app)
                .get(`/v1/users/${id}`)
                .send(users.newUser)
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(201);
                    res.body.data.should.have.property('email');
                })
                .end(done);
        });

        it('update user by Id', done => {
            request(app)
                .put('/v1/users')
                .send(upUser)
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(201);
                    res.body.data.should.have.property('email');
                    res.body.data.fullName.should.equal(upUser.fullName);
                })
                .end(done);
        });

        it('delete user by Id', done => {
            request(app)
                .delete('/v1/users')
                .send({ id })
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(201);
                    res.body.data.should.have.property('fullName');
                })
                .end(done);
        });
    });
    describe('Negative tests: ', () => {
        it('create new user with missing email', done => {
            request(app)
                .post('/v1/users')
                .send(users.invalidUser)
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(500);
                    res.body.message.should.equal('ValidationError');
                })
                .end(done);
        });

        it('create new user with existing email', done => {
            request(app)
                .post('/v1/users')
                .send(users.newUser)
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(422);
                    res.body.error.should.equal('MongoError');
                })
                .end(done);
        });

        it('try update user with invalid fullName', done => {
            request(app)
                .post('/v1/users')
                .send(users.shortNameUser)
                .set('x-access-token', global.accsesToken)
                .expect(res => {
                    res.status.should.equal(422);
                    res.body.error.should.equal('E_MISSING_OR_INVALID_PARAMS');
                })
                .end(done);
        });

        it('try delete user with invalid id', done => {
            request(app)
                .delete('/v1/users')
                .send({ id: `123${id}` })
                .set('x-access-token', global.accsesToken)
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
        await UserModel.collection.drop();
    } catch (error) {
        console.log(
            'Something went wrong after tests, seems your users database doesnt cleaned',
        );
    }
});
