import { Request } from 'express';
import { User } from '../users/entities/user.entity';

import { TUserSearchQuery } from './queries';
import { TSigninResponse, TUserResponse } from './response';

export class TAdvancedRequest extends Request {
  user: User;
}

export { TUserSearchQuery, TSigninResponse, TUserResponse };
