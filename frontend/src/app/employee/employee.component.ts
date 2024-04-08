

import { Component, OnInit } from '@angular/core';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { trigger, transition, style, animate } from '@angular/animations';

interface Employee {
  __typename: string;
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  salary: number;
}

interface EmployeeData {
  getAllEmployee: Employee[];
}

const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployee {
      _id
      email
      first_name
      gender
      last_name
      salary
    }
  }
`;

const DELETE_EMPLOYEE_BY_ID = gql`
  mutation DeleteEmployeeById($id: String!) {
    deleteEmployeeById(_id: $id)
  }
`;

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.less'
})
export class EmployeeComponent implements OnInit{

  allemployee: any[] = [];
  selectedEmployee: Employee | null = null;

  

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }
  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  trackById(index: number, employee: Employee): any {
    return employee._id;
  }
  
  fetchEmployeeData(): void {
    this.apollo.watchQuery<EmployeeData>({
      query: GET_ALL_EMPLOYEES
    }).valueChanges.subscribe(({ data, error }) => {
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }
      if (data) {
        this.allemployee = data.getAllEmployee;
      }
    });
  }

  deleteEmployee(id: string): void {
    this.apollo.mutate<any>({
      mutation: DELETE_EMPLOYEE_BY_ID,
      variables: { id }
    }).subscribe(({ data }) => {
      if (data && data.deleteEmployeeById) {
        this.allemployee = this.allemployee.filter(emp => emp._id !== id);
        alert('Employee deleted successfully');
      } else {
        alert('Failed to delete employee');
      }
    }, error => {
      console.error('Error deleting employee:', error);
      alert('An error occurred while deleting employee');
    });
  }

 


}
