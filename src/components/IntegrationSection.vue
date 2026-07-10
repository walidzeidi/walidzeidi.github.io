<template>
  <section class="section" id="integration">
    <div class="section-head">
      <span class="tag">04</span>
      <h2>Intégration & UI/UX</h2>
    </div>
    <div class="cards-grid">
      <div class="card" v-for="(card, i) in cards" :key="i">
        <div class="card-tag">{{ card.tag }}</div>
        <h3>{{ card.title }}</h3>
        <p>{{ card.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cards: { type: Array, required: true }
})
</script>
