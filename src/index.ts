/* eslint-disable implicit-arrow-linebreak */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import auth from './routes/auth';

// Initialize Express
const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Secure HTTP headers
app.use(helmet());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

console.log(process.env.CLIENT_APP_DOMAIN);
// Configure CORS policy
const whitelist = [
  process.env.CLIENT_APP_DOMAIN,
];

const corsMiddlewareOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      callback(new Error(msg));
    }
  },
};

// Enable pre-flight request for form-data requests
app.options('*', cors()); // include before other routes

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors(corsMiddlewareOptions));

// routes
app.use('/api/auth', auth);

// Start the server
// eslint-disable-next-line no-console
app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server started and listeningg on ${PORT}`));
