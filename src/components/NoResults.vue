<script setup lang="ts">
import { useItemsStore } from '@/stores/itemsStore';

defineProps<{
  currentTheme?: string;
}>();

const itemsStore = useItemsStore();
</script>

<template>
  <div>
    <p :class="`no__results-no-matches-${currentTheme}`" class="no__results-no-matches">
      No matches for
      <span :class="`no__results-span-${currentTheme}`" class="no__results-span">{{
        itemsStore.searchParams
      }}</span>
    </p>
    <p :class="`no__results-try-again-${currentTheme}`" class="no__results-try-again">
      Please try again with a different spelling or keywords.
    </p>
  </div>
</template>

<style lang="scss">
@use '../assets/variables' as *;
@use '../assets/fonts' as *;

.no__results-no-matches-dark {
  color: $primary-light-gray;
}
.no__results-no-matches-light {
  color: $primary-dark-gray;
}

.no__results-no-matches {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-size: 16px;
  font-style: normal;
}
.no__results-span {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-size: 16px;
  font-style: normal;
}

.no__results-try-again {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-size: 14px;
  font-style: normal;
  color: $secondary-gray;
}
</style>
