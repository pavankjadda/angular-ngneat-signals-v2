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
	id = input<number>();
	fb = inject(FormBuilder);
	employeeService = inject(EmployeeService);
	router = inject(Router);
	employees = inject(EmployeeService).getEmployees();
	employee = computed(() => this.employees().data?.find((employee) => employee?.id === this.id()));
	formGroup = this.fb.group({
		id: this.fb.control<number | null>(null),
		firstName: this.fb.control(''),
		lastName: this.fb.control(''),
		email: this.fb.control(''),
		phone: this.fb.control(''),
		age: this.fb.control(null),
	});

	constructor() {
		effect(() => {
			if (this.employee()) {
				// @ts-ignore
				this.formGroup.patchValue(this.employee());
			}
		});
	}

	updateEmployee() {
		if (this.formGroup.invalid) return;
		// @ts-ignore
		const employee: Employee = this.formGroup.value;

		this.employeeService.updateEmployee(employee).subscribe({
			next: (_result) => {
				this.router.navigate(['/employee']);
			},
			error: (error) => {
				console.error(error);
			},
		});
	}
}
