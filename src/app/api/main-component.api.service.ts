import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from '../shared/interfaces/currency.model';
import { API } from '../shared/mocks/api.data';
import { Api } from '../shared/interfaces/api.model';

@Injectable({
    providedIn: 'root'
})

export class MainComponentService {

    currency$: Subject<any[]> = new Subject();

    options: Api = API;

    constructor(
        private readonly http: HttpClient
    ) { }

    getCurrencies(from: string, to: string) {
        const requests: any[] = [];
        this.options.params.forEach(({ code, name }) => {
            requests.push(this.http.get(this.options.url + `${code}?` + `startDate=${from}&endDate=${to}`)
                .pipe(map((res): Currency => {
                    return {
                        name: name,
                        values: Object.values(res).map((elem) => {
                            return {
                                date: elem.Date,
                                rate: elem.Cur_OfficialRate
                            }
                        })
                    }
                })))
        })
        combineLatest(requests).subscribe((res) => {
            this.currency$.next(res)
        })
    }
}