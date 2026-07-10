<template>
  <section class="section" id="competences">
    <div class="section-head">
      <span class="tag">03</span>
      <h2>Stack technique</h2>
    </div>

    <div class="stack">
      <div v-for="line in stack" :key="line.ln">
        <span class="ln">{{ line.ln }}</span>
        <template v-if="line.comment">
          <span class="comment">// {{ line.comment }}</span>
        </template>
        <template v-else>
          <span class="kw">import</span>
          <span class="brace">{</span>
          <span class="mod">{{ line.mod }}</span>
          <span class="brace">}</span>
          <span class="from">from</span>
          <span class="src">'{{ line.from }}'</span>;
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stack: { type: Array, required: true }
})
</script>
