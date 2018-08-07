<template>
  <v-card color="indigo lighten-4" flat>
    <v-toolbar color="primary" dark dense>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-menu :nudge-width="100">
        <v-toolbar-title class="white--text" slot="activator">
          <span>Week {{$store.state.selected_week}}</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list dense>
          <v-list-tile v-for="item in items" :key="item.text">
            <v-list-tile-title v-text="item.text" @click="navigate(item.url)"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Week 1',
        url: '/week/1'
      },
      {
        text: 'Week 2',
        url: '/week/2'
      },
      {
        text: 'Week 3',
        url: '/week/3'
      },
      {
        text: 'Week 4',
        url: '/week/4'
      },
      {
        text: 'Week 5',
        url: '/week/5'
      },
      {
        text: 'Week 6',
        url: '/week/6'
      },
      {
        text: 'Week 7',
        url: '/week/7'
      },
      {
        text: 'Week 8',
        url: '/week/8'
      },
      {
        text: 'Week 9',
        url: '/week/9'
      },
      {
        text: 'Week 10',
        url: '/week/10'
      }
    ]
  }),

  methods: {
    navigate (url) {
      this.$router.push(url)
    }
  }
}
</script>
