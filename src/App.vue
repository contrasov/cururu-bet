<script setup>
  import Header from './components/Header.vue';
  import Calendario from './components/Calendario.vue';
  import Footer from './components/Footer.vue'
  import { showCalendario } from './router/router.js'; 

</script>

<template>
  <main>
    <div>
      <Header/>
        <div class="ml-12 mr-12">
          <router-view></router-view>
        </div>
        <div class="ml-12 mr-12">
          <Calendario v-if="showCalendario" />
        </div>
        <Footer/>
    </div>
  </main>
</template>
