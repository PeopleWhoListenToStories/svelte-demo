<script lang="ts">
  import UrlShortener from './lib/UrlShortener.svelte'
  import IdGenerator from './lib/IdGenerator.svelte'
  import { onMount } from 'svelte';

  let isDarkMode = true;

  onMount(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode = localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && prefersDark);
    document.body.classList.toggle('dark', isDarkMode);
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
  <nav class="fixed top-0 left-0 right-0 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 z-50 transition-all duration-500">
    <div class="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span class="text-xl font-bold text-slate-800 dark:text-white">三喜</span>
      </div>
      <button
        on:click={toggleTheme}
        class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
      >
        {#if isDarkMode}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        {/if}
      </button>
    </div>
  </nav>

  <main class="pt-24 pb-12 px-4">
    <div class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col gap-8">
        <UrlShortener />
      </div>
      <div class="flex flex-col gap-8">
        <IdGenerator />
      </div>
    </div>
  </main>

  <footer class="fixed bottom-0 left-0 right-0 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 transition-all duration-500">
    <div class="max-w-[1200px] mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
      © 2025 三喜 - 让工作更轻松
    </div>
  </footer>
</div>

<style>

</style>
