import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

const seedSubscriptions = async (entriesNum) => {
  const subscriptions = [];
  for (let i = 0; i < entriesNum; i++) {
    
      
      const usersIds = [3, 4, 5, 6, 7, 8, 9, 10, 11,12];
      const user_id = usersIds[Math.floor(Math.random() * usersIds.length)];
      const podcastersIds = [35, 36, 37, 38, 39, 40, 41, 43, 44];
      const podcaster_id = podcastersIds[Math.floor(Math.random() * podcastersIds.length)];
      const paid = faker.helpers.arrayElement([true,false])
      subscriptions.push({
      podcaster_id,
      user_id,
      paid,

    });
  }

  const { error } = await supabase.from('subscriptions').insert(subscriptions);
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully");
  }
};

(async () => {
  await seedSubscriptions(10);
})();
