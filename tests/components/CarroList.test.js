import CarroList from '../../src/components/Carro/CarroList.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("CarroList Component", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  const carrosMock = [
    {
      _id: "1",
      modelo: "Civic",
      marca: "Honda",
      ano: 2022,
      placa: "ABC1234",
      cor: "Preto",
      precoPorDia: 200,
      status: "disponível",
    },
  ];

  it("deve chamar o método de excluir ao clicar no botão de excluir", async () => {
    const deleteHandler = vi.fn();
    const wrapper = mount(CarroList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          carros: carrosMock,
          actions: [
            {
              name: "delete",
              icon: "mdi-delete",
              color: "red",
              handler: deleteHandler,
            },
          ],
        };
      },
    });

    const deleteButton = wrapper.find('[aria-label="delete"]');
    await deleteButton.trigger("click");

    expect(deleteHandler).toHaveBeenCalledWith("1");
  });

  it("deve exibir a mensagem de lista vazia quando não há itens", () => {
    const wrapper = mount(CarroList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          carros: [],
        };
      },
    });

    const emptyMessage = wrapper.find(".v-card-text");
    expect(emptyMessage.text()).toBe("Não há carros cadastrados no momento.");
  });

  it("deve renderizar os itens da lista corretamente", () => {
    const wrapper = mount(CarroList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          carros: carrosMock,
        };
      },
    });

    // Verifica se o item da lista está renderizado
    const listItems = wrapper.findAllComponents({ name: "VListItem" });
    expect(listItems.length).toBe(1);
    expect(listItems[0].text()).toContain("Honda - Civic");
    expect(listItems[0].text()).toContain("Placa: ABC1234");
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(CarroList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          carros: carrosMock,
        };
      },
    });

    // Verifica se os botões estão renderizados
    const buttons = wrapper.findAllComponents({ name: "VBtn" });
    expect(buttons.length).toBe(2); // Editar e Excluir
  });

  it("deve renderizar os ícones corretamente", () => {
    const wrapper = mount(CarroList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          carros: carrosMock,
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
