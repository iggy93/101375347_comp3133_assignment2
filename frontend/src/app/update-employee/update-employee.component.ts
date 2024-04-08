import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.less'
})

export class UpdateEmployeeComponent  implements OnInit{

  @Input() id: string =''
 
   data:any;
  
  constructor(private apollo:Apollo){}
  ngOnInit(): void {
     this.apollo.watchQuery<any>({
      query: gql`
        query SearchById($searchByIdId: String!) {
          searchById(id: $searchByIdId) {
            _id
            email
            first_name
            gender
            last_name
            salary
          }
        }`,
      variables: { searchByIdId: this.id }
    }).valueChanges.subscribe(({data,error})=>{
      this.data = data.searchById;

      

        
    });
  }

 

  updateEmployee(firstname: String, lastname: String, email: String, gender: string, salary: string, id: string): void {

    const EDIT_EMPLOYEE = gql`
     mutation Mutation($id: String!, $firstName: String!, $lastName: String!, $email: String!, $gender: String!, $salary: Float!) {
  updateEmployeeById(_id: $id, first_name: $firstName, last_name: $lastName, email: $email, gender: $gender, salary: $salary)
}
    `;  

    const data = {
      "id": id,
      "firstName": firstname,
      "lastName": lastname,
      "email": email,
      "gender": gender,
      "salary": parseFloat(salary) 
    }

    console.log(data)

    this.apollo.mutate<any>({
      mutation: EDIT_EMPLOYEE,
      variables: {
        
       
          ...data
        
      }
    }).subscribe(({ data }) => {
    
        alert("Employee Modify successfully")
     
    }, error => {
      console.log('Error adding employee:'+ error);
      alert()
    });
    

  }
  


}
