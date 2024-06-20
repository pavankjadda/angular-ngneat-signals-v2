import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';

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
		path: 'add_employee',
		component: AddEmployeeComponent,
	},
	{
		path: 'delete_employee',
		component: DeleteEmployeeComponent,
	},
];
