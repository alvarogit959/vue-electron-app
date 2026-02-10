

<template>

  <login-view
    v-if="screen === 'login'"
    @login="handleLogin"
    @newUser="goNewUser"
  />

  <newUser
    v-else-if="screen === 'newUser'"
    @back="goLogin"
  />
  <mainMenuAdmin
    v-else-if="user && user.admin"
    @logout="logout"
  />

  <mainMenu
    v-else-if="user"
    @logout="logout"
  />

</template>

<script>
import LoginView from './components/login-view.vue'
import MainMenu from './components/mainMenu.vue'
import MainMenuAdmin from "./components/mainMenuAdmin.vue";
import NewUser from "./components/newUser.vue";
export default {
  name: 'App',
  components: {
    LoginView,
    MainMenu,
    MainMenuAdmin,
    NewUser
  },
  data() {
    return {
      user: null,
      screen:"login"
    };
  },
methods: {

  handleLogin(user) {
    this.user = user;
    this.screen = "main";
  },

  goNewUser() {
    this.screen = "newUser";
  },

  goLogin() {
    this.screen = "login";
  },

  logout() {
    this.user = null;
    this.screen = "login";
  }

}
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

html, body {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0rem;
  height: 100vh;
  padding: 0rem;
  background-color: rgb(194, 221, 228);
  background-image: url('assets/test2.png');
  /*background-image: url('assets/backgroundtest.svg');*/
  background-size: cover; /* o contain, auto, etc. */
  background-position: center;
  background-repeat: no-repeat;
}

</style>
