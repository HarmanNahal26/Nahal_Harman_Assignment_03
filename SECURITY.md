# Security Configuration

## Helmet.js Configuration

### Configuration Applied
```typescript
import helmet from "helmet";

export const helmetConfig = helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    noSniff: true,
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "no-referrer" },
});

### justification

**contentSecurityPolicy: false - This API only serves JSON responses. Content Security Policy (CSP) is primarily designed to protect browsers rendering HTML content from XSS attacks. 
Enabling it in an API-only backend provides no security benefit and adds unnecessary overhead.

**hidePoweredBy: true -
Removes the X-Powered-By header to prevent exposing that the backend uses Express. 
This reduces the attack surface by not revealing potential framework vulnerabilities.

**noSniff: true -
Prevents browsers from interpreting files as a different MIME type than specified in the Content-Type header. 
This reduces the risk of content-type based attacks.

**hsts
Enforces HTTPS for one year, including all subdomains, and allows preloading in browser HSTS lists. 
This ensures secure communication and protects against man-in-the-middle attacks.

**frameguard: deny -
Disallows embedding the API in iframes. 
This prevents clickjacking attacks where malicious websites could trick users into interacting with the API unknowingly.

**referrerPolicy: no-referrer -
Omits the Referer header from responses. 
 helps protect user privacy and reduces the exposure of internal endpoints or API structure.

 ### Sources

1. Helmet.js Official Documentation — https://helmetjs.github.io/
2. OWASP Secure Headers Project — https://owasp.org/www-project-secure-headers/
3. MDN Web Docs: HTTP Headers — https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

---

## CORS Configuration

### Configuration Applied
```typescript
cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

### justification

**origin
Restricts API access to only the trusted domains specified in ALLOWED_ORIGINS. During development, all origins are allowed for ease of testing. This ensures production security while maintaining flexibility during development.

**credentials: true
Allows cookies or authorization headers to be sent with requests. This is necessary for endpoints that require authentication.

**methods
Restricts allowed HTTP methods to only those the API supports (GET, POST, PUT, DELETE). This reduces the attack surface by preventing unwanted methods like PATCH or OPTIONS from being used.

**allowedHeaders
Restricts headers to Content-Type and Authorization. This prevents malicious headers from bypassing security policies.

### Sources

1. MDN Web Docs: CORS — https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
2. OWASP CORS Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
3. Express CORS package documentation — https://expressjs.com/en/resources/middleware/cors.html
