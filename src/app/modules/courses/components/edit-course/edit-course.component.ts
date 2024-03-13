import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
    "videosArr": this.fb.array([]), // שימוש ב-FormArray כאן
    "wayLearning": new FormControl('', [Validators.required]),
    "image": new FormControl('', [Validators.required])
  });

  public set course(course: Course) {
    this._currentCourse = course;
  }

  courseToSave: Course;
  addVideo() {
    const videosArr = this.MyFormGroup.get('videosArr') as FormArray;
    videosArr.push(this.fb.control(''));
  }
  removeVideo(index: number) {
    const videosArr = this.MyFormGroup.get('videosArr') as FormArray;
    videosArr.removeAt(index);
  }
  videosArr: string[]
  saveCourse() {

    this.videosArr = this.MyFormGroup.value['videosArr'].filter(video => video.trim() !== '');

    this.categories.forEach(category => {
      if (category.name == this.MyFormGroup.value["kodeKategory"])
        this.MyFormGroup.value["kodeKategory"] = category._id;
    })


    this.courseToSave = new Course(this.MyFormGroup.value["nameCourse"],
      this.MyFormGroup.value["kodeKategory"], this.MyFormGroup.value["amountLessons"],
      this.MyFormGroup.value["startCourseDate"],
      this.videosArr, this.convertStringToWayLearning(this.MyFormGroup.value["wayLearning"]),
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
    private _lecturerService: LecturersService,
    private fb: FormBuilder
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
            // "videosArr": this.fb.array(this._currentCourse.videosArr.map(video => this.fb.control(video))),
            "wayLearning": this.getwayLearning(),
            "image": this._currentCourse.image
          });

          const videosArr = this.MyFormGroup.get('videosArr') as FormArray;
          this._currentCourse.videosArr.forEach(video => {
            videosArr.push(this.fb.control(video));
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
