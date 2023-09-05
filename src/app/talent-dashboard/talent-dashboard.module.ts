import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentDashboardComponent } from './talent-dashboard/talent-dashboard.component';



@NgModule({
  declarations: [
    TalentDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
TalentDashboardComponent
  ]
})
export class TalentDashboardModule { }
