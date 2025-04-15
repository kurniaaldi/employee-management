import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee, EMPLOYEES } from '../../data/employee-data';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.less'],
})
export class EmployeeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employee: Employee | undefined;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = EMPLOYEES.find((emp) => emp.id === id);
  }

  backToList() {
    this.router.navigate(['/employees']); // search state disimpan via memory Angular
  }
}
