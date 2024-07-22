<template>
  <main class="ml-12 mt-6">
    <div>
      <div class="text-sm flex flex-row gap-4 text-textoVerde">
        <button class="bg-fundo px-[12px] py-[5px] rounded-md"
          v-for="date in availableDates"
          :key="date"
          :class="{ active: date === selectedDate }"
          @click="selectDate(date)"
        >
          {{ date }}
        </button>
      </div>
    </div>

    <div v-if="gamesForDate.length">
      <img class="pb-4 pt-6" src="/src/assets/wnba.svg">
      <ul class="flex flex-row gap-8">
        <li class="text-textoCinza bg-fundo rounded-md" v-for="game in gamesForDate" :key="game.time + game.teams">
          <div class="px-[30px] py-[24px] flex flex-col items-center">
            <ul class="text-textoBranco font-bold"> {{ game.time }} </ul>
            <div class="flex flex-row gap-12 px-6 py-6" >
              <img v-for="team in getTeams(game.teams)" :key="team" :src="teamsImages[team]" alt="Team Logo">  
            </div>
            <ul> {{ game.teams }} </ul> 
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Nenhum jogo disponível para a data selecionada.</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      gamesByDate: {},
      selectedDate: '',
      gamesForDate: [],
      teamsImages: {
        "CHISky": "/src/assets/teams/CHISky.svg",
        "ATLDream": "/src/assets/teams/ATLDream.svg",
        "CONSun": "/src/assets/teams/CONSun.svg",
        "DALWings": "/src/assets/teams/DALWings.svg",
        "INDFever": "/src/assets/teams/INDFever.svg",
        "LASparks": "/src/assets/teams/LASparks.svg",
        "LVAces": "/src/assets/teams/LVAces.svg",
        "MINLynx": "/src/assets/teams/MINLynx.svg",
        "NYLiberty": "/src/assets/teams/NYLiberty.svg",
        "PHXMercury": "/src/assets/teams/PHXMercury.svg",
        "SEAStorm": "/src/assets/teams/SEAStorm.svg",
        "WASMystics": "/src/assets/teams/WASMystics.svg",
      }
    };
  },
  computed: {
    availableDates() {
      return Object.keys(this.gamesByDate);
    }
  },
  created() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        this.gamesByDate = data;
        if (this.availableDates.length) {
          this.selectedDate = this.availableDates[0];
          this.updateGames();
        }
      })
      .catch(error => console.error('Erro ao carregar o JSON:', error));
  },
  methods: {
    selectDate(date) {
      this.selectedDate = date;
      this.updateGames();
    },
    updateGames() {
      this.gamesForDate = this.gamesByDate[this.selectedDate] || [];
    },
    getTeams(teamsString) {
      // Split the teams string and return an array of team names
      return teamsString.split(' v ').map(team => team.trim());
    }
  }
};
</script>

<style>

</style>
