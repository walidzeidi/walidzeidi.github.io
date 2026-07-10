<template>
  <section class="hero">
    <div class="hero-top">
      <div class="hero-text">
        <div class="eyebrow">whoami<span class="cursor"></span></div>
        <h1>{{ profile.name }}</h1>
        <div class="role">
          {{ profile.roleParts.prefix }}<span class="hl">{{ profile.roleParts.highlight }}</span><span class="sep">/</span>{{ profile.roleParts.middle }}<span class="sep">/</span>{{ profile.roleParts.suffix }}
        </div>
      </div>
      <div class="hero-photo">
        <img :src="profile.photo" :alt="`Photo de ${profile.name}`">
        <span class="tag"><span class="dot2"></span>{{ profile.photoTag }}</span>
      </div>
    </div>

    <p class="pitch">{{ profile.pitch }}</p>

    <div class="contact-row">
      <a class="pill" :href="`mailto:${contact.email}`"><span class="k">mail:</span>{{ contact.email }}</a>
      <a class="pill" :href="`tel:${contact.phoneHref}`"><span class="k">tel:</span>{{ contact.phoneDisplay }}</a>
      <span class="pill"><span class="k">loc:</span>{{ contact.location }}</span>
      <a class="pill" :href="contact.linkedinUrl" target="_blank"><span class="k">in:</span>{{ contact.linkedinLabel }}</a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  profile: { type: Object, required: true },
  contact: { type: Object, required: true }
})
</script>
