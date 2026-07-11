<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="project" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-panel" role="dialog" aria-modal="true">
          <button class="modal-close" type="button" aria-label="Fermer" @click="$emit('close')">✕</button>

          <div class="modal-visual">
            <PdfViewer v-if="project.file" :src="project.file" />
            <img
              v-else-if="project.screenshot"
              :src="project.screenshot"
              :alt="`Aperçu de ${project.name}`"
              @error="imgError = true"
              v-show="!imgError"
            >
            <div v-if="!project.file && (!project.screenshot || imgError)" class="preview-placeholder">
              <span>📷</span>
              <p>Capture d'écran à venir</p>
            </div>
          </div>

          <div class="modal-body">
            <div class="modal-top">
              <span class="tile-cat">{{ project.category }}</span>
            </div>
            <h3>{{ project.name }}</h3>
            <p class="modal-tagline">{{ project.tagline }}</p>
            <div class="modal-badge">{{ project.badge }}</div>

            <div class="modal-actions">
              <a v-if="project.url" class="doc-link" :href="project.url" target="_blank" rel="noopener">
                ↗ Visiter le site
              </a>
              <!-- <a v-if="project.file" class="doc-link" :href="project.file" target="_blank" rel="noopener">
                ↗ Ouvrir le PDF dans un nouvel onglet
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import PdfViewer from './PdfViewer.vue'

const props = defineProps({
  project: { type: Object, default: null }
})
defineEmits(['close'])

const imgError = ref(false)
watch(() => props.project, () => { imgError.value = false })
</script>

<style scoped>
.modal-backdrop{
  position: fixed; inset: 0; z-index: 100;
  background: rgba(10,13,17,0.72);
  backdrop-filter: blur(3px);
  display:flex; align-items:center; justify-content:center;
  padding: 24px;
}
.modal-panel{
  position: relative;
  width: 100%; max-width: 640px; max-height: 88vh;
  display: flex; flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.modal-close{
  position: absolute; top: 12px; right: 12px; z-index: 2;
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(15,20,25,0.6); color: #fff; border: none;
  cursor: pointer; font-size: 14px; display:flex; align-items:center; justify-content:center;
  transition: background .15s ease;
}
.modal-close:hover{ background: rgba(15,20,25,0.85); }

.modal-visual{
  flex: 0 1 auto;
  height: 52vh;
  min-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.modal-visual img{ width: 100%; height: auto; display: block; }
.preview-placeholder{
  height: 100%;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 6px;
  color: var(--text-faint); font-family:'JetBrains Mono', monospace; font-size: 12.5px;
}
.preview-placeholder span{ font-size: 28px; }

.modal-body{ flex: 0 0 auto; padding: 22px 24px 26px; overflow-y: auto; }
.modal-top{ margin-bottom: 10px; }
.modal-body h3{
  font-family:'Space Grotesk', sans-serif; font-size: 21px; font-weight: 600; margin-bottom: 8px;
}
.modal-tagline{ color: var(--text-dim); font-size: 14px; margin-bottom: 14px; }
.modal-badge{
  display:inline-block;
  font-family:'JetBrains Mono', monospace; font-size: 11.5px; color: var(--green);
  border: 1px solid var(--border); padding: 4px 10px; border-radius: 6px;
  margin-bottom: 18px;
}
.modal-actions{ display:flex; flex-wrap:wrap; gap: 10px; }

.tile-cat{
  font-family:'JetBrains Mono', monospace; font-size: 10.5px; color: var(--text-faint);
  border: 1px solid var(--border); padding: 2px 8px; border-radius: 4px;
}

.modal-fade-enter-active, .modal-fade-leave-active{ transition: opacity .15s ease; }
.modal-fade-enter-from, .modal-fade-leave-to{ opacity: 0; }
</style>
