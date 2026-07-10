<template>
  <section class="section projects-page" v-if="data">
    <div class="section-head">
      <router-link class="back-link" to="/">← CV</router-link>
      <span class="tag">P</span>
      <h2>Projets</h2>
    </div>

    <div class="filter-row">
      <button class="filter-chip" :class="{ active: activeCategory === 'Tous' }" @click="activeCategory = 'Tous'">Tous
        ({{ data.projects.length }})</button>
      <button v-for="cat in data.projectCategories" :key="cat.id" class="filter-chip"
        :class="{ active: activeCategory === cat.name }" @click="activeCategory = cat.name">{{ cat.name }} ({{
          countByCategory(cat.name) }})</button>
    </div>

    <div class="proj-grid">
      <template v-for="proj in filteredProjects" :key="proj.id">
        <a v-if="proj.file" class="proj-tile" :href="proj.file" target="_blank">
          <div class="tile-top">
            <span class="tile-method">GET</span>
            <span class="tile-cat">{{ proj.category }}</span>
          </div>
          <h3>{{ proj.name }}</h3>
          <div class="tile-tagline">{{ proj.tagline }}</div>
          <div class="tile-badge"><span>{{ proj.badge }}</span><span class="fmt">PDF ↗</span></div>
        </a>
        <div v-else class="proj-tile is-static">
          <div class="tile-top">
            <span class="tile-method get-muted">GET</span>
            <span class="tile-cat">{{ proj.category }}</span>
          </div>
          <h3>{{ proj.name }}</h3>
          <div class="tile-tagline">{{ proj.tagline }}</div>
          <div class="tile-badge"><span>{{ proj.badge }}</span><span class="fmt">—</span></div>
        </div>
      </template>
    </div>

    <p v-if="filteredProjects.length === 0" class="empty-state">Aucun projet dans cette catégorie.</p>
  </section>
</template>

<script setup>
import { inject, ref, computed } from 'vue'

const data = inject('cvData')
const activeCategory = ref('Tous')

const filteredProjects = computed(() => {
  if (!data.value) return []
  if (activeCategory.value === 'Tous') return data.value.projects
  return data.value.projects.filter(p => p.category === activeCategory.value)
})

function countByCategory(cat) {
  if (!data.value) return 0
  return data.value.projects.filter(p => p.category === cat).length
}
</script>

<style scoped>
.projects-page {
  border-top: none;
  padding-top: 32px;
}

.section-head {
  position: relative;
}

.back-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 4px;
}

.back-link:hover {
  border-color: var(--blue);
  color: var(--text);
  text-decoration: none;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.filter-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-dim);
  padding: 7px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all .15s ease;
}

.filter-chip:hover {
  border-color: var(--blue);
  color: var(--text);
}

.filter-chip.active {
  border-color: var(--blue);
  background: rgba(88, 166, 255, 0.14);
  color: var(--blue);
  font-weight: 600;
}

.tile-cat {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  color: var(--text-faint);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 4px;
}

.get-muted {
  background: rgba(139, 148, 158, 0.14) !important;
  color: var(--text-faint) !important;
}

.proj-tile.is-static {
  cursor: default;
}

.proj-tile.is-static:hover {
  border-color: var(--border);
  transform: none;
  background: var(--surface);
}

.empty-state {
  color: var(--text-faint);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  padding: 24px 0;
  text-align: center;
}

@media (max-width: 640px) {
  .proj-grid {
    grid-template-columns: 1fr;
  }
}
</style>
