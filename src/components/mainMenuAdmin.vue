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
    <!--scrollview: actividades  button: modificar actividad
                                 button: eliminar actividad-->
 <div class="scroll-area" v-if="!loading && !error">
      <div 
        v-for="actividad in actividades" 
        :key="actividad._id" 
        class="glass activity-card"
        :class="{ 'full': actividad.usuarios.length >= actividad.plazasMaximas }"
      >
        <div class="activity-header">
          <h4>{{ actividad.nombre }}</h4>
          <span class="activity-date">{{ formatDate(actividad.createdAt) }}</span>
        </div>
        
        <div class="activity-content">
          <p v-if="actividad.descripcion" class="activity-description">
            {{ actividad.descripcion }}
          </p>
          <p v-else class="no-description">Sin descripción</p>
          
          <div class="activity-details">
            <div class="detail-item">
              <span class="detail-label">Duración:</span>
              <span class="detail-value">{{ actividad.duracion }} minutos</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Plazas:</span>
              <span class="detail-value">
                {{ actividad.usuarios.length }}/{{ actividad.plazasMaximas }}
                <span v-if="actividad.usuarios.length >= actividad.plazasMaximas" class="full-badge">LLENO</span>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Reservas:</span>
              <span class="detail-value">{{ actividad.usuarios.length }}</span>
            </div>
          </div>
          
          <!-- Lista de usuarios inscritos (opcional, colapsable) -->
          <div v-if="actividad.usuarios.length > 0" class="users-list">
            <button 
              @click="toggleUsers(actividad._id)" 
              class="toggle-users-btn"
            >
              {{ showUsers[actividad._id] ? 'Ocultar' : 'Mostrar' }} usuarios ({{ actividad.usuarios.length }})
            </button>
            
            <div v-if="showUsers[actividad._id]" class="users-container">
              <div 
                v-for="(usuario, index) in actividad.usuarios" 
                :key="usuario._id || index"
                class="user-item"
              >
                {{ usuario.nombreCorreo || `Usuario ${index + 1}` }}
              </div>
            </div>
          </div>
          <div v-else class="no-users">
            No hay usuarios inscritos
          </div>
        </div>
        
        <div class="activity-actions">
          <button class="action-btn edit-btn" @click="editActivity(actividad)">
            Modificar
          </button>
          <button class="action-btn delete-btn" @click="deleteActivity(actividad._id)">
            Eliminar
          </button>
          <button 
            class="action-btn details-btn" 
            @click="viewActivityDetails(actividad._id)"
            :disabled="actividad.usuarios.length === 0"
          >
            Ver detalles
          </button>
        </div>
      </div></div>
    <button class="logout-btn" @click="logout">Cerrar sesión</button>
  </div>
</template>

<script>
export default {
  name: "mainMenu",
  props: {
    msg: String,
  },
    data() {
    return {
      actividades: [],
      loading: false,
      error: null,
      showUsers: {}, 
      sortBy: 'recent'
    };
  },
  mounted() {
    this.loadActividades();
  },
  methods: {
        async loadActividades() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('http://localhost:5000/actividades');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.actividades = data;
        
      } catch (error) {
        console.error('Error cargando actividades:', error);
        this.error = `No se pudieron cargar las actividades: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
        formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
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
  width: 80%;
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
  margin-top: -1.5rem; 
  width: 9rem;
  height: 9rem;
  object-fit: contain;
}
.admin-options {
   margin-top: -1.5rem; 

  width: 27rem;
}
.admin-button{margin: 0.2rem;}
.scroll-area {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  width: 90%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scrollbar-width: none;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  padding: 1rem;
  font-size: 0.7rem;
}
.activity-card{background-color: rgb(255, 140, 0);width: 100%;}
.action-btn{max-height: 3rem;
font-size: 0.7rem;

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
  margin-top: -0.5rem; 
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
