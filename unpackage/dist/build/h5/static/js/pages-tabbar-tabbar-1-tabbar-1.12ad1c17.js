(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabbar-tabbar-1-tabbar-1"],{"0752":function(t,n,e){"use strict";var i=e("8cb1"),a=e.n(i);a.a},"1f9b":function(t,n,e){"use strict";var i={"uni-list":e("262d").default,"uni-list-item":e("0395b").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",t._l(t.UserList,(function(n){return e("uni-list",{key:n.id,staticClass:"pg_list_cell_left"},[e("uni-list-item",{attrs:{thumb:"https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chat(n.id,n.nickname)}}},[t._v(t._s(n.nickname))])],1)})),1)},u=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}))},"8cb1":function(t,n,e){var i=e("df1c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("20a1bd41",i,!0,{sourceMap:!1,shadowMode:!1})},"9e78":function(t,n,e){"use strict";var i=e("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("262d")),u=i(e("0395b")),c={components:{uniList:a.default,uniListItem:u.default},data:function(){return{UserList:[]}},onLoad:function(){var t=this;t.loadfriend(),uni.$on("FriendsList",(function(n){t.loadfriend()}))},onShow:function(){},onUnload:function(){uni.$once("FriendsList")},methods:{chat:function(t,n){uni.navigateTo({url:"../../chat/chat?id="+t+"&name="+n})},loadfriend:function(){var t=this;uni.request({url:uni.getStorageSync("URL")+"/contact/loadfriend",method:"POST",data:{userid:uni.getStorageSync("UID")},header:{"content-type":"application/x-www-form-urlencoded"},success:function(n){t.UserList=n.data.rows}})}}};n.default=c},df1c:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,".pg_list_cell_left[data-v-4c9c158e]{font-size:%?40?%}",""]),t.exports=n},e540:function(t,n,e){"use strict";e.r(n);var i=e("9e78"),a=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=a.a},e733:function(t,n,e){"use strict";e.r(n);var i=e("1f9b"),a=e("e540");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("0752");var c,o=e("f0c5"),r=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"4c9c158e",null,!1,i["a"],c);n["default"]=r.exports}}]);