
// global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       NODE_ENV: string,
//       DATABASE_URL: string,
//       PORT: number
//     }
//   }
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CUSTOM_ENV_VAR: string;
    }
  }
}
