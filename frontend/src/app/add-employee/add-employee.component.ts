import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import {Router} from '@angular/router'



@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.less'
})
export class AddEmployeeComponent {

  constructor(private apollo: Apollo, private router:Router) {}


  addEmployee(firstname: String, lastname: String, email: String, gender: string, salary: string): void {
    const ADD_EMPLOYEE = gql`
      mutation AddEmployee($firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
  addEmployee(first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, salary: $salary)
}
    `;  

    const data = {
      "firstName": firstname,
      "lastName": lastname,
      "email": email,
      "gender": gender,
      "salary": parseFloat(salary) 
    }

    console.log(data)

    this.apollo.mutate<any>({
      mutation: ADD_EMPLOYEE,
      variables: {
        
       
          ...data
        
      }
    }).subscribe(({ data }) => {
      if (data && data.addEmployee) {
        console.log('Employee added successfully', data.addEmployee);
        alert("Employee addded successfully")
        this.router.navigate(['/'])
       
      } else {
        console.error('Failed to add employee');
        alert()
      }
    }, error => {
      console.log('Error adding employee:'+ error);
      alert()
    });
  }

}
