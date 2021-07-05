<template>
    <div class="container">
        <div>
            <div class="mt-4 mb-4">
                <router-link class="btn btn btn-success" :to="{ name:'novo' }">Novo</router-link>
                <!-- <button class="btn btn-success" @click.prevent="criar">novo</button> -->
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Data</th>
                    <th scope="col">Peso</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Funções</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pessoa, index) in dados" :key='index'>
                        <th scope="row">{{pessoa.id}}</th>
                        <td>{{pessoa.nome}}</td>
                        <td>{{pessoa.data}}</td>
                        <td>{{pessoa.peso}}</td>
                        <td v-if="pessoa.sexo === 'm'">Masculino</td>
                        <td v-if="pessoa.sexo === 'f'">Feminino</td>
                        <td>{{pessoa.cpf}}</td>
                        <td>
                            <!-- @click.prevent="alterar(pessoa.id) -->
                            <router-link class="btn btn btn-primary" :to="{ name:'editar', params:{id:pessoa.id} }">Editar</router-link>
                            <!-- <a class="btn btn-primary" :to="{name:'editar'}"></a> -->
                            <router-link class="btn btn-success" :to="{ name:'residencia', params:{id:pessoa.id} }">Endereço</router-link>
                            <router-link class="btn btn-warning" :to="{ name:'cnh', params:{id:pessoa.id} }">CNH</router-link>
                            <a class="btn btn-danger" @click.prevent="excluir(pessoa.id)">Excluir</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>
</template>

<script>
import {apiPublic} from '../api/service'
// import Novo from './Novo.vue'
// import Editar from './Editar.vue'
// import Residencia from './Residencia.vue'

export default {
    // name: 'Home',

    // components: {
    //     Novo,
    //     Editar,
    //     Residencia,
    // },

    data() {
        return {
            dados: null,
            // novo: false,
            // editar: false,
            // endereco: false,
            //residencia: null,
            // pessoa: null,
        }
    },

    created(){
        this.getPessoas()
    },

    methods: {
        getPessoas() {
            apiPublic.get(`pessoas`)
            .then(response => {
                this.dados = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
        },

        // criar() {
        //     this.novo = !this.novo
        // },

        excluir(id) {
            apiPublic.get(`excluir/${id}`)
            .then(() => {
                this.getPessoas()
            })
            .catch(e => {
                this.errors.push(e)
            })
        },
    }
}
</script>
