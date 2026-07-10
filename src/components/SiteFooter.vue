<template>
  <footer>
    <div class="big">{{ footer.headline }}</div>
    <div class="small">
      <span class="green">→</span> {{ contact.email }} &nbsp;·&nbsp; {{ contact.phoneDisplay }} &nbsp;·&nbsp; {{ contact.linkedinUrl.replace('https://', '') }}
    </div>
  </footer>
</template>

<script setup>
defineProps({
  footer: { type: Object, required: true },
  contact: { type: Object, required: true }
})
</script>
