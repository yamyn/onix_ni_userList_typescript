const chai = require('chai');
const request = require('supertest');
const app = require('../../../src/server/server').default;
const EmailsModel = require('../../../src/components/EmailsList/model').default;

const newEmails = require('../fixtures/emails/newEmails.json');
const emailsDB = require('../fixtures/emails/emails.json');

let id;

chai.should();

/**
 * added new emailsList
 */
before(async () => {
    try {
        await EmailsModel.create(emailsDB);
        const EmailList = await EmailsModel.findOne({
            emails: emailsDB.emails,
        });
        id = EmailList.id;
    } catch (error) {
        console.log('Something went wrong');
    }
});

/**
 * API tests
 */
describe('EmailsList API', () => {
    it('get all emailsLists _positive_', done => {
        request(app)
            .get('/v1/emails')
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(res => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('create new emails _positive_', done => {
        request(app)
            .post('/v1/emails')
            .send(newEmails)
            .set('Cookie', global.cookie)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(res => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('find by id _positive_', done => {
        console.log(id);
        request(app)
            .get(`/v1/emails/${id}`)
            .set('Cookie', global.cookie)
            .expect('Content-type', 'text/html; charset=utf-8')
            .expect(res => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('delete emailsList  _positive_', done => {
        request(app)
            .delete('/v1/emails')
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
        await EmailsModel.collection.drop();
    } catch (error) {
        console.log(
            'Something went wrong after tests, seems your database doesnt cleaned',
        );
    }
});
