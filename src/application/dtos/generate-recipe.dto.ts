import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class generateRecipeDto {
  @ApiProperty()
  @IsString()
  title: string;
}
