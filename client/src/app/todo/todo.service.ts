import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { TodoModel } from './todo.model';

const TodoUrl = `${environment.backend}/api/todo`;

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getItemNgClass(date: Date) {
    return {
      outdated: this.isOutdated(date),
      today: this.isToday(date),
    };
  }

  addTodoItem(item: TodoModel): Observable<any> {
    return this.httpClient.post(TodoUrl, item);
  }

  deleteItemById(item: string): Observable<any> {
    return this.httpClient.delete(`${TodoUrl}/${item}`);
  }

  editItemById(itemId: string, newItem: TodoModel): Observable<any> {
    return this.httpClient.put(`${TodoUrl}/${itemId}`, {
      ...newItem,
      _id: undefined,
    });
  }

  fetchTodoItems(page: number, pp: number): Observable<any> {
    return this.httpClient.get(`${TodoUrl}?page=${page}&pp=${pp}`).pipe(
      map((value: any) => {
        value.todos = value.todos.map((item) => {
          item.dueDate = new Date(item.dueDate);
          return item;
        });

        return value;
      })
    );
  }

  fetchTodoItem(id: string): Observable<TodoModel> {
    return this.httpClient.get(`${TodoUrl}/${id}`).pipe(
      map((value: any) => {
        console.log(value);
        return value as TodoModel;
      }),
      map((value: TodoModel) => {
        console.log(value);
        value.dueDate = new Date(value.dueDate);
        return value;
      })
    );
  }

  isOutdated(dueDate: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today > dueDate;
  }

  isToday(dueDate: Date) {
    const today = new Date();
    return today.getDate() === dueDate.getDate();
  }
}
