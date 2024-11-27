import AluguelList from '../../src/components/Aluguel/AluguelList.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("AluguelList Component", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  it("deve renderizar os botões corretamente", () => {
    const alugueisMock = [
      {
        _id: "1",
        dataInicio: "2024-01-01",
        dataFim: "2024-01-10",
        valorTotal: 100,
        status: "em andamento",
      },
    ];

    const wrapper = mount(AluguelList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          alugueis: alugueisMock,
        };
      },
    });

    // Verifica se os botões de ação estão renderizados
    const buttons = wrapper.findAllComponents({ name: "VBtn" });
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("deve renderizar os itens da lista corretamente", () => {
    const alugueisMock = [
      {
        _id: "1",
        dataInicio: "2024-01-01",
        dataFim: "2024-01-10",
        valorTotal: 100,
        status: "em andamento",
      },
    ];

    const wrapper = mount(AluguelList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          alugueis: alugueisMock,
        };
      },
    });

    // Verifica se os itens da lista estão renderizados
    const listItems = wrapper.findAllComponents({ name: "VListItem" });
    expect(listItems.length).toBe(1);
    expect(listItems[0].text()).toContain("Data: 2024-01-01 até 2024-01-10");
    expect(listItems[0].text()).toContain("Valor: R$ 100");
    expect(listItems[0].text()).toContain("Status: em andamento");
  });

  it("deve renderizar os ícones corretamente", () => {
    const alugueisMock = [
      {
        _id: "1",
        dataInicio: "2024-01-01",
        dataFim: "2024-01-10",
        valorTotal: 100,
        status: "em andamento",
      },
    ];
  
    const wrapper = mount(AluguelList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          alugueis: alugueisMock,
        };
      },
    });
  
    // Verifica se os ícones estão renderizados
    const icons = wrapper.findAllComponents({ name: "VIcon" });
    expect(icons.length).toBeGreaterThanOrEqual(2);
  
    // Verifica as classes dos ícones renderizados
    expect(icons[0].html()).toContain("mdi-pencil"); // Ícone de edição
    expect(icons[1].html()).toContain("mdi-delete"); // Ícone de exclusão
  });
});
