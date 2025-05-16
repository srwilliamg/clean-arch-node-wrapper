import { IEndpointLogRepository, IRequest, IResponse } from '../adapters';

import { measureTime } from './measure-time';

export function handleRequest<R>(
  f: (...args: any[]) => Promise<R>,
  endpointLogRepository: IEndpointLogRepository,
) {
  return async (req: IRequest, res: IResponse): ReturnType<typeof f> => {
    let response = null;
    const measure = measureTime();
    const { body, params, query, headers } = req;

    try {
      response = await f({ body, params, query }, { headers });
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
    } finally {
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
    return;
  };
}
