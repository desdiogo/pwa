<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { ref, watch, onBeforeUnmount } from 'vue';
import UpdateDialog from '@/components/UpdateDialog.vue';
import { Rss } from 'lucide-vue-next';


const intervalMs = 5 * 1000
const updateInterval = ref<ReturnType<typeof setInterval>>();

const { updateServiceWorker, needRefresh, offlineReady } = useRegisterSW({
  onRegisteredSW(swUrl, r) {
    if (r) {
      updateInterval.value = setInterval(async () => {
        if (r.installing || !navigator) return;
        if (('connection' in navigator) && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            'cache': 'no-store',
            'cache-control': 'no-cache',
          },
        });

        if (resp?.status === 200) {
          await r.update();
        }
      }, intervalMs);
    }
  },

  onNeedRefresh() {
    console.log('Nova versão detectada');
  },

  onOfflineReady() {
    console.log('App pronto offline');
  }
});

const open = ref(false);

// Quando needRefresh muda para true, abre o dialog
watch(needRefresh, (refresh) => {
  if (refresh) {
    open.value = true;
  }
});

function handleClose() {
  open.value = false;
}

function handleUpdate() {
  updateServiceWorker();
}

onBeforeUnmount(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value);
  }
});
</script>

<template>
  <button class="upload-button" :disabled="!needRefresh" @click="open = true">
   <Rss />
  </button>
  <UpdateDialog
    v-model:open="open"
    @close="handleClose"
    @confirm="handleUpdate"
  />
</template>

<style scoped>
.upload-button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
  border-radius: 8px;
  border: none;
  transition: 0.2s;
  cursor: pointer;
}

.upload-button i {
  font-size: 1rem !important;
}

.upload-button:hover:not(:disabled) {
  background-color: var(--button-primary-bg-hover);
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>