import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { AllEmployeesComponent } from './employee/all-employees/all-employees.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'employee',
		component: AllEmployeesComponent,
	},
	{
		path: 'employee/add',
		component: AddEmployeeComponent,
	},
	{
		path: 'employee/edit/:id',
		component: EditEmployeeComponent,
	},
	{
		path: 'employee/delete/:id',
		component: DeleteEmployeeComponent,
	},
];
