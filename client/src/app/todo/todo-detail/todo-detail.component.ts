import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from 'src/app/nav/nav.service';

import { DeleteConfirmDialogComponent } from '../delete-confirm.dialog';
import { TodoModel } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
})
export class TodoDetailComponent implements OnInit {
  constructor(
    route: ActivatedRoute,
    public todoService: TodoService,
    private dialog: MatDialog,
    private router: Router,
    navService: NavService
  ) {
    navService.navTitle.next('Loading...');
    todoService
      .fetchTodoItem(route.snapshot.params.id as string)
      .subscribe((item) => {
        this.todo = item;
        this.isLoading = false;
        navService.navTitle.next(item.title);
      });
  }

  todo: TodoModel;
  isLoading = true;

  ngOnInit() {}

  onDelete() {
    this.dialog
      .open(DeleteConfirmDialogComponent)
      .afterClosed()
      .subscribe((result: 'yes' | 'no') => {
        if (result === 'yes') {
          this.isLoading = true;
          this.todoService.deleteItemById(this.todo._id).subscribe(() => {
            this.router.navigate(['/']);
          });
        }
      });
  }

  onEdit() {}
}
