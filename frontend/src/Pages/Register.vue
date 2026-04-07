<script setup lang="ts">
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const password = ref('')
</script>

<template>
  <div class="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6 font-sans text-gray-300">
    <div class="w-full max-w-[440px] bg-[#262626] border border-white/10 rounded-2xl p-10 shadow-2xl">
      
      <header class="mb-8 text-left">
        <h1 class="text-4xl font-serif font-medium text-white mb-2">Create account</h1>
      </header>

      <form @submit.prevent class="space-y-6">
        <div class="space-y-2">
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
          <input 
            v-model="fullName"
            type="text" 
            placeholder="John Doe"
            class="w-full bg-[#333333] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="you@example.com"
            class="w-full bg-[#333333] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="••••••••"
            class="w-full bg-[#333333] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>

        <button class="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium py-3.5 rounded-xl transition-all active:scale-[0.98]">
          Create account
        </button>

        <div class="relative flex items-center py-2">
          <div class="flex-grow border-t border-white/10"></div>
          <span class="flex-shrink mx-4 text-xs text-gray-500">or</span>
          <div class="flex-grow border-t border-white/10"></div>
        </div>

        <button type="button" class="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-3 transition-all">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" alt="Google">
          Sign up with Google
        </button>
      </form>

      <p class="mt-8 text-center text-gray-400 text-sm">
        Already have an account? 
        <router-link to="/login" class="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>