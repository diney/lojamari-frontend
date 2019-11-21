import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  cliente:ClienteDTO;
  pedido: PedidoDTO;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public storage: StorageService,
    public clienteService: ClienteService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {


    /*this.produtoService.findByCategoria(categoria_id,this.page, 10 )
    .subscribe(response => {
      this.items = this.items.concat(response['content']);
      loader.dismiss();
    },
    error => {
      loader.dismiss();
    });*/


    let usr = localStorage.getItem(STORAGE_KEYS.cliente);
    this.clienteService.findById(usr)
      .subscribe(response => {
       // this.cliente = response as ClienteDTO;
        this.cliente = response as ClienteDTO;
      },
        error => {
        });
    let cart = this.cartService.getCart();
    this.items = cart.items;

  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {

    this.items = this.cartService.increaseQuantity(produto).items;

  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('ProdutosPage');

  }

  checkout() {

    this.navCtrl.push('PaymentPage', { pedido: this.pedido });

  }


}
