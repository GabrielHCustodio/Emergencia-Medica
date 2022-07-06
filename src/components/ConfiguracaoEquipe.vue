<template>
  <div>
    <div class="row">
      <div class="col">
        <h5><i class="bi-boxes me-2"></i>{{titulo}}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <p>Enfermeiro: {{ enfermeiro }}</p>
        <p>Socorrista: {{ socorrista }}</p>
        <p>Médico: {{ medico }}</p> 
        <p>Carro: {{ carro }}</p>
        <p>Telefone: {{ telefone }}</p>
        <p>Kit de reanimação: {{ kitDeReanimacao}}</p>
      </div>
      <div class="col-4 text-center">
        <div class="row">
          <div class="col">
            <img class="img-fluid" :src="require(`@/assets/ambulancias/${imgAmbulancia}`)">
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <button type="button" class="btn btn-primary" @click="montarEquipe">Montar equipe</button>
          </div>
        </div>              
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ConfiguracaoEquipe',
    computed: {
      ...mapState({
        enfermeiro: state => state.equipe.enfermeiro,
        socorrista: state => state.equipe.socorrista,
        medico: state => state.equipe.medico,
        carro: state => state.equipe.carro,
        telefone: state => state.equipe.telefone,
        kitDeReanimacao: state => state.equipe.kitDeReanimacao
      }),
      titulo() {
        return 'Configuração da equipe'
      },
      imgAmbulancia() {
        if(this.kitDeReanimacao) {
          return 'uti.png'
        }
        if(this.carro) {
          return 'simples.png'
        }
        return 'indefinida.png'
      }
    },
    methods: {
      montarEquipe() {
        let equipe = Object.assign({}, this.$store.state.equipe)
        if(this.validarForm()) {
          alert('Equipe criada com sucesso!!!')
          this.$store.commit('adicionarEquipe', equipe)
        }
        else {
          alert('Verifique se todos os campos foram preenchidos com sucesso.')
        }
      },
      validarForm() {
        let valido = true
        if(this.enfermeiro === '' ) valido = false
        if(this.socorrista === '' ) valido = false
        if(this.medico === '' ) valido = false
        if(this.carro === '' ) valido = false
        if(this.telefone === '' ) valido = false
        if(this.kitDeReanimacao === '' ) valido = false
        return valido
      }
    }
}
</script>
