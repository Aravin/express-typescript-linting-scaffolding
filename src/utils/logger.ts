import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const appName = 'APPNAME';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(info => `${appName} ${info.timestamp} ${info.level}: ${info.message}`),)
  }));
} else {
  logger.add(new WinstonCloudWatch({
    logGroupName: appName,
    logStreamName: 'default'
  })
  );
}

export const log = logger;
