import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import {gql} from 'graphql-tag'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent  implements OnInit{
  constructor(private router:Router, private apollo:Apollo){}

  ngOnInit(): void {

    
    if(localStorage.getItem('Login') === 'Successful'){
        
      this.router.navigate(['/']);

    }
  }

  addUser(username:string, email:string ,password:string){

    const signup = gql `mutation Mutation($signUpUsername2: String!, $email: String!, $signUpPassword2: String!) {
      signUp(username: $signUpUsername2, email: $email, password: $signUpPassword2)
    }`;


  this.apollo.mutate<any>({
    mutation: signup,
    variables:{
      signUpUsername2:username,
      email: email,
      signUpPassword2: password

    }
  }).subscribe(({ data }) => {

      console.log('User added successfully', data.addEmployee);
      alert("User addded successfully")
      this.router.navigate(['/login'])
   
  }, error => {
    console.log('Error adding User:'+ error);
    alert("Can't add user")
  });
}


}
