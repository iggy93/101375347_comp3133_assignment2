import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';




import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent  implements OnInit{

  

  loginDetail:string = '';

  constructor(private apollo:Apollo,private router: Router, private location:Location){}
  ngOnInit(): void {

    
    if(localStorage.getItem('Login') === 'Successful'){
        
      this.router.navigate(['/']);

    }

    

    
  }

  loginUser(username:string, password:string):void{

    this.apollo.watchQuery<any>({
      query: gql`
      query Query($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
      }
      `,
      variables:{
        "username": username,
        "password": password
      }
      
      
    }).valueChanges.subscribe(({data,error})=>{
      console.log(data.loginUser)
      if(data.loginUser=="Successful"){
        localStorage.setItem('Login' , 'Successful')
      }
      console.log(localStorage.getItem('Login'))

      if(localStorage.getItem('Login') === 'Successful'){
        
        window.location.reload()

      }

      alert(data.loginUser)
        
    });
   
   
  }
  
 

  

  

}
