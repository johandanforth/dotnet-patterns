export default {
    props: {
        dataName: String
    },
    emits: {
        nameChanged: String
    },
    template: "#comp",
    mounted: function () {
        console.log("component1 mounted");
        console.log(this);
        console.log(this.name);
    },
    setup: function (props) {
        console.log(props);
    },
    data: function () {
        return {
            message: "component 1 message",
            name: this.dataName, //from props
        };
    },
    methods: {
        changeName: function () {
            this.name = "some other name";
            this.$emit("nameChanged", this.name);
        }
    }
};
