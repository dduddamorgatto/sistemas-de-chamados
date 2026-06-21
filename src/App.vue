<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="app__nav">
      <span class="app__logo">🛠️ Sistema de chamados</span>
      <div class="app__links">
        <RouterLink to="/chamados">Meus chamados</RouterLink>
        <RouterLink to="/chamados/novo">Abrir chamado</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </div>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  border-bottom: 1px solid #eee;
  background: #fff;
}
.app__logo {
  font-weight: 600;
  font-size: 16px;
}
.app__links {
  display: flex;
  gap: 20px;
}
.app__links a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 6px;
}
.app__links a:hover {
  background: #f5f5f5;
}
.app__links a.router-link-active {
  color: #222;
  font-weight: 600;
  background: #f0f0f0;
}
</style>