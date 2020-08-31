import { Model } from "mongoose";
import { Todo } from "./todo.model";
export declare class TodoService {
    private TodoModel;
    constructor(TodoModel: Model<Todo>);
    fetchTodos(page: number, itemsPerPage: number): Promise<{
        message: string;
        todos: Todo[];
        count: number;
    }>;
    newTodo(dueDate: Date, title: string, description: string, isCompleted: boolean): Promise<Todo>;
    fetchTodoById(id: string): Promise<Todo>;
    updateTodoById(id: string, dueDate: Date, title: string, description: string, isCompleted: boolean): Promise<Todo>;
    deleteTodoById(id: string): Promise<Todo>;
}
