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
        equipes: [],
        // enfermeiros: [],
        // socorristas: [],
        // medicos: [],
        // equipamentos: {
        //     carros: [],
        //     telefones: [],
        //     kitsDeReanimacao: []
        // }
        enfermeiros: [
            { "id": 1, "nome": "João", "escala": "12x36" },
            { "id": 2, "nome": "Maria", "escala": "12x36" },
            { "id": 3, "nome": "Ana", "escala": "24x48" },
            { "id": 4, "nome": "José", "escala": "24x48" },
            { "id": 5, "nome": "Felipe", "escala": "12x36" },
            { "id": 6, "nome": "Marcelo", "escala": "24x48" },
            { "id": 7, "nome": "Antônio", "escala": "12x36" }
        ],
        socorristas: [
            { "id": 1, "nome": "Marcos", "turno": "manhã" },
            { "id": 2, "nome": "Felipe", "turno": "tarde" },
            { "id": 3, "nome": "Cláudia", "turno": "tarde" },
            { "id": 4, "nome": "Michele", "turno": "noite" },
            { "id": 5, "nome": "Pedro", "turno": "manhã" },
            { "id": 6, "nome": "Miguel", "turno": "manhã" },
            { "id": 7, "nome": "Karina", "turno": "tarde" }
        ],
        medicos: [
            { "id": 1, "nome": "André", "escala": "12x36" },
            { "id": 2, "nome": "Roberta", "escala": "12x36" },
            { "id": 3, "nome": "Carlos", "escala": "24x48" },
            { "id": 4, "nome": "Juliana", "escala": "24x48" },
            { "id": 5, "nome": "Sérgio", "escala": "12x36" },
            { "id": 6, "nome": "Renata", "escala": "12x36" },
            { "id": 7, "nome": "Andressa", "escala": "12x36" }
        ],
        equipamentos: {
            carros: [
                { "id": 1, "placa": "ABC-0000" },
                { "id": 2, "placa": "BRA-1A11" },
                { "id": 3, "placa": "CBA-1111" },
                { "id": 4, "placa": "ARB-2B22" },
                { "id": 5, "placa": "ZZZ-9999" },
                { "id": 6, "placa": "XYZ-7A88" },
                { "id": 7, "placa": "XXX-1234" }
            ],
            telefones: [
                { "id": 1, "telefone": "+55 11 98888-8888" },
                { "id": 2, "telefone": "+55 11 97777-7777" },
                { "id": 3, "telefone": "+55 11 96666-6666" },
                { "id": 4, "telefone": "+55 11 95555-5555" },
                { "id": 5, "telefone": "+55 11 94444-4444" },
                { "id": 6, "telefone": "+55 11 93333-3333" },
                { "id": 7, "telefone": "+55 11 92222-2222" }
            ],
            kitsDeReanimacao: [
                { "id": 1, "kit": "K0001" },
                { "id": 2, "kit": "K0002" },
                { "id": 3, "kit": "K0003" },
                { "id": 4, "kit": "K0004" },
                { "id": 5, "kit": "K0005" },
                { "id": 6, "kit": "K0006" },
                { "id": 7, "kit": "K0007" }
            ]
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
        setItemEquipe(state, item) {
            let d = item.dados
            let t = item.tipo

            if (t == 'enfermeiros') state.equipe.enfermeiro = d.nome
            if (t == 'socorristas') state.equipe.socorrista = d.nome
            if (t == 'medicos') state.equipe.medico = d.nome
            if (t == 'carros') state.equipe.carro = d.placa
            if (t == 'telefones') state.equipe.telefone = d.telefone
            if (t == 'kits-de-reanimacao') state.equipe.kitDeReanimacao = d.kit
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
        setCarros: (state, { carros }) => {
            state.equipamentos.carros = carros
        },
        setTelefones: (state, { telefones }) => {
            state.equipamentos.telefones = telefones
        },
        setKitDeReanimacao: (state, { kitsDeReanimacao }) => {
            state.equipamentos.kitsDeReanimacao = kitsDeReanimacao
        },
        adicionarEquipe: (state, payload) => {
            state.equipes.push(payload)
            state.equipe = {}
        },
        resetEquipe: (state, payload) => {
            state.equipes = payload
            alert('Equipes resetadas')
        }
    },
    actions: {
        fetchEquipamentos(context, { carros, telefones, kitsDeReanimacao }) {
            fetch('http://localhost:3000/equipamentos')
                .then(response => response.json())
                .then(dados => {
                    if (carros) context.commit('setCarros', dados)
                    if (telefones) context.commit('setTelefones', dados)
                    if (kitsDeReanimacao) context.commit('setKitDeReanimacao', dados)
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
                .then(dados => context.commit('setMedicos', dados))
        }
    }
})