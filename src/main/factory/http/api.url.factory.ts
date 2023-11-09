import env from '@/main/config/env'

export const makeBookueApiUrl = (path: string): string => `${env.BOOKUE_API_URL}`
