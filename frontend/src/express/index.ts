// services/UserService.js
import {expressClient} from './expressClient';

export default {
  getUsers() {
    return expressClient.get(`/users`);
  },
 
};