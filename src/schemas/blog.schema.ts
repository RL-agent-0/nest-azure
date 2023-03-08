import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
    @Prop()
    title: string;

    @Prop()
    description: number;

    @Prop()
    content: string;

    @Prop()
    createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);