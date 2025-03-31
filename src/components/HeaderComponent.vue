<script setup lang="ts">
defineProps<{
  currentTheme?: 'light' | 'dark';
  changeCurrentTheme?: () => void;
}>();
</script>

<template>
  <div class="header__container">
    <img :src="`/FrameworkTeam/logo-${currentTheme}.png`" alt="Logo.png" class="logo" />
    <div
      class="icon__container"
      :class="[currentTheme === 'dark' ? 'icon__container-dark' : '']"
      @click="changeCurrentTheme"
    >
      <img :src="`/FrameworkTeam/${currentTheme}_icon.png`" alt="Icon.png" class="icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/variables' as *;
@use '../assets/fonts' as *;
.header__container {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 73px;
  height: 16px;
}
.icon__container {
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon__container-dark {
  background-color: $secondary-black;
  border-radius: 100%;
}
.icon {
  width: 20px;
  height: 20px;
}
@media (min-width: 768px) {
  .header__container {
    height: 88px;
  }
}
@media (min-width: 1440px) {
  .header__container {
    height: 80px;
  }
  .logo {
    width: 91px;
    height: 20px;
  }
}
</style>
