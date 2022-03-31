import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello() {
    return {
      title: 'Hello World!',
    };
  }

  getTodo() {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(map((res) => res.data));
  }
}
