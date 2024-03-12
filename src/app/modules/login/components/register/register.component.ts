import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/courses/models/user.model';
import { UsersService } from 'src/app/modules/courses/services/users.service';

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
