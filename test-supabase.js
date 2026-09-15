import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://dyxkbbojlyppizsgjjxx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eGtiYm9qbHlwcGl6c2dqanh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzQ2NjAsImV4cCI6MjA2MzY1MDY2MH0.47pGkZXkqZoAsjVHhwSQPLEcGY99hoiDO-6LdCG-4K4";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function test() {
  const { data, error } = await supabase
    .from('candidatos_cuidadores_rows')
    .select('id, nome, status_candidatura, ativo, cidade, cargo')
    .limit(10);
  
  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Sample Data:', data);
    console.log('Total returned:', data?.length);
  }
}

test();
