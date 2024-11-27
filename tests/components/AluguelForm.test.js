import AluguelForm from '../../src/components/Aluguel/AluguelForm.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("AluguelForm Component", () => {
  let vuetify;

  beforeEach(() => {
    // Configuração do Vuetify
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  it("deve renderizar o v-card corretamente", () => {
    const wrapper = mount(AluguelForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica se o v-card está renderizado
    const vCard = wrapper.findComponent({ name: "VCard" });
    expect(vCard.exists()).toBe(true);
  });

  it("deve renderizar o v-form corretamente", () => {
    const wrapper = mount(AluguelForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica se o v-form está renderizado
    const vForm = wrapper.findComponent({ name: "VForm" });
    expect(vForm.exists()).toBe(true);
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(AluguelForm, {
      global: {
        plugins: [vuetify],
      },
    });
  
    // Verifica se o botão de salvar está renderizado pelo texto
    const saveButton = wrapper.find('button[type="button"]');
    expect(saveButton.exists()).toBe(true);
    expect(saveButton.text()).toContain("Salvar");
  
    // Verifica se o botão de cancelar está renderizado pelo texto
    const cancelButton = wrapper.findAll('button').find((btn) => btn.text() === "Cancelar");
    expect(cancelButton).toBeTruthy();
  });
  
});