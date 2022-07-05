import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        titulo: 'Emergencias Médicas',
        equipe: {
            enfermeiro: '',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: ''
        },
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        totalEnfermeiros(state) {
            return state.enfermeiros.length
        },
        socorristasPorTurno(state) {
            return turno => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno)
        },
        totalSocorristas: state => state.socorristas.length,
        totalSocorristasPorTurno: (state, getters) => turno => getters.socorristasPorTurno(turno).length
    },
    mutations: {
        setItemEquipe(state,item) {
            let d = item.dados
            let t = item.tipo

            if(t == 'enfermeiros') state.equipe.enfermeiro = d.nome
            if(t == 'socorristas') state.equipe.socorrista = d.nome
            if(t == 'medicos') state.equipe.medico = d.nome
            if(t == 'carros') state.equipe.carro = d.placa
            if(t == 'telefones') state.equipe.telefone = d.telefone
            if(t == 'kits-de-reanimacao') state.equipe.kitDeReanimacao = d.kit
        },
        setEnfermeiros: (state, payload) => {
            state.enfermeiros = payload
        },
        setSocorristas: (state, payload) => {
            state.socorristas = payload
        },
        setMedicos: (state, payload) => {
            state.medicos = payload
        },
        setCarros: (state , {carros}) => {
            state.equipamentos.carros = carros
        },
        setTelefones: (state , {telefones}) => {
            state.equipamentos.telefones = telefones
        },
        setKitDeReanimacao: (state , {kitsDeReanimacao}) => {
            state.equipamentos.kitsDeReanimacao = kitsDeReanimacao
        }
    },
    actions: {
        fetchEquipamentos(context, {carros,telefones,kitsDeReanimacao}) {
            fetch('http://localhost:3000/equipamentos')
            .then(response => response.json())
            .then(dados => {
                if(carros) context.commit('setCarros', dados)
                if(telefones) context.commit('setTelefones', dados)
                if(kitsDeReanimacao) context.commit('setKitDeReanimacao', dados)
            })
        },
        fetchProfissionais(context) {
            fetch('http://localhost:3000/enfermeiros')
            .then(response => response.json())
            .then(dados => context.commit('setEnfermeiros', dados))

            fetch('http://localhost:3000/socorristas')
            .then(response => response.json())
            .then(dados => context.commit('setSocorristas', dados))

            fetch('http://localhost:3000/medicos')
            .then(response => response.json())
            .then(dados => context.commit('setMedicos',dados))
        }
    }
})