<<<<<<< HEAD
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";

@Injectable()
export class UsersService {
    getAllUsers(): Observable<User[]> {
        return this._http.get<User[]>("/api/users/")
    }

    addUser(user: User): Observable<any> {
        return this._http.post<any>("/api/users/", user);
    }

    deleteUse(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/users/" + id)
    }

    updateUser(updateUser: User, id: Number): Observable<boolean> {
        return this._http.put<boolean>("/api/users/" + id, updateUser);
    }

    loginUser(name: string, password: string): Observable<boolean> {
        return this._http.post<boolean>("/api/users/login", { name, password });
    }

    constructor(private _http: HttpClient) {

    }
=======
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";

@Injectable()
export class UsersService {
    getAllUsers(): Observable<User[]> {
        return this._http.get<User[]>("/api/users/")
    }

    addUser(user: User): Observable<any> {
        return this._http.post<any>("/api/users/", user);
    }

    deleteUse(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/users/" + id)
    }

    updateUser(updateUser: User, id: Number): Observable<boolean> {
        return this._http.put<boolean>("/api/users/" + id, updateUser);
    }

    loginUser(name: string, password: string): Observable<boolean> {
        return this._http.post<boolean>("/api/users/login", { name, password });
    }

    constructor(private _http: HttpClient) {

    }
>>>>>>> 3dba4be4813da7481605fd1bcdeba668f94b0735
}