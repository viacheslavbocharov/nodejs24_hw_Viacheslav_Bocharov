import { ISignInUserInput } from '../interface/sign-in-user.interface';

export class SignInUserInputDto implements ISignInUserInput {
  email: string;
  password: string;
}
