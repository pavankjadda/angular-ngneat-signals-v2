import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Employee } from "../../types/employee";
import { EmployeeService } from "../../services/employee.service";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  initializeState,
  markError,
  markLoading,
  markSuccess,
} from "../../util/progress-util";
import { delay } from "rxjs";
import { RouterLink } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-all-employees",
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
  ],
  templateUrl: "./all-employees.component.html",
  styles: [],
})
export class AllEmployeesComponent implements AfterViewInit, OnInit {
  @ViewChild("sorter") sorter!: MatSort;
  @ViewChild("paginator") paginator!: MatPaginator;
  employeeService = inject(EmployeeService);
  dataSource = new MatTableDataSource<Employee>([]);
  columns: string[] = ["id", "firstName", "lastName", "email", "phone", "age"];
  loadingState = initializeState();

  ngOnInit(): void {
    markLoading(this.loadingState);
    this.employeeService
      .getEmployees()
      .pipe(delay(1000))
      .subscribe({
        next: (result) => {
          if (result.data) {
            this.dataSource.data = result.data;
          }
          markSuccess(this.loadingState);
        },
        error: (error) => {
          console.error(error);
          markError(this.loadingState);
        },
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
