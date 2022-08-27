import Loading from "./components/Loading.vue"

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        Loading: typeof Loading;
    }
}

export {};