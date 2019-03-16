import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandPipe } from 'src/app/pipe/hand.pipe';
import { IssuePipe } from 'src/app/pipe/issue.pipe';

@NgModule({
  declarations: [
    HandPipe,
    IssuePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HandPipe,
    IssuePipe
  ]
})
export class AppCommonModule { }
