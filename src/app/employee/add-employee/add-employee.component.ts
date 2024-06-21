import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../types/employee';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-employee',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, MatCard, MatDivider, MatInput, MatFormField, MatLabel, MatButton],
	templateUrl: './add-employee.component.html',
	styles: ``,
})
export class AddEmployeeComponent {
	fb = inject(FormBuilder);
	router = inject(Router);
	employeeService = inject(EmployeeService);
	formGroup = this.fb.group({
		id: this.fb.control(Math.floor(Math.random() * 100000)),
		firstName: this.fb.control(''),
		lastName: this.fb.control(''),
		email: this.fb.control(''),
		phone: this.fb.control(''),
		age: this.fb.control<number | null>(null),
	});

	createEmployee() {
		if (this.formGroup.invalid) return;
		const employee: Employee = this.formGroup.value as Employee;
		this.employeeService.createEmployee().mutate(employee, {
			onSuccess: () => {
				this.router.navigate(['/']);
			},
		});
	}
}
