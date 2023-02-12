import { createApp } from '../lib/vue3/vue.esm-browser.js'
import comp from './Comp.js'
import MyApp from './MyApp.js'

export class Vue3Index {

    constructor() {
        console.log("app ctor")

        let a1 = createApp(MyApp);
        a1.config.errorHandler = (err) => {
            /* handle error */
            console.log(err)
        }
        a1.mount("#app1");

    }
}

let v = new Vue3Index();
