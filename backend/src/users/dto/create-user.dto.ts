import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'Tester' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: '12345678' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
