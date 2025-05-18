<!-- src/views/Unauthorized.vue -->
<template>
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <h1>Access Denied</h1>
      <div class="icon">
        <i class="fas fa-exclamation-triangle"></i> <!-- If using Font Awesome -->
      </div>
      <p>You don't have permission to access this page.</p>
      <p class="small">Please check your account privileges or contact an administrator.</p>
      
      <div class="action-buttons">
        <button @click="goBack" class="btn-back">Go Back</button>
        <button @click="goHome" class="btn-home">Go to Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Unauthorized',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      // Get current user role from session or store if available
      const userRole = localStorage.getItem('userRole');
      
      if (userRole === 'tenant') {
        this.$router.push('/tenant');
      } else if (userRole === 'owner') {
        this.$router.push('/owner');
      } else if (userRole === 'admin') {
        this.$router.push('/admin');
      } else {
        // If role is unknown or user is not logged in
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.unauthorized-content {
  text-align: center;
  background-color: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

h1 {
  color: #dc3545;
  margin-bottom: 1.5rem;
}

.icon {
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1.5rem;
}

p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

p.small {
  font-size: 0.9rem;
  color: #6c757d;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.btn-back {
  background-color: #6c757d;
  color: white;
}

.btn-home {
  background-color: #007bff;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>