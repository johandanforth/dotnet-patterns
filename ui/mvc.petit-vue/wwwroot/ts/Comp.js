export default {
    props: {
        dataName: String
    },
    emits: {
        nameChanged: String
    },
    template: "#counter-template",
    mounted: function () {
        console.log("component mounted");
        console.log(this);
        console.log(this.name);
    },
    setup: function (props) {
        console.log(props);
    },
    data: function () {
        return {
            message: "component message",
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
