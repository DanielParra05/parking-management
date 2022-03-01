import { test, assert, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import App from "../App.vue"

const wrapper = mount(App);

describe('tests for app', () => {
    test("mount component", async () => {
       expect(wrapper.get("")).toContain("This is an about page");
    });
})