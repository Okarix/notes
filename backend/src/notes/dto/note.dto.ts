import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ default: 'Note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ default: 'note content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateNoteDto {
  @ApiProperty({ default: 'Note update' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ default: 'note content updated' })
  @IsString()
  @IsOptional()
  content?: string;
}
