<template>
  <div class="bg-gray-50 font-sans text-gray-900 antialiased min-h-screen">

    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <span class="font-display text-2xl font-bold tracking-tight">
        terra<span class="text-teal-500">.</span>
      </span>
      <div class="flex items-center gap-8">
        <a v-for="link in navLinks" :key="link" href="#"
           class="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
          {{ link }}
        </a>
        <button class="text-sm font-medium bg-teal-50 text-teal-800 border border-teal-200 px-4 py-2 rounded-lg hover:bg-teal-100 transition-colors duration-150">
          Get started
        </button>
      </div>
    </nav>

    <!-- Search Strip -->
    <div class="bg-white border-b border-gray-100 px-8 py-4">
      <div class="max-w-2xl relative">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 20 20">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M13 13l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <input
          v-model="query"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="Search topics, articles, or resources…"
          class="w-full h-11 bg-gray-50 border rounded-xl pl-10 pr-24 text-sm text-gray-900 transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-400/20"
          :class="query ? 'border-teal-300' : 'border-gray-200'"
        />
        <button
          @click="handleSearch"
          class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors duration-150">
          Search
        </button>
      </div>

      <!-- Suggestion Pills -->
      <div class="flex gap-2 mt-3 flex-wrap">
        <button
          v-for="tag in tags" :key="tag"
          @click="query = tag; handleSearch()"
          class="text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200 transition-all duration-150">
          {{ tag }}
        </button>
      </div>

      <!-- Search feedback -->
      <p v-if="searchedQuery" class="mt-2 text-xs text-teal-600 font-medium">
        Showing results for "{{ searchedQuery }}" — {{ filteredArticles.length }} found
        <button @click="searchedQuery = ''; query = ''" class="ml-2 text-gray-400 hover:text-gray-600 underline">clear</button>
      </p>
    </div>

    <!-- Hero -->
    <section class="px-8 pt-16 pb-10 max-w-5xl">
      <p class="text-xs font-medium tracking-widest uppercase text-teal-500 mb-4">Knowledge platform</p>
      <h1 class="font-display text-5xl font-bold leading-tight text-gray-900 max-w-xl mb-5">
        Discover what matters<br/>for our planet
      </h1>
      <p class="text-lg font-light text-gray-500 max-w-lg leading-relaxed mb-9">
        Curated insights, data, and research on the most pressing environmental challenges — in one place.
      </p>
      <div class="flex gap-3 items-center">
        <button class="bg-teal-500 hover:bg-teal-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors duration-150">
          Start exploring
        </button>
        <button class="border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 text-sm px-6 py-3 rounded-xl transition-all duration-150">
          See how it works
        </button>
      </div>
    </section>

    <!-- Stats -->
    <section class="px-8 pb-10 flex items-center gap-10">
      <template v-for="(stat, i) in stats" :key="stat.label">
        <div>
          <div class="font-display text-3xl font-bold text-gray-900">{{ stat.value }}</div>
          <div class="text-sm text-gray-400 mt-1">{{ stat.label }}</div>
        </div>
        <div v-if="i < stats.length - 1" class="w-px h-10 bg-gray-200"></div>
      </template>
    </section>

    <!-- Article Cards -->
    <section class="px-8 pb-16">
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="card in filteredArticles" :key="card.title"
          class="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-base" :class="card.iconBg">
            {{ card.icon }}
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-2">{{ card.title }}</h3>
          <p class="text-xs leading-relaxed text-gray-400">{{ card.body }}</p>
          <span class="inline-block mt-3 text-xs font-medium px-2 py-0.5 rounded" :class="card.badgeClass">
            {{ card.count }} articles
          </span>
        </div>
      </div>

      <p v-if="filteredArticles.length === 0" class="text-sm text-gray-400 mt-6">
        No results for "{{ query }}". Try a different keyword.
      </p>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const query = ref('')
const searchedQuery = ref('')

const navLinks = ['Explore', 'Features', 'Pricing']

const tags = ['Climate tech', 'Renewable energy', 'Carbon markets', 'Biodiversity', 'Urban planning', 'Ocean health']

const stats = [
  { value: '12k+', label: 'Articles indexed' },
  { value: '340',  label: 'Expert contributors' },
  { value: '80+',  label: 'Countries covered' },
]

const articles = [
  {
    title: 'Nature & ecosystems',
    body: 'Forests, oceans, soil health and the biodiversity they sustain.',
    icon: '🌱', iconBg: 'bg-teal-50', badgeClass: 'bg-teal-50 text-teal-800',
    count: 248, tags: ['nature', 'biodiversity', 'ocean health', 'forests'],
  },
  {
    title: 'Clean energy',
    body: 'Solar, wind, storage, and the grid transitions reshaping economies.',
    icon: '⚡', iconBg: 'bg-blue-50', badgeClass: 'bg-blue-50 text-blue-800',
    count: 412, tags: ['renewable energy', 'climate tech', 'solar', 'wind'],
  },
  {
    title: 'Cities & built environment',
    body: 'Architecture, transport, density, and resilient urban futures.',
    icon: '🏙️', iconBg: 'bg-amber-50', badgeClass: 'bg-amber-50 text-amber-800',
    count: 189, tags: ['urban planning', 'cities', 'transport'],
  },
  {
    title: 'Carbon & climate policy',
    body: 'Emissions tracking, carbon credits, and international agreements.',
    icon: '📊', iconBg: 'bg-rose-50', badgeClass: 'bg-rose-50 text-rose-800',
    count: 303, tags: ['carbon markets', 'climate tech', 'policy'],
  },
  {
    title: 'Food systems',
    body: 'Agriculture, land use, food security and regenerative farming.',
    icon: '🌾', iconBg: 'bg-green-50', badgeClass: 'bg-green-50 text-green-800',
    count: 175, tags: ['food', 'agriculture', 'biodiversity'],
  },
  {
    title: 'Water & resources',
    body: 'Freshwater access, pollution, scarcity, and circular economies.',
    icon: '💧', iconBg: 'bg-cyan-50', badgeClass: 'bg-cyan-50 text-cyan-800',
    count: 221, tags: ['water', 'ocean health', 'resources'],
  },
]

const filteredArticles = computed(() => {
  if (!searchedQuery.value) return articles
  const q = searchedQuery.value.toLowerCase()
  return articles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.body.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  )
})

function handleSearch() {
  searchedQuery.value = query.value.trim()
}
</script>
