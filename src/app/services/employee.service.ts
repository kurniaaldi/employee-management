import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee, EMPLOYEES } from '../data/employee-data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>(EMPLOYEES);
  employees$ = this.employeesSubject.asObservable();

  get employees(): Employee[] {
    return this.employeesSubject.getValue();
  }

  addEmployee(newEmployee: Employee) {
    const current = this.employees;
    newEmployee.id = current.length
      ? Math.max(...current.map((e) => e.id)) + 1
      : 1;
    this.employeesSubject.next([...current, newEmployee]);
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find((e) => e.id === id);
  }
}
