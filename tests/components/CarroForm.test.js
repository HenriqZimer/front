import CarroForm from '../../src/components/Carro/CarroForm.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("CarroForm - Preenchimento de Campos", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  it("deve atualizar o valor do campo 'modelo' ao preencher", async () => {
    const wrapper = mount(CarroForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const modeloField = wrapper.findAllComponents({ name: "VTextField" })[0];
    const input = modeloField.find("input");

    await input.setValue("Civic");
    expect(wrapper.vm.carro.modelo).toBe("Civic");
  });

  it("deve atualizar o valor do campo 'marca' ao preencher", async () => {
    const wrapper = mount(CarroForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const marcaField = wrapper.findAllComponents({ name: "VTextField" })[1];
    const input = marcaField.find("input");

    await input.setValue("Honda");
    expect(wrapper.vm.carro.marca).toBe("Honda");
  });

  it("deve renderizar o formulário corretamente", () => {
    const wrapper = mount(CarroForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica se o v-form está renderizado
    const form = wrapper.findComponent({ name: "VForm" });
    expect(form.exists()).toBe(true);
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(CarroForm, {
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
    const wrapper = mount(CarroForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica os campos de texto do formulário
    const textFields = wrapper.findAllComponents({ name: "VTextField" });
    expect(textFields.length).toBe(6); // Total de campos configurados
  });
});
