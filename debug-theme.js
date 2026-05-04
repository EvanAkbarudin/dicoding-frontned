// Debug script untuk cek dark mode
console.log('=== DARK MODE DEBUG ===');
console.log('1. HTML classList:', document.documentElement.classList.toString());
console.log('2. localStorage theme:', localStorage.getItem('theme'));
console.log('3. System prefers dark:', window.matchMedia('(prefers-color-scheme: dark)').matches);

// Test toggle
const testToggle = () => {
  console.log('\n=== TESTING TOGGLE ===');
  document.documentElement.classList.toggle('dark');
  console.log('After toggle, classList:', document.documentElement.classList.toString());
};

// Expose ke window
window.debugTheme = {
  test: testToggle,
  addDark: () => document.documentElement.classList.add('dark'),
  removeDark: () => document.documentElement.classList.remove('dark'),
  check: () => console.log('Has dark class:', document.documentElement.classList.contains('dark'))
};

console.log('\nRun window.debugTheme.test() to test toggle');
console.log('Run window.debugTheme.addDark() to force dark mode');
console.log('Run window.debugTheme.removeDark() to force light mode');
