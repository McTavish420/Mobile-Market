<template lang="html">
      <form class="signup-form" role="form">
        <h3 class="text-center"><strong>Sign In</strong></h3>
        <div class="input">
          <label for="email">Email Address</label>
          <input type="email"
                 name="email"
                 class="form-control"
                 placeholder="Enter Your Email"
                 v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password"
                 name="password"
                 class="form-control"
                 placeholder="Password"
                 v-model="password">
        </div>

        <div class="submit">
          <button style="width: 100%"
                  @click.prevent="loginWithEmailLocal"
                  :disabled="isLoading">
              <i v-if="isLoading" class="fa fa-spinner fa-spin" />
  						Sign in
  					</button>
        </div>
      </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['addMessage', 'clearMessage', 'loginWithEmail']),
    loginWithEmailLocal() {
      this.isLoading = true
      let data = {
        email: this.email,
        password: this.password
      }
      this.loginWithEmail(data).then(() => {
        this.clearMessage();
        this.$router.push({
          name: 'mainpage'
        });
      }).catch((error) => {
        let message_obj = {
          message: error.message,
          messageClass: "danger",
          autoClose: true
        }
        this.addMessage(message_obj);
      }).then(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>

.signup-form {
    width: 500px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    font-size: 25px;
    box-shadow: 0 2px 3px lightblue;
    margin-bottom: 6px;
    padding: 5px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label{
    color: red;
  }

  .input.invalid input{
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }
  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 5px 5px 5px #521751;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
