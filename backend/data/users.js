import bcrypt from "bcryptjs"

const users = [
    {
        name: "Admin Test",
        email: "admin@admin.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "User Test",
        email: "user@user.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "John Doe",
        email: "johndoe123@gmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Jane Doe",
        email: "janedoe123@hotmail.com",
        password: bcrypt.hashSync("123456", 10),
    },
]

export default users
