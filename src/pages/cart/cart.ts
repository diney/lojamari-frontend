import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];
 
  clienteNome: ClienteDTO;
  pedido: PedidoDTO;
  
  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public cartService:CartService,
             public clienteService:ClienteService ) {
  }

  ionViewDidLoad() { 

    let cart = this.cartService.getCart();
    this.items = cart.items;


    let cliente = localStorage.getItem(STORAGE_KEYS.cliente);
    this.clienteService.findById(cliente).
    subscribe(response=>{
     this.clienteNome= response as ClienteDTO;

     let cart = this.cartService.getCart();

     this.pedido = {
       cliente: {id: response['id']},
       pagamento:null,
       itens:cart.items.map(x => {return {quantidade:x.quantidade,produto:{id:x.produto.id}}})
     }
    
    console.log(this.pedido) 
    },
    error => {})
    
  }

  removeItem(produto:ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items
  }

  increaseQuantity(produto:ProdutoDTO){
    this.items = this.cartService.increaseQuantity(produto).items
  }
  
  decreaseQuantity(produto:ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).items
  }

  total():number {
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');

  }

  checkout(){
    this.navCtrl.push('PaymentPage',{pedido:this.pedido});

  }


}
