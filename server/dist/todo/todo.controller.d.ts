import { TodoService } from './todo.service';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    fetchTodoItems(page: number, itemsPerPage: number): Promise<{
        message: string;
        todos: import("./todo.model").Todo[];
        count: number;
    }>;
    fetchTodoItemById(id: string): Promise<import("./todo.model").Todo>;
    newTodoItem(dueDate: Date, title: string, description: string, isCompleted: boolean): Promise<import("./todo.model").Todo>;
    updateItem(id: string, dueDate: Date, title: string, description: string, isCompleted: boolean): Promise<import("./todo.model").Todo>;
    deleteItem(id: string): Promise<import("./todo.model").Todo>;
}
