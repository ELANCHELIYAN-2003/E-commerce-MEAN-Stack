import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ApiService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call addToCheckout with correct URL and body', () => {
    const email = 'test@example.com';
    const orderID = 'order123';
    const transactionID = 'txn123';
    const dateAndTime = '2023-02-20T05:19:08Z';
    const amount = 100;
    const status = 'completed';
    const products = [{ id: 1, name: 'Product 1' }];
    const detailes = 'Order details';

    service.addToCheckout(email, orderID, transactionID, dateAndTime, amount, status, products, detailes).subscribe();

    const req = httpMock.expectOne('https://e-commerce-mean-stack.onrender.com/addToCheckout/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email,
      orderID,
      transactionID,
      dateAndTime,
      amount,
      status,
      products,
      detailes
    });
    expect(req.request.headers.has('access-token')).toBeTrue();
  });
});
