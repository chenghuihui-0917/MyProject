//实现阻止导航a标签的默认样式
function preventDefault() {
    var topbarnav = document.getElementById("site-topbar");
    var alINKS = topbarnav.getElementsByTagName("a");

    for (var i = 0; i < alINKS.length; i++) {
        -function (i) {
            var link = alINKS[i];
            link.onclick = function (e) {
                e = e || window.event;
                /*不兼容*/
                e.preventDefault() ? e.preventDefault() : e.returnValue = false;
                /*不兼容*/
            }
        }(i);
    }
    ;
};
 preventDefault();

//实现购物车
 function cart(){
var topbarcart=document.getElementById("topbar-cart");
var topbara=topbarcart.getElementsByTagName("a")[0];
var topbarDiv=topbarcart.getElementsByTagName("div")[0];
topbarcart.onmouseover=function(){
   this.style.background="#fff";
    topbara.style.color="red";
    topbarDiv.style.display="block";
};
topbarcart.onmouseout=function(){
    this.style.background="";
    topbarDiv.style.display="none";
};
 };
    cart();

    function search(){
//实现搜索框事件
var search = document.getElementById("search");
var submit=document.getElementById("submit");
var searchList = document.getElementById("searchList");

//onfocus:文本框获取焦点的事件
//onkeyup:键盘按下后抬起事件
search.onfocus = search.onkeyup =search.onclick= function () {
    var val = this.value.replace(/(^ +| +$)/g, "");
    searchList.style.display = val.length > 0 ? "block" : "none";
    search.style.borderColor="darkorange";
    submit.style.borderColor="darkorange";
    searchList.style.borderColor="darkorange";
};

document.body.onclick = function (e) {
    e = e || window.event;
    //->获取事件源
    var tar = e.target || e.srcElement;

    //->当前点击的是文本框
    if (tar.id === "search") {
        return;
    }

    //->当前点击的是a标签,并且是#boxList盒子下的a标签
    if (tar.tagName.toLowerCase() === "a" && tar.parentNode.parentNode.id === "searchList") {
        searchList.style.display = "none";
        search.value = tar.innerHTML;
        return;
    }

    //->当前点击的是其它的元素
    searchList.style.display = "none";
    search.style.borderColor="#e0e0e0";
    submit.style.borderColor="#e0e0e0";

};
    };
    search();


//实现导航切换
var navul=document.getElementById("nav-list");
var nauli=navul.getElementsByClassName("navli");
for(var i=0;i<nauli.length;i++){
    var nav=nauli[i];
    var itemchildren=nav.getElementsByClassName("item-children")[0];
    nav.index=i;
    nav.item=itemchildren;
    nav.onmouseover=function(){
        this.item.style.display="block";
    };
    nav.onmouseout=function(){
        this.item.style.display="none";
    };
}

//实现轮播图加上左右切换
//获取要操作的元素
var outer=document.getElementById("outer");

var inner=document.getElementById("inner");
var oImages=inner.getElementsByTagName("div");
var tip=document.getElementById("tip");
var oLis=tip.getElementsByTagName("li");
var oImagesLength=oImages.length;

var bannerLeft=document.getElementById("bannerLeft");
var bannerRight=document.getElementById("bannerRight");
//实现鼠标移入outer出现左右箭头
outer.onmouseover=function(){
    window.clearInterval(inner.autoTimer);
    bannerLeft.style.display=bannerRight.style.display="block";
};
//实现鼠标移出outer消失左右箭头
outer.onmouseout=function(){
    bannerLeft.style.display=bannerRight.style.display="none";
    inner.autoTimer=window.setInterval(autoMove,3000);
};
bannerLeft.onclick=function(){
    autoMove("left");
};
bannerRight.onclick=function(){
    autoMove("right");
};

//实现轮播
var step = 0;
function autoMove(curEle) {
    if (typeof curEle === "undefined" || curEle === "right") {
        step++;
        if (step > oImagesLength-1) {
            inner.style.left = 0 + "px";
            step = 1;
        }
       changeTip();
        animate(inner, {left: -step * 1308}, 500, 1);
    }
    if (curEle === "left") {
        step--;
        if (step < 0) {
            inner.style.left = -(oImagesLength - 1) * 1360 + "px";
            step = 3;
        }
        changeTip();
        animate(inner, {left: -step * 1308}, 500, 1);
    }


}
inner.autoTimer = window.setInterval(autoMove, 3000);


//实现我们的tip跟着选中改变
function changeTip() {
    var tempStep = step >= oImagesLength-1 ? 0 : step;
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = i === tempStep ? "select" : null;
    }
}
//实现点击tip切换图片
for (var i = 0; i < oLis.length; i++) {
    oLis[i].index = i;
    oLis[i].onclick = function () {
        step = this.index-1;
        autoMove();
    };
}


//实现轮播图上的商品切换
var categorylist = document.getElementById("category-list");
//->后去后代所有的li
var category = categorylist.getElementsByClassName("first-category");
for (var i = 0; i < category.length; i++) {
    var cate= category[i];
    var oIn = cate.getElementsByTagName("div")[0];
    var oUl=oIn.getElementsByTagName("ul").length;
    oIn.style.top = -(i * 42 + 20) + "px";
    cate.index = i;
    cate.inner = oIn;
    cate.ulCount=oUl;
    cate.onmouseover = function () {
        this.inner.style.display = "block";
        //实现切换时右边的url随着内容改变
        this.inner.style.width=this.ulCount*265+"px"
    };
    cate.onmouseout = function () {
        this.inner.style.display = "none";

    };
}



//实现小米明星单品上边框每五个变色
var ary=["orange","green","blue","red","#BB3BD9"];
var goodlist=document.getElementById("good-list");
var goods=goodlist.getElementsByTagName("li");
for(var i=0;i<goods.length;i++){
    var good=goods[i];
    var a=i%5;
    good.style.borderColor=ary[a];
}



//实现小米明星单品自动轮播与切换效果
function goodStartAutoMove(){
var goodList=document.getElementById("good-list");
var moreLeft=document.getElementById("moreLeft");
var moreRight=document.getElementById("moreRight");

var more=document.getElementById("more");
more.onmouseover=function(){
    window.clearInterval(goodList.autoTimer);
};
more.onmouseout=function(){
    goodList.autoTimer = window.setInterval(autoGoodMove, 5000);
};

moreRight.onclick=function(){
    autoGoodMove("right");
    moreLeft.className="select";
    moreRight.className="";
    moreRight.isDisabled=true;
};
moreLeft.onclick=function(){
    autoGoodMove("left");
    moreRight.className="select";
    moreLeft.className="";
    moreLeft.isDisabled=true;
};
//实现轮播
    var goodStep = 0;
function autoGoodMove(curEle) {
    if (typeof curEle === "undefined" || curEle === "right") {

        if (goodStep >= 1) {
            goodStep = 0;
            animate(goodList, {left: 0}, 1000, 1);
            moreRight.className = "select";
            moreLeft.className = "";
        } else {
            goodStep++;
            animate(goodList, {left: -goodStep * 1350}, 1000, 1);
            moreLeft.className = "select";
            moreRight.className = "";
        }
    }
    if (curEle === "left") {
        if (goodStep < 0) {
            goodStep = 0;
            animate(goodList, {left: 0}, 1000, 1);
        } else {
            goodStep--;
            animate(goodList, {left: goodStep * 1350}, 1000, 1);
        }
    }


}
goodList.autoTimer = window.setInterval(autoGoodMove, 5000);
};
goodStartAutoMove();

/*/!*搭配选项卡实现*!/*/
function changeTabMatch() {
    var tabList = document.getElementById("tab-list");
    var tabOlis = tabList.getElementsByTagName("li");
    var matchContent = document.getElementById("match-content");
    var tabOuls = matchContent.getElementsByTagName("ul");
    for (var i = 0; i < tabOlis.length; i++) {
        tabOlis[i].index = i;
        tabOlis[i].onmouseover = function () {
            tabChange(this.index);//要传递索引，但是还不能使用i-->自定义属性  this代表的是当前操作的那个li
        }

    }

    function tabChange(n) {
        //1)首先让所有的li和div都没有选中的样式
        for (var i = 0; i < tabOlis.length; i++) {
            tabOlis[i].className = "tab";
            tabOuls[i].className = "brick-right-list";
        }
        //2)让当前选中的这个li和对应的div有选中的样式
        //此时我们还不知道点击的是哪一个呢，需要定义个入口，当执行的时候告诉我即可-->形参
        //我设置一个形参n，自己规定它的意思是：当前点击的这个li对应的索引
        tabOlis[n].className = "tab select";
        tabOuls[n].className = "brick-right-list select";

    }
}
changeTabMatch();
/*/!*配件选项卡实现*!/*/
function changeTabMatchEach() {
    var tabList = document.getElementById("tab-list1");
    var tabOlis = tabList.getElementsByTagName("li");
    var matchContent = document.getElementById("match-content1");
    var tabOuls = matchContent.getElementsByTagName("ul");
    for (var i = 0; i < tabOlis.length; i++) {
        tabOlis[i].index = i;
        tabOlis[i].onmouseover = function () {
            tabChange(this.index);//要传递索引，但是还不能使用i-->自定义属性  this代表的是当前操作的那个li
        }

    }

    function tabChange(n) {
        //1)首先让所有的li和div都没有选中的样式
        for (var i = 0; i < tabOlis.length; i++) {
            tabOlis[i].className = "tab";
            tabOuls[i].className = "brick-right-list";
        }
        //2)让当前选中的这个li和对应的div有选中的样式
        //此时我们还不知道点击的是哪一个呢，需要定义个入口，当执行的时候告诉我即可-->形参
        //我设置一个形参n，自己规定它的意思是：当前点击的这个li对应的索引
        tabOlis[n].className = "tab select";
        tabOuls[n].className = "brick-right-list select";

    }
}
changeTabMatchEach();
/*/!*周边选项卡实现*!/*/
function changeTabSoround() {
    var tabList = document.getElementById("tab-list2");
    var tabOlis = tabList.getElementsByTagName("li");
    var matchContent = document.getElementById("match-content2");
    var tabOuls = matchContent.getElementsByTagName("ul");
    for (var i = 0; i < tabOlis.length; i++) {
        tabOlis[i].index = i;
        tabOlis[i].onmouseover = function () {
            tabChange(this.index);//要传递索引，但是还不能使用i-->自定义属性  this代表的是当前操作的那个li
        }

    }

    function tabChange(n) {
        //1)首先让所有的li和div都没有选中的样式
        for (var i = 0; i < tabOlis.length; i++) {
            tabOlis[i].className = "tab";
            tabOuls[i].className = "brick-right-list";
        }
        //2)让当前选中的这个li和对应的div有选中的样式
        //此时我们还不知道点击的是哪一个呢，需要定义个入口，当执行的时候告诉我即可-->形参
        //我设置一个形参n，自己规定它的意思是：当前点击的这个li对应的索引
        tabOlis[n].className = "tab select";
        tabOuls[n].className = "brick-right-list select";

    }
}
changeTabSoround();



//实现为你推荐自动轮播与切换效果

var ary=["orange","green","blue","red","#BB3BD9"];
var goodlist2=document.getElementById("good-list2");
var goods2=goodlist2.getElementsByTagName("li");
for(var i=0;i<goods2.length;i++){
    var good=goods2[i];
    var a=i%5;
    good.style.borderColor=ary[a];
}
function recommendedAutoMove(){
    var goodList2=document.getElementById("good-list2");
    var moreLeft=document.getElementById("moreLeft2");
    var moreRight=document.getElementById("moreRight2");

    var more=document.getElementById("more2");
    more.onmouseover=function(){
        window.clearInterval(goodList2.autoTimer);
    };
    more.onmouseout=function(){
        goodList2.autoTimer = window.setInterval(autorecommedMove, 5000);
    };

    moreRight.onclick=function(){
        autorecommedMove("right");
        moreLeft.className="select";
        moreRight.className="";
        moreRight.isDisabled=true;
    };
    moreLeft.onclick=function(){
        autorecommedMove("left");
        moreRight.className="select";
        moreLeft.className="";
        moreLeft.isDisabled=true;
    };
//实现轮播
    var recommedStep=0;
    function autorecommedMove(curEle) {
        if (typeof curEle === "undefined" || curEle === "right") {

            if (recommedStep >= 1) {
                recommedStep = 0;
                animate(goodList2, {left: 0}, 1000, 1);
                moreRight.className = "select";
                moreLeft.className = "";
            } else {
                recommedStep++;
                animate(goodList2, {left: -recommedStep * 1350}, 1000, 1);
                moreLeft.className = "select";
                moreRight.className = "";
            }
        }
        if (curEle === "left") {
            if (recommedStep < 0) {
                recommedStep = 0;
                animate(goodList2, {left: 0}, 1000, 1);
            } else {
                recommedStep--;
                animate(goodList2, {left: recommedStep * 1350}, 1000, 1);
            }
        }


    }
    goodList2.autoTimer = window.setInterval(autorecommedMove, 5000);
};
recommendedAutoMove();

/*实现内容左右切换效果第一步*/
function changeContent(){
var contentlist=document.getElementById("content-list");
var contentLis=contentlist.getElementsByClassName("content-item");
var contentAry=["orange","green","blue","red"];
for(var i=0;i<contentLis.length;i++){
    var contentli=contentLis[i];
    //获得li下边唯一的一个h2
    var contenttitle=contentli.getElementsByClassName("title")[0];
    //获取每一个li下边的唯一的一个divxm-controls
    var xmcontrols=contentli.getElementsByClassName("xm-controls")[0];

    var index=i;
    contentli.style.borderColor=contentAry[index];
    contenttitle.style.color=contentAry[index];
    //把每一个div放在li对应的属性上，实现鼠标移入箭头出现，鼠标移出箭头消失
    contentli.oDiv=xmcontrols;
    contentli.onmouseover=function(){
        this.oDiv.style.display="block";
    }
    contentli.onmouseout=function(){
        this.oDiv.style.display="none";
    }
}
}
changeContent();

/*实现内容切换效果第二步*/
function changecontrol() {

    var contentlOul = document.getElementById("wrapper");
    var xmpagers= document.getElementById("xm-pagers");
    var xmpagerslis=xmpagers.getElementsByTagName("li");

    var controlprev = document.getElementById("control-prev");
    var controlnext = document.getElementById("control-next");


    controlnext.onclick = function () {
        autoControlMove("right");
    };
    controlprev.onclick = function () {
        autoControlMove("left");
    };
//实现轮播
    var controlStep = 0;
    function autoControlMove(curEle) {
        if (typeof curEle==="undefined"||curEle === "right") {
            controlStep++;
            if (controlStep >= 3) {
                controlnext.disabled=true;
                controlStep = 3;
            }
            changeControlTip();
            animate(contentlOul, {left: -controlStep * 296}, 500, 1);
        }
        if (curEle === "left") {
            controlStep--;
            if (controlStep < 0) {
                controlprev.disabled=true;
                controlStep = 0;
            }
            changeControlTip();
            animate(contentlOul, {left:  -controlStep*296}, 500, 1);
        }


    }

//实现我们的tip跟着选中改变
    function changeControlTip() {
        var tempStep = controlStep;
        for (var i = 0; i < xmpagerslis.length; i++) {
            xmpagerslis[i].className = i === tempStep ? "pager pager-active" : "pager";
        }
    }

//实现点击tip切换图片
    for (var i = 0; i < xmpagerslis.length; i++) {
        xmpagerslis[i].index = i;
        xmpagerslis[i].onclick = function () {
            controlStep = this.index-1;
            autoControlMove();
        };
    }
}

changecontrol();


/*实现内容切换效果第二步*/
function changecontrolone() {

    var contentlOul = document.getElementById("wrapper1");
    var xmpagers= document.getElementById("xm-pagers1");
    var xmpagerslis=xmpagers.getElementsByTagName("li");

    var controlprev = document.getElementById("control-prev1");
    var controlnext = document.getElementById("control-next1");


    controlnext.onclick = function () {
        autoControlMove("right");
    };
    controlprev.onclick = function () {
        autoControlMove("left");
    };
//实现轮播
    var controlStep = 0;
    function autoControlMove(curEle) {
        if (typeof curEle==="undefined"||curEle === "right") {
            controlStep++;
            if (controlStep >= 3) {
                controlnext.disabled=true;
                controlStep = 3;
            }
            changeControlTip();
            animate(contentlOul, {left: -controlStep * 296}, 500, 1);
        }
        if (curEle === "left") {
            controlStep--;
            if (controlStep < 0) {
                controlprev.disabled=true;
                controlStep = 0;
            }
            changeControlTip();
            animate(contentlOul, {left:  -controlStep*296}, 500, 1);
        }


    }

//实现我们的tip跟着选中改变
    function changeControlTip() {
        var tempStep = controlStep;
        for (var i = 0; i < xmpagerslis.length; i++) {
            xmpagerslis[i].className = i === tempStep ? "pager pager-active" : "pager";
        }
    }

//实现点击tip切换图片
    for (var i = 0; i < xmpagerslis.length; i++) {
        xmpagerslis[i].index = i;
        xmpagerslis[i].onclick = function () {
            controlStep = this.index-1;
            autoControlMove();
        };
    }
}

changecontrolone();


/*实现内容切换效果第二步*/
function changecontrolTwo() {

    var contentlOul = document.getElementById("wrapper2");
    var xmpagers= document.getElementById("xm-pagers2");
    var xmpagerslis=xmpagers.getElementsByTagName("li");

    var controlprev = document.getElementById("control-prev2");
    var controlnext = document.getElementById("control-next2");


    controlnext.onclick = function () {
        autoControlMove("right");
    };
    controlprev.onclick = function () {
        autoControlMove("left");
    };
//实现轮播
    var controlStep = 0;
    function autoControlMove(curEle) {
        if (typeof curEle==="undefined"||curEle === "right") {
            controlStep++;
            if (controlStep >= 3) {
                controlnext.disabled=true;
                controlStep = 3;
            }
            changeControlTip();
            animate(contentlOul, {left: -controlStep * 296}, 500, 1);
        }
        if (curEle === "left") {
            controlStep--;
            if (controlStep < 0) {
                controlprev.disabled=true;
                controlStep = 0;
            }
            changeControlTip();
            animate(contentlOul, {left:  -controlStep*296}, 500, 1);
        }


    }

//实现我们的tip跟着选中改变
    function changeControlTip() {
        var tempStep = controlStep;
        for (var i = 0; i < xmpagerslis.length; i++) {
            xmpagerslis[i].className = i === tempStep ? "pager pager-active" : "pager";
        }
    }

//实现点击tip切换图片
    for (var i = 0; i < xmpagerslis.length; i++) {
        xmpagerslis[i].index = i;
        xmpagerslis[i].onclick = function () {
            controlStep = this.index-1;
            autoControlMove();
        };
    }
}

changecontrolTwo();


function changecontrolThree() {

    var contentlOul = document.getElementById("wrapper3");
    var xmpagers= document.getElementById("xm-pagers3");
    var xmpagerslis=xmpagers.getElementsByTagName("li");

    var controlprev = document.getElementById("control-prev3");
    var controlnext = document.getElementById("control-next3");


    controlnext.onclick = function () {

        autoControlMove("right");
    };
    controlprev.onclick = function () {
        autoControlMove("left");
    };
//实现轮播
    var controlStep = 0;
    function autoControlMove(curEle) {
        if (typeof curEle==="undefined"||curEle === "right") {
            controlStep++;
            if (controlStep >= 3) {
                controlnext.disabled=true;
                controlStep = 3;
            }
            changeControlTip();
            animate(contentlOul, {left: -controlStep * 296}, 500, 1);
        }
        if (curEle === "left") {
            controlStep--;
            if (controlStep < 0) {
                controlprev.disabled=true;
                controlStep = 0;
            }
            changeControlTip();
            animate(contentlOul, {left:  -controlStep*296}, 500, 1);
        }


    }

//实现我们的tip跟着选中改变
    function changeControlTip() {
        var tempStep = controlStep;
        for (var i = 0; i < xmpagerslis.length; i++) {
            xmpagerslis[i].className = i === tempStep ? "pager pager-active" : "pager";
        }
    }

//实现点击tip切换图片
    for (var i = 0; i < xmpagerslis.length; i++) {
        xmpagerslis[i].index = i;
        xmpagerslis[i].onclick = function () {
            controlStep = this.index-1;
            autoControlMove();
        };
    }
}

changecontrolThree();


/*实现详细信息展示*/
function matchcontentlist(){
var matchcontentlist=document.getElementById("match-content-list");
var matchcontenOlis=matchcontentlist.getElementsByTagName("li");
for(var i=0;i<matchcontenOlis.length;i++){

    var cur=matchcontenOlis[i];
    var curDiv=cur.getElementsByClassName("review-wrapper")[0];
    cur.index=i;
    cur.item=curDiv;
    cur.onmouseover=function(){

   this.item.style.display="block";
    }
    cur.onmouseout=function(){
        this.item.style.display="none";
    }
}
}
matchcontentlist();


function matchcontentlist1(){
var matchcontentlist=document.getElementById("match-content-list1");
var matchcontenOlis=matchcontentlist.getElementsByTagName("li");
for(var i=0;i<matchcontenOlis.length;i++){

    var cur=matchcontenOlis[i];
    var curDiv=cur.getElementsByClassName("review-wrapper")[0];
    cur.index=i;
    cur.item=curDiv;
    cur.onmouseover=function(){

        this.item.style.display="block";
    }
    cur.onmouseout=function(){
        this.item.style.display="none";
    }
}
}
matchcontentlist1();

function matchcontentlist2(){
var matchcontentlist=document.getElementById("match-content-list2");
var matchcontenOlis=matchcontentlist.getElementsByTagName("li");
for(var i=0;i<matchcontenOlis.length;i++){

    var cur=matchcontenOlis[i];
    var curDiv=cur.getElementsByClassName("review-wrapper")[0];
    cur.index=i;
    cur.item=curDiv;
    cur.onmouseover=function(){

        this.item.style.display="block";
    }
    cur.onmouseout=function(){
        this.item.style.display="none";
    }
}
}

matchcontentlist2();


/*
/!*通过Dom库实现页面的三个选型卡*!/
var tabOlis=DOM.getElesByClass("tab");
for(var i=0;i<tabOlis.length;i++){
    tabOlis[i].onclick=changeTab;
}
function changeTab() {
    //this.className="tab selectedTab";
    DOM.addClass(this, "select");
    var tabSiblings = DOM.siblings(this);
    for (var i = 0; i < tabSiblings.length; i++) {
        var oTab = tabSiblings[i];
        //oTab.className="tab";
        DOM.removeClass(oTab, "select");
    }


    var tabOuls = DOM.getElesByClass("brick-right-list");
//从以上的div中，找到和点击的li对应的那个div
    var n = DOM.getIndex(this);//计算索引值
    var selectedContent = tabOuls[n];//通过索引值找到对应的ul
//selectedContent.className="content selectedContent";
    DOM.addClass(selectedContent, "select");
    var contentSiblings = DOM.siblings(selectedContent);//找到内容ul的兄弟元素
    for (var i = 0; i < contentSiblings.length; i++) {
        //contentSiblings[i].className="content";
        DOM.removeClass(contentSiblings[i], "select")
    }
}*/
