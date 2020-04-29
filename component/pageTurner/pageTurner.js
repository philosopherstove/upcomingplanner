app.component.pageTurner = {};
app.component.pageTurner.setting = {};
app.component.pageTurner.setting.page                   = [null, null];
app.component.pageTurner.setting.pvtr                   = app.func.calc.b([.3,.8,.5,.9]);
app.component.pageTurner.setting.startXPx               = null;
app.component.pageTurner.setting.currentXPx             = null;
app.component.pageTurner.setting.startLeftPx            = null;
app.component.pageTurner.setting.timeout_sliderTransEnd = null;
app.component.pageTurner.state = {};
app.component.pageTurner.state.active = [false, false, null];
app.component.pageTurner.state.preventClick = false;
app.component.pageTurner.func = {};
app.component.pageTurner.func.anim  = {};
app.component.pageTurner.func.event = {};
app.component.pageTurner.func.get   = {};
app.component.pageTurner.func.give  = {};
app.component.pageTurner.func.init  = {};
app.component.pageTurner.func.set   = {};

/*
func hotkeys:
ANIM
app.component.pageTurner.func.anim.slider_toPosition = (tTotal, elem, sPos, fPos)=>{
EVENT
app.component.pageTurner.func.event.userDown = ()=>{
app.component.pageTurner.func.event.userMove = ()=>{
app.component.pageTurner.func.event.userUp = ()=>{
GET
app.component.pageTurner.func.get.appLeftPx = ()=>{
GIVE
app.component.pageTurner.func.give.addPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.addPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.app_pageTurnerGestureListeners = ()=>{
app.component.pageTurner.func.give.viewPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.viewPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners = ()=>{
app.component.pageTurner.func.give.slider_addPageAttributes = ()=>{
app.component.pageTurner.func.give.slider_viewPageAttributes = ()=>{
INIT
app.component.pageTurner.func.init.component = ()=>{
SET
app.component.pageTurner.func.set.page = ()=>{
app.component.pageTurner.func.set.startPage = ()=>{
*/

/***
ANIM
****/
app.component.pageTurner.func.anim.slider_toPosition = (tTotal, elem, sPos, fPos)=>{
    let dCurr;
    let dRatio;
    let dTotal = fPos - sPos;
    let tRadio;
    function animate(){
        let tCurr = Date.now();
        if( tCurr > tFinal){
            tRatio          = 1;
            dCurr           = tRatio * dTotal;
            dCurr           = sPos + dCurr;
            elem.style.left = `${dCurr}px`;
            cancelAnimationFrame(animId);
            clearInterval(check_newUserDown);
            app.component.pageTurner.state.active[1] = false;
        }
        else{
            tRatio = (tCurr - tStart) / tTotal;
            for(let i = 0; i < app.component.pageTurner.setting.pvtr.length; i++){
                if( app.component.pageTurner.setting.pvtr[i][0] > tRatio){
                    dRatio          = (app.component.pageTurner.setting.pvtr[i - 1][1] + app.component.pageTurner.setting.pvtr[i + 1][1]) / 2;
                    dCurr           = dRatio * dTotal;
                    dCurr           = sPos + dCurr;
                    elem.style.left = `${dCurr}px`;
                    break;
                };
            };
            animId = requestAnimationFrame(animate);
        };
    };
    let tStart = Date.now();
    let tFinal = tStart + tTotal;
    let animId;
    animate();

    let check_newUserDown = setInterval(()=>{
        if(app.component.pageTurner.state.active[1] === false){
            let currLeft = app.component.pageTurner.func.get.appLeftPx();
            let slider = document.querySelector(".slider");
                slider.style.left = `${currLeft}px`;
                slider.classList.remove("sliderTrans");
            clearTimeout(app.component.pageTurner.setting.timeout_sliderTransEnd);
            cancelAnimationFrame(animId);
            clearInterval(check_newUserDown);
        };

    },1);

};

/****
EVENT
*****/
app.component.pageTurner.func.event.userDown = ()=>{
    let appElement = document.querySelector(".app");
    if( app.component.pageTurner.state.active[0] === false){
        if( app.func.is.point_withinElement([event.clientX, event.clientY], document.querySelector(".footer")) === true ){
            return; /* if user down within footer */
        };
        app.component.pageTurner.setting.startLeftPx = app.component.pageTurner.func.get.appLeftPx(); // ui set-up with %. This converts to px.
        app.component.pageTurner.setting.startXPx    = event.clientX;
        if(event.clientX == undefined){ // event.clientX undefined on touch devices. So then use event.touches[0].clientX
            app.component.pageTurner.setting.startXPx = event.touches[0].clientX;
        };
        let slider = document.querySelector(".slider");
            slider.style.left = `${app.component.pageTurner.setting.startLeftPx}px`; // sets initial left to converted px.
            slider.classList.remove("sliderTrans");
        app.component.pageTurner.state.active[0] = true;
        app.component.pageTurner.state.active[1] = false;
    };
};

app.component.pageTurner.func.event.userMove = ()=>{
    if( app.component.pageTurner.state.active[0] === true){
        app.component.pageTurner.state.preventClick = true;
        app.component.pageTurner.setting.currentXPx = event.clientX;
        if(event.clientX == undefined){
            app.component.pageTurner.setting.currentXPx = event.touches[0].clientX;
        };
        let pxDifference      = app.component.pageTurner.setting.currentXPx - app.component.pageTurner.setting.startXPx;
        let newLeft           = app.component.pageTurner.setting.startLeftPx + pxDifference;
        let slider            = document.querySelector(".slider");
            slider.style.left = `${newLeft}px`;
    };
};

app.component.pageTurner.func.event.userUp = ()=>{
    if( app.component.pageTurner.state.active[0] === true){
        app.component.pageTurner.state.active[0] = false;
        app.component.pageTurner.state.active[1] = true;
        let tTotal = 320;
        let slider = document.querySelector(".slider");
        let sPos   = Number(slider.style.left.split("p")[0]);
        app.component.pageTurner.func.set.page();
        let fPos = app.component.pageTurner.setting.page[1]; // depends on set.page()
        app.component.pageTurner.func.anim.slider_toPosition(tTotal, slider, sPos, fPos);
        app.component.pageTurner.setting.timeout_sliderTransEnd = setTimeout(()=>{
            slider.classList.add("sliderTrans");
            app.component.pageTurner.state.preventClick = false;
        },tTotal);
    };
};

/**
GET
***/
app.component.pageTurner.func.get.appLeftPx = ()=>{
    let appElement = document.querySelector(".app");
    let appPxWidth = appElement.getBoundingClientRect().width;
    let slider     = document.querySelector(".slider");
    if(slider.style.left[slider.style.left.length-1] === "%"){ // app starts with % units for left. First conditional checks for this and converts to px.
        let leftPercent = Number(slider.style.left.split("%")[0]);
        let leftRatio   = leftPercent / 100;
        let leftPx      = appPxWidth * leftRatio;
        return leftPx;
    }
    else{
        let leftPx = Number(slider.style.left.split("p")[0]);
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
        appElement.addEventListener("mousedown", app.component.pageTurner.func.event.userDown);
        appElement.addEventListener("touchstart", app.component.pageTurner.func.event.userDown);
        appElement.addEventListener("mousemove", app.component.pageTurner.func.event.userMove);
        appElement.addEventListener("touchmove", app.component.pageTurner.func.event.userMove);
        appElement.addEventListener("mouseup", app.component.pageTurner.func.event.userUp);
        appElement.addEventListener("touchend", app.component.pageTurner.func.event.userUp);
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
        addPageButton.addEventListener("click", ()=>{
            app.component.pageTurner.func.give.slider_addPageAttributes();
            app.component.pageTurner.func.give.addPageButton_onPageAttributes();
            app.component.pageTurner.func.give.viewPageButton_offPageAttributes();
        });

    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.addEventListener("click", ()=>{
            app.component.pageTurner.func.give.slider_viewPageAttributes();
            app.component.pageTurner.func.give.addPageButton_offPageAttributes();
            app.component.pageTurner.func.give.viewPageButton_onPageAttributes();
        });
};

app.component.pageTurner.func.give.slider_addPageAttributes = ()=>{
    let slider = document.querySelector(".slider");
        slider.style.left = "0%";
};

app.component.pageTurner.func.give.slider_viewPageAttributes = ()=>{
    let slider = document.querySelector(".slider");
        slider.style.left = "-100%";
};

/***
INIT
****/
app.component.pageTurner.func.init.component = ()=>{
    app.component.pageTurner.func.give.app_pageTurnerGestureListeners();
    app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners();
    app.component.pageTurner.func.set.startPage();
};

/**
SET
***/
app.component.pageTurner.func.set.page = ()=>{
    let appWidth    = document.querySelector(".app").getBoundingClientRect().width;
    let currentLeft = Number(document.querySelector(".slider").style.left.split("p")[0]);
    if( app.component.pageTurner.setting.page[0] === "add"){
        if( currentLeft < (-1 * appWidth * 0.2) ){ // currentLeft is greater than what slider would be if start on addPage and dragged 20% negative(pulling viewPage into view)
            let sliderLeft = -1 * appWidth;
            app.component.pageTurner.setting.page = ["view", sliderLeft];
        };
    }
    else
    if( app.component.pageTurner.setting.page[0] === "view"){
        if( currentLeft > (-1 * appWidth * 0.8) ){
            let sliderLeft = 0;
            app.component.pageTurner.setting.page = ["add", sliderLeft];
        };
    };
};

app.component.pageTurner.func.set.startPage = ()=>{
    let appWidth = document.querySelector(".app").getBoundingClientRect().width;
    if( app.component.item.objs.length > 0){ // there are items, so start on viewPage
        let sliderLeft = -1 * appWidth;
        app.component.pageTurner.setting.page = ["view", sliderLeft];
    }
    else{ // no items, start on add page
        let sliderLeft = 0;
        app.component.pageTurner.setting.page = ["add", sliderLeft];
    };
};
