import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/courses/models/user.model';
import { UsersService } from 'src/app/modules/courses/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  address: string;

  userToAdd: User;
  addUser() {
    if (!this.username || !this.password || !this.email || !this.address) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill in all fields!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(this.password)) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password must contain at least one digit, one letter, and one special character!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    this.userToAdd = new User(this.username, this.address, this.email, this.password);
    this._userService.addUser(this.userToAdd).subscribe(res => {
      console.log("register successfully!");
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('password', this.password);
      this._router.navigate(["/allCourses"]);
    }, err => {
      console.log(err);
    })
  }

  constructor(private _userService: UsersService, private _router: Router) {

  }
  ngOnInit(): void {
  }
}
