import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';



@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public produtoService:ProdutoService,
     public cartServive:CartService) {
  }

  ionViewDidLoad() {
    let poduto_id = this.navParams.get('produto_id');
    this.produtoService.findById(poduto_id)
    .subscribe(response => {
      this.item = response;
     
    },
    error =>{});
    
  }

  addToCart(produto:ProdutoDTO){
    this.cartServive.addProduto(produto);
    this.navCtrl.setRoot('CartPage');



  }

}
