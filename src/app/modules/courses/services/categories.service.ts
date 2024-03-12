<<<<<<< HEAD
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";

@Injectable()
export class CategoriesService {
    getAllCategories(): Observable<Category[]> {
        return this._http.get<Category[]>("/api/categories/")
    }

    addCategory(category: Category): Observable<boolean> {
        return this._http.post<boolean>("/api/categories/", category);
    }

    deleteCategory(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/categories/" + id)
    }

    updateCategory(updateCategory: Category, id: Number): Observable<boolean> {
        return this._http.put<boolean>("/api/categories/" + id, updateCategory);
    }
    constructor(private _http: HttpClient) {

    }
=======
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category.model";

@Injectable()
export class CategoriesService {
    getAllCategories(): Observable<Category[]> {
        return this._http.get<Category[]>("/api/categories/")
    }

    addCategory(category: Category): Observable<boolean> {
        return this._http.post<boolean>("/api/categories/", category);
    }

    deleteCategory(id: number): Observable<boolean> {
        return this._http.delete<boolean>("/api/categories/" + id)
    }

    updateCategory(updateCategory: Category, id: Number): Observable<boolean> {
        return this._http.put<boolean>("/api/categories/" + id, updateCategory);
    }
    constructor(private _http: HttpClient) {

    }
>>>>>>> 3dba4be4813da7481605fd1bcdeba668f94b0735
}