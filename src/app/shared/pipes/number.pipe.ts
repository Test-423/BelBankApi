import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'number'
})
@Injectable()


export class NumberPipe implements PipeTransform {

    transform(value: number): any {
        let res = [];
        for (let i = 0; i < value; i++) {
            res.push(i);
        }
        return res;
    }
}