// AnyChat landing — behaviour. Same contract as the other MacPaw landings:
// utm_* parameters on the landing URL are appended to every Setapp link.
(() => {
  const params = new URLSearchParams(location.search);
  const utm = [...params].filter(([k]) => k.startsWith('utm_'));
  if (!utm.length) return;
  for (const a of document.querySelectorAll('a[href*="setapp.com"]')) {
    const url = new URL(a.href);
    for (const [k, v] of utm) url.searchParams.set(k, v);
    a.href = url.toString();
  }
})();
