import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../../services/storage.service';
import { STORAGE_KEYS } from '../../config/storage_keys.config';


@IonicPage()
@Component({
  selector: 'page-novo-cliente',
  templateUrl: 'novo-cliente.html',
})
export class NovoClientePage {

  codCliente: string;

  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage : StorageService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: [, [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      
        telefone : [ ],
     
      });
  }

  ionViewDidLoad() {
  
  }

  back(){
    this.navCtrl.push('ClientesPage');
   
  }


  adicionar() {
    
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.codCliente = this.extractId(response.headers.get('location'));
        console.log(this.codCliente)
        this.showInsertOk();
       
      },
      error=> {
        console.log(error.erros)
      });
    
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

   

            localStorage.setItem(STORAGE_KEYS.cliente,(this.codCliente));
            console.log(this.codCliente)
            this.navCtrl.setRoot('ProdutosPage');
           
          }
        }
      ]
    });
    alert.present();
  }

  private extractId(location: string):string {
    let position = location.lastIndexOf('/');
    return location.substring( position + 1 , location.length);
  }

}
