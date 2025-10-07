<script setup lang="ts">
import pkg from '../package.json'
import ReloadPrompt from "@/components/ReloadPrompt.vue";

const version = pkg.version
</script>

<template>
  <span>Version: {{ version }}</span>
  <ReloadPrompt />
</template>

