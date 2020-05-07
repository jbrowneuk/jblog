import { IMock, It, Mock, Times } from 'typemoq';

import { TestBed } from '@angular/core/testing';

import { PostData, PostStatus } from '../model/post-data';
import { UserService } from '../services/user.service';
import { PostAdminService } from './post-admin.service';

const mockPost: PostData = {
  postId: 1,
  date: Date.now(),
  modified: null,
  title: 'first',
  content: 'first post!',
  tags: ['first', 'post'],
  slug: 'first-post',
  status: PostStatus.Publish
};

describe('PostAdminService', () => {
  let mockUserService: IMock<UserService>;
  let service: PostAdminService;

  beforeEach(() => {
    mockUserService = Mock.ofType<UserService>();

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useFactory: () => mockUserService.object }
      ]
    });

    service = TestBed.get(PostAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendPost', () => {
    it('should send post data to backend', () => {
      let dataValue: string;
      mockUserService
        .setup(s => s.authPost(It.isAnyString(), It.isAny()))
        .callback((s: string, b: FormData) => {
          dataValue = b.get('data').toString();
        });

      service.sendPost(mockPost);

      expect(dataValue).toBe(JSON.stringify(mockPost));
    });
  });
});
