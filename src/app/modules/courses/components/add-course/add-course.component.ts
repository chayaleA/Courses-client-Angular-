import { Component, Input, OnInit } from '@angular/core';
import { Course, WayLearning } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { Lecturer } from '../../models/lecturer.model';
import { LecturersService } from '../../services/lecturers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  categories: Category[];
  lecturer: Lecturer;
  courseToSave: Course;
  MyFromGroup: FormGroup = new FormGroup({
    "nameCourse": new FormControl("", [Validators.required]),
    "kodeKategory": new FormControl("", [Validators.required]),
    "amountLessons": new FormControl("", [Validators.required, Validators.min(1)]),
    "startCourseDate": new FormControl("", [Validators.required]),
    "syllabusArr": new FormControl("", [Validators.required]),
    "wayLearning": new FormControl("", [Validators.required]),
    "image": new FormControl("", [Validators.required])
  })

  saveCourse() {
    this.categories.forEach(category => {
      if (category.name == this.MyFromGroup.value["kodeKategory"])
        this.MyFromGroup.value["kodeKategory"] = category._id;
    })

    this.courseToSave = new Course(this.MyFromGroup.value["nameCourse"],
      this.MyFromGroup.value["kodeKategory"], this.MyFromGroup.value["amountLessons"],
      this.MyFromGroup.value["startCourseDate"], this.MyFromGroup.
        value["syllabusArr"], this.convertStringToWayLearning(this.MyFromGroup.value["wayLearning"]),
      this.lecturer._id, this.MyFromGroup.value["image"]);

    this._courseService.addCourse(this.courseToSave).subscribe(res => {
      console.log("course was added successfuly!")
    }, err => {
      console.log(err);
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Course was added successfully!",
      showConfirmButton: false,
      timer: 1500
    });
    this._router.navigate(['/allCourses'])
  }

  convertStringToWayLearning(value: string): number | undefined {
    return WayLearning[value.toLowerCase() as keyof typeof WayLearning];
  }

  constructor(private _router: Router, private _courseService: CoursesService,
    private _categoryService: CategoriesService, private _lecturerService: LecturersService, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    }, (err => {
      console.log(err);
    }))

    this._lecturerService.getLecturer(sessionStorage.getItem("username"),
      sessionStorage.getItem("password")).subscribe(res => {
        this.lecturer = res;
      })
  }
}