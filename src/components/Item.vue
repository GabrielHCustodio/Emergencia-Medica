<template>
    <div class="row">
        <div class="col-1" v-if="dados.id">{{dados.id}}</div>
        <div class="col" v-if="dados.nome">{{dados.nome}}</div>
        <div class="col" v-if="dados.placa">{{dados.placa}}</div>
        <div class="col" v-if="dados.telefone">{{dados.telefone}}</div>
        <div class="col" v-if="dados.kit">{{dados.kit}}</div>
        <div class="col-2" v-if="dados.escala">{{dados.escala}}</div>
        <div class="col-2" v-if="dados.turno">{{dados.turno}}</div>
        <div class="col-1">
            <i class="bi-check2-square" style="cursor: pointer" @click="adicionarItem"></i>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Item',
    props: {
        dados: Object,
        tipo: String
    },
    methods: {
        ...mapMutations(['setItemEquipe']),
        adicionarItem() {
            let item = {
                tipo: this.tipo,
                dados: this.dados
            }

            this.setItemEquipe(item)
        }
    }
}
</script> 