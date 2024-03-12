import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/modules/courses/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  hide = true;
  passwordVisible = false;
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  username: string;
  password: string;

  constructor(private _userService: UsersService, private _router: Router) {

  }

  checkUser(): void {
    this._userService.loginUser(this.username, this.password).subscribe(
      response => {
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
        this._router.navigate(["/home"]);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('User not found.');
          Swal.fire({
            position: "center",
            icon: "error",
            title: "You are not registerted!",
            showConfirmButton: false,
            timer: 1500
          });
        } else if (error.status === 401) {
          console.log('Unauthorized: Incorrect username or password.');
        } else if (error.error && error.error.error === 'User exists') {
          console.log('User exists.');
        } else {
          console.error('An unexpected error occurred:', error.error);
        }
        this._router.navigate(["/connection/register"]);
      });
  }
  yourFunction() {
    alert("bana")
  }
}
