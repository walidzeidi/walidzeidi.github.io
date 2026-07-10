<template>
  <section class="section" id="projets">
    <div class="section-head">
      <span class="tag">02</span>
      <h2>Projets</h2>
    </div>

    <div class="proj-grid">
      <a class="proj-tile" v-for="proj in projects" :key="proj.id" :href="proj.file" target="_blank">
        <div class="tile-top">
          <span class="tile-method">GET</span>
          <span class="tile-arrow">↗</span>
        </div>
        <h3>{{ proj.name }}</h3>
        <div class="tile-tagline">{{ proj.tagline }}</div>
        <div class="tile-badge"><span>{{ proj.badge }}</span><span class="fmt">PDF</span></div>
      </a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  projects: { type: Array, required: true }
})
</script>
