<template>
  <main>
    <div
      class="text-textoCinza font-bold flex flex-row items-center gap-1.5 mx-12 my-6"
      v-if="abbreviation && seasonYear && wnbaLogo"
    >
      <img class="max-w-10" :src="wnbaLogo" alt="League Logo" />
      <h1>{{ abbreviation }}</h1>
      <h1>{{ seasonYear }}</h1>
    </div>
  </main>
</template>
  
<script>
import apiService from "../services/api";

export default {
  data() {
    return {
      abbreviation: null,
      error: null,
      seasonYear: null,
      wnbaLogo: null,
      seasonTwo: null,
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
  