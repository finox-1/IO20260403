<template>
    <div class="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
      
      <div class="pt-12 pb-6 px-10 text-center">
        
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">Login</h1>
      </div>

      <div class="px-10 pb-12">
        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
             username
            </label>
            <input
              v-model.trim="username"
              type="text"
              required
              class="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 
                     text-gray-900 text-base transition-all"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
              password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="••••••••"
                required
                class="w-full px-5 py-4 border-2 border-gray-400 rounded-2xl 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 
                     text-gray-900 text-base transition-all"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-emerald-600 transition-colors"
              >
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm px-1">
            <a href="#" class="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forget password?</a>
          </div>

          <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold flex items-center animate-pulse">
            <span class="mr-2">❌</span> {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="loading || !username || !password"
            class="w-full py-4 bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-2xl shadow-xl shadow-gray-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center group"
          >
            <span v-if="!loading" class="flex items-center">
              Login <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div v-else class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </button>
        </form>
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';


const username = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMessage = ref('');
const loading = ref(false);

// Нэвтрэх функц
const handleLogin = () => {
  errorMessage.value = '';
  loading.value = true;
  setTimeout(() => {
    if (username.value === 'admin' && password.value === '1234') {
      alert('SUCCESSFUL! ✅');
    } else {
      errorMessage.value = 'username or password is incorrect!';
    }
    loading.value = false;
  }, 1500);
};
</script>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  -webkit-text-fill-color: #111827 !important;
  -webkit-box-shadow: 0 0 0px 1000px #f9fafb inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>