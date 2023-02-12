import comp from './Comp.js';
export default {
    data() {
        return {
            count: 0,
            message: "mounted",
            show: false,
        };
    },
    mounted() {
        console.log("MyApp mounted");
        this.show = true;
    },
    components: {
        comp
    },
    methods: {
        increment() {
            console.log("MyApp increment");
            this.show = true;
            this.count++;
        },
        nameChanged(name) {
            console.log(name);
            console.log(comp);
        }
    }
};
//# sourceMappingURL=MyApp.js.map