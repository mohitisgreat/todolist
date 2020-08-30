import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';

import { NavService } from '../../nav/nav.service';
import { DeleteConfirmDialogComponent } from '../delete-confirm.dialog';
import { TodoModel } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  isLoading = true;
  todos: TodoModel[] = [];

  page = 0;
  pp = 5;
  count = 50;

  constructor(
    navService: NavService,
    public todoService: TodoService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) {
    navService.navTitle.next('All your work you need to do');
  }

  ngOnInit() {
    this.fetch(this.page, this.pp);
  }

  reload(event: PageEvent) {
    this.page = event.pageIndex;
    this.pp = event.pageSize;
    this.fetch(this.page, this.pp);
  }

  fetch(page: number, pageSize: number) {
    this.isLoading = true;
    this.todoService
      .fetchTodoItems(page, pageSize)
      .subscribe(
        (todos: { message: string, todos: TodoModel[], count: number }) => {
          this.todos = todos.todos;
          this.isLoading = false;
          this.count = todos.count;
        });
  }

  showDeleteMessage() {
    this.snackbar.open('Todo item deleted', null, { duration: 2000 });
  }

  deleteItem(itemId: string) {
    this.isLoading = true;
    this.todoService
      .deleteItemById(itemId)
      .subscribe(result => {
        this.fetch(this.page, this.pp);
        this.showDeleteMessage();
      });
  }

  onDelete(item: TodoModel) {
    this.dialog
      .open(DeleteConfirmDialogComponent, { role: 'alertdialog' })
      .afterClosed()
      .subscribe((result: 'yes' | 'no') => {
        if (result === 'yes') {
          this.deleteItem(item._id);
        }
      });
  }
}
