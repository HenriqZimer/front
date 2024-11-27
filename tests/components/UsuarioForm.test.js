import UsuarioForm from '../../src/components/Usuario/UsuarioForm.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("UsuarioForm Component", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  it("deve renderizar o formulário corretamente", () => {
    const wrapper = mount(UsuarioForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica se o v-form está renderizado
    const form = wrapper.findComponent({ name: "VForm" });
    expect(form.exists()).toBe(true);
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(UsuarioForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica os botões "Salvar" e "Cancelar"
    const buttons = wrapper.findAllComponents({ name: "VBtn" });
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toContain("Salvar");
    expect(buttons[1].text()).toContain("Cancelar");
  });

  it("deve renderizar os campos corretamente", () => {
    const wrapper = mount(UsuarioForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica os campos de texto do formulário
    const textFields = wrapper.findAllComponents({ name: "VTextField" });
    expect(textFields.length).toBe(7); // Total de campos configurados
  });
});
