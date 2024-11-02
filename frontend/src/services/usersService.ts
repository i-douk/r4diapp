// services/UserService.js
import {apiClient} from '../lib/apiClient';

export default {
  getUsers() {
    return apiClient.get(`/users`);
  },
 
};
