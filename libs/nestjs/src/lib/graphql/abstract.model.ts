import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class AbstractModel {
    @Field(() => ID)
    id: number;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;
}