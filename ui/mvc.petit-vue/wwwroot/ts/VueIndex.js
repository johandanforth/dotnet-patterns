import Vue from "../lib/vue/vue.esm.browser.min.js";
var VueIndex = /** @class */ (function () {
    function VueIndex() {
        Vue.config.devtools = true;
        console.log("VueIndex running!");
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!!!'
            },
            methods: {
                postData: function (id) {
                    console.log("post here");
                    var data = {
                        id: 1,
                        name: 'johan'
                    };
                    fetch('/api/vueapi', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        method: 'post',
                        body: JSON.stringify(data)
                    })
                        .then(function (res) { return res.text(); })
                        .then(function (text) {
                        var ret = text.length ? JSON.parse(text) : {};
                        console.log(ret);
                        return ret;
                    })
                        .catch(function (error) {
                        throw error;
                    });
                }
            }
        });
    }
    return VueIndex;
}());
export { VueIndex };
