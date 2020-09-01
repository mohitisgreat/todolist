import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<Todo>) {}

  async fetchTodos(page: number, itemsPerPage: number) {
    try {
      const values = await this.TodoModel.find()
        .sort({ dueDate: 1 }) // sort the date in ascending order
        .limit(itemsPerPage) // limit the number of items returned
        .skip(page * itemsPerPage); // skip the items of previous page

      // No. of documents present in the collection
      const count = await this.TodoModel.estimatedDocumentCount();

      return {
        message: 'Successfully fetched todos',
        todos: values,
        count,
      };
    } catch (e) {
      throw new InternalServerErrorException("Couldn't fetch the todo items");
    }
  }

  async newTodo(
    dueDate: Date,
    title: string,
    description: string,
    isCompleted: boolean,
  ) {
    try {
      const todo = new this.TodoModel({
        dueDate,
        title,
        description,
        isCompleted,
      });

      const value = await todo.save();

      return value;
    } catch (e) {
      throw new InternalServerErrorException("Couldn't create a new todo item");
    }
  }

  async fetchTodoById(id: string) {
    try {
      const todo = await this.TodoModel.findById(id);
      return todo;
    } catch (e) {
      throw new NotFoundException("Couldn't find the Todo");
    }
  }

  async updateTodoById(
    id: string,
    dueDate: Date,
    title: string,
    description: string,
    isCompleted: boolean,
  ) {
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
    } catch (e) {
      throw new InternalServerErrorException("Couldn't update the todo");
    }
  }

  async deleteTodoById(id: string) {
    try {
      const result = await this.TodoModel.findByIdAndDelete(id);

      return result;
    } catch (e) {
      throw new NotFoundException("Couldn't find the todo item");
    }
  }
}
