import { defineStore } from "pinia";
import {ref} from "vue";

export const useDeviceStore = defineStore("device", () => { 
    const device = ref({
      deviceid: "050201",
    });

    const setDevice = (new_value) => {
        device.value = new_value;
    }

    const removeDevice = () => {
        device.value = null;
    }

    return { device, setDevice, removeDevice };
})