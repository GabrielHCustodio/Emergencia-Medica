<template>
    <div>
        <div v-if="tipo == 'socorristas'">
            <select class="form-control form-control-sm" v-model="turno">
                <option value="">Todos</option>
                <option value="manhã">manhã</option>
                <option value="tarde">tarde</option>
                <option value="noite">noite</option>
            </select>
        </div>
        <item v-for="(item, indice) in itens" :key="indice" :dados="item" :tipo="tipo"/>
    </div>
</template>

<script>
import Item from '@/components/Item.vue'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'ListaItens',
    data() {
        return {
            turno: ''
        }
    },
    components: { 
        Item
    },
    props: {
        tipo: String
    },
    computed: {
        ...mapState({
            enfermeiros: state => state.enfermeiros,
            medicos: state => state.medicos,
            carros: state => state.equipamentos.carros,
            telefones: state => state.equipamentos.telefones,
            kitsDeReanimacao: state => state.equipamentos.kitsDeReanimacao
        }),
        ...mapGetters(['socorristasPorTurno','totalSocorristasPorTurno']),
        itens() {
            switch(this.tipo) {
                case 'enfermeiros' : return this.enfermeiros
                case 'socorristas' : return this.socorristasPorTurno(this.turno)
                case 'medicos' : return this.medicos
                case 'carros' : return this.carros
                case 'telefones' : return this.telefones
                case 'kits-de-reanimacao' : return this.kitsDeReanimacao
            }
        }
    }
}
</script>