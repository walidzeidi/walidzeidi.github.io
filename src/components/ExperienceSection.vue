<template>
  <section class="section" id="experience">
    <div class="section-head">
      <span class="tag">01</span>
      <h2>Expérience professionnelle</h2>
    </div>

    <div class="endpoint" v-for="exp in experiences" :key="exp.id">
      <div class="endpoint-head">
        <span class="method" :class="exp.methodClass">{{ exp.method }}</span>
        <span class="path"><span class="company">{{ exp.company }}</span>{{ exp.path }}</span>
        <span class="endpoint-meta">
          status: <span class="status-ok">200 OK</span> · {{ exp.duration }} · {{ exp.period }} · {{ exp.location }}
        </span>
      </div>
      <div class="endpoint-body">
        <div class="endpoint-role">{{ exp.role }}</div>
        <ul>
          <li v-for="(task, i) in exp.tasks" :key="i" v-html="task"></li>
        </ul>
        <div class="endpoint-footer">
          <span class="stack-line">compétences: <span>{{ exp.skills }}</span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  experiences: { type: Array, required: true }
})
</script>
