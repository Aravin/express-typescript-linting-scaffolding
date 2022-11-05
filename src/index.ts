import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { appConfig } from './config';
import { log } from './utils/logger';

const app = express();

app
    .use(cors())
    .use(express.json())
    .use('/v1', router);


// start the server
app.listen(
    appConfig.port,
    () => log.error(`API is running on PORT ${appConfig.port}`)
);
