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
		}).result;
	}

	createEmployee(employee: Employee) {
		return this.httpClient.post<Employee>('http://localhost:3000/employees', employee).pipe(
			tap((newEmployee) =>
				// @ts-ignore
				this.queryClient.setQueryData(['employees'], (old) => [...old, newEmployee])
			)
		);
	}

	updateEmployee(employee: Employee) {
		return this.httpClient.put<Employee>(`http://localhost:3000/employees/${employee.id}`, employee).pipe(
			tap((newEmployee) =>
				this.queryClient.setQueriesData(
					{
						queryKey: ['employees'],
					},
					(old: Employee[] | undefined) => old?.map((e) => (e.id === newEmployee.id ? newEmployee : e))
				)
			)
		);
	}
}
