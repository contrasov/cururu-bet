<script setup>
  import Header from './components/Header.vue';
  import Calendario from './components/Calendario.vue';
  import Eventos from './components/Eventos.vue';
</script>

<template>
  <main>
    <div>
      <Header/>
      <section class="flex flex-row gap-6 ml-12 mt-6 mb-6 max-h-fit max-w-fit">
        <Calendario/>
        <div>
          <Eventos/>
        </div>
      </section>
    </div>
  </main>

</template>

<style scoped>

</style>
