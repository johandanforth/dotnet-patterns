import { createApp } from '../lib/vue3/vue.esm-browser.js';
import MyApp from './MyApp.js';
var Vue3Index = /** @class */ (function () {
    function Vue3Index() {
        console.log("app ctor");
        var a1 = createApp(MyApp);
        a1.config.errorHandler = function (err) {
            /* handle error */
            console.log(err);
        };
        a1.mount("#app1");
    }
    return Vue3Index;
}());
export { Vue3Index };
var v = new Vue3Index();
