const UserModel = require('./UserModel')
const bcrypt = require('bcryptjs')


//http://localhost:3000/api/user/login
const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email: email })
            if (user) {
                const result = bcrypt.compareSync(password, user.password);
                return result ? user : false;
            }
        console.log('user: ', user)
        
    } catch (error) {
        console.log('Login error' + error)
        return false;
    }
}



const register = async (name, email, password, createAt) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            return false;
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = {  name, email, password: hash, createAt };
            const u = new UserModel(newUser);
            await u.save();
            return u;
        }
    } catch (error) {
        console.log("Register error service: " + error)
    }
}
const deleteByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        console.log(user)
        if (user) {
            await UserModel.deleteOne(user)
            return true;
        } else {
            return false; 
        }
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    if (user) {
        return user;
    } else {
        return false;
    }
}

const deleteById = async (id) => {
    try {
        const user = await UserModel.findOne({ _id: id })
        console.log(user)
        if (user) {
            await UserModel.deleteOne(user)
            return true;
        } else {
            return false; 
        }
        return true;
    } catch (error) {
        console.log("Delete User  error" + error);
        return false;

    }
}

const updateUser = async (email, name, address, avatar, phoneNumber, dob, lastName) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.name = name ? name : user.name;
            user.phoneNumber = phoneNumber ? phoneNumber : user.phoneNumber;
            user.address = address ? address : user.address;
            user.dob = dob ? dob : user.dob;
            user.avatar = avatar ? avatar : user.avatar;
            user.lastName = lastName ? lastName : user.lastName;
            await user.save();
            console.log("USER:" + user);

            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}


const updatePasswordByEmail = async (password, email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        const salt = bcrypt.genSaltSync(10);
        if (user) {
            const hash = bcrypt.hashSync(password, salt);
            user.password = hash ? hash : user.password;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
        
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}



const changePassword = async (currentPassword, newPassword, email) => {
    try {
        const user = await UserModel.findOne({ email: email })
        const salt = bcrypt.genSaltSync(10);
        const result = bcrypt.compareSync(currentPassword, user.password);
        if (user && result) {
            const hash = bcrypt.hashSync(newPassword, salt);
            user.password = hash ? hash : user.password;
            await user.save();
            console.log("USER:" + user);
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error" + error)
        return false;
    }
}



module.exports = {
    login, register, deleteByEmail,
    updateUser, updatePasswordByEmail,
   deleteById,
    changePassword, findUserByEmail
};
