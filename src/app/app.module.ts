import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatDividerModule, MatDialogModule
} from '@angular/material';
import { DashComponent, DashDialogComponent } from './dash/dash.component';
import { TableComponent } from './table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { Card1Component } from './dash/card-templates/card1/card1.component';
import { Card2Component } from './dash/card-templates/card2/card2.component';
import { CardmapperComponent } from './dash/cardmapper.component';
import { CardTemplateBaseComponent } from './dash/card-templates/card-template-base';
import { HttpClientModule } from '@angular/common/http';
import { DashService } from './dash/dash.service';
import { Card3Component } from './dash/card-templates/card3/card3.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    DashDialogComponent,
    TableComponent,
    Card1Component,
    Card2Component,
    Card3Component,
    CardmapperComponent,
    CardTemplateBaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MatDividerModule,
    MatDialogModule,
  ],
  providers: [DashService],
  entryComponents: [Card1Component, Card2Component, Card3Component, DashDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
