import { IsString, IsDefined } from 'class-validator';

export class LogInVal {
  @IsDefined({
    message: "Account is required"
  })
  public account_name: string;

  @IsDefined({
    message: "Password is required"
  })
  public password: string;
}

