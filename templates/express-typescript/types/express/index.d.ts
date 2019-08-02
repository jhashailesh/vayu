// add custom values to request and response
declare namespace Express {
  interface Request {
    boo?: string;
  }
  interface Response {
    boo?: string;
  }
}
