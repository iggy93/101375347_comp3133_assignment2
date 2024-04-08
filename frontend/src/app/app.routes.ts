import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

export const routes: Routes = [
    {path:'', component: EmployeeComponent},
    {path:'addEmployee', component: AddEmployeeComponent},
    {path:'edit/:id',component: UpdateEmployeeComponent },
    {path:'login',component: LoginComponent },
    {path:'register',component: RegisterComponent },
   

];
