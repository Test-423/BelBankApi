import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MainComponentService } from './api/main-component.api.service';
import { Currency } from './shared/interfaces/currency.model';
import { DateParams } from './shared/interfaces/date-params.model';
import { TuiContextWithImplicit, TuiDay, TuiDayRange, TuiStringHandler } from '@taiga-ui/cdk';
import { Subscription } from 'rxjs';
import { DEF_DATA } from './shared/mocks/def-data.data';
import { TuiPoint } from '@taiga-ui/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements OnInit, OnDestroy {

    public dateControl: FormControl = new FormControl();
    public curList: Currency[] = DEF_DATA;

    public readonly minDate: any = TuiDay.currentLocal().append({ year: -1 });
    public readonly maxDate: any = TuiDay.currentLocal().append({ day: 1 });
    public readonly axisYLabels = ['2', '2.5', '3', '3.5', '4'];
    public currentPage: number = 0;
    public pageSize: number = 7;
    public totalPages: number = 0;
    public searchString: string = '';
    public isActiveChart: boolean = false;


    private dateRangeSubs!: Subscription;
    private currListSubs!: Subscription;



    public readonly hint: TuiStringHandler<TuiContextWithImplicit<ReadonlyArray<TuiPoint>>> = ({ $implicit }) => {
        return `${this.dateControl.value.from.append({
            day: $implicit[0][0]
        }).toString()} \n\n${$implicit.map(([_, y], index) => this.curList[index].name + ' - ' + y).join('\n')}`;
    };

    public readonly strtringify: TuiStringHandler<number> = (e: number): string => {
        return this.dateControl.value.from.append({ day: e }).toString();
    };


    constructor(
        private apiServics: MainComponentService,
        private zoneDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.dateRangeSubs = this.dateControl.valueChanges.subscribe((date: TuiDayRange): void => {
            if (date === null) return;
            this.apiServics.getCurrencies(date);
        });

        this.currListSubs = this.apiServics.currency$.subscribe((val: Currency[]): void => {
            this.totalPages = val[0].values.length;
            this.curList = val;
            this.currentPage = 0;
            this.zoneDetector.detectChanges();
        });

        this.dateControl.setValue(new TuiDayRange(TuiDay.currentLocal().append({ day: -6 }), TuiDay.currentLocal()));
    }

    ngOnDestroy() {
        this.dateRangeSubs.unsubscribe();
        this.currListSubs.unsubscribe();
    }

    public isExtreme(value: number, mass: DateParams[], mode: string): boolean {
        if (mode === 'min') {
            return value === Math.min(...mass.map((elem: DateParams) => elem.rate));
        } else if (mode === 'max') {
            return value === Math.max(...mass.map((elem: DateParams) => elem.rate));
        }
        return false;
    }

    public listCut(data: any[]): any[] {
        return data.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize)
    }
}
