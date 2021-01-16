import Users from '../../Modal/Users'
export let checkLogin = async (MaSinhVien) => {

    let User = await Users.findOne({
        MaSinhVien: MaSinhVien,
    })
    return User;
}
