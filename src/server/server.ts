import * as express from 'express';
import * as Middleware from '../config/middleware/middleware';
import * as Routes from '../config/router';

/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @description sets port 3030 to default or unless otherwise specified in the environment
 */
app.set('port', process.env.PORT || 3030);

/**
 * @description sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');
/**
 * @exports {express.Application}
 */
export default app;
