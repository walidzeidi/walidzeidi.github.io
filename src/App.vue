<template>
  <div v-if="data">
    <TopBar :profile="data.profile" />

    <div class="wrap">
      <Hero :profile="data.profile" :contact="data.contact" />

      <ExperienceSection :experiences="data.experiences" />

      <ProjectsSection :projects="data.projects" />

      <StackSection :stack="data.stack" />

      <IntegrationSection :cards="data.integration" />

      <FormationSection :formation="data.formation" />
    </div>

    <SiteFooter :footer="data.footer" :contact="data.contact" />
  </div>

  <div v-else class="loading-state">Chargement du CV…</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopBar from './components/TopBar.vue'
import Hero from './components/Hero.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import StackSection from './components/StackSection.vue'
import IntegrationSection from './components/IntegrationSection.vue'
import FormationSection from './components/FormationSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const data = ref(null)

onMounted(async () => {
  // db.json est servi statiquement depuis /public (ou via `npm run api` avec json-server sur le port 3001)
  const res = await fetch('/db.json')
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
