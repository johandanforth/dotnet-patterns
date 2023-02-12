import { createApp } from '../lib/vue3/vue.esm-browser.js'
import comp from './Comp.js'
import MyApp from './MyApp.js'

export class Vue3Index {

    constructor() {
        console.log("app ctor")
        let a1 = createApp(MyApp);
        let a2 = createApp({
            data() {
                return {
                    count: 0,
                    message: "mounted",
                    show: false,
                }
            },
            mounted() {
                console.log("app1 mounted")
                this.show = true;
            },
            components: {
                comp
            },
            methods: {
                increment() {
                    console.log("app1 increment")
                    this.show = true;
                    this.count++;
                },
                nameChanged(name) {
                    console.log(name)
                    console.log(comp)
                }
            }
        });
        a1.config.errorHandler = (err) => {
            /* handle error */
            console.log(err)
        }
        a1.mount("#app1");

    }
}

let v = new Vue3Index();
