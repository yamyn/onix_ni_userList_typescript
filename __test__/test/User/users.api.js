const chai = require('chai');
const request = require('supertest');
const app = require('../../../src/server/server').default;
const UserModel = require('../../../src/components/User/model').default;

const userForPD = require('../fixtures/user/UserForPutDel.json');
const newUserPos = require('../fixtures/user/newUser.positive.json');
const newUserNeg = require('../fixtures/user/newUser.negative.json');

let newData;

chai.should();

/**
 * added new user for Put, Delete methods
 */
before(async () => {
    try {
        await UserModel.create(userForPD);
        const user = await UserModel.findOne({
            email: userForPD.email,
        });
        newData = { id: user.id, fullName: 'Batya' };
    } catch (error) {
        console.log('Something went wrong');
    }
});

/**
 * API tests
 */
describe('User API', () => {
    it('get all users _positive_', done => {
        request(app)
            .get('/v1/users')
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(res => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('get statistic _positive_', done => {
        request(app)
            .get('/v1/users/statistic')
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(res => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('create new user _positive_', done => {
        request(app)
            .post('/v1/users')
            .send(newUserPos)
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(302);
            })
            .end(done);
    });

    it('try to create user with invalid fullName _negative_', done => {
        request(app)
            .post('/v1/users')
            .send(newUserNeg)
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(401);
            })
            .end(done);
    });

    it('update user  _positive_', done => {
        request(app)
            .put('/v1/users')
            .send(newData)
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(302);
            })
            .end(done);
    });

    it('delete user  _positive_', done => {
        request(app)
            .delete('/v1/users')
            .send({ id: newData.id })
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/plain; charset=utf-8')
            .expect(res => {
                res.status.should.equal(302);
            })
            .end(done);
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
            'Something went wrong after tests, seems your database doesnt cleaned',
        );
    }
});
