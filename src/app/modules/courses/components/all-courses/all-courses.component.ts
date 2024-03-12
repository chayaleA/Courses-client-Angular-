import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {

  courses: Course[];

  filterCourses: Course[];

  private searchSubject = new Subject<string>();

  searchCourses$: Observable<Course[]>;

  searchText: string = "";

  noCourses(){
    return this.filterCourses.length ==0;
  }
  searchCourses(term: string): Observable<Course[]> {
    return new Observable((observer) => {
      if (term.trim() === "")
        observer.next(this.courses);
      else {
          const filterCourses = this.courses.filter(course => 
          course?.nameCourse.toLowerCase().includes(term.toLowerCase())
        );
        observer.next(filterCourses)
      }
    })
  }

  onSearchInputChange(): void{
    this.searchSubject.next(this.searchText)
  }

  private setupSearchObservable(): void{
    this.searchCourses$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchCourses(term))
    );
    this.searchCourses$.subscribe((result: Course[]) =>{
      this.filterCourses = result;
    })
  }

  constructor(private _coursesService: CoursesService) {

  }

  ngOnInit(): void {
    this._coursesService.getAllCourses().subscribe(res => {
      this.filterCourses = res;
      this.courses = res;
      this.setupSearchObservable();
    }, (err) => {
      console.log(err)
    })
  }
}
