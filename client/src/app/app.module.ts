import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DeleteConfirmDialogComponent } from './todo/delete-confirm.dialog';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { TodoService } from './todo/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoDetailComponent,
    TodoEditComponent,
    TodoListComponent,
    DeleteConfirmDialogComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    LayoutModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  entryComponents: [DeleteConfirmDialogComponent],
  providers: [AuthService, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
