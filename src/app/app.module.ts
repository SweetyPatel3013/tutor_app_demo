import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginPageComponent} from "./components/registration/containers/login-page/login-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {
  RegistrationFormComponent
} from "./components/registration/containers/registration-form/registration-form.component";
import {AuthGuardModule} from "@angular/fire/auth-guard";
import {AuthModule} from "./core/services/auth/auth.module";
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {environment} from "../environments/environment";
import { StudentComponent } from './components/dashboard/student/student.component';
import { TutorComponent } from './components/dashboard/tutor/tutor.component';
import { OperatorComponent } from './components/dashboard/operator/operator.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { SuperAdminComponent } from './components/dashboard/super-admin/super-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from "./core/guard/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationFormComponent,
    StudentComponent,
    TutorComponent,
    OperatorComponent,
    AdminComponent,
    SuperAdminComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    AuthGuardModule,
    AuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    AuthGuard,
    LoginPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
