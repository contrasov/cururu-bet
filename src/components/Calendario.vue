<template>
    <h1 class="text-textoVerde font-semibold py-2 mt-2">Calendario de Jogos</h1>
    <div class="flex flex-col gap-4" v-if="scheduleApiData">
        <div class=" bg-fundo py-6 px-6 rounded-md" v-for="(schedule, index) in scheduleApiData.content.schedule" :key="index">
            <!-- for para passar dentro do array de games do schedule -->
            <div class="flex flex-col gap-4" v-for="(game, gameIndex) in schedule.games" :key="gameIndex">
                <div>
                    <p v-if="shouldShowDate(game.date, gameIndex, schedule.games)" class="text-textoVerde font-semibold">
                        {{ new Date(game.date).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' }) }}
                    </p>
                </div>
                <div class="flex flex-row  items-center gap-12 text-textoCinza">
                    <p>{{ formatTime(game.date) }}</p>
                    <div class="flex flex-col gap-3"  v-for="(competitions, compIndex) in game.competitions" :key="compIndex">
                        <div v-for="(competitors, compeIndex) in competitions.competitors" :key="compeIndex">
                            <div class="flex flex-row justify-between gap-8">
                                <div class="flex flex-row gap-2" >
                                    <img class="max-h-6" :src="competitors.team.logo" alt="team logo">
                                    <p class="font-semibold">{{ competitors.team.displayName }}</p>
                                </div>
                                <div>
                                    <p>{{ competitors.score }}</p>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>    
import apiService from "../services/api";

export default {
    data() {
        return {
            scheduleApiData: null
        }
    },
    async created(){
        try {
            const response = await apiService.getScheduleApiData();
            this.scheduleApiData = response.data; // Acesso ao conteúdo da resposta        
            
        } catch(error) {
            console.error('Erro ao buscar detalhes do evento:', error);
        }
    },
    methods: {
        /* verifica se a data anterior repete no for e se repetir não faça aparecer */
        shouldShowDate(date, index, games) {
        const currentDate = new Date(date).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
        const previousDate = index > 0 ? new Date(games[index - 1].date).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' }) : null;
        return currentDate !== previousDate;
        },

        /* formata a hora  */
        formatTime(date) {
            return new Date(date).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
        }
    }
}

</script>
