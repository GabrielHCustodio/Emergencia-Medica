<template>
  <div>
    <button @click="resetEquipe" class="btn btn-danger">Resetar equipes</button>
  </div>
</template>

<script>
export default {
  name: "btnReset",
  methods: {
    resetEquipe() {
      let equipes = []
      this.$store.commit("resetEquipe", equipes)
    }
  }
}
</script>
