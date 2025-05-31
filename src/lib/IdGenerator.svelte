<script lang="ts">
  let idNumber = '';
  let message = '';
  let messageType = '';

  function generateRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function formatDate(date: Date) {
    return date.getFullYear().toString() +
           (date.getMonth() + 1).toString().padStart(2, '0') +
           date.getDate().toString().padStart(2, '0');
  }

  function generateChecksum(id17: string) {
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checksums = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(id17[i]) * weights[i];
    }
    return checksums[sum % 11];
  }

  function generateId() {
    try {
      // 随机选择一个省份代码 (这里简化为北京市的区县代码)
      const areaCode = ['110101', '110102', '110105', '110106', '110107', '110108', '110109', '110111', '110112', '110113', '110114', '110115', '110116', '110117', '110118', '110119'][Math.floor(Math.random() * 16)];
      
      // 生成随机出生日期（1950-2005年）
      const birthDate = formatDate(generateRandomDate(new Date(1950, 0, 1), new Date(2005, 11, 31)));
      
      // 生成随机序列号
      const sequence = Math.floor(Math.random() * 999).toString().padStart(3, '0');
      
      // 组合前17位
      const id17 = `${areaCode}${birthDate}${sequence}`;
      
      // 计算校验码
      const checksum = generateChecksum(id17);
      
      // 组合完整的身份证号
      idNumber = id17 + checksum;
      
      // 复制到剪贴板
      navigator.clipboard.writeText(idNumber);
      message = '身份证号已生成并复制到剪贴板！';
      messageType = 'success';
    } catch (error) {
      message = '生成身份证号失败，请重试';
      messageType = 'error';
    }
  }
</script>

<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900 shadow-xl transition-all duration-500">
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
  <div class="relative p-8 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 group hover:scale-[1.02] transition-all duration-500 animate-scaleIn">
    <div class="absolute -inset-[1000px] bg-gradient-to-r from-white/20 via-white/0 to-white/0 group-hover:animate-[shimmer_2s_ease-in-out_infinite] -z-10"></div>
    <h2 class="text-white text-center mb-10 font-bold text-4xl tracking-tight animate-slideIn">身份证号生成器</h2>
    <div class="flex gap-6 mb-8 sm:flex-row flex-col">
      <div class="flex-1 relative group/input">
        <input
          type="text"
          bind:value={idNumber}
          readonly
          placeholder="点击生成按钮获取身份证号"
          class="w-full px-6 py-4 bg-white/5 dark:bg-black/5 border-2 border-white/20 dark:border-white/10 rounded-2xl text-white placeholder:text-white/50 text-base transition-all duration-300 focus:outline-none focus:border-white/40 dark:focus:border-white/30 focus:bg-white/10 dark:focus:bg-black/20 group-hover/input:border-white/30 dark:group-hover/input:border-white/20 backdrop-blur animate-fadeIn"
        />
        <div class="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-white/20 via-white/0 to-white/20 opacity-0 group-hover/input:opacity-100 blur-xl transition-opacity duration-500"></div>
      </div>
      <button
        on:click={generateId}
        class="px-8 py-4 bg-white dark:bg-white/90 text-[#4f46e5] dark:text-[#312e81] rounded-2xl cursor-pointer text-base font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 sm:w-auto w-full backdrop-blur-xl border-2 border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/30 animate-fadeIn">
        生成身份证号
      </button>
    </div>
    {#if message}
      <div class="mt-6 p-4 rounded-2xl text-center font-medium transition-all duration-300 animate-[fadeIn_0.3s_ease-in-out] backdrop-blur-xl {messageType === 'success' ? 'bg-emerald-500/20 text-white border-2 border-emerald-500/30' : 'bg-rose-500/20 text-white border-2 border-rose-500/30'}">
        {message}
      </div>
    {/if}
  </div>
</div>

<style>
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>