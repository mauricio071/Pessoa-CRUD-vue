<template>
    <div class="home">
        <h1 class="text-center mt-4 mb-4">CNH</h1>
        <div class="col-8 m-auto">
            <form>
            <!--Novo:
                    Número da carteira
                    Tipo de carteira (A, B, C) criar option
                    data de emissão (validade em 5 anos)

                Editar:
                    Número da carteira
                    Tipo de carteira (A, B, C)
                    data de emissão (validade em 5 anos)
                    validade da carteira -->
                <input class="form-control" type="text" name="numero" v-validate data-vv-rules="required" v-model="form.numero" placeholder="Número: ">
                <span class="erro" v-show="errors.has('numero')">{{ errors.first('numero') }}</span><br>

                <label for="tipo">Selecione o seu tipo de CNH:</label>
                <select name="tipo" id="tipo" v-model="form.tipo" v-validate data-vv-rules="required">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
                <span class="erro" v-show="errors.has('tipo')">{{ errors.first('tipo') }}</span><br><br>

                <input class="form-control" type="text" name="data" v-validate data-vv-rules="required" v-model="form.data" v-mask="'##/##/####'" placeholder="Data de emissão: ">
                <span class="erro" v-show="errors.has('data')">{{ errors.first('data') }}</span><br>
                
                <label v-if="ativo === true" for="validade">Validade:</label>
                <input type="text" name="validade" v-if="ativo === true" v-model="validade" disabled>

                <input class="btn btn-primary" v-if="ativo === false" value="Cadastrar" @click.prevent="store" >
                <br><br><input class="btn btn-primary" v-if="ativo === true" value="Alterar" @click.prevent="edit(form.pessoa_id)" >
                <input class="btn btn-danger" v-if="ativo === true" value="Excluir" @click.prevent="excluir(form.pessoa_id)" >
            </form>
        </div>
    </div>
</template>

<script>
import {apiPublic} from '../api/service'

export default {
    data() {
        return {
            form: {
                numero: null,
                tipo: null,
                data: null,
                pessoa_id: null,
            },

            ativo: false,

            validadeMD: false,

            validadeA: false,

            Validade: false,
        }
    },

    created() {
        this.form.pessoa_id = this.$route.params.id
        this.editar(this.form.pessoa_id)
    },

    methods: {
        store() {
            this.$validator
            .validateAll()
            .then(success => {
              if(success) {  
                apiPublic.post(`cnh`, this.form)
                .then((r) => {
                    console.log(r)
                    this.$router.push({ name: 'home' })
                })
                .catch(e => {
                    this.errors.push(e)
                })
               }
            });
        },

        editar(id) {
            this.$validator
            .validateAll()
            .then(success => {
              if(success) {  
                apiPublic.get(`cnh/editar/${id}`, this.form)
                .then((response) => {
                    if(response.data != "") {
                        this.validadeMD = response.data.data.substring(0, 6)
                        this.validadeA = parseInt(response.data.data.substring(6)) + 5
                        this.validade = this.validadeMD + this.validadeA
                        this.form = response.data
                        this.ativo = true
                    }
                })
                .catch(e => {
                    this.errors.push(e)
                })
               }
            });
        },

        edit(id) {
            this.$validator
            .validateAll()
            .then(success => {
              if(success) {  
                apiPublic.post(`cnh/editar/${id}`, this.form)
                .then((response) => {
                    console.log(response)
                    this.$router.push({ name: 'home' })
                })
                .catch(e => {
                    this.errors.push(e)
                })
               }
            });
        },

        excluir(id){
            apiPublic.get(`cnh/excluir/${id}`)
            .then(response => {
                this.form = response.data
                this.$router.push({ name: 'home' })
            })
            .catch(e => {
                    this.errors.push(e)
            })
        }
    }
}
</script>

<style scoped>
.erro {
    color: red;
}
</style>