/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

declare module '*.astro' {
  const Component: any;
  export default Component;
}

// interface ImportMetaEnv {
//   readonly HYGRAPH_ENDPOINT: string;
// }
interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string;
  readonly CONTENTFUL_DELIVERY_TOKEN: string;
  readonly CONTENTFUL_PREVIEW_TOKEN: string;
}