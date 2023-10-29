import 'dotenv/config'

export const API_URL = process.env.NODE_ENV !== 'production' 
    ? process.env.BASE_API_TEST_URL
    : process.env.BASE_API_PROD_URL