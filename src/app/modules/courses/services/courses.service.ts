import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Course } from "../models/course.model";

@Injectable()
export class CoursesService {
    getAllCourses(): Observable<Course[]> {
        return this._http.get<Course[]>("/api/courses/")
    }
    getCourseById(courseId: string): Observable<Course> {
        return this._http.get<Course>(`/api/courses/${courseId}`);
    }
    addCourse(course: Course): Observable<boolean> {
        return this._http.post<boolean>("/api/courses/", course);
    }

    deleteCourse(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/courses/" + id)
    }

    updateCourse(updateCourse: Course, id: string): Observable<boolean> {
        return this._http.put<boolean>("/api/courses/" + id, updateCourse);
    }
    constructor(private _http: HttpClient) {

    }
}