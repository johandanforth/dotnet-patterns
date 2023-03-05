import MyComponent from './MyComponent.js'

export default {
    data() {
        return {
            count: 0,
            messages: "mounted",
        }
    },
    mounted() {
        this.addMessage("MyApp mounted");
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