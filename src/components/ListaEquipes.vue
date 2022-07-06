<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="(equipe, index) in equipes" :key="index">
                <equipe :dados="equipe" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Equipe from '@/components/Equipe'

export default {
    name: 'ListaEquipes',
    components: {
        Equipe
    },
    computed: {
        ...mapState(['equipes'])
    }
}
</script>