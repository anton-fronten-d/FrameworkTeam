<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useItemsStore } from '../stores/itemsStore';

defineProps<{
  currentTheme?: string;
}>();
const emit = defineEmits(['pageChange']);
const currentPage = ref<number>(1);
const itemsStore = useItemsStore();
const onClickHandler = (): void => {
  emit('pageChange', currentPage.value);
};
</script>

<template>
  <div>
    <div class="pagination-main-container">
      <div class="pagination-container-center">
        <vue-awesome-paginate
          v-model="currentPage"
          :class="`pagination__${currentTheme}`"
          :total-items="itemsStore.totalItems"
          :items-per-page="6"
          :max-pages-shown="3"
          @click="onClickHandler"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../assets/variables' as *;
@use '../assets/fonts' as *;

.pagination-main-container {
  position: relative;
  justify-content: center;
  display: flex;
  z-index: 3;
}

.pagination__dark {
  .back-button,
  .next-button {
    background-color: $primary-black;
    &:hover {
      background-color: $secondary-black;
    }
  }

  .number-buttons,
  .first-button,
  .starting-breakpoint-button,
  .ending-breakpoint-button,
  .last-button {
    background-color: $primary-black;
    &:hover {
      border-bottom: 1px solid $primary-dark-gray;
    }
  }

  .paginate-buttons {
    color: $primary-light-gray;
  }

  .active-page {
    background-color: $secondary-black;
    color: $primary-light-gray;
  }
}

.pagination__light {
  .back-button,
  .next-button {
    background-color: $primary-white;
    &:hover {
      background-color: rgba(18, 18, 18, 0.05);
    }
  }

  .number-buttons,
  .first-button,
  .starting-breakpoint-button,
  .ending-breakpoint-button,
  .last-button {
    background-color: $primary-white;
    &:hover {
      border-bottom: 1px solid $secondary-gray;
    }
  }

  .paginate-buttons {
    color: $primary-dark-gray;
  }

  .active-page {
    background-color: rgba(18, 18, 18, 0.05);
    color: $primary-dark-gray;
  }
}

.back-button,
.next-button {
  display: block;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  height: 24px;
  width: 24px;
  &:hover {
    font-weight: 600;
  }
}

.number-buttons,
.first-button,
.starting-breakpoint-button,
.ending-breakpoint-button,
.last-button {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-size: 16px;
  height: 24px;
  width: 24px;
  cursor: pointer;
}

.pagination-container {
  display: flex;
}

.paginate-buttons {
  border: none;
  cursor: pointer;
}

.active-page {
  border-radius: 5px;
  font-weight: 500;
}
</style>
