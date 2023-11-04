export const API_URL = 'http://localhost:3000/personal-blog'
export const PATHS = {
    USER: '/user',
    ARTICLE: '/article',
    SECTION: '/section'
}

export const addPath = (pathname: string, url: string): string => {
    return `${url}${pathname}`
}

// export const API_URL = import.meta.env.MODE !== 'production' 
//     ? import.meta.env.BASE_API_TEST_URL
//     : import.meta.env.BASE_API_PROD_URL