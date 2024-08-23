<template>
  <header>
    <div class="flex flex-row pt-4 pb-4 pl-12 gap-12 items-center bg-fundo">
        <img src="/src/assets/logo.svg" @click="goToHome" class="cursor-pointer" >
        <div class="flex flex-row gap-4 text-textoCinza font-semibold">
          <a href="#" @click="openLink(0)" class="hover:text-textoVerde">Dimers</a>
          <a href="#" @click="openLink(1)" class="hover:text-textoVerde">Props Cash</a>
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