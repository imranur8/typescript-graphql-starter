import { Request, Response } from "express";
import User from "../entities/User";
import { ExecutionParams } from 'subscriptions-transport-ws';

interface IRequest extends Request {
  user: User
}

interface IExpressContext {
  req: IRequest;
  res: Response;
  connection?: ExecutionParams;
}

declare module "app-types";

