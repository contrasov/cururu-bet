<template>
    <div class="flex flex-row gap-3 max-h-fit mt-10">
      <div class="text-textoCinza bg-fundo px-6 py-6 rounded-md" v-if="eventDetails">
        <!-- detalhes 2 - 24/08/2024 -->
        <div class="flex flex-col iem" v-for="(competitions, compIndex) in eventDetails.competitions" :key="compIndex">
          <!-- data setada com toLocaleString -->
           <div class="flex justify-center pb-3">
             <p>{{ new Date(competitions.date).toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
           </div>
          <div class="flex flex-row items-center gap-12 justify-between" v-for="(competitors, compeIndex) in competitions.competitors" :key="compeIndex">
            <div class="flex flex-row items-center gap-3 text-textoBranco">
              <img :src="competitors.team.logo" alt="logo team" class="max-w-12">
              <div>
                <p>{{ competitors.team.displayName}}</p>
                <p class="text-sm text-textoCinza">{{ competitors.records[0].summary }}</p>
              </div>
            </div>
            <div class="text-textoBranco text-2xl">
              <p>{{ competitors.score }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-fundo py-6 px-6 rounded-md" v-for="(teamInfos, tIndex) in teamsDetails[0]" :key="tIndex">
        <h1 class="text-textoVerde text-xl" >{{ teamInfos.name}}</h1>
        <div class="flex flex-row gap-6 justify-between pt-4" >
          <div class="border border-textoCinza rounded-md px-4 py-4">
            <p class="text-textoVerde" >Média de Pontos Sofridos</p>
            <p class="text-2xl text-textoBranco">{{ teamInfos.record.items[0].stats[2].value }}</p>
          </div>
          <div class="border border-textoCinza rounded-md px-4 py-4">
            <p class="text-textoVerde" >Média de Pontos</p>
            <p class="text-2xl text-textoBranco">{{ teamInfos.record.items[0].stats[3].value }}</p>
          </div>
        </div>
      </div>
      <div class="bg-fundo py-6 px-6 rounded-md" v-for="(teamInfos, tIndex) in teamsDetails[1]" :key="tIndex">
        <h1 class="text-textoVerde text-xl" >{{ teamInfos.name}}</h1>
        <div class="flex flex-row gap-6 justify-between pt-4" >
          <div class="border border-textoCinza rounded-md px-4 py-4">
            <p class="text-textoVerde" >Média de Pontos Sofridos</p>
            <p class="text-2xl text-textoBranco">{{ teamInfos.record.items[0].stats[2].value }}</p>
          </div>
          <div class="border border-textoCinza rounded-md px-4 py-4">
            <p class="text-textoVerde" >Média de Pontos</p>
            <p class="text-2xl text-textoBranco">{{ teamInfos.record.items[0].stats[3].value }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import apiService from "./services/api";

export default {
    name: 'Infos',
    data() {
    return {
      eventId: null,
      eventDetails: null,
      secondApiEventData: null,
      isLoading: true,
      teamsDetails: [],
    };
  },
  async created() {
    this.eventId = this.$route.params.id;
    try {
      const response = await apiService.getEventDetails(this.eventId);
      this.eventDetails = response.data;

      for (const competition of this.eventDetails.competitions) {
        for (const competitor of competition.competitors) {
          const teamResponse = await apiService.getTeamId(competitor.id);
          this.teamsDetails.push(teamResponse.data);
        }
      }


      /* acessando segunda api */
      const secondApiResponse = await apiService.getSecondApiData();
      const events = secondApiResponse.data.content.sbData.events;

      this.secondApiEventData = events.find(event => event.id === this.eventId);

    } catch (error) {
        console.error('Erro ao buscar detalhes do evento:', error);
    } finally {
      this.isLoading = false; 
    }
  }
}
</script>

<style>

</style>