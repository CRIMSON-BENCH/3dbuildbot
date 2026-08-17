// Accessibility: skip-to-content link for keyboard/screen-reader users.
// Invisible until focused (Tab from top of page). WCAG 2.4.1 compliance.
export function SkipToContent() {
  return (
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-600 focus:text-white focus:font-medium focus:text-sm focus:shadow-lg">
      Skip to main content
    </a>
  );
}
