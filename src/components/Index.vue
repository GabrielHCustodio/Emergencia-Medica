<template>
  <div>
    
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ titulo }}</a>
      </div>
    </nav>

    <div class="container">

      <div class="row mt-5">
        <div class="col-6 p">
          <profissionais />
        </div>

        <div class="col-6">
          <equipamentos />
        </div>
      </div>

      <div class="row mt-5 mb-5 bg-light p-2">
        <div class="col">
          <configuracao-equipe />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipes />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col">
          <btn-reset />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfiguracaoEquipe from './ConfiguracaoEquipe.vue'
import Equipamentos from './Equipamentos.vue'
import Equipes from './Equipes.vue'
import Profissionais from './Profissionais.vue'
import BtnReset from './BtnReset.vue'
import { mapActions } from 'vuex'

export default {
  components: { 
    ConfiguracaoEquipe,
    Equipamentos,
    Equipes,
    Profissionais,
    BtnReset
  },
  name: 'Index',
  props: {
    msg: String
  },
  methods: {
    ...mapActions({
      fetchEquipamentos: (dispatch, payload) => {
        dispatch('fetchEquipamentos', payload)
      },
      fetchProfissionais: 'fetchProfissionais'
    })
  },
  computed: {
    titulo() {
      return `${this.$store.state.titulo}`
    }
  },
  created() {
    this.fetchEquipamentos({
      carros: true,
      telefones: true,
      kitsDeReanimacao: true
    })
    this.fetchProfissionais()
  }
}
</script>
