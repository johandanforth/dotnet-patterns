import { createApp } from '../lib/petit-vue/petite-vue.es.js';
class Comp {
    constructor(props) {
        console.log("Comp constructed");
        console.log(props);
        this.$template = '#counter-template';
        this.count = props.initialCount;
        this.inc = this.increase;
    }
    increase() {
        this.count++;
    }
}
export class PetiteVueIndex {
    constructor() {
        function Counter(props) {
            return {
                $template: '#counter-template',
                count: props.initialCount,
                inc() {
                    this.count++;
                }
            };
        }
        createApp({ Counter }).mount("#app2");
        createApp({ Comp }).mount("#app3");
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
            mounted() {
                console.log("mounted!");
                this.show = true;
            },
            increment() {
                this.show = true;
                this.count++;
            }
        }).mount("#app1");
    }
}
//# sourceMappingURL=PetiteVueIndex.js.map