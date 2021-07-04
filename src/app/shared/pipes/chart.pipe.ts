import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Pipe({
    name: 'chart',
})
@Injectable()

export class ChartPipe implements PipeTransform {

    transform(items: any): readonly (readonly [number, number])[] {
        return items.map((elem: { rate: number; date: TuiDay }, index: number): readonly [number, number] => {
            return [index, Number(elem.rate)];
        });
    }

}