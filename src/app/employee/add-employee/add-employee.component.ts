import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../types/employee';

@Component({
	selector: 'app-add-employee',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	template: ` <div style="margin:2rem">
		<h1>Add Employee</h1>
		<hr />

		<form [formGroup]="formGroup">
			<div class="form-group">
				<label for="firstName">First Name:</label>
				<input
					[formControl]="formGroup.controls.firstName"
					type="text"
					class="form-control"
					id="firstName"
					placeholder="Enter First Name" />
			</div>
			<div class="form-group">
				<label for="lastName">Last Name:</label>
				<input [formControl]="formGroup.controls.lastName" type="text" class="form-control" id="lastName" placeholder="Enter Last Name" />
			</div>
			<div class="form-group">
				<label for="email">Email:</label>
				<input [formControl]="formGroup.controls.email" type="email" class="form-control" id="email" placeholder="Enter Email" />
			</div>
			<div class="form-group">
				<label for="phone">Phone:</label>
				<input [formControl]="formGroup.controls.phone" type="text" class="form-control" id="phone" placeholder="Enter Phone" />
			</div>
			<div class="form-group">
				<label for="phone">Age:</label>
				<input [formControl]="formGroup.controls.age" type="number" class="form-control" id="phone" placeholder="Enter Age" />
			</div>

			<br />
			<button type="submit" class="btn btn-primary" (click)="createEmployee()">Submit</button>
		</form>
	</div>`,

	styles: ``,
})
export class AddEmployeeComponent {
	fb = inject(FormBuilder);
	employeeService = inject(EmployeeService);
	formGroup = this.fb.group({
		id: this.fb.control(getRandomInt(1005, 1000000)),
		firstName: this.fb.control(''),
		lastName: this.fb.control(''),
		email: this.fb.control(''),
		phone: this.fb.control(''),
		age: this.fb.control(null),
	});

	createEmployee() {
		if (this.formGroup.invalid) return;
		// @ts-ignore
		const employee: Employee = this.formGroup.value;

		this.employeeService.createEmployee(employee).subscribe({
			next: (result) => {
				console.log(result.data);
			},
			error: (error) => {
				console.error(error);
			},
		});
	}
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	// The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
