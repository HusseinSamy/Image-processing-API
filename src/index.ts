import express from 'express'
import routes from './routes'

const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port);

export default app;