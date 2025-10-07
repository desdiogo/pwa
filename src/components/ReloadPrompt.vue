<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { ref, onBeforeUnmount, watch } from 'vue';
import { RssIcon } from 'lucide-vue-next'
import UpdateDialog from '@/components/UpdateDialog.vue';

const intervalMs = 1000 * 5
const updateInterval = ref<ReturnType<typeof setInterval>>();

const { updateServiceWorker, needRefresh } = useRegisterSW({
  onRegisteredSW(swUrl, r) {
    if (r) {
      updateInterval.value = setInterval(async () => {
        if (r.installing || !navigator) return;

        if ('connection' in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache',
          },
        });

        if (resp?.status === 200) {
          needRefresh.value = true;
        }
      }, intervalMs);
    }
  },
});

const open = ref(false);

async function handleClose() {
  open.value = false;
}

function handleUpdate() {
  updateServiceWorker();
}

watch(needRefresh, (refresh) => {
  if (refresh) {
    open.value = refresh;
  }
});

onBeforeUnmount(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value);
  }
});
</script>

<template>
  <button class="upload-button" :disabled="!needRefresh" @click="open = true">
    <RssIcon />
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
  border-radius: 8px;
  border: none;
  transition: 0.2s;
  cursor: pointer;
}

.upload-button i {
  font-size: 1rem !important;
}

.upload-button:hover:not(:disabled) {
  background-color: gray;
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
