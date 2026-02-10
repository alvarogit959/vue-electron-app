<template>
  <div class="mainarea">
    <h1>{{ msg }}</h1>
    <img id="image" src="../assets/logo.png" />
    <h3>Bienvenido usuario Admin</h3>
    <div class="admin-options">
      <button class="admin-button" id="check-reserves">Ordenar por reservas</button>
      <button class="admin-button" @click="newActivity"  id="new-activity">Crear nueva actividad</button>
      <button class="admin-button" id="check-reserves">Ver reservas</button>
      <button class="admin-button" id="check-attendance">Comprobar asistencia</button>
    </div>
    <div class="scroll-area">
      <div class="glass">Reserva 1</div>
      <div class="glass">Reserva 2</div>
      <div class="glass">Reserva 3</div>
      <div class="glass">Reserva 4</div>
      <div class="glass">Reserva 5</div>
      <div class="glass">Reserva 6</div>
      <div class="glass">Reserva 7</div>
      <div class="glass">Reserva 8</div>
      <div class="glass">Reserva 9</div>
      <div class="glass">Reserva 10</div>
    </div>
    <button class="logout-btn" @click="logout">Cerrar sesión</button>
  </div>
</template>

<script>
export default {
  name: "mainMenu",
  props: {
    msg: String,
  },
  methods: {
    selectOption(option) {
      alert(`Seleccionaste: ${option}`);
    },
    logout() {
      this.$emit("logout");
    },
    newActivity(){
      this.$emit("newActivity");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainarea {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 30rem;
  height: 50rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.05)
  );
  background-color: #00000005;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 3px solid rgba(175, 175, 175, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  padding: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 3rem;
  color: rgb(255, 255, 255);
  padding: 1rem;
}
#image {
  width: 9rem;
  height: 9rem;
  object-fit: contain;
}
.admin-options {
  padding:1rem;
  width: 27rem;
}
.admin-button{margin: 0.2rem;}
.scroll-area {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  width: 25rem;
  max-height: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scrollbar-width: none;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  padding: 1rem;
}
.glass {
  width: 100%;
  min-height: 5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  color: white;
  align-items: center;
  justify-content: center;
}
h3 {
  font-family: "Inter", sans-serif;
  color: rgb(255, 255, 255);
  font-size: 1.7rem;
}
input {
  font-family: "Inter", sans-serif;
  width: 60%;
  height: 2.8rem;
  padding: 0 1rem;

  outline: none;
  transition: all 0.25s ease;

  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 1rem;
  color: white;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
}
button {
  font-family: "Inter", sans-serif;
  width: 45%;
  padding: 0.9rem;

  cursor: pointer;
  transition: all 0.25s ease;

  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 1rem;
  color: white;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

button:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

p {
  width: 80%;
}
a {
  color: #ffffff;
}
</style>
