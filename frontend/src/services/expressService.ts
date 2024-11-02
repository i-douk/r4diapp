// services/UserService.js
import {apiClient} from '../lib/apiClient';

export default {
  getUsers() {
    return apiClient.get(`/users`);
  },
 
};

// import {supabase} from '@/lib/supabaseClient';
// import usersServer from '@/services/expressService'
// console.log(supabase)

// const fetchData = async () => {
//   try {
//     const response = await usersServer.getUsers(); 
//     const data = response.data;
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// fetchData()
// console.log(fetchData())
