import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username: string = "";
  password: string = "";

  loginForm:boolean = true;
  loggedIn:boolean = true;
  constructor(public authService:AuthServiceService){

  }

  
  login() {
    console.log("Click")
    this.authService.login({username: this.username, password: this.password})
  }
  register() {
    this.authService.register({username: this.username, password: this.password}).subscribe(res => {
      console.log(res)
    })
  }
  logout(){
    this.authService.logout()
  }

}
