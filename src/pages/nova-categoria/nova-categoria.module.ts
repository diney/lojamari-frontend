import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaCategoriaPage } from './nova-categoria';

@NgModule({
  declarations: [
    NovaCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaCategoriaPage),
  ],
})
export class NovaCategoriaPageModule {}
