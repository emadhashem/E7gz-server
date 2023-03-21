require('dotenv').config();
import http from 'http'
import express, { json, NextFunction, Request, Response } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import redisClient from './utils/connectRedis';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import appoinmentRoute from './routes/appionment.route'
import reservationRoute from './routes/reservation.route'
import AppError from './utils/appError';
const swaggerJSDoc = require('../swagger');
import swaggerUi from 'swagger-ui-express'
import WebSocket from './websocket';
import { conn } from './websocket/connections';
AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    // server
    const app = express();
    const httpServer = http.createServer(app)
    new WebSocket(httpServer)

    // socket config
    WebSocket.ws?.on('request', (request) => {
      const connection = request.accept(null, request.origin)
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
        }
        
      })
      conn.push(connection)
    })

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc, { explorer: true }))

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json({ limit: '10kb' }));

    // 2. Logger
    if (process.env.NODE_ENV === 'development') app.use(morgan("dev"))

    // 3. Cookie Parser
    app.use(cookieParser())
    // 4. Cors
    app.use(cors({ origin: config.get('origin'), credentials: true }))

    // ROUTES
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRoute)
    app.use('/api/appoinment', appoinmentRoute)
    app.use('/api/reservation', reservationRoute)

    // HEALTH CHECKER
    app.get('/api/healthchecker', async (_, res: Response) => {
      const message = await redisClient.get('try');
      res.status(200).json({
        status: 'success',
        message,
      });
    });

    // UNHANDLED ROUTE
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      return next(new AppError(404, `
      Route ${req.originalUrl} not found
      `))
    })
    // GLOBAL ERROR HANDLER
    app.use((err: AppError, _: Request, res: Response, next: NextFunction) => {
      err.status = err.status || 'error'
      err.statusCode = err.statusCode || 500
      res.status(err.statusCode).send({
        status: err.status,
        message: err.message
      })
    })
    const port = config.get<number>('port');
    httpServer.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
