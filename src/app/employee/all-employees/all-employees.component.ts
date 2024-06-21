import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../types/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAnchor } from '@angular/material/button';

@Component({
	selector: 'app-all-employees',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule,
		RouterLink,
		MatProgressBarModule,
		MatAnchor,
	],
	templateUrl: './all-employees.component.html',
	styles: [],
})
export class AllEmployeesComponent implements AfterViewInit {
	@ViewChild('sorter') sorter!: MatSort;
	@ViewChild('paginator') paginator!: MatPaginator;
	employeesResult = inject(EmployeeService).getEmployees();
	dataSource = new MatTableDataSource<Employee>([]);
	columns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'age', 'actions'];

	constructor() {
		effect(() => {
			if (this.employeesResult().data) {
				this.dataSource.data = this.employeesResult().data ?? [];
			}
		});
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sorter;
		this.dataSource.paginator = this.paginator;
	}

	applyFilter($event: any) {
		this.dataSource.filter = $event.target.value.trim().toLowerCase();
	}
}
