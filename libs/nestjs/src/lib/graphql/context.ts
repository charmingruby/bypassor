import { Response, Request } from 'express';

export interface GraphQlContext {
  req: Request;
  res: Response;
}
