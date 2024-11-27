import AppBar from '../../src/components/Shared/AppBar.vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

describe('AppBar.vue', () => {
  it('renders all navigation links correctly', () => {
    const wrapper = mount(AppBar);

    // Captura apenas os links dinâmicos (excluindo o botão Home)
    const dynamicLinks = wrapper.vm.links; // Array no data
    const renderedLinks = wrapper.findAll('.nav-btn:not([to="/"])'); // Ignora o botão Home

    // Verifica se a quantidade de links dinâmicos renderizados está correta
    expect(renderedLinks.length).toBe(dynamicLinks.length);

    // Captura apenas o texto dos botões, sem os ícones, de forma mais precisa
    const renderedTexts = renderedLinks.map(link => {
      // Exclui o ícone e pega o texto visível
      return link.text().replace(/\s*mdi-\S+\s*/, '').trim();
    });

    const expectedTexts = dynamicLinks.map(link => link.text);
    expect(renderedTexts).toEqual(expectedTexts);
  });

  it('renders the Home button', () => {
    const wrapper = mount(AppBar);
    const homeButton = wrapper.find('.nav-btn[to="/"]');

    // Verifica se o botão Home existe e contém o texto "Home"
    expect(homeButton.exists()).toBe(true);
    expect(homeButton.text()).toContain('Home');
  });
});

