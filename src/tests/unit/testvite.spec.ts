import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../../App.vue";
// import About from '../views/About.vue';

const wrapper = mount(App);

describe("tests for app", () => {
  test("mount component", async () => {
    // expect(wrapper.get('.about').text()).toContain('page');
    expect(wrapper.get("#testButton").text()).toContain("Mensaje");
  });
});
