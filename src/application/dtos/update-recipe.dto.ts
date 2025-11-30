import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRecipeDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  ingredients?: string;

  @ApiProperty()
  @IsString()
  instructions?: string;
}
