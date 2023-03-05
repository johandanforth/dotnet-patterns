export default {
    props: {
        dataName: String
    },
    emits: {
        nameChanged: String
    },
    template: "#comp2",
    mounted: function () {
        console.log("component 2 mounted");
        console.log(this);
        console.log(this.name);
    },
    setup: function (props) {
        console.log(props);
    },
    data: function () {
        return {
            message: "component 2 message",
            name: this.dataName, //from props
        };
    },
    methods: {
        changeName: function () {
            this.name = "some other name in comp2";
            this.$emit("nameChanged", this.name);
        }
    }
};
