const chai = require('chai');
const UtilService = require('../../../src/components/EmailsList/services/service')
    .default;
const emailsModel = require('../../../src/components//EmailsList/model')
    .default;
const emails = require('../fixtures/emails/moreEmails.json');
const newEmails = require('../fixtures/emails/newEmails.json');

const { expect } = chai;
let id;
/**
 * added new emails
 */
before(async () => {
    try {
        await emailsModel.create(emails);
        const emailList = await emailsModel.findOne({
            emails: emails[0].emails,
        });
        id = emailList.id;
    } catch (error) {
        console.log('Something went wrong');
    }
});

describe('EmailsListComponent -> service', () => {
    it('EmailsListComponent -> service -> findAll', done => {
        UtilService.findAll()
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('array').and.to.have.lengthOf.above(-1);

                done();
            })
            .catch(done);
    });

    it('EmailsListComponent -> service -> create', done => {
        UtilService.create(newEmails)
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.be.have.property('emails');

                done();
            })
            .catch(done);
    });

    it('EmailsListComponent -> service -> findById', done => {
        UtilService.findById(id)
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.be.have.property('emails');

                done();
            })
            .catch(done);
    });

    it('EmailsListComponent -> service -> deleteById', done => {
        UtilService.deleteById(id)
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.be.have.property('id');

                done();
            })
            .catch(done);
    });
});
