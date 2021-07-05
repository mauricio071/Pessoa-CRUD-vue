<template>
    <div class="home">
        <h1 class="text-center mt-4 mb-4">Novo</h1>
        <div class="col-8 m-auto">
            <form>
                <input class="form-control" type="text" name="cep" v-validate data-vv-rules="required|min:9" v-mask="'#####-###'" v-model="form.cep" placeholder="CEP:">
                <span class="erro" v-show="errors.has('cep')">O CEP deve conter 8 caracteres</span><br>
                
                <input class="form-control" type="text" name="logradouro" v-validate data-vv-rules="required" v-model="form.logradouro" placeholder="Logradouro:">
                <span class="erro" v-show="errors.has('logradouro')">{{ errors.first('logradouro') }}</span><br>

                <input class="form-control" type="text" name="complemento" v-model="form.complemento" placeholder="Complemento:"><br>

                <input class="form-control" type="text" name="bairro" v-validate data-vv-rules="required" v-model="form.bairro" placeholder="Bairro:">
                <span class="erro" v-show="errors.has('bairro')">{{ errors.first('bairro') }}</span><br>

                <input class="form-control" type="text" name="numero" v-validate data-vv-rules="required" v-model="form.numero" placeholder="Número:">
                <span class="erro" v-show="errors.has('numero')">{{ errors.first('numero') }}</span><br>
                
                <input class="form-control" type="text" name="cidade" v-validate data-vv-rules="required" v-model="form.cidade" placeholder="Cidade:">
                <span class="erro" v-show="errors.has('cidade')">{{ errors.first('cidade') }}</span><br>

                <input class="form-control" type="text" name="estado" v-validate data-vv-rules="required" v-model="form.estado" placeholder="Estado:">
                <span class="erro" v-show="errors.has('estado')">{{ errors.first('estado') }}</span><br>
                
                <input class="btn btn-primary" v-if="ativo === false" value="Cadastrar" @click.prevent="store" >
                <input class="btn btn-primary" v-if="ativo === true" value="Alterar" @click.prevent="edit(form.pessoa_id)" >
                <input class="btn btn-danger" v-if="ativo === true" value="Excluir" @click.prevent="excluir(form.pessoa_id)" >
            </form>
        </div>
    </div>
</template>

<script>
import {apiPublic} from '../api/service'

export default {

    //props: ['residencia'],

    data(){
        return {
            form: {
                cep: null,
                logradouro: null,
                complemento: null,
                bairro: null,
                numero: null,
                cidade: null,
                estado: null,
                pessoa_id: null,
            },

            ativo: false,

        }
    },
    
    created () {
        this.form.pessoa_id = this.$route.params.id
        
        this.editar(this.form.pessoa_id)
    },

    methods: {
        store() {
            this.$validator
            .validateAll()
            .then(success => {
              if(success) {  
                apiPublic.post(`residencia`, this.form)
                .then((response) => {
                    console.log(response)
                    //window.location.href = "http://192.168.15.11:8080/"
                    this.$router.push({ name: 'home' })
                })
                .catch(e => {
                    this.errors.push(e)
                })
               }
            });
        },

        editar(id) {
            apiPublic.get(`residencia/editar/${id}`)
            .then(response => {
                if(response.data != "") {
                    this.form = response.data
                    this.ativo = true
                }
            })
            .catch(e => {
                this.errors.push(e)
            })
        },

        edit(id) {
            this.$validator
            .validateAll()
            .then(success => {
            if(success) {  
                apiPublic.post(`residencia/editar/${id}`, this.form)
                    .then(response => {
                        this.form = response.data
                        this.$router.push({ name: 'home' })
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
                }
            });    
        },

        excluir(id) {
            apiPublic.get(`residencia/excluir/${id}`)
            .then(response => {
                this.form = response.data
                this.$router.push({ name: 'home' })
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


