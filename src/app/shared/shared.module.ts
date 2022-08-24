import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { convertToSpacesPipe } from './convert-to-spaces.pipe';



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule,
    convertToSpacesPipe
  ]
})
export class SharedModule { }
