app.component.pageTurner = {};
app.component.pageTurner.element = {};
app.component.pageTurner.element.pagesSlide = document.querySelector(".pagesSlide");
app.component.pageTurner.setting = {};
app.component.pageTurner.setting.startXPx    = null;
app.component.pageTurner.setting.currentXPx  = null;
app.component.pageTurner.setting.startLeftPx = null;
app.component.pageTurner.setting.startWidth  = null;
app.component.pageTurner.state = {};
app.component.pageTurner.state.active = [false, false, null];
app.component.pageTurner.func = {};
app.component.pageTurner.func.get  = {};
app.component.pageTurner.func.give = {};
app.component.pageTurner.func.init = {};

/*
func hotkeys:
GIVE
app.component.pageTurner.func.give.addPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.addPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.viewPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.viewPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners = ()=>{
app.component.pageTurner.func.give.pagesSlide_addPageAttributes = ()=>{
app.component.pageTurner.func.give.pagesSlide_viewPageAttributes = ()=>{
INIT
app.component.pageTurner.func.init.component = ()=>{
*/


// let left = app.component.pageTurner.element.pagesSlide.style.left;
// console.log('left', left[app.component.pageTurner.element.pagesSlide.style.left.length-1]);
// console.log(app.component.pageTurner.element.pagesSlide.style.left[app.component.pageTurner.element.pagesSlide.style.left.length-1]);


/**
GET
***/
app.component.pageTurner.func.get.appLeftPx = ()=>{
    let appElement = document.querySelector(".app");
    let pxWidth    = appElement.getBoundingClientRect().width;
    if(app.component.pageTurner.element.pagesSlide.style.left[app.component.pageTurner.element.pagesSlide.style.left.length-1] === "%"){
        let leftPercent = Number(app.component.pageTurner.element.pagesSlide.style.left.split("%")[0]);
        let leftRatio   = leftPercent / 100;
        let leftPx      = pxWidth * leftRatio;
        return leftPx;
    }
    else{
        let leftPx = Number(app.component.pageTurner.element.pagesSlide.style.left.split("p")[0]);
        return leftPx;
    };
};

/***
GIVE
****/
app.component.pageTurner.func.give.addPageButton_offPageAttributes = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.classList.add("pageButton_off");
        addPageButton.classList.remove("pageButton_on");
};

app.component.pageTurner.func.give.addPageButton_onPageAttributes = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.classList.add("pageButton_on");
        addPageButton.classList.remove("pageButton_off");
};

app.component.pageTurner.func.give.app_pageTurnerGestureListeners = ()=>{
    let appElement = document.querySelector(".app");
        appElement.addEventListener("mousedown", ()=>{
            event.stopPropagation();
            app.component.pageTurner.state.active[0]     = true;
            app.component.pageTurner.setting.startXPx    = event.clientX;
            app.component.pageTurner.setting.startLeftPx = app.component.pageTurner.func.get.appLeftPx();
            app.component.pageTurner.element.pagesSlide.style.left = `${app.component.pageTurner.setting.startLeftPx}px`;
            app.component.pageTurner.setting.startWidth  = appElement.getBoundingClientRect().width;
        });
        appElement.addEventListener("mousemove", ()=>{
            event.stopPropagation();
            if( app.component.pageTurner.state.active[0] === true){
                app.component.pageTurner.setting.currentXPx = event.clientX;
                let pxDifference = app.component.pageTurner.setting.currentXPx - app.component.pageTurner.setting.startXPx;
                let newLeft = app.component.pageTurner.setting.startLeftPx + pxDifference;
                app.component.pageTurner.element.pagesSlide.style.left = `${newLeft}px`;
            };
        });
        appElement.addEventListener("mouseup", ()=>{
            event.stopPropagation();
            if( app.component.pageTurner.state.active[0] === true){
                app.component.pageTurner.state.active[0] = false;
            };
        });
};

app.component.pageTurner.func.give.viewPageButton_offPageAttributes = ()=>{
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.classList.add("pageButton_off");
        viewPageButton.classList.remove("pageButton_on");
};

app.component.pageTurner.func.give.viewPageButton_onPageAttributes = ()=>{
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.classList.add("pageButton_on");
        viewPageButton.classList.remove("pageButton_off");
};

app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.addEventListener(
            "click",
            app.component.pageTurner.func.give.pagesSlide_addPageAttributes,
            app.component.pageTurner.func.give.addPageButton_onPageAttributes,
            app.component.pageTurner.func.give.viewPageButton_offPageAttributes
        );
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.addEventListener(
            "click",
            app.component.pageTurner.func.give.pagesSlide_viewPageAttributes,
            app.component.pageTurner.func.give.addPageButton_offPageAttributes,
            app.component.pageTurner.func.give.viewPageButton_onPageAttributes
        );
};

app.component.pageTurner.func.give.pagesSlide_addPageAttributes = ()=>{
    let pagesSlide = document.querySelector(".pagesSlide");
        pagesSlide.style.left = "0%";
};

app.component.pageTurner.func.give.pagesSlide_viewPageAttributes = ()=>{
    let pagesSlide = document.querySelector(".pagesSlide");
        pagesSlide.style.left = "-100%";
};

/***
INIT
****/
app.component.pageTurner.func.init.component = ()=>{
    app.component.pageTurner.func.give.app_pageTurnerGestureListeners();
    app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners();
};
