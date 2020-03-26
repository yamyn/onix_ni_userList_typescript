const chai = require('chai');
const request = require('supertest');
const app = require('../../../src/server/server').default;
const UserModel = require('../../../src/components/User/model').default;
const newUserPos = require('../fixtures/user/newUser.positive.json');
const newUserNeg = require('../fixtures/user/newUser.negative.json');

chai.should();

/**
 * API tests
 */
describe('API', () => {
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
    describe('Update and Delete: ', async () => {
        console.log(newUserPos.email);
        const user = await UserModel.findOne({
            email: newUserPos.email,
        });
        console.log(user);
        const newData = { id: user.id, fullName: 'batya' };
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
    });
});

/**
 * clear database after tests
 */
// after(async () => {
//     try {
//         await UserModel.collection.drop();
//     } catch (error) {
//         console.log(
//             'Something went wrong after tests, seems your database doesnt cleaned',
//         );
//     }
// });
