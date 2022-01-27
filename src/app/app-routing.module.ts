import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./components/registration/containers/login-page/login-page.component";
import {
  RegistrationFormComponent
} from "./components/registration/containers/registration-form/registration-form.component";
import {StudentComponent} from "./components/dashboard/student/student.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {SuperAdminComponent} from "./components/dashboard/super-admin/super-admin.component";
import {AdminComponent} from "./components/dashboard/admin/admin.component";
import {OperatorComponent} from "./components/dashboard/operator/operator.component";
import {TutorComponent} from "./components/dashboard/tutor/tutor.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path:'sign-up',
    component: RegistrationFormComponent
  },
  {
    path: 'sign-in',
    component: LoginPageComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'student',
    component: StudentComponent
  },
  {
    path:'tutor',
    component: TutorComponent
  },
  {
    path:'operator',
    component: OperatorComponent
  },
  {
    path:'admin',
    component: AdminComponent
  },
  {
    path:'super-admin',
    component: SuperAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
