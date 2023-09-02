import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { FlightService } from '../api/services';
import { BookDto, FlightRm } from '../api/models';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  flightId: string = 'not loaded';
  flight: FlightRm = {};

  form = this.fb.group({
    number: [1, Validators.compose([Validators.required, Validators.min(1), Validators.max(254)])]
  })

  constructor(
    private route:ActivatedRoute,
    private flightService: FlightService, 
    private router: Router,
    private authService: AuthService, 
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.flindFlight(params.get("id"));
    })
  }

  private flindFlight = (flightId: string | null) => {
    this.flightId = flightId ?? 'Not Passed';
    
    this.flightService.findFlight({id: this.flightId})
      .subscribe( flight => {
        this.flight = flight;
      }, this.handleError
      );
  }


  private handleError = (err: any) => { 
    if(err.status == 404) {
      alert("Flight not found"); 
      this.router.navigate(['/search-flights']);
    }

    if(err.status == 409) {
      console.log("err: " + err);
      alert(JSON.parse(err.error).message);
    }
    console.log("Respnse Error. Status:", err.status);
    console.log("Respnse Error. Status Text:", err.statusText);
    console.log(err);
  }

  book() {

    if (this.form.invalid)
      return;

   const booking: BookDto = {
    flightId: this.flight.id,
    passengerEmail: this.authService.currentUser?.email,
    numberOfSeats: this.form.get('number')?.value as number
   }

   this.flightService.bookFlight({body: booking})
    .subscribe(_ => { console.log("succeded")
    this.router.navigate(['/my-booking'])
    }, this.handleError);
  }

  get number() {
    return this.form.controls.number;
  }

}
