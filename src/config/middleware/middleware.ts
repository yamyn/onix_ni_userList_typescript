import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as session from 'express-session';
// tslint:disable-next-line: no-var-requires
const flash: any = require('connect-flash');

import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as csrf from 'csurf';

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {
    app.use(methodOverride('_method'));
    app.set('views', `${__dirname}/../../views`);
    app.set('view engine', 'ejs');
    app.use(
        bodyParser.urlencoded({
            extended: false,
        }),
    );
    app.use(bodyParser.json());
    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // added csrf token for request with to use cookie
    app.use(csrf({ cookie: true }));
    // returns the compression middleware
    app.use(compression());
    // express session for create session
    app.use(
        session({
            secret: 'FixicMom',
            cookie: {
                maxAge: 3600 * 24,
            },
            resave: false,
            saveUninitialized: true,
        }),
    );
    // allow to get flash message in response
    app.use(flash());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that
    // can be used to enable CORS with various options
    app.use(cors());
    // cors
    app.use(
        (
            _req: express.Request,
            res: express.Response,
            next: express.NextFunction,
        ): void => {
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS ',
            );
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                    ' Content-Type, Accept,' +
                    ' Authorization,' +
                    ' Access-Control-Allow-Credentials',
            );
            next();
        },
    );
}
