export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'staging';

export const ENV = {
  appMode: process.env.NEXT_PUBLIC_APP_MODE,

  isStaging: process.env.NEXT_PUBLIC_APP_MODE === ENV_STAGING,
  isProduction: process.env.NEXT_PUBLIC_APP_MODE === ENV_PRODUCTION,
  isDevelopment: process.env.NEXT_PUBLIC_APP_MODE === ENV_DEVELOPMENT,

  enableRBAC: process.env.NEXT_PUBLIC_ENABLE_RBAC === 'true',

  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};
