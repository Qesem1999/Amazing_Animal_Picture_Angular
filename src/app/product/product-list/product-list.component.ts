import { Component,OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  filteredProduct: Product[]=[];
  sortOrder:string = '';
  constructor(private productService:ProductService,private cartService:CartService){

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products = data;
      this.filteredProduct = data;
    })

  }

  AddToCart(product:Product):void{
    
    
    this.cartService.addToCart(product).subscribe({
      next: ()=>{
        var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    if(x){
      x.className = "show";
      setTimeout(function(){if(x) x.className = x.className.replace("show", ""); }, 3000);
    }
      }
    });

  }

  onChange(event:Event):void{
    console.log("54");

    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredProduct = this.products.filter(m=>m.name.toLowerCase().includes(searchTerm));
  }

  sortProducts(event:Event):void{
    console.log("110");
    // console.log(value);
    // if(value === "priceLowHigh"){
    //   this.filteredProduct.sort((a,b)=> a.price-b.price)
    // }else if(value=== "priceHighLow"){
    //   this.filteredProduct.sort((a,b)=>b.price-a.price)
    // }

  }

}
