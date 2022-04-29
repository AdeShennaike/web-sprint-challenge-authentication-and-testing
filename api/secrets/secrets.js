module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'probably should be something more complex',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8
}