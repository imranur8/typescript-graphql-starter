import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from 'app-types';
import User from "../entities/User";
import { AuthChecker } from "type-graphql";
import Context from "../context";

export const isJwtAuthenticated = async (request: IRequest, response: Response, next: NextFunction) => {
  // check JWT token is valid or not
  const token = request.headers.authorization;

  if (!token) {
    return response.status(403).send({
      auth: false, message: "No token provided."
    });
  }

  try {
    let decoded = await jwt.verify(token, process.env.JWT_SECRET) as User;
    request.user = decoded;
    next();
  } catch (error) {
    let errorCode, errorMessage;
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      errorCode = 400;
      errorMessage = error.name;
    }
    return response.status(errorCode).send({
      auth: false,
      message: errorMessage
    });
  }
};


// create auth checker function
export const isAuthorized: AuthChecker<Context> = ({ context: { user } }, roles) => {

  if (!Object.values(roles).includes(user.role)) {
    // if `@Authorized()`, check only is user exist
    return false;
  }
  // there are some roles defined now

  if (!user) {
    // and if no user, restrict access
    return false;
  }
  if (Object.values(roles).includes(user.role)) {
    return true;
  }
  return false;
};