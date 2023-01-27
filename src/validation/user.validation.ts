import { IsString,IsNotEmpty } from "class-validator";


export class UserValidate {
   @IsString()
   @IsNotEmpty()
    public username:string;
    @IsString()
   @IsNotEmpty()
   public password:string;
    @IsString()
   @IsNotEmpty()
   public confirmPassword:string;
    
  }
