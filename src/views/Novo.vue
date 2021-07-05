<template>
    <div class="home">
        <h1 class="text-center mt-4 mb-4">Novo</h1>
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

                <input class="btn btn-primary" value="Cadastrar" @click.prevent="store">
            </form>
        </div>
    </div>
</template>

<script>
import {apiPublic} from '../api/service'

export default {
    //name: 'Home',

    data(){
        return {
            form: {
                nome: null,
                data: null,
                peso: null,
                sexo: "m",
                cpf: null,
            }
        }
    },
  
    methods: {
        store() {
            this.$validator
            .validateAll()
            .then(success => {
              if(success) {
                apiPublic.post(`novo/pessoa`, this.form)
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
    }
} 
</script>

<style scoped>
.erro {
    color: red;
}
</style>

