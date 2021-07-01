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

    public control: FormControl = new FormControl();
    public searchString: string = '';
    public data: Currency[] = DEF_DATA;


    private range!: Subscription;
    private currency!: Subscription;


    public page: number = 0;
    public size: number = 7;
    public total: number = 0;


    min: any = TuiDay.currentLocal().append({ year: -1 });
    max: any = TuiDay.currentLocal().append({ day: 1 });
    constructor(
        private service: MainComponentService,
        private zone: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.range = this.control.valueChanges.subscribe((date) => {
            if (date === null) return;
            this.service.getCurrencies(date.from.toJSON(), date.to.toJSON())
        })

        this.control.setValue(new TuiDayRange(TuiDay.currentLocal().append({ day: -6 }), TuiDay.currentLocal()));

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

    ngOnDestroy() {
        this.range.unsubscribe();
        this.currency.unsubscribe();
    }
}
