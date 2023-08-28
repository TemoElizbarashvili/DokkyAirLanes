import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { PassangerService } from '../api/services';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {
  
  form = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    isFemale: [true]
  })

  constructor(private passangerService: PassangerService, private fb: FormBuilder) { }


  ngOnInit(): void {
    
  }

  register() {
    this.passangerService.registerPassanger({body: this.form.value})
      .subscribe(res => console.log(res));
  }

}
