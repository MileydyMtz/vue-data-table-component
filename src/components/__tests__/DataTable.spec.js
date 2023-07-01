import { describe, it, expect, beforeEach, afterEach} from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import DataTable from '../DataTable.vue'

describe('DataTable', () => {
    let mock

    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.reset()
    })

    it('renders properly', async () => {
        mock.onGet('https://api.mocki.io/v1/ce5f60e2').reply(200, [
        { nombre: 'Juan', edad: 30, email: 'juan@example.com' },
        { nombre: 'Maria', edad: 25, email: 'maria@example.com' },
        { nombre: 'Pedro', edad: 35, email: 'pedro@example.com' },
        ])

        const propsData = {
        api: 'https://api.mocki.io/v1/ce5f60e2',
        displayHeaders: ['nombre', 'edad', 'email'],
        description: 'Tabla de datos'
        }

        const wrapper = mount(DataTable, { propsData })

        await flushPromises()

        expect(wrapper.vm.error).toBe(false)
        expect(wrapper.vm.items).toHaveLength(3)

        expect(wrapper.text()).toContain('Tabla de datos')
        expect(wrapper.text()).toContain('Juan')
        expect(wrapper.text()).toContain('Maria')
        expect(wrapper.text()).toContain('Pedro')

        expect(wrapper.find('table.data-table')).toBeTruthy()
        expect(wrapper.findAll('th')).toHaveLength(3) 
        expect(wrapper.findAll('tr')).toHaveLength(4) 

        wrapper.unmount()
    })

    it('handle network errors correctly', async () => {

        mock.onGet('https://api.mocki.io/v1/ce5f60e2').networkError()

        const propsData = {
        api: 'https://api.mocki.io/v1/ce5f60e2',
        displayHeaders: ['nombre', 'edad', 'email'],
        description: 'Tabla de datos'
        }

        const wrapper = mount(DataTable, { propsData })

        await flushPromises()

        expect(wrapper.vm.error).toBe(true)
        expect(wrapper.text()).toContain('Hubo un error al realizar la búsqueda. Por favor, inténtalo de nuevo.')

        wrapper.unmount()
    })
})
