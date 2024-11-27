import Login from '../../src/components/Login/Login.vue';

import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("Login Component", () => {
  let vuetify;

  beforeEach(() => {
    // Cria a instância do Vuetify
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  it("deve renderizar o botão de login corretamente", () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [vuetify], // Adiciona o Vuetify como plugin global
      },
    });

    // Verifica se o botão de login está renderizado
    const loginButton = wrapper.find('button');
    expect(loginButton.exists()).toBe(true);

    // Verifica o texto no botão
    expect(loginButton.text()).toBe("Entrar");
  });

  it("deve renderizar os campos de formulário de e-mail e senha corretamente", () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [vuetify], // Adiciona o Vuetify como plugin global
      },
    });

    // Verifica se o campo de e-mail está renderizado
    const emailField = wrapper.find('input[type="email"]');
    expect(emailField.exists()).toBe(true);

    // Verifica se o campo de senha está renderizado
    const passwordField = wrapper.find('input[type="password"]');
    expect(passwordField.exists()).toBe(true);
  });
});

