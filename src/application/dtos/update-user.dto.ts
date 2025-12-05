import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class updateUserDto {
  @ApiProperty({
    description: 'the user id',
    example: 1,
  })
  @IsNumber()
  id: number;
  @ApiProperty({
    description: 'the user name',
    example: 'John Doe',
  })
  @IsString()
  name?: string;
  @ApiProperty({
    description: 'the user email',
    example: 'anyName@domain.com',
  })
  @IsString()
  email?: string;
  @ApiProperty({
    description: 'the user password',
    example: 'strongPassword123',
  })
  @IsString()
  password?: string;
}
