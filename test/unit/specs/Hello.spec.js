import Vue from 'vue'
import noamdb from '@/components/noamdb'

describe('noamdb.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(noamdb)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.fortest h1').textContent)
      .to.equal('')
  })
})
