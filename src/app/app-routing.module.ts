import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/courses/components/home/home.component';
import { AllCoursesComponent } from './modules/courses/components/all-courses/all-courses.component';
import { AddCourseComponent } from './modules/courses/components/add-course/add-course.component';
import { PageNotFoundComponent } from './modules/courses/components/page-not-found/page-not-found.component';
import { EditCourseComponent } from './modules/courses/components/edit-course/edit-course.component';
import { AuthGuardService } from './modules/courses/services/auth-gurd.service';

const routes: Route[] = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "allCourses", component: AllCoursesComponent, canActivate: [AuthGuardService] },
  { path: "addCourse", component: AddCourseComponent, canActivate: [AuthGuardService] },
  { path: "editCourse/:id", component: EditCourseComponent, canActivate: [AuthGuardService] },
  { path: "connection", loadChildren: () => import("./modules/login/login.module").then(m => m.LoginModule) },
  { path: "logout", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
