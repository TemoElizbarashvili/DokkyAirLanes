import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlightService } from '../api/services';
import { FlightRm } from '../api/models';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  flightId: string = 'not loaded';
  flight: FlightRm = {};

  constructor(private route:ActivatedRoute, private flightService: FlightService, private router: Router) { }

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
    console.log("Respnse Error. Status:", err.status);
    console.log("Respnse Error. Status Text:", err.statusText);
    console.log(err);
  }

}
