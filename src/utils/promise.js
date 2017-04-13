module.exports = function(arg){
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