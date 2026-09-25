<template>
  <section class="section projects-page" v-if="data">
    <div class="section-head">
      <router-link class="back-link" to="/">← CV</router-link>
      <span class="tag">P</span>
      <h2>Projets</h2>
    </div>

    <div class="filter-row">
      <button class="filter-chip" :class="{ active: activeCategory === 'Tous' }" @click="activeCategory = 'Tous'">
        Tous ({{ data.projects.length }})
      </button>
      <button v-for="cat in data.projectCategories" :key="cat.id" class="filter-chip"
        :class="{ active: activeCategory === cat.name }" @click="activeCategory = cat.name">
        {{ cat.name }} ({{ countByCategory(cat.name) }})
      </button>
    </div>

    <div class="proj-grid">
      <button
        v-for="proj in filteredProjects"
        :key="proj.id"
        class="proj-tile"
        type="button"
        @click="selected = proj"
      >
        <div v-if="hasPngImage(proj)" class="tile-preview">
          <img :src="getProjectImage(proj)" :alt="proj.name" loading="lazy" />
        </div>

        <div class="tile-top">
          <span class="tile-method">GET</span>
          <span class="tile-cat">{{ proj.category }}</span>
        </div>
        <h3>{{ proj.name }}</h3>
        <div class="tile-tagline">{{ proj.tagline }}</div>
        <div class="tile-badge">
          <span>{{ proj.badge }}</span>
          <span class="fmt">Aperçu ↗</span>
        </div>
      </button>
    </div>

    <p v-if="filteredProjects.length === 0" class="empty-state">Aucun projet dans cette catégorie.</p>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>

<script setup>
import { inject, ref, computed, onMounted, onUnmounted } from 'vue'
import ProjectModal from '../components/ProjectModal.vue'

const data = inject('cvData')
const activeCategory = ref('Tous')
const selected = ref(null)

const filteredProjects = computed(() => {
  if (!data.value) return []
  if (activeCategory.value === 'Tous') return data.value.projects
  return data.value.projects.filter(p => p.category === activeCategory.value)
})

function countByCategory(cat){
  if (!data.value) return 0
  return data.value.projects.filter(p => p.category === cat).length
}

function hasPngImage(proj) {
  const img = proj.image || proj.img || proj.thumbnail || proj.preview || proj.screenshot
  return img && typeof img === 'string' && img.toLowerCase().includes('.png')
}

function getProjectImage(proj) {
  return proj.image || proj.img || proj.thumbnail || proj.preview || proj.screenshot
}

function onKeydown(e){
  if (e.key === 'Escape') selected.value = null
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.projects-page{ border-top: none; padding-top: 32px; }
.section-head{ position: relative; }
.back-link{
  font-family:'JetBrains Mono', monospace; font-size: 12.5px; color: var(--text-dim);
  border: 1px solid var(--border); padding: 6px 12px; border-radius: 6px; margin-right: 4px;
}
.back-link:hover{ border-color: var(--blue); color: var(--text); text-decoration:none; }

.filter-row{ display:flex; flex-wrap:wrap; gap: 8px; margin-bottom: 24px; }
.filter-chip{
  font-family:'JetBrains Mono', monospace; font-size: 12.5px;
  border: 1px solid var(--border); background: var(--surface); color: var(--text-dim);
  padding: 7px 14px; border-radius: 20px; cursor:pointer; transition: all .15s ease;
}
.filter-chip:hover{ border-color: var(--blue); color: var(--text); }
.filter-chip.active{
  border-color: var(--blue); background: rgba(88,166,255,0.14); color: var(--blue); font-weight: 600;
}

.proj-tile{
  font-family: inherit; text-align: left; cursor: pointer;
  width: 100%;
  overflow: hidden; /* Permet aux coins arrondis de rogner l'image si besoin */
}

/* AJOUT : Style de la miniature */
.tile-preview {
  width: 100%;
  height: 140px;
  margin-bottom: 12px;
  border-radius: 6px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
}

.tile-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  transition: transform 0.3s ease;
}

.proj-tile:hover .tile-preview img {
  transform: scale(1.05);
}

.tile-cat{
  font-family:'JetBrains Mono', monospace; font-size: 10.5px; color: var(--text-faint);
  border: 1px solid var(--border); padding: 2px 8px; border-radius: 4px;
}

.empty-state{
  color: var(--text-faint); font-family:'JetBrains Mono', monospace; font-size: 13px;
  padding: 24px 0; text-align:center;
}

@media (max-width: 640px){
  .proj-grid{ grid-template-columns: 1fr; }
}
</style>