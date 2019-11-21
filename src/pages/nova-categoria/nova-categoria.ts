import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { CategoriaService } from '../../services/domain/categoria.service';



@IonicPage()
@Component({
  selector: 'page-nova-categoria',
  templateUrl: 'nova-categoria.html',
})
export class NovaCategoriaPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public formBuilder: FormBuilder,
               public alertCtrl: AlertController,
               public categoriaService: CategoriaService
               ) {

                this.formGroup = this.formBuilder.group({
                  nome: [, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
                
                
               
                });
  }

  ionViewDidLoad() {
   
  }

  adicionar() {
  
    this.categoriaService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
       
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('CategoriasPage');
          }
        }
      ]
    });
    alert.present();
  }

  back(){
    this.navCtrl.setRoot('CategoriasPage');
  }


}
