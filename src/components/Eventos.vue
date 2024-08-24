<template>
  <main class="mt-6">
    <h1 class="text-textoVerde font-bold py-2 mb-2" >Primeiros Jogos para TIPS</h1>
    <button v-if="isLoading" disabled type="button" class="text-textoVerde place-items-center ml-[450px] mt-[200px]">
    <svg aria-hidden="true" role="status" class="inline w-10 h-10 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    </button>

                                    <!-- consigo separar o elemento com .split -->
                                <!-- <p class="text-sm" >
                                    <span class="text-[#39B57A]">V {{ competitors.records[0].summary.split('-')[0] }}</span> -
                                    <span class="text-[#E35C47]">D {{ competitors.records[0].summary.split('-')[1] }}</span>
                                </p> -->

    <div class="flex flex-row gap-4" v-if="!isLoading && eventsPrimary && eventsPrimary.length > 0">
      <div class="text-textoCinza px-6 py-6 text-sm bg-fundo rounded-md min-w-[300px] cursor-pointer hover:bg-[#313131]" v-for="(event, index) in eventsPrimary" :key="index" @click="goToinfo(event.id)">
        <!-- formatando a data ISO 8601 diretamente no dom -->
        <p class="flex justify-center pb-4">{{ new Date(event.date).toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
        <div class="flex flex-row gap-4 justify-center" v-for="(competitions, compIndex) in event.competitions" :key="compIndex">
          <div v-for="(competitors, compeIndex) in competitions.competitors" :key="compeIndex">
            <div class="flex flex-col items-center gap-2 pt-2">
              <img :src="competitors.team.logo" alt="logo team" class="max-w-12">
              <h1 class="text-textoBranco font-semibold">{{ competitors.team.displayName }}</h1>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-2">
        </div>
        <div class="mt-2">
          <p class="flex flex-row items-center gap-2 px-2 py-1 bg-[#517D30] text-textoBranco max-w-[130px]" v-if="event.status?.type?.completed">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Finalizado
          </p>
          <p v-else></p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import apiService from "../services/api";
export default {
  name: 'Eventos',
  
    data() {
        return {
            eventsPrimary: [],
            nameTeam: null,
            error: null,
            isLoading: true,
           scheduleApiData: null
        };
    },
    methods: {
      goToinfo(id){
        this.$router.push({name: 'Info', params: {id} });
      }
    },
    async created(){
        try {
            const response = await apiService.getScoreboard();
            const events = response.data.events;
            
            const scheduleResponse = await apiService.getScheduleApiData();
            this.scheduleApiData = scheduleResponse.data; // Acesso ao conteúdo da resposta      
            

            if (events && events.length > 0) {
                this.eventsPrimary = events;
            } else {
                this.error = "ta errado"
            }
        } catch (error) {
            this.error = "error fetching data";
            console.error(error);
        } finally {
           this.isLoading = false; // Independente do sucesso ou erro, carregamento termina
          }
    }
}
</script>
