import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionController = new ConnectionController();

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connection', connectionController.create);
routes.get('/connection', connectionController.index);

export default routes;