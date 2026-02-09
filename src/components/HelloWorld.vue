<template>
  <div class="mainarea">
    <h1>{{ msg }}</h1>
    <h3>LOGIN </h3>
    <p>
      Bienvenido a la app, escriba su nombre de usuario y contraseña o cree una cuenta nueva:
    </p>
    <textarea placeholder="Nombre o correo..."></textarea>
    <textarea placeholder="Contraseña..."></textarea>
    <button>Iniciar sesión</button>
    <button>Crear cuenta</button>
    <!--
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
