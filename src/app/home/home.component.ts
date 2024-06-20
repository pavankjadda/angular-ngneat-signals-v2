import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AllEmployeesComponent } from '../employee/all-employees/all-employees.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, MatCardModule, AllEmployeesComponent, MatDividerModule],
	template: `
		<div style="margin:2rem">
			<h1 style="display:flex;justify-content: center;font-weight: bold">NgNeat Query Demo with Angular Signals</h1>
		</div>
		<mat-card style="margin: 20px" class="mat-elevation-z24">
			<mat-card-content>
				<h6 class="mat-headline-6" style="display: flex;justify-content: center">Employees</h6>
				<mat-divider />
				<app-all-employees />
			</mat-card-content>
		</mat-card>
	`,
})
export class HomeComponent {}
