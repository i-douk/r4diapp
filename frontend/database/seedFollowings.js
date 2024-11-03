import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

const seedFollowings = async (entriesNum) => {
  const followings = [];
  for (let i = 0; i < entriesNum; i++) {
    
    // const podcastersIds = [35, 36, 37, 38, 39, 40, 41, 43, 44];
    
    const usersIds = [3, 4, 5, 6, 7, 8, 9, 10, 11,12];
    const user_id = usersIds[Math.floor(Math.random() * usersIds.length)];
    const podcastsIds = [14, 15, 16, 17, 18, 19, 20, 21, 22,23];
    const podcast_id = podcastsIds[Math.floor(Math.random() * podcastsIds.length)];
    const starred = faker.helpers.arrayElement([true,false])
    followings.push({
      podcast_id,
      user_id,
      starred,

    });
  }

  const { error } = await supabase.from('followings').insert(followings);
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully");
  }
};

(async () => {
  await seedFollowings(10);
})();
