const conf={
    SUPABASE_URL:String(import.meta.env.VITE_APP_DATABASE_URL),
    PUBLISHABLE_KEY:String(import.meta.env.VITE_APP_SUPABASE_PUBLISHABLE_KEY),
    PROJECT_URL:String(import.meta.env.VITE_APP_SUPABASE_PROJECT_URL),
    NEWS_URL:String(import.meta.env.VITE_APP_NEWS_URL),
    NEWS_KEY:String(import.meta.env.VITE_APP_NEWS_KEY),
    NEWS_URL:String(import.meta.env.VITE_APP_NEWS_URL)
}

export default conf;