import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Aftab',
        email: 'safdar_aftab@hotmail.com',
        password: bcrypt.hashSync('Iffi5!@#', 10),
        is_admin: true
    },
    {
        name: 'John Doe',
        email: 'johndoe123@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'janedoe123@hotmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;