import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Body,
  ParseBoolPipe,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  fetchTodoItems(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('pp', new DefaultValuePipe(10), ParseIntPipe) itemsPerPage: number,
  ) {
    return this.todoService.fetchTodos(page, itemsPerPage);
  }

  @Get(':id')
  fetchTodoItemById(@Param('id') id: string) {
    return this.todoService.fetchTodoById(id);
  }

  @Post()
  newTodoItem(
    @Body('dueDate', new DefaultValuePipe(new Date())) dueDate: Date,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('isCompleted', new DefaultValuePipe(false), ParseBoolPipe)
    isCompleted: boolean,
  ) {
    return this.todoService.newTodo(dueDate, title, description, isCompleted);
  }

  @Put(':id')
  updateItem(
    @Param('id') id: string,
    @Body('dueDate') dueDate: Date,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.todoService.updateTodoById(
      id,
      dueDate,
      title,
      description,
      isCompleted,
    );
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.todoService.deleteTodoById(id);
  }
}
