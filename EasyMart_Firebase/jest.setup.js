import { TextEncoder, TextDecoder } from 'util';
import 'whatwg-fetch'; 

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

if (typeof global.fetch === 'undefined') {
  global.fetch = globalThis.fetch;
}
