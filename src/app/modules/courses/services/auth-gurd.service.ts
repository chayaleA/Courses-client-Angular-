<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    constructor(private _router: Router) { }

    canActivate(): boolean {
        if (sessionStorage.getItem("username") === null && sessionStorage.getItem("password") === null) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You are not connected!",
                showConfirmButton: false,
                timer: 1500
              });
            this._router.navigate(['/connection/login'])
            return false;
        }
        return true;
    }
}

=======
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    constructor(private _router: Router) { }

    canActivate(): boolean {
        if (sessionStorage.getItem("username") === null && sessionStorage.getItem("password") === null) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You are not connected!",
                showConfirmButton: false,
                timer: 1500
              });
            this._router.navigate(['/connection/login'])
            return false;
        }
        return true;
    }
}

>>>>>>> 3dba4be4813da7481605fd1bcdeba668f94b0735
