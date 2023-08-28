/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { registerPassanger } from '../fn/passanger/register-passanger';
import { RegisterPassanger$Params } from '../fn/passanger/register-passanger';

@Injectable({ providedIn: 'root' })
export class PassangerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerPassanger()` */
  static readonly RegisterPassangerPath = '/Passanger';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerPassanger()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassanger$Response(params?: RegisterPassanger$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return registerPassanger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerPassanger$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerPassanger(params?: RegisterPassanger$Params, context?: HttpContext): Observable<void> {
    return this.registerPassanger$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
