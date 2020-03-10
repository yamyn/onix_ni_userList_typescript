import { Dropbox } from 'dropbox';
import * as fetch from 'isomorphic-fetch';
import config from '../../../../config/env';

const dropbox: Dropbox = new Dropbox({
    fetch,
    accessToken: `${config.dropboxToken}`,
});

/**
 * @function
 * @param {string} screenName
 * @param {Buffer} screen
 * @returns { Promise < DropboxTypes.files.FileMetadata > }
 */
async function postImage(
    screenName: string,
    screen: Buffer,
): Promise<DropboxTypes.files.FileMetadata> {
    return dropbox.filesUpload({
        path: `/users_table_screens/${screenName}.png`,
        contents: screen,
    });
}

/**
 * @function
 * @param {string} screenName
 * @returns { : Promise<DropboxTypes.sharing.SharedLinkMetadataReference> }
 */
async function getImageLink(screenName: string): Promise<string> {
    return dropbox
        .sharingCreateSharedLinkWithSettings({
            path: `/users_table_screens/${screenName}.png`,
        })
        .then(
            (
                ImgMetaData: DropboxTypes.sharing.SharedLinkMetadataReference,
            ): string | any => ImgMetaData.url,
        );
}

export default {
    postImage,
    getImageLink,
};
