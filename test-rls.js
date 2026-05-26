import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://dyxkbbojlyppizsgjjxx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eGtiYm9qbHlwcGl6c2dqanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NjAsImV4cCI6MjA2MzY1MDY2MH0.47pGkZXkqZoAsjVHhwSQPLEcGY99hoiDO-6LdCG-4K4";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function test() {
  // First, we'll log in with a random fake user or just sign up a temporary one
  const email = `test-${Math.random()}@test.com`;
  const password = `testpass123`;
  
  console.log('Signing up temporary user:', email);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error('Auth Error:', authError);
    return;
  }
  
  console.log('User signed up/in successfully. Session exists:', !!authData.session);

  // Now query as authenticated user
  const { data, error } = await supabase
    .from('candidatos_cuidadores_rows')
    .select('id,cidade,cargo')
    .eq('status_candidatura', 'Aprovado')
    .limit(5);
  
  if (error) {
    console.error('Query Error (RLS?):', error);
  } else {
    console.log('Query Success. Rows returned:', data?.length);
  }
}

test();
