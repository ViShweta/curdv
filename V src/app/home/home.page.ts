import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { ServiceNameService } from '../service-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginFrom: FormGroup;
  formSubmitted: boolean = false;
  userData: any[] = [];
  userlist: any = [];



  constructor(
    private alertController: AlertController,
    private service: ServiceNameService,
    private router: Router,
    public localStorageService: LocalStorageService,


  ) {
    this.loginFrom = new FormGroup({

      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("",),

    });


  }
  onLogin(value: any) {
    console.log("onLogin:", value);
    // var saved_data = JSON.parse(localStorage.getItem('userList') as string);
    // console.log(saved_data)
    // for (let i = 0; i <= this.userlist.length - 1; i++) {
    //   this.service.presentAlert("Eamail not Found! .");
    //   if (this.userlist[i].email == value.email && this.userlist[i].password == value.password) {
    //     // this.showPassword = !this.showPassword;
    //     this.loginFrom.reset();
    //     this.service.presentAlert("Login Suceessfully.");
    //     this.router.navigate(['view/', value.email]);
    //   }
    // }

  }


}
