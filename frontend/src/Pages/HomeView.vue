<template>
  <div class="min-h-screen w-full bg-white text-black font-sans selection:bg-blue-100">
    <nav class="flex justify-between items-center p-6 max-w-6xl mx-auto">
      <div class="text-2xl font-black tracking-tighter flex items-center gap-1">
        HOME<span class="text-blue-600">.</span>PAGE
      </div>
      <div class="flex items-center gap-8">
        <router-link to="/login" class="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Login</router-link>
        <router-link to="/register" class="bg-black text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-sm">
          Register
        </router-link>
      </div>
    </nav>

    <main class="flex flex-col items-center justify-center pt-32 px-4 text-center">
      <div class="mb-12">
        <h1 class="text-6xl md:text-8xl font-black mb-6 tracking-tight text-black">
          Search by Name
        </h1>
        <p class="text-gray-500 max-w-lg mx-auto text-lg font-medium leading-relaxed">
          Find profiles by entering the full name.
        </p>
      </div>

      <div class="relative w-full max-w-2xl group">
        <div class="relative flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl">
          <input 
            type="text" 
            placeholder="Enter full name to find profiles..." 
            class="w-full bg-gray-50 border border-gray-200 py-5 px-7 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-xl placeholder:text-gray-400 text-black"
          />
          <button class="absolute right-3 bg-black p-3 rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-90 flex items-center justify-center">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2.5" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>