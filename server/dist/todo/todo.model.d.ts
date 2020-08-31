import { Document } from 'mongoose';
export declare class Todo extends Document {
    dueDate: Date;
    title: string;
    description: string;
    isCompleted: boolean;
}
export declare const TodoSchema: import("mongoose").Schema<any>;
