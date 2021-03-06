import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';
import { PedidoService } from '../../services/domain/pedido.service';
import { StorageService } from '../../services/storage.service';



@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO; 
  codpedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storage: StorageService,
    public cartService: CartService ,
    public pedidoService:PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
     
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  total() : number {
    return this.cartService.total();
  }
  
  home() {
    this.navCtrl.setRoot('ClientesPage');
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
    .subscribe(response => {
      this.cartService.createOrClearCart();
     // let usr = this.storage.renoveCliente()
      this.codpedido = this.extractId(response.headers.get('location'));
   
    
    },
    error => {
      if(error.status == 403){
        this.navCtrl.setRoot('HomePage');
      }
    });
     
  }

  private extractId(location: string):string {
    let position = location.lastIndexOf('/');
    return location.substring( position + 1 , location.length);
  }
}
