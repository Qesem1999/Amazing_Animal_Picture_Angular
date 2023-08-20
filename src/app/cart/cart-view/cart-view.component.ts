import { Component,OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
 cartItems : Product[] = [];
 totalPrice: number = 0;
 constructor(private cartService:CartService) {
  
 }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      for(let i of data){
        this.totalPrice += i.price;
      }
    })
  }

  clearCart(){
    this.cartService.clearCart().subscribe();
  }

  checkout(){
    this.cartService.checkout(this.cartItems).subscribe();
  }

 
}
