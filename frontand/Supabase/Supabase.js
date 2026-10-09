// import dotenv from 'dotenv'
// const data = dotenv.config();
import { createClient } from '@supabase/supabase-js'
import conf from '../src/conf/conf'
const supabaseUrl = conf.PROJECT_URL
const supabaseKey = conf.PUBLISHABLE_KEY

export default createClient(supabaseUrl, supabaseKey)


