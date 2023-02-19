Vue.component('hello-component',
    {
        template: "#hello-component",
        props: ['name'],
        data() {
            return {
                message: "hello from component"
            }
        }
    });