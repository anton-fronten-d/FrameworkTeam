<script setup lang="ts">
defineProps<{
  currentTheme?: string;
  imageUrl?: string;
  author?: string;
  created?: string;
  location?: string;
  name?: string;
}>();
</script>

<template>
  <div class="card__container">
    <img :src="`/FrameworkTeam${imageUrl}`" alt="Picture.png" class="card" />
    <div class="info__container" :class="`info__container-${currentTheme}`">
      <div class="info__container-main">
        <div class="hover__container" :class="`hover__container-${currentTheme}`">
          <div class="hover__container-info1">
            <h1 :class="`h2__${currentTheme}`">{{ author }}</h1>
            <p :class="`p__${currentTheme}`">{{ location }}</p>
          </div>
          <div class="hover__container-info2">
            <h1 :class="`h2__${currentTheme}`">{{ name }}</h1>
            <h2 :class="`h2__${currentTheme}`">{{ name }}</h2>
            <p :class="`p__${currentTheme}`">{{ created }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/variables' as *;
@use '../assets/fonts' as *;

.card__container {
  position: relative;
  width: 280px;
  height: 185px;
}

.card {
  position: absolute;
  width: 280px;
  height: 185px;
}
.info__container {
  position: absolute;
  z-index: 2;
  width: 236px;
  height: 60px;
  left: 0;
  bottom: 0;

  &-dark {
    background-color: $primary-black;
  }

  &-light {
    background-color: $primary-white;
  }
  h1 {
    opacity: 0;
    position: absolute;
    z-index: 1;
  }
  h2 {
    font-family: 'Cormorant SC', serif;
    font-weight: 500;
    font-style: normal;
    font-size: 12px;
    text-transform: uppercase;
  }
  &-main {
    height: 29px;
    margin-left: 12px;
    p {
      font-family: 'Inter', sans-serif;
      font-optical-sizing: auto;
      font-weight: 700;
      font-size: 8px;
      text-transform: uppercase;
      font-style: normal;
    }
  }
}

.hover__container-info1 {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.h2__dark {
  color: $primary-light-gray;
}
.h2__light {
  color: $primary-black;
}
.p__dark {
  color: $accent-gold;
}
.p__light {
  color: $accent-red;
}

@media (min-width: 768px) {
  .card__container {
    width: 352px;
    height: 220px;
  }

  .card {
    width: 352px;
    height: 220px;
    transition: all 0.5s;
  }
  .info__container {
    width: 300px;
    height: 75px;
    bottom: 0;
    h1 {
      position: relative;
      opacity: 1;
      font-family: 'Cormorant SC', serif;
      font-weight: 500;
      font-style: normal;
      text-transform: uppercase;
      font-size: 16px;
    }

    h2 {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
    &-main {
      height: 42px;
      p {
        font-size: 12px;
      }
    }
  }
}
@media (min-width: 1440px) {
  .card__container {
    width: 392px;
    height: 260px;
  }

  .card {
    width: 392px;
    height: 260px;
  }
  .info__container {
    height: 82px;
  }

  .hover__container-info1 {
    opacity: 1;
    position: absolute;
    left: -400px;
    transition: all 0.5s;
  }
  .hover__container-info2 {
    position: absolute;
    left: 0;
    transition: all 0.5s;
    top: 0;
  }
  .hover__container-dark::after {
    content: '';
    display: block;
    width: 5px;
    height: 42px;
    background-color: $accent-gold;
    position: relative;
    top: 15px;
    left: -15px;
  }
  .hover__container-light::after {
    content: '';
    display: block;
    width: 5px;
    height: 42px;
    background-color: $accent-red;
    position: relative;
    top: 15px;
    left: -15px;
  }

  .hover__container {
    height: 42px;
    position: relative;
  }
  .card__container {
    overflow: hidden;
    &:hover {
      .hover__container-info1 {
        left: 0px;
      }
      .hover__container-info2 {
        top: 200px;
      }
      .card {
        transform: scale(1.05);
      }
    }
  }
}
</style>
