/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PassangerRm } from '../../models/passanger-rm';

export interface FindPassanger$Params {
  email: string;
}

export function findPassanger(http: HttpClient, rootUrl: string, params: FindPassanger$Params, context?: HttpContext): Observable<StrictHttpResponse<PassangerRm>> {
  const rb = new RequestBuilder(rootUrl, findPassanger.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PassangerRm>;
    })
  );
}

findPassanger.PATH = '/Passanger/{email}';
