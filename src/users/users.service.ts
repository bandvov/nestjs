import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    return [
      { name: 'John', id: 1 },
      { name: 'Blake', id: 2 },
      { name: 'Doe', id: 3 },
    ];
  }
}
