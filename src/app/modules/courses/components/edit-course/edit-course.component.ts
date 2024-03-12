import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Course, WayLearning } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CategoriesService } from '../../services/categories.service';
import { Lecturer } from '../../models/lecturer.model';
import { LecturersService } from '../../services/lecturers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  selectedCategory: string;
  categories: Category[];
  private _currentCourse: Course;
  lecturer: Lecturer;

  public get course(): Course {
    return this._currentCourse;
  }
  MyFormGroup: FormGroup = new FormGroup({
    "nameCourse": new FormControl('', [Validators.required]),
    "kodeKategory": new FormControl('', [Validators.required]),
    "amountLessons": new FormControl('', [Validators.required, Validators.min(1)]),
    "startCourseDate": new FormControl('', [Validators.required]),
    "syllabusArr": new FormControl('', [Validators.required]),
    "wayLearning": new FormControl('', [Validators.required]),
    "image": new FormControl('', [Validators.required])
  });

  public set course(course: Course) {
    this._currentCourse = course;
  }

  courseToSave: Course;

  saveCourse() {
    this.categories.forEach(category => {
      if (category.name == this.MyFormGroup.value["kodeKategory"])
        this.MyFormGroup.value["kodeKategory"] = category._id;
    })

    this.courseToSave = new Course(this.MyFormGroup.value["nameCourse"],
      this.MyFormGroup.value["kodeKategory"], this.MyFormGroup.value["amountLessons"],
      this.MyFormGroup.value["startCourseDate"], this.MyFormGroup.
        value["syllabusArr"], this.convertStringToWayLearning(this.MyFormGroup.value["wayLearning"]),
      this.lecturer._id, this.MyFormGroup.value["image"]);

    this._courseService.updateCourse(this.courseToSave, this.courseId).subscribe();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Course was save successfuly!",
      showConfirmButton: false,
      timer: 1500
    });
    this._router.navigate(['/allCourses'])
  }
  convertStringToWayLearning(value: string): number | undefined {
    return WayLearning[value.toLowerCase() as keyof typeof WayLearning];
  }

  constructor(private _router: Router,
    private _courseService: CoursesService,
    private _categoryService: CategoriesService,
    private _accr: ActivatedRoute,
    private _lecturerService: LecturersService
  ) {
    this._categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    }, (err => {
      console.log(err);
    }))
  }

  courseId: string;
  ngOnInit(): void {
    this._lecturerService.getLecturer(sessionStorage.getItem("username"),
      sessionStorage.getItem("password")).subscribe(res => {
        this.lecturer = res;
      });

    this._accr.paramMap.subscribe(paramMap => {
      if (paramMap.has("id")) {
        this.courseId = paramMap.get("id");
        this._courseService.getCourseById(paramMap.get("id")).subscribe(course => {
          this.course = course;
          this.MyFormGroup.patchValue({
            "nameCourse": this._currentCourse.nameCourse,
            "kodeKategory": this._currentCourse.kodeKategory,
            "amountLessons": this._currentCourse.amountLessons,
            "startCourseDate": this._currentCourse.startCourseDate,
            "syllabusArr": this._currentCourse.syllabusArr,
            "wayLearning": this.getwayLearning(),
            "image": this._currentCourse.image
          });
        })
      }
    })
  }

  getwayLearning() {
    if (String(this._currentCourse.wayLearning) == "zoom")
      return "zoom"
    return "frontaly"
  }
}
