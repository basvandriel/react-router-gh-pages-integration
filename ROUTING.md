# Routing Strategy

## Overview

This application uses conditional routing based on the deployment environment:

- **Local Development**: `BrowserRouter` with clean URLs (`/about`)
- **GitHub Pages**: `HashRouter` with hash URLs (`/#/about`)

## Why HashRouter for GitHub Pages?

GitHub Pages is a static file host without server-side routing capabilities. When a user visits `/about`, GitHub Pages looks for an actual file at that path and returns a 404 if not found.

### Solution Options

1. **404 Redirect Workaround**: Intercept 404s and redirect to index.html
   - ❌ Adds redirect latency
   - ❌ Shows 404 briefly in browser
   - ❌ Complex setup

2. **HashRouter** ✅
   - ✅ Everything after `#` is client-side only
   - ✅ GitHub Pages always serves `index.html`
   - ✅ All routes work immediately
   - ⚠️ Hash in URLs (`/#/about`)

## Implementation

The router is created conditionally using the `VITE_USE_HASH_ROUTER` environment variable:

```typescript
const router: Router =
  import.meta.env.VITE_USE_HASH_ROUTER === "true"
    ? createHashRouter(routes)
    : createBrowserRouter(routes, { basename: "/repo-name" });
```

During GitHub Actions deployment, the build step sets:
```yaml
env:
  VITE_USE_HASH_ROUTER: 'true'
```

## Tradeoffs

**HashRouter Benefits**:
- Zero configuration for GitHub Pages
- Instant route navigation
- No server setup required

**BrowserRouter Benefits** (local dev):
- Clean URLs
- Better for SEO (production sites)
- Standard web conventions

This hybrid approach provides the best developer experience locally while ensuring reliable deployment to GitHub Pages.
