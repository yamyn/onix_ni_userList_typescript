const chai = require('chai');
const request = require('supertest');
const app = require('../../../src/server/server').default;
const ScreensModel = require('../../../src/components/Screens/model').default;

const screenForDB = require('../fixtures/screens/screenForApi.json');

let id;

chai.should();

/**
 * added new user for Put, Delete methods
 */
before(async () => {
    try {
        await ScreensModel.create(screenForDB);
        const screen = await ScreensModel.findOne({
            screenLink: screenForDB.screenLink,
        });
        id = screen.id;
    } catch (error) {
        console.log('Something went wrong');
    }
});

/**
 * API tests
 */
describe('Screens API', () => {
    it('get all screens _positive_', done => {
        request(app)
            .get('/v1/screens')
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(res => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('delete screen  _positive_', done => {
        request(app)
            .delete('/v1/screens')
            .send({ id })
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
        await ScreensModel.collection.drop();
    } catch (error) {
        console.log(
            'Something went wrong after tests, seems your database doesnt cleaned',
        );
    }
});
