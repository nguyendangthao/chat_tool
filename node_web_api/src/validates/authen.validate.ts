import { IsString, IsDefined } from 'class-validator';

export class LogInVal {
  @IsDefined({
    message: "Email is required"
  })
  public email: string;

  @IsDefined({
    message: "Password is required"
  })
  public password: string;
}

