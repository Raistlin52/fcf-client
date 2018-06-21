<template>
  <v-card color="indigo lighten-4" flat>
    <v-toolbar color="primary" dark dense>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-menu :nudge-width="100">
        <v-toolbar-title class="white--text" slot="activator">
          <span>Week 7</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list dark dense>
          <v-list-tile v-for="item in items" :key="item">
            <v-list-tile-title v-text="item"></v-list-tile-title>
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
      'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'
    ]
  })
}
</script>
