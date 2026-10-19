import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvyjroqnezfusrptvwys.supabase.co';
const supabaseKey = 'sb_publishable_7EbmUQPIiD3fz01t1_nb5w_KeO90VU4';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or publishable key is missing.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
console.log('BLOODLINK Supabase client initialized:', !!supabase);
