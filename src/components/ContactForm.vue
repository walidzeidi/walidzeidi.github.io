<template>
  <section class="section" id="contact">
    <div class="section-head">
      <span class="tag">05</span>
      <h2>Me contacter</h2>
    </div>

    <form class="contact-form" @submit.prevent="submitForm">
      <div class="form-row">
        <div class="field">
          <label for="cf-name">Nom</label>
          <input id="cf-name" v-model.trim="form.name" type="text" required placeholder="Votre nom">
        </div>
        <div class="field">
          <label for="cf-email">Email</label>
          <input id="cf-email" v-model.trim="form.email" type="email" required placeholder="vous@exemple.com">
        </div>
      </div>

      <div class="field">
        <label for="cf-message">Message</label>
        <textarea id="cf-message" v-model.trim="form.message" required rows="5" placeholder="Votre message..."></textarea>
      </div>

      <button class="submit-btn" type="submit" :disabled="status === 'sending'">
        <span v-if="status === 'sending'">Envoi en cours…</span>
        <span v-else>→ Envoyer le message</span>
      </button>

      <p v-if="status === 'success'" class="form-status success">
        ✓ Message envoyé, merci ! Je vous réponds au plus vite.
      </p>
      <p v-if="status === 'error'" class="form-status error">
        Une erreur est survenue. Vous pouvez aussi écrire directement à
        <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
      </p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  contactEmail: { type: String, required: true }
})

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjeaqvv'

const form = reactive({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | success | error

async function submitForm(){
  status.value = 'sending'
  try {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('email', form.email)
    fd.append('message', form.message)

    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: fd
    })

    if (res.ok) {
      status.value = 'success'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      status.value = 'error'
    }
  } catch (e) {
    status.value = 'error'
  }
}
</script>

<style scoped>
.contact-form{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-row{ display:grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field{ display:flex; flex-direction:column; gap: 6px; }
.field label{
  font-family:'JetBrains Mono', monospace; font-size: 12px; color: var(--text-faint);
}
.field input, .field textarea{
  font-family: 'Inter', sans-serif; font-size: 14px; color: var(--text);
  background: var(--bg); border: 1px solid var(--border); border-radius: 6px;
  padding: 10px 12px; resize: vertical;
  transition: border-color .15s ease;
}
.field input:focus, .field textarea:focus{
  outline: none; border-color: var(--blue);
}
.submit-btn{
  align-self: flex-start;
  font-family:'JetBrains Mono', monospace; font-size: 13px; font-weight: 600;
  color: var(--blue); background: rgba(88,166,255,0.1); border: 1px solid rgba(88,166,255,0.35);
  padding: 10px 20px; border-radius: 6px; cursor:pointer; transition: background .15s ease;
}
.submit-btn:hover:not(:disabled){ background: rgba(88,166,255,0.18); }
.submit-btn:disabled{ opacity: 0.6; cursor: not-allowed; }

.form-status{ font-size: 13.5px; }
.form-status.success{ color: var(--green); }
.form-status.error{ color: var(--amber); }

@media (max-width: 560px){
  .form-row{ grid-template-columns: 1fr; }
}
</style>
