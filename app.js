import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from 'morgan';
import dbConnection from './Connection/dbConnect';

dbConnection();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.status(status.OK).send({ Message: 'Connected', status: status.OK });
});

const port = process.env.port || 3000;

app.listen(port, () =>
	console.log(`App listening On port http://localhost:${port}`),
);
