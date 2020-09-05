import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  currentUser: UserModel;

  signUp(user: UserModel) {
    return this.httpClient
      .post('/api/user', user)
      .pipe(map((value) => value as UserModel));
  }

  logIn(email: string, password: string) {
    const logInRequest = this.httpClient
      .get(`/api/user?email=${email}&password=${password}`)
      .pipe(map((value) => value as UserModel));

    logInRequest.subscribe(
      (result) => {
        this.currentUser = result;
      },
      (error) => {
        console.log("Couldn't log in");
        console.log(error);
      }
    );

    return logInRequest;
  }
}
