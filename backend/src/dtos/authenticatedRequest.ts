import { Request } from 'express';

export type TokenPayloadType = {
  user: {
    id: string;
    login: string;
  };
};

export interface AuthenticatedRequest extends Request {
  user?: TokenPayloadType;
}
