<template>
  <section class="section" id="language">
    <div class="section-head">
      <span class="tag">05</span>
      <h2>Langues</h2>
    </div>
    <div class="lng">
      <div v-for="(f, i) in language" :key="i" class="field">
        <h3>{{ f.name }}</h3>
        <p>{{ f.level }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  language: { type: Array, required: true }
})
</script>
