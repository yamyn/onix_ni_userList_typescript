const chai = require('chai');
const UtilService = require('../../../src/components/User/services/tableService')
    .default;
const UserModel = require('../../../src/components/User/model').default;
const users = require('../fixtures/user/users.json');

const { expect } = chai;
let id;
/**
 * added new users
 */
before(async () => {
    try {
        await UserModel.create(users);
        const user = await UserModel.findOne({
            email: users[0].email,
        });
        id = user.id;
    } catch (error) {
        console.log('Something went wrong');
    }
});

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> findAll', done => {
        UtilService.findAll()
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('array').and.to.have.length(5);

                done();
            })
            .catch(done);
    });

    it('UserComponent -> service -> getStatistic', done => {
        UtilService.getStatistic(30)
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('array').and.to.have.length(1);

                done();
            })
            .catch(done);
    });

    it('UserComponent -> service -> findOne', done => {
        UtilService.findOne({ email: users[2].email })
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be
                    .an('object')
                    .and.to.be.have.property('fullName');

                done();
            })
            .catch(done);
    });

    it('UserComponent -> service -> updateById', done => {
        UtilService.updateById(id, { fullName: 'Batya' })
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.be.have.property('email');

                done();
            })
            .catch(done);
    });

    it('UserComponent -> service -> deleteById', done => {
        UtilService.deleteById(id)
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be
                    .an('object')
                    .and.to.be.have.property('fullName');

                done();
            })
            .catch(done);
    });
});
