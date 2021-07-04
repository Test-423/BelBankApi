import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TuiRootModule } from '@taiga-ui/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainComponent } from './shared/components/main/main.component';
import { FilterPipe } from './shared/pipes/filter.pipe';

import { TuiInputDateRangeModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { TaigaModule } from './taiga.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NumberPipe } from './shared/pipes/number.pipe';
import { ChartPipe } from './shared/pipes/chart.pipe';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        FilterPipe,
        NumberPipe,
        ChartPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        TuiRootModule,
        ReactiveFormsModule,
        TuiInputDateRangeModule,
        BrowserAnimationsModule,
        TuiSvgModule,
        TaigaModule,
        DragDropModule
    ],
    exports: [
        FilterPipe,
        NumberPipe,
        ChartPipe
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
