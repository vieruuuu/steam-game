import { Ref } from "vue";

export function useScrollContainer(divRef: Ref<HTMLElement>) {
  const startDrag = ref(false);

  const pos = reactive({ top: 0, left: 0, x: 0, y: 0 });

  function onMouseOver(payload: MouseEvent) {
    startDrag.value = true;

    pos.left = divRef.value.scrollLeft;
    pos.top = divRef.value.scrollTop;
    pos.x = payload.clientX;
    pos.y = payload.clientY;
  }

  function onMouseMove(payload: MouseEvent) {
    if (!startDrag.value) {
      return;
    }

    const dx = payload.clientX - pos.x;
    const dy = payload.clientY - pos.y;

    divRef.value.scrollTop = pos.top - dy;
    divRef.value.scrollLeft = pos.left - dx;
  }

  function onMouseLeave() {
    startDrag.value = false;
  }

  return { onMouseOver, onMouseMove, onMouseLeave };
}
