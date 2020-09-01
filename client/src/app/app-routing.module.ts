import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'create', component: TodoEditComponent },
  { path: 'edit', component: TodoEditComponent },
  { path: 'todo/:id', component: TodoDetailComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
