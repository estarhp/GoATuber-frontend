import {ref} from "vue";
import {useStore} from "vuex";

const isDragging = ref(false)
const lastX = ref(0)
const lastY =ref(0)


export function handleMouseDown(event) {
    isDragging.value = true;
    lastX.value = event.clientX;
    lastY.value = event.clientY;
}

export function handleMouseMove(event) {
    const live2d =  event.target
    if (isDragging.value) {
        const deltaX = event.clientX - lastX.value;
        const deltaY = event.clientY - lastY.value;
        live2d.style.left = parseInt(live2d.style.left || 0) + deltaX + "px";
        live2d.style.top = parseInt(live2d.style.top || 0) + deltaY + "px";
        lastX.value = event.clientX;
        lastY.value  = event.clientY;
    }
}

export function handleMouseUp() {
    isDragging.value = false;
    isDragging.value = false;
    isDragging.value = false;
}

