<script setup lang="ts">
import { ref } from 'vue';
import { useItemsStore } from '../stores/itemsStore';

const props = defineProps<{
  currentTheme?: string;
  loadPictures?: () => Promise<void>;
}>();
const currentInputValue = ref<string>('');
const itemsStore = useItemsStore();
const search = (event: Event) => {
  const target = event.target as HTMLInputElement;
  itemsStore.page = 1;
  itemsStore.searchParams = target.value;
  if (props.loadPictures) {
    props.loadPictures();
  }
};

const cleanSearch = (): void => {
  currentInputValue.value = '';
  itemsStore.searchParams = '';
  if (props.loadPictures) {
    props.loadPictures();
  }
};
</script>

<template>
  <div class="input__mover">
    <div class="search__container">
      <img
        :src="`/FrameworkTeam/Vector-${props.currentTheme}.png`"
        class="img-1"
        alt="Search.png"
      />

      <input
        v-model="currentInputValue"
        type="text"
        placeholder="Painting title"
        :class="`input__${props.currentTheme}`"
        @input="search"
      />
      <img
        v-if="currentInputValue.length > 0"
        :src="`/FrameworkTeam/cross-${props.currentTheme}.svg`"
        class="img-2"
        alt="Cancel.png"
        @click="cleanSearch"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/variables' as *;
@use '../assets/fonts' as *;

.search__container {
  margin-top: 27px;
  margin-bottom: 20px;
  position: relative;

  .img-1 {
    position: absolute;
    z-index: 2;
    left: 16px;
    top: 8px;
  }
  .img-2 {
    position: absolute;
    z-index: 2;
    right: 16px;
    top: 14px;
    cursor: pointer;
  }
  input {
    width: 280px;
    height: 33px;
    outline: none;
    padding-left: 48px;
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    font-size: 12px;
  }
}
.input__dark {
  color: $primary-light-gray;
  background-color: $secondary-black;
  border: none;
  &:focus {
    border: 1px solid $primary-light-gray;
  }
}
.input__light {
  color: $primary-dark-gray;
  border: 1px solid $primary-light-gray;
  &:focus {
    border: 1px solid $primary-dark-gray;
  }
}
@media (min-width: 768px) {
  .search__container {
    margin-top: 44px;

    input {
      width: 296px;
      height: 36px;
    }
  }

  .input__mover {
    display: flex;
    justify-content: right;
  }
}
@media (min-width: 1440px) {
  .search__container {
    input {
      width: 336px;
    }
  }
}
</style>
