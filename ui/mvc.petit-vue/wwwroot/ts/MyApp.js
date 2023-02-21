import comp from './Comp.js';
export default {
    data: function () {
        return {
            count: 0,
            message: "mounted",
            show: false,
        };
    },
    mounted: function () {
        console.log("MyApp mounted");
        this.show = true;
    },
    components: {
        comp: comp
    },
    methods: {
        increment: function () {
            console.log("MyApp increment");
            this.show = true;
            this.count++;
        },
        nameChanged: function (name) {
            console.log(name);
            console.log(comp);
        }
    }
};
