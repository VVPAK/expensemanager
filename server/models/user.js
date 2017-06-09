var crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User
var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        first: String,
        last: String
    },
    role: {
        type: String,
        unique: false,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

User.virtual('normalizedUsername')
    .get(function() {
        if (this.username) {
            return this.username.toLowerCase();
        }
        return '';
    });

User.virtual('name.full')
    .get(function() {
        if (this.name != undefined) {
            if (this.name.first != undefined) {
                if (this.name.last != undefined) {
                    const firstName = this.name.first.charAt(0).toUpperCase() + this.name.first.substr(1).toLowerCase();
                    const lastName = this.name.last.charAt(0).toUpperCase() + this.name.last.substr(1).toLowerCase();
                    return firstName + ' ' + lastName;
                }
            }
        }
        return "";
    });

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        //more secure - this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

var UserModel = mongoose.model('User', User);

// make this available to our users in our Node applications
module.exports = UserModel;