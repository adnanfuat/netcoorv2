import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true,
  images:{
    dangerouslyAllowSVG: true,
    domains: ['srcdn.sakaryarehberim.net', 'www.sakaryarehberim.com', 'lh3.googleusercontent.com'],
  },

  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['tr', 'en', 'fr', 'ar'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'tr',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  //   domains: [
  //     {
  //       domain: 'example.com',
  //       defaultLocale: 'en-US',
  //     },
  //     {
  //       domain: 'example.nl',
  //       defaultLocale: 'nl-NL',
  //     },
  //     {
  //       domain: 'example.fr',
  //       defaultLocale: 'fr',
  //     },
  //   ],
  },

  
  experimental:{    
    // missingSuspenseWithCSRBailout: false,                          
    serverActions: {
      allowedOrigins: ["test-pos.param.com.tr", "localhost:3003", "frank-raven-89.clerk.accounts.dev"]
    }
},  
  

  typescript:{
    ignoreBuildErrors:true,    
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,    
  },
};

export default nextConfig;



