import ScreenMaker from './ScreenMaker';
import ScreensService from './dBService';
import { IScreensModel } from '../model';

/**
 * @function
 * @returns {Promise < void >}
 */
async function toMakeScreen(): Promise<void> {
    try {
        const imgName: string = ScreenMaker.createScreenName();

        const screen: Buffer = await ScreenMaker.makeScreen();

        const resPost: DropboxTypes.files.FileMetadata = await ScreenMaker.imageService.postImage(
            imgName,
            screen,
        );

        const imgLink:
            | string
            | any = await ScreenMaker.imageService.getImageLink(imgName);

        await ScreensService.create(imgLink).then(
            (res: IScreensModel): void => {
                if (res._id) {
                    // tslint:disable-next-line:no-console
                    console.log(
                        'Photo was saved in drive and link saved in db',
                    );
                    process.exit(0);
                }
            },
        );
    } catch (error) {
        throw error;
    }
}

toMakeScreen();
