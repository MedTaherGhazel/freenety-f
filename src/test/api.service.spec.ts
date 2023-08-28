import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../app/api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should retrieve root api', () => {
    const dummyResponse = "Hello, this is the root route!";

    service.getRoot().subscribe(res => {
      expect(res).toEqual(dummyResponse);
      console.log(`===>>> response: ${res}`);

    });

    const request = httpMock.expectOne('http://localhost:3000/');
    expect(request.request.method).toBe('GET');
    request.flush(dummyResponse);
  });

  // You can add other tests for POST, PUT, DELETE etc.
});
