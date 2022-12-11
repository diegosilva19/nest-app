import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private httpService: HttpService) {

  }
  getHello(): string {
    return 'Hello World!';
  }

  getUserInfo(params) {
    return this.httpService.get(`http://api.github.com/users/${params.username}`)
      .pipe(
        map((response) => response.data),
        map( (data) => ({
          ...data[params.username],
          githubFollowers: data.followers,
          publicRepos: data.public_repos,
          name: data.name,
          location: data.location
        }))
      );
  }
}
