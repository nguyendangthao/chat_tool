import {
    IsString, IsEmail, Length, MinLength, MaxLength, IsNotEmpty, IsDefined,
    ValidationArguments
} from 'class-validator';

export class AccountCreateVal {

    @IsDefined({
        message: "Account is required"
    })
    account_name: string;

    @IsDefined({
        message: "Email is required"
    })
    @IsEmail()
    email: string;

    @IsDefined({
        message: "Password is required"
    })
    password: string;
}

export class AccountUpdateVal {

    @IsDefined({
        message: "Account is required"
    })
    account_name: string;

    @IsDefined({
        message: "Email is required"
    })
    @IsEmail()
    email: string;

}







