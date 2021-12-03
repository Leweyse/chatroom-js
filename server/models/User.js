class User {
    name;
    color;

    setInfo(obj) {
        this.name = obj.name;
        this.color = obj.color;
    }

    getInfo() {
        return {
            name: this.name,
            color: this.color
        }
    }
}

module.exports = User;