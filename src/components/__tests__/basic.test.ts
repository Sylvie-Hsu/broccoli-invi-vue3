import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import Content from '@/components/Content.vue'
import InvitationModal from '@/components/InvitationModal.vue'

describe('HomeView', () => {
    it('renders properly', () => {
        const wrapper = mount(HomeView)
        expect(wrapper.text()).toContain('BROCCOLI & CO')
    })
})

describe('Content', () => {
    it('renders properly', () => {
        const wrapper = mount(Content)
        expect(wrapper.text()).toContain('A better way')
    })
    it('should be interactive', async () => {
        const wrapper = mount(Content)
        await wrapper.find('.req-btn').trigger('click')
        expect(wrapper.text()).toContain('Send')
    })
})

describe('InvitationModal', () => {
    it('renders properly', () => {
        const wrapper = mount(InvitationModal)
        expect(wrapper.text()).toContain('Send')
    })
    it('should display modal', async () => {
        const wrapper = mount(InvitationModal)
        const modal = wrapper.find('.inivitation-modal')
        expect(modal.exists()).toBe(true)
    })
})
