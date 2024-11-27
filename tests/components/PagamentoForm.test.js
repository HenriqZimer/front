import PagamentoForm from '../../src/components/Pagamento/PagamentoForm.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("PagamentoForm - Preenchimento de Campos", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  it("deve atualizar o valor do campo 'idCliente' ao preencher", async () => {
    const wrapper = mount(PagamentoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const idClienteField = wrapper.findAllComponents({ name: "VTextField" })[0];
    const input = idClienteField.find("input");

    await input.setValue("12345");
    expect(wrapper.vm.pagamento.idCliente).toBe("12345");
  });

  it("deve atualizar o valor do campo 'formaPagamento' ao selecionar", async () => {
    const wrapper = mount(PagamentoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    const formaPagamentoField = wrapper.findAllComponents({ name: "VSelect" })[0];
    await formaPagamentoField.vm.$emit("update:modelValue", "Cartão");

    expect(wrapper.vm.pagamento.formaPagamento).toBe("Cartão");
  });

  it("deve renderizar o formulário corretamente", () => {
    const wrapper = mount(PagamentoForm, {
      global: {
        plugins: [vuetify],
      },
    });

    // Verifica se o v-form está renderizado
    const form = wrapper.findComponent({ name: "VForm" });
    expect(form.exists()).toBe(true);
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(PagamentoForm, {
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
    const wrapper = mount(PagamentoForm, {
      global: {
        plugins: [vuetify],
      },
    });
  
    // Verifica os campos de texto e seleção do formulário
    const textFields = wrapper.findAllComponents({ name: "VTextField" });
    const selectFields = wrapper.findAllComponents({ name: "VSelect" });
  
    // Verifica número total de campos
    expect(textFields.length + selectFields.length).toBe(6); // Total de campos configurados
  });  
});
