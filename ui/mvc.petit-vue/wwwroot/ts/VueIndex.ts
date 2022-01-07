import Vue from "../lib/vue/vue.esm.browser.min.js"


export class VueIndex {
    constructor() {   
        console.log("VueIndex running!");
         
        var app = new Vue({   
            el: '#app',
            data: {  
                message: 'Hello Vue!!!' 
            }
        })
    }  
}