declare namespace App {
  interface Locals {
    /** Set by the middleware on the preview deployment once the Studio has
     *  opened `/api/preview/enable` with a valid secret. */
    preview: boolean;
  }
}
