import Vue from "../lib/vue/vue.esm.browser.min.js";
export class VueIndex {
    constructor() {
        console.log("VueIndex running!");
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!!!'
            },
            methods: {
                postData(id) {
                    console.log("post here");
                    const data = {
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
                        .then((res) => res.text())
                        .then((text) => {
                        var ret = text.length ? JSON.parse(text) : {};
                        console.log(ret);
                        return ret;
                    })
                        .catch((error) => {
                        throw error;
                    });
                }
            }
        });
    }
}
//# sourceMappingURL=VueIndex.js.map