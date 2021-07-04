import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { REQUEST } from '../shared/mocks/request.data';

import { Request, Codes } from '../shared/interfaces/request.model';
import { Currency } from '../shared/interfaces/currency.model';
import { CurrencyRequest } from '../shared/interfaces/currency-request.model';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

@Injectable({
    providedIn: 'root'
})

export class MainComponentService {

    public currency$: Subject<any[]> = new Subject();
    private options: Request = REQUEST;

    constructor(
        private readonly http: HttpClient
    ) { }

    getCurrencies({ from, to }: TuiDayRange): void {

        const requests: Array<Observable<Currency>> = [];

        this.options.currencies.forEach(({ curCode, curName }: Codes) => {
            requests.push(
                this.http.get(this.options.urlBody + `${curCode}?` + `startDate=${from.toJSON()}&endDate=${to.toJSON()}`)
                    .pipe(
                        map((res: Object): Currency => {
                            return {
                                name: curName,
                                values: Object.values(res).map((elem: CurrencyRequest) => {
                                    return {
                                        date: TuiDay.jsonParse(elem.Date),
                                        rate: elem.Cur_OfficialRate
                                    }
                                })
                            }
                        })))
        })
        combineLatest(requests).subscribe((res: Currency[]): void => {
            this.currency$.next(res)
        })
    }
}