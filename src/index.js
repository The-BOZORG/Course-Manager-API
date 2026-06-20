import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import colors from 'colors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('dev'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
