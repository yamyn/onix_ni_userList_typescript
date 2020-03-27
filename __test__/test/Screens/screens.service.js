const chai = require('chai');
const UtilService = require('../../../src/components/Screens/services/dBService')
    .default;
const ScreensModel = require('../../../src/components/Screens/model').default;
const screens = require('../fixtures/screens/screens.json');
const newScreen = require('../fixtures/screens/newScreen.json');

const { expect } = chai;
let id;
/**
 * added new screens
 */
before(async () => {
    try {
        await ScreensModel.create(screens);
        const screen = await ScreensModel.findOne({
            screenLink: screens[0].screenLink,
        });
        id = screen.id;
    } catch (error) {
        console.log('Something went wrong');
    }
});

describe('ScreensComponent -> service', () => {
    it('ScreensComponent -> service -> findAll', done => {
        UtilService.findAll()
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('array').and.to.have.length(3);

                done();
            })
            .catch(done);
    });

    it('ScreensComponent -> service -> create', done => {
        UtilService.create({ screenLink: newScreen.screenLink })
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be
                    .an('object')
                    .and.to.be.have.property('screenLink');

                done();
            })
            .catch(done);
    });

    it('ScreensComponent -> service -> deleteById', done => {
        UtilService.deleteById(id)
            .then(res => {
                const expectBody = expect(res);
                expectBody.to.be.an('object').and.to.be.have.property('id');

                done();
            })
            .catch(done);
    });
});
