<template>
<div class="table-container">
    <div v-if="error" class="error-message">
        Hubo un error al obtener los datos. Por favor, inténtalo de nuevo.
    </div>
    <table v-if="items.length > 0" class="data-table" :aria-describedby="descriptionId">
        <caption id="descriptionId" class="table-description">{{ description }}</caption>
        <thead>
            <tr>
                <th v-for="(header, index) in displayHeaders" :key="index">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="header in displayHeaders" :key="header">
                    {{ item[header] }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
    name: 'DataTableComponent',
    
    props: {
        api: String,
        displayHeaders: Array,
        description: String
    },
    setup(props) {
        const items = ref([])
        const error = ref(false)
        const descriptionId = ref('table-description')

        const fetchData = async () => {
            try {
                const { data } = await axios.get(props.api)
                items.value = data
            } catch (err) {
                console.error(err)
                error.value = true
            }
        }

        onMounted(fetchData)

        return { items, descriptionId, error }
    }
}
</script>

<style lang="scss" scoped>
$bottom-border-color: #ddd;
$description-color: #222;
$description-font-size: 1.2em;
$even-row-color: #f2f2f2;
$header-color: #a1a0a0;
$header-font-color: #222;
$hover-color: #ddd;
$odd-row-color: #fff;

.table-container {
    margin: 0 auto;
    max-width: 800px;
    padding: .5em;
}

.error-message {
    background-color: #f8d7da;
    border-radius: 5px;
    border: 1px solid #f5c6cb;
    color: #721c24;
    margin-bottom: 20px;
    padding: 15px;
    text-align: center;
}

.data-table {
    border-collapse: collapse;
    width: 100%;

    .table-description {
        color: $description-color;
        font-size: $description-font-size;
        font-weight: bold;
        margin-bottom: 0.5em;
    }

    th,
    td {
        border-bottom: 1px solid $bottom-border-color;
        padding: 0.5em 1em;
        text-align: left;
    }

    th {
        background-color: $header-color;
        color: $header-font-color;
        text-transform: capitalize;
    }

    tr:nth-child(odd) {
        background-color: $odd-row-color;
    }

    tr:nth-child(even) {
        background-color: $even-row-color;
    }

    tr:hover {
        background-color: $hover-color;
        cursor: pointer;
    }
}
</style>
