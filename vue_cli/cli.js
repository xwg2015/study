#! node
var fs = require('fs')
var path = require('path')

function copyTemplate (from, to) {
  from = path.join(__dirname, 'template', from)
  write(to, fs.readFileSync(from, 'utf-8'))
}

function write (path, str, mode) {
  fs.writeFileSync(path, str)
}

function mkdir (path, fn) {
  fs.mkdir(path, function (err) {
    fn && fn()
  })
}

// 参数
var args = process.argv.splice(2)
var MOD = args[0]
var FUN = args[1]

// store文件名
var storeFileName = FUN.replace(/([A-Z])/g, '-$1').toLowerCase()

// 创建store
mkdir('./src/store/' + MOD + '/' + storeFileName, function () {
  copyTemplate('index.js', './src/store/' + MOD + '/' + storeFileName + '/index.js')
  copyTemplate('mutations.js', './src/store/' + MOD + '/' + storeFileName + '/mutations.js')
  copyTemplate('actions.js', './src/store/' + MOD + '/' + storeFileName + '/actions.js')
})

// 创建component
mkdir('./components/' + MOD, function () {
  copyTemplate('test.vue', './src/components/' + MOD + '/' + capitalUpperCase(FUN) + '.vue')
})

// 修改store
fileModification('./template/mutations.js', './src/store/' + MOD + '/' + storeFileName + '/mutations.js')
fileModification('./template/actions.js', './src/store/' + MOD + '/' + storeFileName + '/actions.js')

// 修改component
fileModification('./template/test.vue', './src/components/' + MOD + '/' + capitalUpperCase(FUN) + '.vue')

// 命名空间一致
function fileModification (originFile, targetFile) {
  fs.readFile(originFile, 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      fs.writeFile(targetFile, data.replace(/XXX/g, "'" + MOD + "', '" + FUN + "'"), function (err) {
        if (err) {
          console.log(targetFile + '创建修改失败！')
        } else {
          console.log(targetFile + '创建修改成功！')
        }
      })
    }
  })
}

// store模块下的index.js导入
var modIndexFile = './src/store/' + MOD + '/index.js'
fs.readFile(modIndexFile, 'utf-8', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    var header = 'import ' + FUN + " from './" + storeFileName + "'\n"
    data = data.replace(/mergeStore\(\{/g, 'mergeStore\(\{\n  ' + FUN + ',')
    fs.writeFile(modIndexFile, header + data, function (err) {
      if (err) {
        console.log(modIndexFile + '添加模块失败！')
      } else {
        console.log(modIndexFile + '添加模块成功！')
      }
    })
  }
})

// 修改路由文件
var routesIndexFile = './src/routes/index.js'
fs.readFile(routesIndexFile, 'utf-8', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    var header = 'import ' + capitalUpperCase(MOD) + capitalUpperCase(FUN) + " from '../components/" + MOD + '/' + capitalUpperCase(FUN) + "'"
    var footer = "  {path: '/" + MOD + '/' + FUN + "', component: " + capitalUpperCase(MOD) + capitalUpperCase(FUN) + '},'
    var header_re = new RegExp('\/\/ ' + MOD + '1', 'g')
    var footer_re = new RegExp('\/\/ ' + MOD + '2', 'g')

    data = data.replace(header_re, '// ' + MOD + '1\n' + header)
    data = data.replace(footer_re, '// ' + MOD + '2\n' + footer)

    fs.writeFile(routesIndexFile, data, function (err) {
      if (err) {
        console.log(routesIndexFile + '添加路由失败！')
      } else {
        console.log(routesIndexFile + '添加路由成功！')
      }
    })
  }
})

// 修改侧边栏文件
var subMenuFile = './src/components/SubMenu.vue'
fs.readFile(subMenuFile, 'utf-8', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    var route = "<el-menu-item index='/" + MOD + '/' + FUN + "'>" + FUN + '（自己放，还要我帮你不成）</el-menu-item>'

    data = data.replace(/router>/g, 'router>\n' + route)

    fs.writeFile(subMenuFile, data, function (err) {
      if (err) {
        console.log(subMenuFile + '添加侧边栏链接失败！')
      } else {
        console.log(subMenuFile + '添加侧边栏链接成功！')
      }
    })
  }
})

// 首字母大写
function capitalUpperCase (string) {
  return string[0].toUpperCase().concat(string.substr(1))
}

