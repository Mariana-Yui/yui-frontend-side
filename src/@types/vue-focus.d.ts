declare module 'vue-focus' {
    interface VueFocus {
        focus: { inserted: () => void; componentUpdated: () => void };
    }
    const VueFocus: VueFocus;
    export = VueFocus;
}
