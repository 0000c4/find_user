<template>
  <form class="form_container" @submit.prevent>

    <input class="form_input" v-model="email" placeholder="email" required type="text" @focus="error = ''">
    <input class="form_input" v-model="number" v-mask="'##-##-##'" placeholder="number" type="text" @focus="error = ''">
    <span>{{ error }}</span>
    <button @click="sendData" :disabled="isLoading" type="submit">Submit</button>
  </form>
  <div v-if="isLoading" class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  <ul v-else class="cardContainer">
    <li v-if="users.length > 0" v-for="user in users" class="card">
      <span>{{ user.email }}</span>
      <span>{{ user.number }}</span>
      <br>
    </li>
    <li v-else class="card">
      <span>Nothing found.</span>
    </li>
  </ul>
</template>

<script>
import { emailValidator, numberValidator } from '../utils/validators'
export default {
  data() {
    return {
      email: '',
      number: '',
      error: '',
      isLoading: false,
      users: []
    }
  },
  methods: {
    async sendData() {
      try {

        this.number = this.number.split('-').join("")

        const isEmailValid = emailValidator(this.email)
        const isNumberValid = numberValidator(this.number, 6)
        if (this.email.length === 0) throw 'empty email'
        if (!isEmailValid) throw 'invalid email'
        if (!isNumberValid) throw 'invalid number'
        //send...
        this.isLoading = true
        let response = await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ email: this.email, number: this.number })
        });
        this.users = await response.json();
        this.isLoading = false;
      } catch (error) {
        this.error = error
      }

    },

  }
}

</script>


<style scoped>
ul {
  padding: 0;
}

.form_container {
  display: flex;
  flex-direction: column;
  gap: 5px
}

.form_input {
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid #1a1a1a;
}

.cardContainer {
  display: flex;
  flex-direction: column;
  gap: 4px
}

.card {
  padding: 0.6em 1.2em;
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  font-weight: 500;
  border-radius: 8px;
  background-color: #1a1a1a;
}
/**loading animation */

.lds-spinner,
.lds-spinner div,
.lds-spinner div:after {
  box-sizing: border-box;
}
.lds-spinner {
  margin-top: 28px;
  color: currentColor;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3.2px;
  left: 36.8px;
  width: 6.4px;
  height: 17.6px;
  border-radius: 20%;
  background: currentColor;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


</style>
