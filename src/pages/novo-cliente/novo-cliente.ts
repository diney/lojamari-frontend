import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@IonicPage()
@Component({
  selector: 'page-novo-cliente',
  templateUrl: 'novo-cliente.html',
})
export class NovoClientePage {

  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: [, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: [],    
        telefone : [ ],
     
      });
  }

  ionViewDidLoad() {
  
  }

  adicionar() {
    console.log(this.formGroup.value)
    this.clienteService.insert(this.formGroup.value)
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

}
