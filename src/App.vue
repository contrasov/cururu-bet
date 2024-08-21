<script setup>
  import Header from './components/Header.vue';
  import Calendario from './components/Calendario.vue';
</script>

<template>
  <main>
    <div>
      <Header/>
      <section class="flex flex-row gap-4 ml-8 mt-6 mb-6 max-h-fit max-w-fit">
        <Calendario/>
        <div>
          <router-view></router-view>
        </div>
      </section>
    </div>
  </main>

</template>
