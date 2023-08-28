import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let httpSpy: Spy<HttpClient>;
  let fakeUsers: any[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(UserService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should return an expected list of users', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeUsers);
    service.getAllUsers().subscribe(
      users => {
        expect(users).toEqual(fakeUsers);
        console.log(users);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1, 'one call');
  });
});
