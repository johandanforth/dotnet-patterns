var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Emit, Prop, Vue } from 'vue-facing-decorator';
let MyComponent = class MyComponent extends Vue {
    dataName;
    name = "name";
    mounted() {
        console.log("my-component mounted");
    }
    changeName() {
        this.nameChanged();
    }
    nameChanged() {
        return this.name;
    }
};
__decorate([
    Prop
], MyComponent.prototype, "dataName", void 0);
__decorate([
    Emit
], MyComponent.prototype, "nameChanged", null);
MyComponent = __decorate([
    Component({
        template: "#my-component",
        emits: ["nameChanged"]
    })
], MyComponent);
export default MyComponent;
//# sourceMappingURL=MyComponent.js.map