import PagamentoList from '../../src/components/Pagamento/PagamentoList.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("PagamentoList Component", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  const pagamentosMock = [
    {
      _id: "1",
      idCliente: "123",
      idCarro: "456",
      dataPagamento: "2024-11-01",
      valor: 200,
      formaPagamento: "Cartão",
    },
  ];

  it("deve renderizar os itens da lista corretamente", () => {
    const wrapper = mount(PagamentoList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          pagamentos: pagamentosMock,
        };
      },
    });

    // Verifica se o item da lista está renderizado
    const listItems = wrapper.findAllComponents({ name: "VListItem" });
    expect(listItems.length).toBe(1);
    expect(listItems[0].text()).toContain("Cliente: 123");
    expect(listItems[0].text()).toContain("Carro: 456");
    expect(listItems[0].text()).toContain("R$ 200");
    expect(listItems[0].text()).toContain("Cartão");
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(PagamentoList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          pagamentos: pagamentosMock,
        };
      },
    });

    // Verifica se os botões estão renderizados
    const buttons = wrapper.findAllComponents({ name: "VBtn" });
    expect(buttons.length).toBe(2); // Editar e Excluir
  });

  it("deve renderizar os ícones corretamente", () => {
    const wrapper = mount(PagamentoList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          pagamentos: pagamentosMock,
        };
      },
    });

    // Verifica os ícones
    const icons = wrapper.findAllComponents({ name: "VIcon" });
    expect(icons.length).toBeGreaterThanOrEqual(2);
    expect(icons[0].html()).toContain("mdi-pencil"); // Ícone de edição
    expect(icons[1].html()).toContain("mdi-delete"); // Ícone de exclusão
  });
});
