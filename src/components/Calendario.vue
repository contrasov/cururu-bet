<template>
  <main>
    <div
      class="text-textoLaranja font-bold flex flex-row items-center gap-1.5 mb-2"
      v-if="abbreviation && seasonYear && wnbaLogo"
    >
      <img class="max-w-10" :src="wnbaLogo" alt="League Logo" />
      <h1>{{ abbreviation }}</h1>
      <h1>{{ seasonYear }}</h1>
    </div>
    <section class="flex flex-col px-4 py-4 bg-fundo rounded-md max-w-fit">
      <h1 class="text-textoBranco font-bold mb-3 text-xl" >Calendário</h1>
      <div v-for="event in events" :key="event.date">
          <h1 class="text-textoVerde pb-2">{{ event.date }}</h1>
          <div class="text-textoCinza text-sm mb-2 mr-2" v-for="game in event.games" :key="game.team1 + game.team2">
            <div class="flex flex-row items-center gap-2" >
              <p>{{ game.time }}</p>
              <img :src="teamLogos[game.team1]" :alt="game.team1" class="max-h-6" />
              {{ game.team1 }}
              <h2>X</h2>
              {{ game.team2 }}
              <img :src="teamLogos[game.team2]" :alt="game.team2" class="max-h-6" />
            </div>
          </div>
      </div>
    </section>

  </main>
</template>
  
<script>
import apiService from "../services/api";
import eventsCalendar from "../data/calendar.json";
import teamLogos from "../services/teamLogos";


export default {
  data() {
    return {
      abbreviation: null,
      error: null,
      seasonYear: null,
      wnbaLogo: null,
      seasonTwo: null,
      events: eventsCalendar,
      teamLogos: teamLogos,
    };
  },
  async created() {
    try {
      const response = await apiService.getScoreboard();
      const leagues = response.data.leagues;

      if (leagues && leagues.length > 0) {
        const firstLeague = leagues[0];

        this.abbreviation = firstLeague.abbreviation;
        this.seasonYear = firstLeague.season?.year || null;

        const logo = firstLeague.logos ? firstLeague.logos[0] : null;
        if (logo) {
          this.wnbaLogo = logo.href;
        } else {
          this.error = "Eta, deu erro na logo chefe.";
        }
      } else {
        this.error = "no league data found";
      }

    } catch (error) {
      this.error = "Error fetching data";
      console.error(error);
    }
  },
};
</script>
  