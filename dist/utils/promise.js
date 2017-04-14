let promiseJson = {
	request: function(arg){
		return new Promise((resolve,reject) => {
			wx.request({
				data:arg.data || '',
				url:arg.url,
				success:res => {
					resolve(res.data);
				},
				error:err => {
					reject(err)
				}
			})
		})
	}
}

let otherArr = ['login',"getUserInfo"];

for (let i in otherArr){
	promiseJson[otherArr[i]] = function(){
		return new Promise((resolve,reject) => {
			wx[otherArr[i]]({
				success:res => {
					resolve(res)
				},
				fail: err => {
					reject(err)
				}
			})
		})
	}
}
module.exports = promiseJson;