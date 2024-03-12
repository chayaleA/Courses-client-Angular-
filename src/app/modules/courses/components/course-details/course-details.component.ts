import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { LecturersService } from '../../services/lecturers.service';
import { Lecturer } from '../../models/lecturer.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})

export class CourseDetailsComponent implements OnInit {
  @Input()
  courseToShow: Course;

  courseCategory: Category;

  courseLecturer: Lecturer;

  constructor(public dialog: MatDialog,private _categoryService: CategoriesService,
     private _router: Router, private _lecturersService: LecturersService) {

  }

  myCourse() {
    if (sessionStorage.getItem("username") == this.courseLecturer?.name &&
    sessionStorage.getItem("password") == this.courseLecturer?.password)
      return true;
    return false;
  }

  edit() {
    this._router.navigate(['/editCourse/' + this.courseToShow._id]);
  }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(res => {
      this.courseCategory = res.find(x => x._id == this.courseToShow.kodeKategory)
    }, (err) => {
      console.log(err);
    })

    this._lecturersService.getAllLecturers().subscribe(res => {
      this.courseLecturer = res.find(x => x._id == this.courseToShow.kodeLecture)
    }, (err) => {
      console.log(err);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: { syllabus: this.courseToShow.syllabusArr }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
