<template>
  <section class="section" id="formation">
    <div class="section-head">
      <span class="tag">05</span>
      <h2>Formation</h2>
    </div>
    <div class="edu" v-for="(f, i) in formation" :key="i">
      <span class="yr">{{ f.year }}</span>
      <div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.school }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  formation: { type: Array, required: true }
})
</script>
