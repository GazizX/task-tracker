import express from 'express';
import itemRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
var cors = require('cors')
app.use(express.json());
app.use(cors())
app.use('/tasks', itemRoutes);

app.use(errorHandler);

export default app;