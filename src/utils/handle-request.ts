import { IEndpointLogRepository, IRequest, IResponse } from '../adapters';

import { CustomError } from './errors';
import { measureTime } from './measure-time';

function saveLog<R>(
  measure: { startDate: Date; endDate: Date; start(): any; end(): number },
  endpointLogRepository: IEndpointLogRepository,
  f: (...args: any[]) => Promise<R>,
  body: any,
  params,
  query,
  response: any,
  res: IResponse,
) {
  const duration = measure.end();

  const log = endpointLogRepository.create({
    name: f.name,
    payload: { ...body, ...params, ...query },
    executionTime: duration,
    startTime: measure.startDate.toISOString(),
    endTime: measure.endDate.toISOString(),
    response: response,
  });

  endpointLogRepository
    .save(log)
    .then((savedLogs) => {
      // console.log('savedLogs:', savedLogs);
    })
    .catch(() => [console.error('Error saving endpoint log')]);

  res.send(response);
}

export function handleRequest<R>(
  f: (...args: any[]) => Promise<R>,
  endpointLogRepository: IEndpointLogRepository,
) {
  return async (req: IRequest, res: IResponse): ReturnType<typeof f> => {
    let response = null;
    const measure = measureTime();
    const { body, params, query, headers } = req;

    try {
      response = await f({ req, res, body, params, query }, { headers });
      // if (req.method === 'GET') {
      //   res.statusCode = 200;
      // }
      // if (req.method === 'POST') {
      //   res.statusCode = 201;
      // }
      // if (req.method === 'PUT') {
      //   res.statusCode = 200;
      // }
      // if (req.method === 'DELETE') {
      //   res.statusCode = 204;
      // }
      // if (req.method === 'PATCH') {
      //   res.statusCode = 200;
      // }
      // if (req.method === 'OPTIONS') {
      //   res.statusCode = 204;
      // }
    } catch (error) {
      console.error(error);
      res.statusCode = 500;

      if (error instanceof CustomError) {
        res.statusCode = error.code;
        response = error;
      }
    } finally {
      saveLog<R>(
        measure,
        endpointLogRepository,
        f,
        body,
        params,
        query,
        response,
        res,
      );
    }
    return;
  };
}
