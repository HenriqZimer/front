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

  it("deve atualizar o valor do campo de e-mail ao preencher", async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [vuetify],
      },
    });

    // Encontra o campo de e-mail
    const emailField = wrapper.find('input[type="email"]');
    expect(emailField.exists()).toBe(true);

    // Simula o preenchimento do campo de e-mail
    await emailField.setValue("teste@example.com");

    // Verifica se o modelo foi atualizado
    expect(wrapper.vm.email).toBe("teste@example.com");
  });

  it("deve atualizar o valor do campo de senha ao preencher", async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [vuetify],
      },
    });

    // Encontra o campo de senha
    const passwordField = wrapper.find('input[type="password"]');
    expect(passwordField.exists()).toBe(true);

    // Simula o preenchimento do campo de senha
    await passwordField.setValue("senha123");

    // Verifica se o modelo foi atualizado
    expect(wrapper.vm.senha).toBe("senha123");
  });
});
