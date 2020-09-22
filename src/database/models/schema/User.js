module.exports = (mongoose) => {
    const UserSchema = new mongoose.Schema({
        code: String,
        colonyCode: String,
        // newStatus: ColonyStatus,
        dateRegistered: {
            type: Date,
            default: new Date(),
        },
        firstName: String,
        lastName: String,
        password: String,
        email: String,
        token: new mongoose.Schema({
            token: String,
            generatedAt: Date,
            expiredAt: Date
        })
    });
    const User = mongoose.model('users', UserSchema);

    return {
        User,
    }
}
