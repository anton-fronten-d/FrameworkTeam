<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Card from './components/CardComponent.vue';
import Header from './components/HeaderComponent.vue';
import Pagination from './components/PaginationComponent.vue';
import Search from './components/SearchComponent.vue';
import { useItemsStore } from './stores/itemsStore';
import NoResults from './components/NoResults.vue';

type Theme = 'light' | 'dark';

const currentTheme = ref<Theme>('light');
const itemsStore = useItemsStore();

const loadPictures = async (): Promise<void> => {
  await itemsStore.makeFullItems();
};

const changeCurrentTheme = (): void => {
  if (currentTheme.value === 'dark') {
    currentTheme.value = 'light';
  } else {
    currentTheme.value = 'dark';
  }
};

const pageChange = (page: number): void => {
  itemsStore.page = page;
  loadPictures();
};

onMounted(loadPictures);
</script>

<template>
  <div class="body-div" :class="[currentTheme === 'light' ? 'body-div-light' : 'body-div-dark']">
    <div class="d">
      <div class="container">
        <Header :current-theme="currentTheme" :change-current-theme="changeCurrentTheme" />
        <Search :current-theme="currentTheme" :load-pictures="loadPictures" />
        <div class="grid__container">
          <Card
            v-for="picture in itemsStore.fullItems"
            v-bind="picture"
            :key="picture.id"
            :current-theme="currentTheme"
            class="grid__card"
          />
        </div>
        <NoResults v-if="itemsStore.fullItems.length === 0" :current-theme="currentTheme" />
        <Pagination
          v-if="itemsStore.fullItems.length > 0"
          :current-theme="currentTheme"
          @page-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './assets/variables' as *;
@use './assets/fonts' as *;
.d {
  display: flex;
  justify-content: center;
  height: auto;
}
.body-div-light {
  background-color: $primary-white;
}
.body-div-dark {
  background-color: $primary-black;
}
.body-div {
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
}
.container {
  width: 280px;
}
.grid__card {
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .container {
    width: 728px;
  }

  .grid__container {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 352px 352px;
  }
  .grid__card {
    margin-bottom: 24px;
  }
}
@media (min-width: 1280px) {
  .container {
    width: 1240px;
  }
  .grid__container {
    display: grid;
    justify-content: space-between;
    grid-template-columns: 392px 392px 392px;
  }
  .grid__card {
    margin-bottom: 24px;
  }
}
</style>
