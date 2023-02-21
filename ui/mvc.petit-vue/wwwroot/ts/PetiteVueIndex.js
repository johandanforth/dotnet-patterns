import { createApp } from '../lib/petit-vue/petite-vue.es.js';
var Comp = /** @class */ (function () {
    function Comp(props) {
        console.log("Comp constructed");
        console.log(props);
        this.$template = '#counter-template';
        this.count = props.initialCount;
        this.inc = this.increase;
    }
    Comp.prototype.increase = function () {
        this.count++;
    };
    return Comp;
}());
var PetiteVueIndex = /** @class */ (function () {
    function PetiteVueIndex() {
        function Counter(props) {
            return {
                $template: '#counter-template',
                count: props.initialCount,
                inc: function () {
                    this.count++;
                }
            };
        }
        createApp({ Counter: Counter }).mount("#app2");
        createApp({ Comp: Comp }).mount("#app3");
        createApp({
            // exposed to all expressions
            count: 0,
            message: "mounted",
            show: false,
            // getters
            get plusOne() {
                return this.count + 1;
            },
            // methods
            mounted: function () {
                console.log("mounted!");
                this.show = true;
            },
            increment: function () {
                this.show = true;
                this.count++;
            }
        }).mount("#app1");
    }
    return PetiteVueIndex;
}());
export { PetiteVueIndex };
