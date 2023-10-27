import req from './https.js'

// 登录
export const login = data => {
    return req({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 注册
export const register = data => {
    return req({
        url: '/user/register',
        method: 'post',
        data
    })
}

// 添加宠物信息
export const addUserPet = data => {
    return req({
        url: '/pet/add',
        method: 'post',
        data
    })
}

// 主页请求宠物信息
export const toLoadPetInfo = data => {
    return req({
        url: '/pet/find',
        method: 'get',
        params: data,
    })
}

// 修改宠物信息
export const updataPet = data => {
    return req({
        url: '/pet/updataPet',
        method: 'post',
        data
    })
}

export const deletePet = data => {
    return req({
        url: '/pet/deletePet',
        method: 'post',
        data
    })
}

// 返回用户宠物信息
export const userPetList = data => {
    return req({
        url: '/pet/petlist',
        method: 'post',
        data
    })
}

// 返回用户信息
export const userInfo = data => {
    return req({
        url: '/user/getUser',
        method: 'post',
        data
    })
}

// 编辑用户信息
export const updataUser = data => {
    return req({
        url: '/user/updataUser',
        method: 'post',
        data
    })
}

// 返回个人主页
export const userSpaceById = data => {
    return req({
        url: '/user/userSpace',
        method: 'post',
        data
    })
}

// 返回宠物主页
export const petSpaceById = data => {
    return req({
        url: '/pet/petSpace',
        method: 'post',
        data
    }) 
}

// 返回聊天记录
export const userChatRecord = data => {
    return req({
        url: '/user/chatRecord',
        method: 'post',
        data
    }) 
}

// 返回用户喜爱的宠物
export const userFond = data => {
    return req({
        url: '/user/fond',
        method: 'post',
        data
    })
}

// 设置宠物的喜爱状态
export const setFondCollect = data => {
    return req({
        url: '/user/setCollect',
        method: 'post',
        data
    })
}

// 获取宠物的喜爱状态
export const getFondCollect = data => {
    return req({
        url: '/user/getCollect',
        method: 'post',
        data
    })
}

// 清除未读消息数量
export const updataUnreadNum = data => {
    return req({
        url: '/user/updataUnreadnum',
        method: 'post',
        data
    })
}

// 删除聊天列表
export const deleteChatList = data => {
    return req({
        url: '/user/deleteChatList',
        method: 'post',
        data
    })
}

// 删除聊天记录
export const deleteRecord = data => {
    return req({
        url: '/user/deleteRecord',
        method: 'post',
        data
    })
}

// 获取 OSS对象配置信息
export const uploadInfo = data => {
    return req({
        url: '/pet/uploadInfo',
        method: 'post',
        data
    }) 
}