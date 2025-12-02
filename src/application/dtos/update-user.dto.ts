import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty({
    description: 'the user id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'the user name',
    example: 'John Doe',
  })
  name?: string;
  @ApiProperty({
    description: 'the user email',
    example: 'anyName@domain.com',
  })
  email?: string;
  @ApiProperty({
    description: 'the user password',
    example: 'strongPassword123',
  })
  password?: string;
}
