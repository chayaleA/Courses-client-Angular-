import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Lecturer } from "../models/lecturer.model";

@Injectable()
export class LecturersService {
    getLecturer(name: string, password: string): Observable<any> {
        return this._http.post<any>("/api/lecturers/getLecturer", { name, password });
    }

    getAllLecturers(): Observable<Lecturer[]> {
        return this._http.get<Lecturer[]>("/api/lecturers/")
    }

    addLecturer(lecturer: Lecturer): Observable<boolean> {
        return this._http.post<boolean>("/api/lecturers/", lecturer);
    }

    deleteLecturer(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/lecturers/" + id)
    }

    updateLecturer(updateLecturer: Lecturer, id: Number): Observable<boolean> {
        return this._http.put<boolean>("/api/lecturers/" + id, updateLecturer);
    }
    constructor(private _http: HttpClient) {

    }
}