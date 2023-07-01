<template>
  <div>
    <DataTable 
      :api="'https://64766fef9233e82dd53a050e.mockapi.io/api/products'" 
      :displayHeaders="['id', 'name', 'price', 'stock', 'description']" 
      description="Esta es una tabla de productos"
    />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  components: {
    DataTable
  }
}
</script>
