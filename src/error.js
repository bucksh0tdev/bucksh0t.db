class ShowError extends Error {
    constructor(message) {
        super(`${message}`);
    }
}

module.exports = ShowError