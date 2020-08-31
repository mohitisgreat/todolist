import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Todo extends Document {

  @Prop()
  dueDate: Date;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  isCompleted: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);