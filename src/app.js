import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import dbConnection from './Connection/dbConnect';
import errorHandler from './Middlewares/errorHandler';

dbConnection();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
	res.status(status.OK).send({ Message: 'Connected', status: status.OK });
});

app.get('*', (_, res) => {
	res.status(status.BAD_REQUEST).send({
		Message: status['400_MESSAGE'],
		status: status['400_NAME'],
	});
});

app.use(errorHandler);

const port = process.env.port || 3000;

app.listen(port, () =>
	console.log(`App listening On port http://localhost:${port}`),
);
