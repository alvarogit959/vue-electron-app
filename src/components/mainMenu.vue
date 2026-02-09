<template>
  <div class="mainarea">
    <h1>{{ msg }}</h1>
    <h3>MAIN MENU</h3>
    <button class="logout-btn" @click="logout">Iniciar sesión</button>
  </div>
</template>

<script>
export default {
  name: 'mainMenu',
  props: {
    msg: String
  },
  methods: {
    selectOption(option) {
      alert(`Seleccionaste: ${option}`);
    },
    logout() {
      this.$emit('logout');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mainarea{display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 100%;
  background-color: #42b983;
  padding: 0;
  align-items: center;
  justify-content: center;

}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
