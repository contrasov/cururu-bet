<template>
  <main>
    <h1 class="text-textoBranco font-bold py-2 mb-2" >Primeiros Jogos para TIPS</h1>
    <div class="flex flex-row gap-4" v-if="eventsPrimary && eventsPrimary.length > 0">
      <div class="text-textoCinza px-6 py-6 text-sm bg-fundo rounded-md min-w-[290px] cursor-pointer hover:bg-[#313131]" v-for="(event, index) in eventsPrimary" :key="index">
        <h2 class="text-sm" >{{ event.name }}</h2>
        <h2 class="text-textoVerde text-lg">{{ event.shortName }}</h2>
        <div class="flex flex-row gap-2 pt-2">
          <p>Tempo: {{ event.status.clock }} - {{ event.status.displayClock }}</p>
          <p>/</p>
          <p>Periodo: {{ event.status.period}}</p>
        </div>
        <p>Completo: {{ event.status.type.completed }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import apiService from "../services/api";
export default {
    data() {
        return {
            eventsPrimary: [],
            nameTeam: null,
            error: null,
        };
    },
    async created(){
        try {
            const response = await apiService.getScoreboard();
            const events = response.data.events;

            if (events && events.length > 0) {
                this.eventsPrimary = events;
            } else {
                this.error = "ta errado"
            }
        } catch (error) {
            this.error = "error fetching data";
            console.error(erro);
        }
    }
}
</script>

<style>

</style>