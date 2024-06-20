import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../types/employee';
import { injectQuery, injectQueryClient } from '@ngneat/query';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	httpClient = inject(HttpClient);
	useQuery = injectQuery();
	queryClient = injectQueryClient();

	getEmployees() {
		return this.useQuery({
			queryKey: ['employees'],
			queryFn: () => this.httpClient.get<Employee[]>('http://localhost:3000/employees'),
		}).result$;
	}

	createEmployee(employee: Employee) {
		return this.useQuery({
			queryKey: ['employees'],
			queryFn: () =>
				this.httpClient.post<Employee>('http://localhost:3000/employees', employee).pipe(
					tap((newEmployee) =>
						this.queryClient.setQueriesData({ queryKey: ['employees', employee.id] }, (oldEmployees: Employee[] | undefined) => {
							console.log('oldEmployees', oldEmployees);
							if (oldEmployees) {
								return [...oldEmployees, newEmployee];
							}
							return [newEmployee];
						})
					)
				),
		}).result$;
	}

	updateEmployee(employee: Employee) {
		return this.useQuery({
			queryKey: ['employees'],
			queryFn: () => this.httpClient.get<Employee[]>('http://localhost:3000/employees'),
		}).result$;
	}
}
