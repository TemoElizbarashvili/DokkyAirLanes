/* tslint:disable */
/* eslint-disable */
import { TimePlaceRm } from '../models/time-place-rm';
export interface BookingRm {
  airline?: null | string;
  arrival?: TimePlaceRm;
  departure?: TimePlaceRm;
  flightId?: string;
  numberOfSeats?: number;
  passengerEmail?: null | string;
  price?: null | string;
}
