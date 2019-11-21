import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/domain/produto.service';



@IonicPage()
@Component({
  selector: 'page-novo-produto',
  templateUrl: 'novo-produto.html',
})
export class NovoProdutoPage {

  formGroup: FormGroup;
  codpedido: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public produtoService:ProdutoService) {


    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      fornecedor: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      tamanho : ['', [Validators.required]],
      cor : ['', [Validators.required]],
      precoCompra : [ , [Validators.required]],
      precoVenda : [ ,[Validators.required]]
    
    });
  }

  ionViewDidLoad() {
   
  }

  cadastrarProduto(){
    console.log(this.formGroup.value);
    this.produtoService.insert(this.formGroup.value)
    .subscribe(response =>{
      this.codpedido = this.extractId(response.headers.get('location'));

    })

  }

  private extractId(location: string):string {
    let position = location.lastIndexOf('/');
    return location.substring( position + 1 , location.length);
  }

  home() {
    this.navCtrl.setRoot('NovoProdutoPage');
  }

  

}
