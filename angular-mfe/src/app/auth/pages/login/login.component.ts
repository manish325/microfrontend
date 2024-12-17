import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from 'src/app/store/store.service';
import { users } from 'src/utils copy/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl('')
  })

  constructor(
    private storeService : StoreService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const {email, password} = this.loginForm.value;
    const validUser = users.find(u => u.email === email && u.password === password);
    if(validUser) {
      this.storeService.setUserState(validUser);
    }
  }

}
