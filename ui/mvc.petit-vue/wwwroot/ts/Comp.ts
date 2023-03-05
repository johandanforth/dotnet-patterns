
export default {
    props: {
        dataName: String
    },
    emits: {
        nameChanged: String
    },
    template: "#comp",
    mounted() {
        console.log("component1 mounted")
        console.log(this)
        console.log(this.name)
    },
    setup(props) {
        console.log(props)
    },
    data() {
        return {
            message: "component 1 message",
            name: this.dataName, //from props
        }
    },
    methods: {
        changeName() {
            this.name = "some other name";
            this.$emit("nameChanged", this.name);
        }
    }
}