import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Lecturer } from '../../models/lecturer.model';
import { LecturersService } from '../../services/lecturers.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {
  courseVideos: string[];
  courseLecturer: Lecturer;
  courseId: string;
  noCourses(){
    return this.courseVideos?.length == 0;
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  handleClick(){
    this._router.navigate(['/editCourse/' + this.courseId]);
  }

  
  myCourse() {
    if (sessionStorage.getItem("username") == this.courseLecturer?.name &&
    sessionStorage.getItem("password") == this.courseLecturer?.password)
      return true;
    return false;
  }


  constructor(private _courseService: CoursesService, private _router: Router,
    private _accr: ActivatedRoute, private sanitizer: DomSanitizer, private _lecturersService: LecturersService) {
  }

  ngOnInit(): void {
    this._accr.paramMap.subscribe(paramMap => {
      if (paramMap.has("id")) {
        this._courseService.getCourseById(paramMap.get("id")).subscribe(course => {
            this.courseVideos = course.videosArr;
            this.courseId = course._id;
            this._lecturersService.getAllLecturers().subscribe(res => {
              this.courseLecturer = res.find(x => x._id == course.kodeLecture)
            }, (err) => {
              console.log(err);
            })
        })
      }
    })
  }
}
