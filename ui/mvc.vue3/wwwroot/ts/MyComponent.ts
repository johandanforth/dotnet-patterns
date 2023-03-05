import { Component, Emit, Prop, Vue } from 'vue-facing-decorator'

@Component({
    template: "#my-component",
    //emits: ["nameChanged"]
})
export default class MyComponent extends Vue {

    @Prop
    dataName?: String;

    name = "name";

    mounted() {
        console.log("my-component mounted");
    }

    changeName() {
        this.nameChanged();
    }

    @Emit
    nameChanged() {
        return this.name;
    }

}
