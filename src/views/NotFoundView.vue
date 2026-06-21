<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Página não encontrada.</p>
    <button @click="router.push('/chamados')">Voltar para os chamados</button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}
.not-found h1 {
  font-size: 48px;
  font-weight: 600;
  color: #ccc;
}
.not-found p {
  color: #888;
  margin-bottom: 20px;
}
.not-found button {
  padding: 10px 18px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>