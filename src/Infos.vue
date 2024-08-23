<template>
  <!-- Indicador de carregamento -->
    <button v-if="isLoading" disabled type="button" class="text-textoVerde place-items-center ml-[450px] mt-[200px]">
    <svg aria-hidden="true" role="status" class="inline w-10 h-10 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    </button>

    <!-- primeiros cards infos / tempo -->
    <div class="flex flex-row gap-3 max-h-fit mt-10">
      <div class="text-textoCinza bg-fundo px-6 py-6 rounded-md" v-if="!isLoading && eventDetails">
          <p class="text-textoVerde text-xl" >{{ eventDetails.name.replace('at', 'x') }}</p>
          <p>{{ eventDetails.shortName }}</p>
        <div v-if="eventDetails.competitions && eventDetails.competitions.length">
        <ul>
          <li v-for="competition in eventDetails.competitions" :key="competition.id">
            <p class="">{{ new Date(competition.date).toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
          </li>
        </ul>
        </div>
      </div>
      <!-- cards partidas -->
      <div class=" bg-fundo px-6 py-6 rounded-md max-w-[505px]" v-if="secondApiEventData">
        <h1 class="text-textoVerde text-xl">Pontuação</h1>
        <div v-for="(competition, index) in eventDetails.competitions" :key="index">
          <div class="flex gap-2 text-textoCinza" v-for="(competitor, compIndex) in competition.competitors" :key="compIndex">
            <p>{{ competitor.team.name }}</p> <!-- Exemplo de exibição de nome da equipe -->
            <p>{{ competitor.score }}</p>
          </div>
        </div>

        <div class="mt-2">
          <p class="flex flex-row items-center gap-2 px-2 py-1 bg-[#517D30] text-textoBranco max-w-[130px]" v-if="secondApiEventData.status?.type?.completed">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Finalizado
          </p>
          <p v-else></p>
        </div>
      </div>
    </div>

    <div>
      <div class="mt-4" v-for="(competition, index) in eventDetails.competitions" :key="index">
        <div class="flex flex-col bg-fundo gap-2 text-textoCinza px-6 py-6 mb-4" v-for="(competitor, compIndex) in competition.competitors" :key="compIndex">
          <p class="text-xl text-textoBranco font-bold">{{ competitor.team.displayName }}</p> <!-- Exemplo de exibição de nome da equipe -->
          <div class="gap-4 flex flex-row"> 
            <div class="flex flex-col items-center" v-for="(leader, leaderIndex) in competitor.leaders" :key="leaderIndex">
              <!-- Exibe informações dos líderes -->
              <p class="text-xl text-textoVerde">{{ leader.displayName }}</p>
                <div v-if="leader.leaders && leader.leaders.length > 0">
                  <div v-for="(subLeader, subLeaderIndex) in leader.leaders" :key="subLeaderIndex">
                    <div class="flex flex-col items-center gap-2 py-4 px-4">
                      <p>{{ subLeader.athlete.fullName }}</p>
                      <p class="text-textoBranco">{{ subLeader.displayValue }}</p>
                      <img class="max-h-16" :src="subLeader.athlete.headshot" alt="Headshot"/>
                    </div>
                  </div>
                </div>
              </div>     
          </div>
        </div> 
        <div>
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
      isLoading: true
    };
  },
  async created() {
    this.eventId = this.$route.params.id;
    try {
      const response = await apiService.getEventDetails(this.eventId);
      this.eventDetails = response.data;
    
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