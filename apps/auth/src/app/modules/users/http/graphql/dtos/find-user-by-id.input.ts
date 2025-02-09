import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class FindUserByIdInput {
  @Field()
  @IsNumber()
  id: number;
}
