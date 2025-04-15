import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee, EMPLOYEES } from '../../data/employee-data';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less'],
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  subscription!: Subscription;

  searchName = '';
  searchEmail = '';
  currentPage = 1;
  itemsPerPage = 10;
  sortField: keyof Employee | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  get filteredEmployees() {
    let filtered = this.employees.filter(
      (e) =>
        e.firstName.toLowerCase().includes(this.searchName.toLowerCase()) &&
        e.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );

    if (this.sortField !== '') {
      filtered = filtered.sort((a, b) => {
        const field = this.sortField as keyof Employee;
        const valA = (a[field] ?? '').toString().toLowerCase();
        const valB = (b[field] ?? '').toString().toLowerCase();
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  get totalPages() {
    const totalFiltered = this.employees.filter(
      (e) =>
        e.firstName.toLowerCase().includes(this.searchName.toLowerCase()) &&
        e.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
    return Math.ceil(totalFiltered.length / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.subscription = this.employeeService.employees$.subscribe(
      (data) => (this.employees = data)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sortBy(field: keyof Employee) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(emp: Employee) {
    this.toastr.warning('Data berhasil di ubah!', 'Berhasil');
  }

  deleteEmployee(emp: Employee) {
    this.toastr.error('Data berhasil di hapus!', 'Berhasil');
  }
}
``;
