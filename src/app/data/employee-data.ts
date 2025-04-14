export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export const EMPLOYEES: Employee[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  email: `user${i + 1}@email.com`,
  birthDate: '1990-01-01',
  basicSalary: Math.floor(Math.random() * 10000000),
  status: i % 2 === 0 ? 'Permanent' : 'Contract',
  group: `Group ${i % 10}`,
  description: new Date().toISOString(),
}));
