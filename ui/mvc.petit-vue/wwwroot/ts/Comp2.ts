
export default {
    props: {
        dataName: String
    },
    emits: {
        nameChanged: String
    },
    template: "#comp2",
    mounted() {
        console.log("component 2 mounted")
        console.log(this)
        console.log(this.name)
    },
    setup(props) {
        console.log(props)
    },
    data() {
        return {
            message: "component 2 message",
            name: this.dataName, //from props
        }
    },
    methods: {
        changeName() {
            this.name = "some other name in comp2";
            this.$emit("nameChanged", this.name);
        }
    }
}