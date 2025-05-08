// env.d.ts

declare global {
    interface ImportMetaEnv {
      readonly REACT_APP_EMAILJS_SERVICE_ID: string;
      readonly REACT_APP_EMAILJS_TEMPLATE_ID: string;
      readonly REACT_APP_EMAILJS_PUBLIC_KEY: string;
    }
  }
  
  export {};
  