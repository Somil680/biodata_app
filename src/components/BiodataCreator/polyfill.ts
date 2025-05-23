// This file provides polyfills for TextEncoder and TextDecoder
// which are required by react-pdf/renderer but might be missing in some browsers

export function setupPolyfills() {
  if (typeof window !== 'undefined') {
    // Check if TextEncoder is available
    if (typeof window.TextEncoder === 'undefined') {
      console.warn('TextEncoder not available, attempting to polyfill');
      try {
        // Use dynamic import to avoid bundle bloat for browsers that support it natively
        import('text-encoding').then(encoding => {
          (window as any).TextEncoder = encoding.TextEncoder;
          (window as any).TextDecoder = encoding.TextDecoder;
          console.log('TextEncoder polyfill loaded');
        });
      } catch (e) {
        console.error('Failed to load TextEncoder polyfill', e);
      }
    }
  }
}

export default setupPolyfills; 