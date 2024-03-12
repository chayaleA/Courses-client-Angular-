import { NgModule } from "@angular/core";
import { AddCourseComponent } from "./components/add-course/add-course.component";
import { AllCoursesComponent } from "./components/all-courses/all-courses.component";
import { CourseDetailsComponent } from "./components/course-details/course-details.component";
import { EditCourseComponent } from "./components/edit-course/edit-course.component";
import { UsersService } from "./services/users.service";
import { LecturersService } from "./services/lecturers.service";
import { CoursesService } from "./services/courses.service";
import { CategoriesService } from "./services/categories.service";
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { LearningModeIconPipe } from './components/learning-mode-icon.pipe';


@NgModule({
    declarations: [AddCourseComponent, AllCoursesComponent, CourseDetailsComponent, EditCourseComponent, HomeComponent, HomeComponent, PageNotFoundComponent, DialogContentComponent, LearningModeIconPipe],
    imports: [MatFormFieldModule, HttpClientModule, CommonModule, MatCardModule,
        MatButtonModule, MatGridListModule,
        ReactiveFormsModule, FormsModule, BrowserAnimationsModule, RouterLink,
        MatSelectModule, MatInputModule, MatDialogModule, MatIconModule],
    providers: [UsersService, LecturersService, CoursesService, CategoriesService],
    exports: [AddCourseComponent, AllCoursesComponent, CourseDetailsComponent, EditCourseComponent, HomeComponent, PageNotFoundComponent]
})
export class CoursesModule {

}