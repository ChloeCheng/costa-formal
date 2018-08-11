/*获取当前页url*/
exports.getCurrentPageUrl = function() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  return url
}

/*获取当前页带参数的url*/
exports.getCurrentPageUrlWithArgs = function() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  
  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}
/*获取当前页带参数的*/
exports.getCurrentPageArgs = function () {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  return options
}

/*获取当前页带参数的url*/
exports.getCallbackUrl = function() {
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var options = currentPage.options || {}  //如果要获取url中所带的参数可以查看options
  return decodeURIComponent(options.callbackUrl) || '/pages/index/index'
}


export function paramStr2paramObj(url) {
  var search = decodeURIComponent(url)
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分
  if (!search) {
    return {};
  }
  var searchStr = search[1];
  var searchHash = searchStr.split('&');

  var ret = {};
  for (var i = 0, len = searchHash.length; i < len; i++) {
    //这里可以调用each方法
    var pair = searchHash[i];
    if ((pair = pair.split('='))[0]) {
      var key = pair.shift();
      var value = pair.length > 1 ? pair.join('=') : pair[0];
      if (value != undefined) {
        value = value;
      }
      if (key in ret) {
        if (ret[key].constructor != Array) {
          ret[key] = [ret[key]];
        }
        ret[key].push(value);
      } else {
        ret[key] = value;
      }
    }
  }
  return ret;
}