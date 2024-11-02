import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

const seedPodcasts = async (entriesNum) => {
  const podcasts = [];
  for (let i = 0; i < entriesNum; i++) {
    const name = faker.hacker.ingverb() + ' ' + faker.hacker.noun();
    const url = faker.internet.url();
    const description = faker.company.buzzPhrase();
    const ids = [35, 36, 37, 38, 39, 40, 41, 43, 44];
    const podcaster_id = ids[Math.floor(Math.random() * ids.length)];
    podcasts.push({
      name,
      description,
      urls: [url],
      created_at: new Date(),
      updated_at: new Date(),
      podcaster_id,
      slug: name.toLocaleLowerCase().replace(/ /g, '-')
    });
  }

  const { error } = await supabase.from('podcasts').insert(podcasts);
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully");
  }
};

(async () => {
  await seedPodcasts(10);
})();
