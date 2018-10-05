import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatDividerModule
} from '@angular/material';
import { DashComponent } from './dash/dash.component';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { Card1Component } from './dash/card-templates/card1/card1.component';
import { Card2Component } from './dash/card-templates/card2/card2.component';
import { CardmapperComponent } from './dash/cardmapper.component';
import { CardTemplateBaseComponent } from './dash/card-templates/card-template-base';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    TableComponent,
    Card1Component,
    Card2Component,
    CardmapperComponent,
    CardTemplateBaseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    MatDividerModule
  ],
  providers: [],
  entryComponents: [Card1Component, Card2Component],
  bootstrap: [AppComponent]
})
export class AppModule { }
