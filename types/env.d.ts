/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    // NODE
    NODE_ENV: 'development' | 'production';

    // APP
    APP_KEY: string;
    APP_TIMEZONE_STRING: string;
    APP_TIMEZONE_CODE: string;
    APP_SESSION_TIME: string;
    APP_ROUND_SALT: string;

    // DATABASE
    DB_HOST: string;
    DB_PORT: string;
    DB_DIALECT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;

    // Api Configuration
    NEXT_PUBLIC_API_BASE_URL: string;

    // Next Auth Configuration
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
