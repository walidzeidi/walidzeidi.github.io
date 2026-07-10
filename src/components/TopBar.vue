<template>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="logo">{{ profile.topbarLogoPrefix }}<b>.</b>{{ profile.topbarLogoSuffix }}<span style="color:var(--text-faint)">::cv</span></div>
      <div class="topbar-right">
        <div class="ping"><span class="dot"></span> {{ profile.topbarStatus }}</div>
        <router-link class="icon-btn nav-link" to="/">CV</router-link>
        <router-link class="icon-btn nav-link" to="/projets">Projets</router-link>
        <button class="icon-btn" type="button" aria-label="Changer de thème" @click="toggleTheme">
          <span>{{ isLight ? '🌙' : '☀' }}</span><span>{{ isLight ? 'Sombre' : 'Clair' }}</span>
        </button>
        <a class="icon-btn download" :href="profile.cvFile" download>⬇ PDF</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  profile: { type: Object, required: true }
})

const isLight = ref(document.documentElement.classList.contains('light-theme'))

function toggleTheme(){
  document.documentElement.classList.toggle('light-theme')
  isLight.value = document.documentElement.classList.contains('light-theme')
}
</script>
