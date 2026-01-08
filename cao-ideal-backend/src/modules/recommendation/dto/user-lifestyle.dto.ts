import { IsOptional, IsString } from 'class-validator';

export class UserLifestyleDto {
  @IsString() @IsOptional() housing: string;
  @IsString() @IsOptional() timeDedicated: string;
  @IsString() @IsOptional() activityLevel: string;
  @IsString() @IsOptional() workRoutine: string;
  @IsString() @IsOptional() household: string;
  @IsString() @IsOptional() hasChildren: string;
  @IsString() @IsOptional() experienceLevel: string;
  @IsString() @IsOptional() messTolerance: string;
  @IsString() @IsOptional() noiseTolerance: string;
  @IsString() @IsOptional() reasonForDog: string;
  @IsString() @IsOptional() investment: string;
  @IsString() @IsOptional() dogProfile: string;
}