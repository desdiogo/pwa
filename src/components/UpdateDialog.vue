<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  Separator,
} from 'reka-ui';

interface Props {
  open: boolean;
}

type Emits = {
  confirm: [];
  close: [];
};

const emit = defineEmits<Emits>();

const open = defineModel('open', {default: false})

function handleClose(open: boolean) {
  if (!open) emit('close');
}
</script>

<template>
  <DialogRoot v-model:open="open" @update:open="handleClose">
    <DialogPortal>
      <DialogOverlay class="DialogOverlay" />
      <DialogContent class="DialogContent">
        <DialogTitle class="DialogTitle">
          Nova versão disponível
        </DialogTitle>
        <Separator class="SeparatorRoot" />
        <DialogDescription class="DialogDescription">
          Atualize, para ter uma melhor experiência
        </DialogDescription>
        <Separator class="SeparatorRoot" />
        <div class="DialogFooter">
          <DialogClose class="secondary-btn text-uppercase">
            Cancelar
          </DialogClose>
          <button class="primary-btn text-uppercase" @click="emit('confirm')">
            Atualizar
          </button>
        </div>
        <DialogClose class="IconButton" aria-label="Close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#808080"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.DialogOverlay {
  position: fixed;
  inset: 0;
  background: #000;
  opacity: 0.5;
  z-index: 1056;
}

.DialogContent {
  background-color: var(--bg-element);
  width: 360px;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1057;
}

.DialogTitle {
  font-size: 16px;
  line-height: 22px;
  color: var(--text-primary);
  padding: 24px;
  letter-spacing: 0;
}

.DialogDescription {
  color: var(--text-primary);
  font-size: 14px;
  letter-spacing: 0;
  margin: 0;
  padding: 24px;
}

.DialogFooter {
  display: flex;
  justify-content: end;
  padding: 24px;
  gap: 16px;
}

.IconButton {
  all: unset;
  cursor: pointer;
  position: absolute;
  right: 24px;
  top: 24px;
}

.DialogMessage {
  padding: 6px 8px;
  font-size: 14px;
  text-align: start;
  border-radius: 5px;
  color: var(--text-primary);
  background-color: var(--bg-element);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 8px;
  word-break: break-word;
  white-space: break-spaces;
}

.DialogMessage :deep(p) {
  margin: 0;
  color: var(--text-primary);
}

.DialogMessage :deep(ul) {
  margin: 0;
}

.DialogMessage :deep(blockquote) {
  border-left-color: #9fb3cd;
  border-left-style: solid;
  border-left-width: 2px;
  color: var(--text-primary);
  margin: 4px 0;
  padding-left: 8px;
}

.DialogMessage :deep(code) {
  background-color: #f3f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 12px;
  margin: 4px 0;
  padding: 8px;
  display: block;
  white-space: normal;
}

.SeparatorRoot[data-orientation='horizontal'] {
  height: 1px;
  width: 100%;
  background-color: var(--line);
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
