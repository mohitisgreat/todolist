import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { NavService } from '../../nav/nav.service';
import { TodoModel } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss'],
})
export class TodoEditComponent {
  mode: 'create' | 'edit' = undefined;
  id: string = null;
  isLoading = false;

  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private todoService: TodoService,
    route: ActivatedRoute,
    private router: Router,
    navService: NavService,
    private snackbar: MatSnackBar
  ) {
    const mode = route.snapshot.url[0].path;
    switch (mode) {
      case 'create':
        this.mode = 'create';
        navService.navTitle.next('Add a new todo item');
        break;
      case 'edit':
        navService.navTitle.next('Edit the existing item!');
        this.mode = 'edit';
        this.id = route.snapshot.queryParams.id as string;
        console.log(this.id);
        if (!this.id) {
          throw Error('No id provided to edit route');
        } else {
          this.populateEditForm();
        }
        break;
      default:
        throw Error('This component is not made to handle this type of pages!');
    }
  }

  populateEditForm() {
    this.isLoading = true;

    this.todoService.fetchTodoItem(this.id).subscribe((value) => {
      this.isLoading = false;
      this.editForm.setValue({
        title: value.title,
        description: value.description,
        dueDate: value.dueDate,
      });
    });
  }

  isCreate(): boolean {
    return this.mode === 'create';
  }

  isEdit(): boolean {
    return this.mode === 'edit';
  }

  onSubmit() {
    const item: TodoModel = {
      title: this.editForm.value.title,
      description: this.editForm.value.description,
      dueDate: this.editForm.value.dueDate,
      isCompleted: false,
    };

    if (this.isCreate()) {
      this.editForm.reset();

      this.todoService.addTodoItem(item).subscribe(() => {
        this.snackbar.open(
          'Your task is successfully added to your todo list!',
          '',
          { duration: 2000 }
        );
      });
    } else {
      // is edit
      this.isLoading = true;
      this.todoService.editItemById(this.id, item).subscribe((value) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      });
    }
  }
}
