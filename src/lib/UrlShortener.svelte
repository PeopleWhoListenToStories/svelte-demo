<script lang="ts">
  import { getShortUrlApi } from '../api'
  const VITE_SHORT_URL = import.meta.env.VITE_SHORT_URL

  let originalUrl = ''
  let message = ''
  let messageType = ''

  async function shortenUrl() {
    if (!originalUrl) {
      message = '请输入URL'
      messageType = 'error'
      return
    }

    try {
      const { code, data } = await getShortUrlApi({ url: originalUrl })
      if (code === 200) {
        const shortUrl = `${VITE_SHORT_URL}/u/${data}`
        await navigator.clipboard.writeText(shortUrl)
        message = '短链接已复制到剪贴板！'
        messageType = 'success'
      } else {
        throw new Error('生成短链接失败')
      }
    } catch (error) {
      message = '生成短链接失败，请重试'
      messageType = 'error'
    }
  }
</script>

<div
  class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900 shadow-xl transition-all duration-500"
>
  <div
    class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"
  ></div>
  <div
    class="relative p-8 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 group hover:scale-[1.02] transition-all duration-500 animate-scaleIn"
  >
    <div class="absolute -inset-[1000px] bg-gradient-to-r from-white/20 via-white/0 to-white/0 group-hover:animate-[shimmer_2s_ease-in-out_infinite] -z-10"></div>
    <h2 class="text-white text-center mb-10 font-bold text-4xl tracking-tight animate-slideIn">URL短链接生成器</h2>
    <div class="flex gap-6 mb-8 sm:flex-row flex-col">
      <div class="flex-1 relative group/input">
        <input
          type="url"
          bind:value={originalUrl}
          placeholder="请输入需要转换的URL"
          class="w-full px-6 py-4 bg-white/5 dark:bg-black/5 border-2 border-white/20 dark:border-white/10 rounded-2xl text-white placeholder:text-white/50 text-base transition-all duration-300 focus:outline-none focus:border-white/40 dark:focus:border-white/30 focus:bg-white/10 dark:focus:bg-black/20 group-hover/input:border-white/30 dark:group-hover/input:border-white/20 backdrop-blur animate-fadeIn"
        />
        <div
          class="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-white/20 via-white/0 to-white/20 opacity-0 group-hover/input:opacity-100 blur-xl transition-opacity duration-500"
        ></div>
      </div>
      <button
        on:click={shortenUrl}
        class="px-8 py-4 bg-white dark:bg-white/90 text-[#4f46e5] dark:text-[#312e81] rounded-2xl cursor-pointer text-base font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 sm:w-auto w-full backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/30 animate-fadeIn"
      >
        生成短链接
      </button>
    </div>
    {#if message}
      <div
        class="mt-6 p-4 rounded-2xl text-center font-medium transition-all duration-300 animate-[fadeIn_0.3s_ease-in-out] backdrop-blur-xl {messageType === 'success'
          ? 'bg-emerald-500/20 text-white border-2 border-emerald-500/30'
          : 'bg-rose-500/20 text-white border-2 border-rose-500/30'}"
      >
        {message}
      </div>
    {/if}
  </div>
</div>

<style>
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
