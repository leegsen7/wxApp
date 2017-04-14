import {request,login,getUserInfo} from "./utils/promise"

//app.js
App({
    onLaunch: function() {
        login().then(res => {
            getUserInfo().then(data => {
                console.log(data);
                if (data.userInfo.avatarUrl){
                    this.data.userAvatarUrl = data.userInfo.avatarUrl;
                }
            }).catch(err => {
                console.error(err);
            })
        }).catch(err => {
            console.error(err);
        })
        request({
            url:'http://leegsen7.cn:8080/api/infinity'
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        })
    },
    data:{
        userAvatarUrl:''
    }
})
