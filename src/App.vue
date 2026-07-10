<template>
  <div v-if="data">
    <TopBar :profile="data.profile" />

    <div class="wrap">
      <router-view />
    </div>

    <SiteFooter :footer="data.footer" :contact="data.contact" />
  </div>

  <div v-else class="loading-state">Chargement du CV…</div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import TopBar from './components/TopBar.vue'
import SiteFooter from './components/SiteFooter.vue'

const data = ref(null)

provide('cvData', data)

onMounted(async () => {
  const res = await fetch(import.meta.env.BASE_URL + 'db.json')
  data.value = await res.json()
})
</script>

<style scoped>
.loading-state{
  min-height: 100vh;
  display:flex; align-items:center; justify-content:center;
  font-family:'JetBrains Mono', monospace;
  color: var(--text-dim, #8B949E);
  background: var(--bg, #0F1419);
}
</style>
