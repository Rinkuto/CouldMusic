import {DirectiveBinding, VNode} from "vue";

function drag(el: any, binding: DirectiveBinding) {
    el.onmousedown = (e: MouseEvent) => {
        const start: number = binding.value.start;
        const end: number = binding.value.end;
        const x: boolean = binding.modifiers.x;
        const y: boolean = binding.modifiers.y;
        let distanceX = e.clientX - el.offsetLeft;
        let distanceY = e.clientY - el.offsetTop;
        document.onmousemove = (e: MouseEvent) => {
            if ((x || x === undefined) && !y) {
                let left = e.clientX - distanceX;
                if (left < start) {
                    el.style.left = start + 'px';
                } else if (left > end) {
                    el.style.left = end + 'px';
                } else {
                    el.style.left = left + "px";
                }
            }
            if ((y || y === undefined) && !x) {
                let top = e.clientY - distanceY;
                if (top < start) {
                    el.style.top = start + 'px';
                } else if (top > end) {
                    el.style.top = end + 'px';
                } else {
                    el.style.top = top + "px";
                }
            }
        }
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
}

export const dragDirective = {
    mounted: (el: any, binding: DirectiveBinding) => drag(el, binding,),
}