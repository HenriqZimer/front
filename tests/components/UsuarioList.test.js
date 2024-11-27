import UsuarioList from '../../src/components/Usuario/UsuarioList.vue';
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

describe("UsuarioList Component", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = createVuetify({
      components,
      directives,
    });
  });

  const usuariosMock = [
    {
      _id: "1",
      nome: "João Silva",
      email: "joao@example.com",
    },
  ];

  it("deve renderizar os itens da lista corretamente", () => {
    const wrapper = mount(UsuarioList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          usuarios: usuariosMock,
        };
      },
    });

    // Verifica se o item da lista está renderizado
    const listItems = wrapper.findAllComponents({ name: "VListItem" });
    expect(listItems.length).toBe(1);
    expect(listItems[0].text()).toContain("João Silva");
    expect(listItems[0].text()).toContain("joao@example.com");
  });

  it("deve renderizar os botões corretamente", () => {
    const wrapper = mount(UsuarioList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          usuarios: usuariosMock,
        };
      },
    });

    // Verifica se os botões estão renderizados
    const buttons = wrapper.findAllComponents({ name: "VBtn" });
    expect(buttons.length).toBe(2); // Editar e Excluir
  });

  it("deve renderizar os ícones corretamente", () => {
    const wrapper = mount(UsuarioList, {
      global: {
        plugins: [vuetify],
      },
      data() {
        return {
          usuarios: usuariosMock,
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