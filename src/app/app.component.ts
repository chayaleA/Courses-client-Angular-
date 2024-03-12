import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular-courses';
  toggleNav: boolean = false;
  name: string;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;

    if (scroll >= 70 && width >= 995) {
      // Add styles for scroll
    } else if (scroll == 0 && width >= 995) {
      // Add styles for scroll back to top
    } else if (scroll >= 70 && width < 995) {
      // Add styles for scroll and small screen width
    } else if (scroll == 0 && width < 995) {
      // Add styles for scroll back to top and small screen width
    }
  }

  connect() {
    return (sessionStorage.getItem('username') != null || sessionStorage.getItem('password') != null);
  }

  logout() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Log out successfuly!",
      showConfirmButton: false,
      timer: 2000
    });
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }

  toggleMenu() {
    this.toggleNav = !this.toggleNav;
  }

  sendEmail(email: string) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sending email to: " + email,
      showConfirmButton: false,
      timer: 1500
    });
    const emailData = { from: "chayale96@gmail.com", to: email, subject: 'Congratulation to you', body: 'Love you' };
    return this.http.post('http://localhost:3000/send-email', emailData);
  }

  constructor(private http: HttpClient) {

  }
  
  ngOnInit(): void {
    this.name = sessionStorage.getItem("username");
  }
}
