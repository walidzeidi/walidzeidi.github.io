<template>
  <template v-if="data">
    <Hero :profile="data.profile" :contact="data.contact" />

    <ExperienceSection :experiences="data.experiences" />

    <div class="projects-cta">
      <router-link class="doc-link" to="/projets">↗ Voir tous les projets ({{ data.projects.length }})</router-link>
    </div>

    <StackSection :stack="data.stack" />

    <IntegrationSection :cards="data.integration" />

    <FormationSection :formation="data.formation" />

    <ContactForm :contact-email="data.contact.email" />
  </template>
</template>

<script setup>
import { inject } from 'vue'
import Hero from '../components/Hero.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import StackSection from '../components/StackSection.vue'
import IntegrationSection from '../components/IntegrationSection.vue'
import FormationSection from '../components/FormationSection.vue'
import ContactForm from '../components/ContactForm.vue'

const data = inject('cvData')
</script>

<style scoped>
.projects-cta{
  display:flex; justify-content:center;
  padding: 4px 0 8px;
}
</style>
