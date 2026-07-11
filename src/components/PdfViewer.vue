<template>
  <div ref="container" class="pdf-pages">
    <canvas v-for="n in numPages" :key="n" :ref="el => setCanvasRef(el, n - 1)"></canvas>
    <p v-if="error" class="pdf-error">Impossible d'afficher l'aperçu du PDF. <a :href="src" target="_blank">Ouvrez-le directement ↗</a></p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker

const props = defineProps({
  src: { type: String, required: true }
})

const container = ref(null)
const numPages = ref(0)
const error = ref(false)
let canvasEls = []

function setCanvasRef(el, index){
  if (el) canvasEls[index] = el
}

async function renderPdf(){
  error.value = false
  numPages.value = 0
  canvasEls = []

  try {
    const loadingTask = pdfjsLib.getDocument(props.src)
    const pdfDoc = await loadingTask.promise

    numPages.value = pdfDoc.numPages
    await nextTick() // s'assure que les <canvas> sont bien montés avant d'y dessiner

    const containerWidth = container.value.clientWidth

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i)
      const unscaledViewport = page.getViewport({ scale: 1 })
      const scale = containerWidth / unscaledViewport.width
      const viewport = page.getViewport({ scale })

      const canvas = canvasEls[i - 1]
      if (!canvas) continue
      canvas.width = viewport.width
      canvas.height = viewport.height

      const ctx = canvas.getContext('2d')
      await page.render({ canvasContext: ctx, viewport }).promise
    }
  } catch (e) {
    console.error('Erreur de rendu PDF:', e)
    error.value = true
  }
}

onMounted(renderPdf)
watch(() => props.src, renderPdf)
</script>

<style scoped>
.pdf-pages{
  display:flex; flex-direction:column; gap: 6px;
  width: 100%;
}
.pdf-pages canvas{
  width: 100%; height: auto; display:block;
}
.pdf-error{
  padding: 24px; text-align:center;
  font-family:'JetBrains Mono', monospace; font-size: 12.5px; color: var(--text-faint);
}
</style>
