import { faker } from "@faker-js/faker";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY
);

const seedUsers = async (entriesNum) => {
  const users = [];
  for (let i = 0; i < entriesNum; i++) {
    const name = faker.person.fullName();
    const username = faker.internet.email();
    const password = faker.internet.password();

    users.push({
      name,
      password,
      username,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  const { error } = await supabase.from('users').insert(users);
  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully");
  }
};

(async () => {
  await seedUsers(10);
})();
