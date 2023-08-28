import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../app/api.service';
import { firstValueFrom } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
  });

  it('should retrieve root api', async () => {
    const dummyResponse = "Hello, this is the root route!";
    const response = await firstValueFrom(service.getRoot());

    console.log(`===>>> Actual Response: ${response}`);
    expect(response).toEqual(dummyResponse);
  });

  // You can add other tests for POST, PUT, DELETE, etc.
});
