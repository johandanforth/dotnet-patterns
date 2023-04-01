import MyComponent from './MyComponent.js'

export default {
    data() {
        return {
            count: 0,
            messages: "mounted",
            list: [],
            items: [],
        }
    },
    mounted() {
        this.addMessage("MyApp mounted");
        for (var i = 0; i < 1000; i++) {
            this.list.push({
                id: i,
                name: "Item " + i
            });
        }
    },
    components: {
        MyComponent
    },
    methods: {
        increment() {
            this.count++;
            this.addMessage(`Count increased to ${this.count}`);
        },
        addMessage(message) {
            this.messages += `${message}\n`;
        },
        nameChanged(name) {
            this.addMessage(`Child component changed name to ${name}`);
        }
    }
}