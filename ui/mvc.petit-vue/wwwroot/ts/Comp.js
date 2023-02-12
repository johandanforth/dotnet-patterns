export default {
    props: {
        dataName: String
    },
    emits: {
        nameChanged: String
    },
    template: "#counter-template",
    mounted() {
        console.log("component mounted");
        console.log(this);
        console.log(this.name);
    },
    setup(props) {
        console.log(props);
    },
    data() {
        return {
            message: "component message",
            name: this.dataName, //from props
        };
    },
    methods: {
        changeName() {
            this.name = "some other name";
            this.$emit("nameChanged", this.name);
        }
    }
};
//# sourceMappingURL=Comp.js.map