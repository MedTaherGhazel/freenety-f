import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../app/user.service';

xdescribe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let BASE_URL = 'http://localhost:3000/api'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should register a user', () => {
    const dummyUser = {
      username: 'testuser',
      email: 'testuser@test.com',
      password: 'testpass'
    };

    service.register(dummyUser).subscribe(res => {
      expect(res).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${BASE_URL}/register`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyUser);
  });

  it('should log in a user', () => {
    const dummyUser = {
      username: 'testuser',
      password: 'testpass'
    };

    service.login(dummyUser).subscribe(res => {
      expect(res).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${BASE_URL}/login`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyUser);
  });

  it('should get all users', () => {
    const dummyUsers = [
      { username: 'testuser1', email: 'testuser1@test.com', password: 'testpass1' },
      { username: 'testuser2', email: 'testuser2@test.com', password: 'testpass2' },
    ];

    service.getAllUsers().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(`${BASE_URL}/users`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });

  it('should get user by id', () => {
    const dummyUser = {
      username: 'testuser',
      email: 'testuser@test.com',
      password: 'testpass'
    };

    service.getUserById('1').subscribe(res => {
      expect(res).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${BASE_URL}/users/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });

  it('should update a user', () => {
    const dummyUser = {
      username: 'testuser',
      email: 'testuser@test.com',
      password: 'testpass'
    };

    service.updateUser('1', dummyUser).subscribe(res => {
      expect(res).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${BASE_URL}/users/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyUser);
  });

  it('should delete a user', () => {
    service.deleteUser('1').subscribe(res => {
      expect(res).toEqual({ status: 'success' });
    });

    const request = httpMock.expectOne(`${BASE_URL}/users/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush({ status: 'success' });
  });
});
