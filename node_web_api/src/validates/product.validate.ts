import { IsString, IsEmail, Length, MinLength, MaxLength, IsNotEmpty, IsDefined, ValidationArguments } from 'class-validator';

export class ProdcutCreateVal {
    @MinLength(5, {
        // message: "name too short"
        message: (args: ValidationArguments) => {
            if (args.value.length < 5) {
                return "Name too short.";
            } else {
                return "";
            }
        }
    })
    @IsDefined({
        message: "Name is required"
    })
    @IsString({
        message: "Name is must string"
    })
    name: string;

    @IsString()
    description: string;

}

export class ProdcutUpdateVal {
    @IsString()
    public handle_id: string;

    @IsString()
    public description: string;

    @MinLength(1, {
        message: "đối tượng quá ngắn"
    })
    @MaxLength(20, {
        message: "đối tượng quá dài"
    })
    @IsDefined({
        message: "đối tượng không được để chống"
    })
    @IsString({
        message: "đối tượng phải là chuỗi"
    })
    public action: string;
}



