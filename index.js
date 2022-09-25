// 封装一个自己的ajax函数（同时兼容可以发送 get post 请求）

  // 封装一个解析数据的方法（resolve 解析）
  const resolveData = (obj) => {
    let arr = []
    for(let key in obj) {
      arr.push(`${key}=${obj[key]}`)
    }
    return arr.join('&')
  }
  console.log(resolveData({ name: 'heima', age: 20 }))

  // method有数据的话就用 用户传的数据，没有的默认为get
  const myAjax = (method = 'get', url, data, success) => {
    // 实例化 xhr对象
    let xhr = new XMLHttpRequest()
    // 查询字符串参数
    const queryString = resolveData(data)
    // 将输入的字符转换成小写
    method = method.toString().toLowerCase()
    // 判断用户是否传入method数据
    // method = method && method.toLowerCase() || 'get'

    switch(method) {
      case 'get':
        xhr.open(method,`${url}?${queryString}`)
        xhr.send()
        break
      case 'post':
        xhr.open(method,url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(queryString)
        break
    }

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        const result = JSON.parse(xhr.responseText)
        success(result)
      }
    }
  }