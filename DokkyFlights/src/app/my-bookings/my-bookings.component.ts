import { Component, OnInit } from '@angular/core';
import { BookDto, BookingRm } from '../api/models';
import { BookingService } from '../api/services';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingRm[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.bookingService.listBooking({ email: this.authService.currentUser?.email?? '' })
      .subscribe(result => {
        this.bookings = result;
      }, this.handleError );
  }

  private handleError(err: any) {
    console.log("Response Erro, Status:", err.Status);
    console.log(err);
  }

  onCancel(booking: BookingRm) {
    const dto: BookDto = {
      flightId: booking.flightId,
      numberOfSeats: booking.numberOfSeats,
      passengerEmail: booking.passengerEmail
    };
    this.bookingService.cancelBooking({ body: dto })
      .subscribe(_ => this.bookings = this.bookings.filter(b => b != booking),
       this.handleError);
  }

}
