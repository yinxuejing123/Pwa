/**
 * index.js 主页面js，事件绑定和处理
 */

'use strict'

let app = {
  sidebarShow: false,
  loadingShow: true
}

const url = './assets/mockData/index.json'

/*******************
 * 页面方法
 *******************/

/**
 * [getData description]
 * @param  {[type]} url 数据地址
 * @return {[type]}     [description]
 */
app.getData = function (url) {
  // 请求最新数据
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.response)
      let results = response.data.data
      // app.updateTemplate(results)

      setTimeout(function delay () {
        app.updateTemplate(results)
      }, 500)
    }
  }
  xhr.open('GET', url)
  xhr.send()
}

/**
 * [updateTemplate 更新页面
 * @param  {[type]} data         获取的数据
 * @return {[type]}              [description]
 */
app.updateTemplate = function (data) {
  let container = document.querySelector('.main')
  // 这里可以一些复杂的DOM结构来，这里仅给出简单的示例
  container.textContent = data
}

app.refresh = function () {
  app.getData(url)
}

/**********************************
 *  事件监听 *
 *  **********************************/

// bottombar btn
console.log(document.querySelector('.bottom-bar'))
document.querySelector('.bottom-bar').addEventListener('click', function () {
  app.closeButtombar()
})

document.querySelector('.icon-category').addEventListener('click', function () {
  app.openSidebar()
})

document.querySelector('.shadow').addEventListener('click', function () {
  app.closeButtombar()
})

document.querySelector('.icon-refresh').addEventListener('click', function () {
  app.refresh()
})

app.openSidebar = function () {
  if (app.sidebarShow) return
  document.querySelector('.shadow').classList.remove('hide')
  document.querySelector('.bottom-bar').classList.remove('hide')
  app.sidebarShow = true
}

app.closeButtombar = function () {
  if (!app.sidebarShow) return
  document.querySelector('.shadow').classList.add('hide')
  document.querySelector('.bottom-bar').classList.add('hide')
  app.sidebarShow = false
}

app.getData(url)
