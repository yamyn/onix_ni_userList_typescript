import * as express from 'express';
import * as http from 'http';
import UserRouter from '../components/User/router';
// import EmailListRouter from '../components/EmailsList/router';
// import ScreensRouter from '../components/Screens/router';

/**
 * @function
 * @param {express.Application} app
 * @summary init Application router
 * @returns void
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * Forwards any requests to the /v1/users URI to UserRouter.
     * @name /v1/users
     * @function
     * @inner
     * @param {string} path - Express path
     * @param {callback} middleware - Express middleware.
     */
    app.use('/v1/users', UserRouter);

    // /**
    //  * Forwards any requests to the /v1/emails URI to EmailListRouter.
    //  * @name /v1/emails
    //  * @function
    //  * @inner
    //  * @param {string} path - Express path
    //  * @param {callback} middleware - Express middleware.
    //  */
    // app.use('/v1/emails', EmailListRouter);

    // /**
    //  * Forwards any requests to the /v1/screens URI to ScreensRouter.
    //  * @name /v1/screens
    //  * @function
    //  * @inner
    //  * @param {string} path - Express path
    //  * @param {callback} middleware - Express middleware.
    //  */
    // app.use('/v1/screens', ScreensRouter);

    /**
     * @description No results returned mean the object is not found
     * @function
     * @inner
     * @param {callback} middleware - Express middleware.
     */
    app.use((req: express.Request, res: express.Response): void => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @function
     * @inner
     * @param {express.Router}
     */
    app.use(router);
}
