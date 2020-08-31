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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    fetchTodoItems(page, itemsPerPage) {
        return this.todoService.fetchTodos(page, itemsPerPage);
    }
    fetchTodoItemById(id) {
        return this.todoService.fetchTodoById(id);
    }
    newTodoItem(dueDate, title, description, isCompleted) {
        return this.todoService.newTodo(dueDate, title, description, isCompleted);
    }
    updateItem(id, dueDate, title, description, isCompleted) {
        return this.todoService.updateTodoById(id, dueDate, title, description, isCompleted);
    }
    deleteItem(id) {
        return this.todoService.deleteTodoById(id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('page', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(1, common_1.Query('pp', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "fetchTodoItems", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "fetchTodoItemById", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body('dueDate', new common_1.DefaultValuePipe(new Date()))),
    __param(1, common_1.Body('title')),
    __param(2, common_1.Body('description')),
    __param(3, common_1.Body('isCompleted', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "newTodoItem", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body('dueDate')),
    __param(2, common_1.Body('title')),
    __param(3, common_1.Body('description')),
    __param(4, common_1.Body('isCompleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "updateItem", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "deleteItem", null);
TodoController = __decorate([
    common_1.Controller('todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map