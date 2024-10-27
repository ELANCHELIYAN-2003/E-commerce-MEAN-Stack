import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // to hold search key from header component
  searchKey = new BehaviorSubject('');
  wishlistMsg: string = '';
  apiWishlist: number[] = [];
  apiCart: number[] = [];
  products: any[] = [];
  cartCount = new BehaviorSubject<any[]>([]);
  private baseUrl = 'https://e-commerce-mean-stack.onrender.com/api';

  constructor(private http: HttpClient) {}

  //register
  register(username: any, email: any, password: any) {
    const body = {
      username,
      email,
      password,
    };
    // server call to register an account and return response to register component
    return this.http.post('https://e-commerce-mean-stack.onrender.com/register', body);
  }

  //login
  login(email: any, password: any) {
    const body = {
      email,
      password,
    };
    // server call to register an account and return response to login component
    return this.http.post('https://e-commerce-mean-stack.onrender.com/login', body);
  }

  //all products api
  getAllProducts() {
    return this.http.get('https://e-commerce-mean-stack.onrender.com/all-products');
  }

  //view products api
  viewProduct(productId: any) {
    return this.http.get('https://e-commerce-mean-stack.onrender.com/view-product/' + productId);
  }

  // appending token to http header
  appendToken() {
    // fetch token from local Storage
    const token = localStorage.getItem('token') || '';
    // create http header
    let headers = new HttpHeaders();
    if (token) {
      //append token inside http headers
      headers = headers.append('access-token', token);
      options.headers = headers;
    }
    return options;
  }

  //addToWishlist
  addToWishlist(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.post(
      'https://e-commerce-mean-stack.onrender.com/addToWishlist/',
      body,
      this.appendToken()
    );
  }

  //remove from wishlist
  removeFromWishlist(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.put(
      'https://e-commerce-mean-stack.onrender.com/removeFromWishlist/',
      body,
      this.appendToken()
    );
  }

  //addToCart
  addToCart(email: any, productId: any, count: any) {
    const body = {
      email,
      productId,
      count,
    };
    return this.http.post(
      'https://e-commerce-mean-stack.onrender.com/addToCart/',
      body,
      this.appendToken()
    );
  }

  //updateCartItemCount
  updateCartItemCount(email: any, productId: any, count: any) {
    const body = {
      email,
      productId,
      count,
    };
    return this.http.put(
      'https://e-commerce-mean-stack.onrender.com/updateCartItemCount/',
      body,
      this.appendToken()
    );
  }

  //remove from cart
  removeFromCart(email: any, productId: any) {
    const body = {
      email,
      productId,
    };
    return this.http.put(
      'https://e-commerce-mean-stack.onrender.com/removeFromCart/',
      body,
      this.appendToken()
    );
  }

  //empty cart
  emptyCart(email: any) {
    const body = {
      email,
    };
    return this.http.put(
      'https://e-commerce-mean-stack.onrender.com/emptyCart/',
      body,
      this.appendToken()
    );
  }

  //addToCheckout
  addToCheckout(
    email: any,
    orderID: any,
    transactionID: any,
    dateAndTime: any,
    amount: any,
    status: any,
    products: any,
    details: any
  ) {
    const body = {
      email,
      orderID,
      transactionID,
      dateAndTime,
      amount,
      status,
      products,
      details,
    };
    return this.http.post(
      'https://e-commerce-mean-stack.onrender.com/addToCheckout/',
      body,
      this.appendToken()
    );
  }

  //addOrder
  addOrder(email: string, products: any[], total: number) {
    const body = {
      email,
      products,
      total,
    };
    return this.http.post(
      'https://e-commerce-mean-stack.onrender.com/addOrder/',
      body,
      this.appendToken()
    );
  }

  getWishlist(email: any) {
    return this.http.get(
      'https://e-commerce-mean-stack.onrender.com/getWishlist/' + email,
      this.appendToken()
    );
  }

  getMyOrders(email: any) {
    return this.http.get(
      'https://e-commerce-mean-stack.onrender.com/getMyOrders/' + email,
      this.appendToken()
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }
}
