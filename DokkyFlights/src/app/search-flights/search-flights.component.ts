import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { FlightService } from "../api/services";
import { FlightRm } from "../api/models";
import { SearchFlight$Params } from "../api/fn/flight/search-flight";

@Component({
    selector: 'app-search-flights',
    templateUrl: './search-flights.component.html',
    styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {
    
    searchResult: FlightRm[] =[];

    searchForm = this.fb.group({
        from: [''],
        destination: [''],
        fromDate: [''],
        toDate: [''],
        numberOfPassangers: [1]
    })

    constructor(private flightService: FlightService, private fb: FormBuilder) { }


    ngOnInit(): void {
        this.search();
    } 

    search() {
        const params: SearchFlight$Params = {
            from: this.searchForm.value.from?? '',
            destination: this.searchForm.value.destination?? '',
            fromDate: this.searchForm.value.fromDate?? '',
            toDate: this.searchForm.value.toDate?? '',
            numberOfPassengers: this.searchForm.value.numberOfPassangers?? 1,
        }
        this.flightService.searchFlight(params).subscribe( response => this.searchResult = response, this.handleError);
    }

    private handleError(err: any) { 
        console.log("Respnse Error. Status:", err.Status);
        console.log("Respnse Error. Status Text:", err.StatusText);
        console.log(err);
    }

}

