import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GROUPS } from '../../data/group-data';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.less'],
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  groups = GROUPS;
  filteredGroups = GROUPS;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSave() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService.addEmployee(this.employeeForm.value);
    this.toastr.success('Data berhasil disimpan!');
    this.router.navigate(['/employees']);
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  filterGroup(evt: any) {
    const filterValue = (evt.target as HTMLInputElement).value;
    this.filteredGroups = this.groups.filter((g) =>
      g.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}
