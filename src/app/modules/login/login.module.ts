import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginRoutingModule } from "./login-routing.module";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [MatButtonModule, LoginRoutingModule, FormsModule, RouterLink, MatFormFieldModule, MatIconModule, MatInputModule],
    providers: [],
    exports: [LoginComponent, RegisterComponent]
})
export class LoginModule {

}