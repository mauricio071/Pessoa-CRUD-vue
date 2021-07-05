<template>
    <div class="home">
        <h1 class="text-center mt-4 mb-4">Editar</h1>
        <div class="col-8 m-auto">
            <form>
                <input class="form-control" type="text" name="nome" v-validate data-vv-rules="required|min:3|max:30" v-model="form.nome" placeholder="Nome:">
                <span class="erro" v-show="errors.has('nome')">{{ errors.first('nome') }}</span><br>

                <input class="form-control" type="text" name="data" v-validate data-vv-rules="required" v-model="form.data" v-mask="'##/##/####'" placeholder="Data:">
                <span class="erro" v-show="errors.has('data')">{{ errors.first('data') }}</span><br>

                <input class="form-control" type="text" name="peso" v-validate data-vv-rules="required" v-model="form.peso" placeholder="Peso:">
                <span class="erro" v-show="errors.has('peso')">{{ errors.first('peso') }}</span><br>

                <label for="sexom">Masculino</label>
                <input type="radio" name="sexom" value="m" v-model="form.sexo"> 

                <label for="sexof">Feminino</label> 
                <input type="radio" name="sexof" value="f" v-model="form.sexo">
                <br><br>

                <input class="form-control" type="text" name="cpf" v-validate data-vv-rules="required|min:14" v-model="form.cpf" v-mask="'###.###.###-##'" placeholder="CPF:">
                <span class="erro" v-show="errors.has('cpf')">O CPF deve conter 11 caracteres</span><br>

                <router-link to="/"><input class="btn btn-primary" value="Editar" @click.prevent="editar(form.id)"></router-link>
                
            </form>
        </div>
    </div>
</template>

<script>
import {apiPublic} from '../api/service'

export default {
    //name: 'Home',
    props: ['pessoa'],

    data(){
        return {
            form: {
                nome: null,
                data: null,
                peso: null,
                sexo: null,
                cpf: null,
                pessoa_id: null,
            }
        }
    },
    
    created() {
        // this.form.id = this.pessoa.id
        // this.form.nome = this.pessoa.nome
        // this.form.data = this.pessoa.data
        // this.form.peso = this.pessoa.peso
        // this.form.sexo = this.pessoa.sexo
        // this.form.cpf = this.pessoa.cpf
        this.form.pessoa_id = this.$route.params.id
        this.alterar(this.form.pessoa_id)
    },

    methods: {
        editar(id) {
            this.$validator
            .validateAll()
            .then(success => {
              if(success) {
                apiPublic.post(`editar/${id}`, this.form)
                .then((r) => {
                    console.log(r)
                    //window.location.href = "http://192.168.15.11:8080/"
                    this.$router.push({ name: 'home' })
                })
                .catch(e => {
                    this.errors.push(e)
                })
                }
          });
            
        },

        alterar(id) {
            apiPublic.get(`editar/${id}`)
            .then(response => {
                this.form = response.data
            })
            .catch(e => {
                this.errors.push(e)
            })
        },
    }
} 
</script>

<style scoped>
.erro {
    color: red;
}
</style>
