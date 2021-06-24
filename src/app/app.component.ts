import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainComponentService } from './api/main-component.api.service';
import { Currency } from './shared/interfaces/currency.model';
import { Deval } from './shared/interfaces/dval.model';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { DEF_DATA } from './shared/mocks/def-data.data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, OnDestroy {

    control = new FormControl();


    range!: Subscription;
    currency!: Subscription;

    searchString: string = '';
    data: Currency[] = DEF_DATA;
    page: number = 0;
    size: number = 7;
    total: number = 0;


    constructor(
        private service: MainComponentService,
        private zone: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.range = this.control.valueChanges.subscribe(({ from, to }) => {
            this.service.getCurrencies(
                Object.values(from).join('-'),
                Object.values(to).join('-')
            )
        })
        this.control.setValue(new TuiDayRange(new TuiDay(...this.getTodayDate()), new TuiDay(...this.getTodayDate(6))));
        this.currency = this.service.currency$.subscribe((val) => {
            this.total = val[0].values.length;
            this.data = val;
            this.zone.detectChanges();
        })
    }

    isExtreme(value: number, mass: Deval[], mode: string): boolean {
        if (mode === 'min') {
            return value === Math.min(...mass.map(elem => elem.rate));
        } else if (mode === 'max') {
            return value === Math.max(...mass.map(elem => elem.rate));
        }
        return false;
    }

    public cut(data: any[]): any[] {
        return data.slice(this.page * this.size, (this.page + 1) * this.size)
    }

    getTodayDate(set: number = 0): [number, number, number] {
        let date = new Date();
        date.setDate(date.getDate() + set);
        return [date.getFullYear(), date.getMonth(), date.getDate()]
    }

    ngOnDestroy() {
        this.range.unsubscribe();
        this.currency.unsubscribe();
    }
}
