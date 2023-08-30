/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findPassanger } from '../fn/passanger/find-passanger';
import { FindPassanger$Params } from '../fn/passanger/find-passanger';
import { findPassanger$Plain } from '../fn/passanger/find-passanger-plain';
import { FindPassanger$Plain$Params } from '../fn/passanger/find-passanger-plain';
import { PassangerRm } from '../models/passanger-rm';
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

  /** Path part for operation `findPassanger()` */
  static readonly FindPassangerPath = '/Passanger/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPassanger$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassanger$Plain$Response(params: FindPassanger$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PassangerRm>> {
    return findPassanger$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPassanger$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassanger$Plain(params: FindPassanger$Plain$Params, context?: HttpContext): Observable<PassangerRm> {
    return this.findPassanger$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<PassangerRm>): PassangerRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPassanger()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassanger$Response(params: FindPassanger$Params, context?: HttpContext): Observable<StrictHttpResponse<PassangerRm>> {
    return findPassanger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPassanger$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPassanger(params: FindPassanger$Params, context?: HttpContext): Observable<PassangerRm> {
    return this.findPassanger$Response(params, context).pipe(
      map((r: StrictHttpResponse<PassangerRm>): PassangerRm => r.body)
    );
  }

}
