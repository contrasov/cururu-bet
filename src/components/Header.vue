<template>
  <header>
    <div class="flex flex-row pt-4 pb-4 pl-12 gap-12 items-center bg-fundo">
        <img src="/src/assets/logo.svg" @click="goToHome" class="cursor-pointer" >
        <div class="flex flex-row gap-2">
          <img href="#" @click="openLink(0)" src="/src/assets/dimers.svg" alt="dimers" class="cursor-pointer">
          <img href="#" @click="openLink(1)" src="/src/assets/props.svg" alt="props" class="cursor-pointer">
        </div>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return{
      Links: ["https://www.dimers.com/bet-hub/wnba/schedule", "https://props.cash/"]
    };  
  },
  methods: {
    goToHome(){
      this.$router.push({path: '/'});
    },
    openLink(index) {
            const url = this.Links[index];
            window.open(url, "_blank");
    }
  }
}
</script>

<style>

</style>