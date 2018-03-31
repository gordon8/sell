/**
 * 解析url参数
 * @example ?id=12345&a=bbbb
 * @return Object {id:12345,a:'bbb'}
 */
function urlParse() {
  let search = window.location.search;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let obj = {};
  let arr = search.match(reg); //["?id=12345", "&a=ddd"]
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
}

export {
  urlParse
}
