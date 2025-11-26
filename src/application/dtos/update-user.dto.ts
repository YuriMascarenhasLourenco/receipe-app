import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  password?: string;
}
