import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterPassengerComponent } from './register-passenger/register-passenger.component';

const routes: Routes = [
  { path: '', component: SearchFlightsComponent, pathMatch: 'full'},
  { path: 'search-flights', component: SearchFlightsComponent },
  { path: 'book-flight/:id', component: BookFlightComponent },
  { path: 'register-passenger', component: RegisterPassengerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
