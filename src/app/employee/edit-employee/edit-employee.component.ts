import { Component, computed, effect, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../types/employee';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-employee',
	standalone: true,
	imports: [MatButton, MatCard, MatDivider, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
	templateUrl: './edit-employee.component.html',
	styles: ``,
})
export class EditEmployeeComponent {
	id = input<string>();
	fb = inject(FormBuilder);
	employeeService = inject(EmployeeService);
	router = inject(Router);
	employees = inject(EmployeeService).getEmployees();
	employee = computed(() => this.employees().data?.find((employee) => employee?.id === this.id()));
	formGroup = this.fb.group({
		id: this.fb.control(''),
		firstName: this.fb.control(''),
		lastName: this.fb.control(''),
		email: this.fb.control(''),
		phone: this.fb.control(''),
		age: this.fb.control<number | null>(null),
	});

	constructor() {
		effect(() => {
			if (this.employee()) {
				this.formGroup.patchValue(this.employee() as Partial<Employee>);
			}
		});
	}

	updateEmployee() {
		if (this.formGroup.invalid) return;
		const employee = this.formGroup.value as Employee;
		this.employeeService.updateEmployee(employee).subscribe((_result) => {
			this.router.navigate(['/']);
		});
	}
}
