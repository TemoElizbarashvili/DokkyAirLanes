import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PassangerService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {
  
  form = this.fb.group({
    email: ['', Validators.compose([Validators.email, Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
    isFemale: [true, Validators.required]
  })
  requestedUrl?: string = undefined;

  constructor(private passangerService: PassangerService, private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.requestedUrl = p['requestedUrl']
    }, err => {
      console.log(err);
    }
    );
  }

  checkPassanger() : void {
    const params = {email: this.form.get('email')?.value as string};

    this.passangerService.findPassanger(params)
      .subscribe(
        this.login, e => {
          if(e.status != 404)
            console.error(e);
        }
      );
  } 

  register() {

    if (this.form.invalid)
      return;

    this.passangerService.registerPassanger({body: this.form.value})
      .subscribe(this.login,  error => {
        console.log(error);
      });
  }

  private login = () => {
    this.authService.loginUser({ email: this.form.get('email')?.value as string});
    this.router.navigate([this.requestedUrl ?? '/search-flights']);
  }

}
