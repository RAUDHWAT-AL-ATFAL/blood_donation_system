import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('blood_donors')
    .select('id')
    .limit(1);

  if (error) {
    console.error('BLOODLINK connection test failed:', error.message);
    return;
  }

  console.log('BLOODLINK database request successful!');
}