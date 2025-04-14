import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee, EMPLOYEES } from '../../data/employee-data';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less'],
})
export class EmployeeListComponent {
  employees: Employee[] = EMPLOYEES;
  searchName = '';
  searchEmail = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private router: Router) {}

  get filteredEmployees() {
    return this.employees
      .filter(
        (e) =>
          e.firstName.toLowerCase().includes(this.searchName.toLowerCase()) &&
          e.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      )
      .slice(
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
    alert(`Edit ${emp.username}`);
  }

  deleteEmployee(emp: Employee) {
    alert(`Delete ${emp.username}`);
  }
}
``;
