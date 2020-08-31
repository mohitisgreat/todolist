"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todo_model_1 = require("./todo.model");
let TodoService = class TodoService {
    constructor(TodoModel) {
        this.TodoModel = TodoModel;
    }
    async fetchTodos(page, itemsPerPage) {
        try {
            const values = await this.TodoModel
                .find()
                .sort({ dueDate: 1 })
                .limit(itemsPerPage)
                .skip(page * itemsPerPage);
            const count = await this.TodoModel.estimatedDocumentCount();
            return {
                message: 'Successfully fetched todos',
                todos: values,
                count
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("Couldn't fetch the todo items");
        }
    }
    async newTodo(dueDate, title, description, isCompleted) {
        try {
            const todo = new this.TodoModel({
                dueDate,
                title,
                description,
                isCompleted
            });
            const value = await todo.save();
            return value;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("Couldn't create a new todo item");
        }
    }
    async fetchTodoById(id) {
        try {
            const todo = await this.TodoModel.findById(id);
            return todo;
        }
        catch (e) {
            throw new common_1.NotFoundException("Couldn't find the Todo");
        }
    }
    async updateTodoById(id, dueDate, title, description, isCompleted) {
        try {
            const todo = await this.TodoModel.findById(id);
            if (dueDate) {
                todo.dueDate = dueDate;
            }
            if (title) {
                todo.title = title;
            }
            if (description) {
                todo.description = description;
            }
            if (isCompleted != undefined) {
                todo.isCompleted = isCompleted;
            }
            const result = await todo.save();
            return result;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException("Couldn't update the todo");
        }
    }
    async deleteTodoById(id) {
        try {
            const result = await this.TodoModel.findByIdAndDelete(id);
            return result;
        }
        catch (e) {
            throw new common_1.NotFoundException("Couldn't find the todo item");
        }
    }
};
TodoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(todo_model_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map