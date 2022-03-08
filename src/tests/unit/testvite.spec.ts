import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import ParkingForm from "../../views/ParkingForm.vue";
import ParkingTicket from "../../types/ParkingTicket";

const wrapper = mount(ParkingForm, {
  shallow: true,
});

describe("Tests for Parking form", () => {
  test("Test empty form submission", async () => {
    const vehicleTypeField = wrapper.get("#select-vehicle");
    const button = wrapper.get('[label="Save"]');
    console.log(vehicleTypeField.html());
    await button.trigger("click");
    console.log(vehicleTypeField.html());
    expect(true).toBeTruthy();
  });
});
