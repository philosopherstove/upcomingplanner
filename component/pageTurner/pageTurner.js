app.component.pageTurner = {};
app.component.pageTurner.setting = {};
app.component.pageTurner.setting.page                   = [null, null];
app.component.pageTurner.setting.pvtr                   = app.func.calc.b([0,1,0.5,1]);
app.component.pageTurner.setting.startUserX             = null;
app.component.pageTurner.setting.currentUserX           = null;
app.component.pageTurner.setting.startLeftPx            = null;
app.component.pageTurner.setting.timeout_sliderTransEnd = null;
app.component.pageTurner.setting.swipeStartTime         = null;
app.component.pageTurner.state = {};
app.component.pageTurner.state.active       = [false, false, null];
app.component.pageTurner.state.preventClick = false;
app.component.pageTurner.func = {};
app.component.pageTurner.func.anim  = {};
app.component.pageTurner.func.event = {};
app.component.pageTurner.func.get   = {};
app.component.pageTurner.func.give  = {};
app.component.pageTurner.func.init  = {};
app.component.pageTurner.func.is    = {};
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
app.component.pageTurner.func.get.sliderLeftPx = ()=>{
GIVE
app.component.pageTurner.func.give.addPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.addPageButton_onPageAttributes = ()=>{
app.component.pageTurner.func.give.app_pageTurnerGestureListeners = ()=>{
app.component.pageTurner.func.give.footerButtons_pageAppropriateAttributes = ()=>{
app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners = ()=>{
app.component.pageTurner.func.give.slider_addPageAttributes = ()=>{
app.component.pageTurner.func.give.slider_swipeLock = ()=>{
app.component.pageTurner.func.give.slider_viewPageAttributes = ()=>{
app.component.pageTurner.func.give.timeSlots_scrollListener = ()=>{
app.component.pageTurner.func.give.viewPageButton_offPageAttributes = ()=>{
app.component.pageTurner.func.give.viewPageButton_onPageAttributes = ()=>{
INIT
app.component.pageTurner.func.init.component = ()=>{
IS
app.component.pageTurner.func.is.eventWithinFooter = (e)=>{
app.component.pageTurner.func.is.flickThresholdMet = (pxDifference, distanceThreshold)=>{
app.component.pageTurner.func.is.swipeDistanceThresholdMet = (pxDifference, threshold)=>{
SET
app.component.pageTurner.func.set.page = ()=>{
app.component.pageTurner.func.set.page_asReverse = ()=>{
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
        if( app.component.pageTurner.state.active[1] === false){
            let currLeft = app.component.pageTurner.func.get.sliderLeftPx();
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
        if( app.component.pageTurner.func.is.eventWithinFooter(event) === true
        ||  app.component.dayDropper.state.open[0] === true
        ||  app.component.item.state.selected[0] === true){
            return;
        };
        app.component.pageTurner.setting.swipeStartTime = Date.now();
        app.component.pageTurner.setting.startLeftPx = app.component.pageTurner.func.get.sliderLeftPx(); // ui set-up with %. This converts to px.
        app.component.pageTurner.setting.startUserX    = event.clientX;
        if( event.clientX == undefined){ // event.clientX undefined on touch devices. So then use event.touches[0].clientX
            app.component.pageTurner.setting.startUserX = event.touches[0].clientX;
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
        app.component.pageTurner.setting.currentUserX = event.clientX;
        if( event.clientX == undefined){
            app.component.pageTurner.setting.currentUserX = event.touches[0].clientX;
        };
        let pxDifference = app.component.pageTurner.setting.currentUserX - app.component.pageTurner.setting.startUserX;
        if( app.component.pageTurner.func.is.swipeDistanceThresholdMet(pxDifference, 10) === false){
            return; /* Need to exceed 10px threshold to continue executing slower swipe. This as well as state shutoffs and forceful position set in scrollListeners smoothly prevents vertical scrolling and horizontal swiping from happening at the same time. */
        };
        let newLeft           = app.component.pageTurner.setting.startLeftPx + pxDifference;
        let slider            = document.querySelector(".slider");
            slider.style.left = `${newLeft}px`;
        app.component.pageTurner.state.preventClick = true;
    };
};

app.component.pageTurner.func.event.userUp = ()=>{
    if( app.component.pageTurner.state.active[0] === true){
        app.component.pageTurner.state.active[0] = false;
        app.component.pageTurner.state.active[1] = true;
        app.component.pageTurner.setting.currentUserX = event.clientX;
        if( event.clientX == undefined){
            app.component.pageTurner.setting.currentUserX = event.changedTouches[0].clientX;
        };
        let pxDifference = app.component.pageTurner.setting.currentUserX - app.component.pageTurner.setting.startUserX;
        let fPos = null;
        if( app.component.pageTurner.func.is.flickThresholdMet(pxDifference, 10) === true){
            app.component.pageTurner.func.set.page_asReverse();
            app.component.pageTurner.func.give.footerButtons_pageAppropriateAttributes();
            fPos = app.component.pageTurner.setting.page[1]; // set page first

        }
        else{
            app.component.pageTurner.func.set.page();
            app.component.pageTurner.func.give.footerButtons_pageAppropriateAttributes();
            fPos = app.component.pageTurner.setting.page[1]; // set page first
        };
        let tTotal = 300;
        let slider = document.querySelector(".slider");
        let sPos   = Number(slider.style.left.split("p")[0]);
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
app.component.pageTurner.func.get.sliderLeftPx = ()=>{
    let appElement = document.querySelector(".app");
    let appPxWidth = appElement.getBoundingClientRect().width;
    let slider     = document.querySelector(".slider");
    if( slider.style.left[slider.style.left.length-1] === "%"){ // app starts with % units for left. First conditional checks for this and converts to px.
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

app.component.pageTurner.func.give.footerButtons_pageAppropriateAttributes = ()=>{
    if( app.component.pageTurner.setting.page[0] === "add"){
        app.component.pageTurner.func.give.addPageButton_onPageAttributes();
        app.component.pageTurner.func.give.viewPageButton_offPageAttributes();
    }
    else
    if( app.component.pageTurner.setting.page[0] === "view"){
        app.component.pageTurner.func.give.addPageButton_offPageAttributes();
        app.component.pageTurner.func.give.viewPageButton_onPageAttributes();
    };
};

app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners = ()=>{
    let addPageButton = document.querySelector(".addPageButton");
        addPageButton.addEventListener("click", ()=>{
            app.component.pageTurner.func.give.slider_addPageAttributes();
            app.component.pageTurner.func.give.addPageButton_onPageAttributes();
            app.component.pageTurner.func.give.viewPageButton_offPageAttributes();
            let wait_sliderTrans = setTimeout(()=>{
                app.component.pageTurner.func.set.page();
            },300);

        });
    let viewPageButton = document.querySelector(".viewPageButton");
        viewPageButton.addEventListener("click", ()=>{
            app.component.pageTurner.func.give.slider_viewPageAttributes();
            app.component.pageTurner.func.give.addPageButton_offPageAttributes();
            app.component.pageTurner.func.give.viewPageButton_onPageAttributes();
            let wait_sliderTrans = setTimeout(()=>{
                app.component.pageTurner.func.set.page();
            },300);
        });
};

app.component.pageTurner.func.give.slider_addPageAttributes = ()=>{
    let slider = document.querySelector(".slider");
        slider.style.left = "0%";
};

app.component.pageTurner.func.give.slider_swipeLock = ()=>{
    app.component.pageTurner.state.active[0] = false;
    app.component.pageTurner.state.active[1] = false;
    let slider = document.querySelector(".slider");
        slider.style.left = `${app.component.pageTurner.setting.page[1]}px`;
};
// given to timeSlots on pageTurner init
// given to viewItemsWrapper in 2 cases where viewItemsWrapper is formed in item.js(append of view items on init or creation of a first item)

app.component.pageTurner.func.give.slider_viewPageAttributes = ()=>{
    let slider = document.querySelector(".slider");
        slider.style.left = "-100%";
};

app.component.pageTurner.func.give.timeSlots_scrollListener = ()=>{
    let timeSlots = document.querySelector(".timeSlots");
        timeSlots.addEventListener("scroll", app.component.pageTurner.func.give.slider_swipeLock);
};
// fires on load via timeSlots scroll. timeSlots scroll is set to a particular position on init.

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

/***
INIT
****/
app.component.pageTurner.func.init.component = ()=>{
    app.component.pageTurner.func.give.app_pageTurnerGestureListeners();
    app.component.pageTurner.func.give.footerButtons_pageTurnerClickListeners();
    app.component.pageTurner.func.give.timeSlots_scrollListener();
    app.component.pageTurner.func.set.startPage();
};

/*
IS
**/
app.component.pageTurner.func.is.eventWithinFooter = (e)=>{
    if( app.func.is.point_withinElement([e.clientX, e.clientY], document.querySelector(".footer")) === true
    || (event.touches !== undefined &&
        app.func.is.point_withinElement([e.touches[0].clientX, e.touches[0].clientY], document.querySelector(".footer")) === true) ){
        return true;
    }
    else{
        return false
    };
};

app.component.pageTurner.func.is.flickThresholdMet = (pxDifference, distanceThreshold)=>{
    if( app.component.pageTurner.func.is.swipeDistanceThresholdMet(pxDifference, distanceThreshold) === true){
        if( app.component.pageTurner.setting.page[0] === "add" &&
            pxDifference < 0 // positive = swipe to go right
        ||  app.component.pageTurner.setting.page[0] === "view" &&
            pxDifference > 0 // negative = swipe to go left
        ){
            let timeThreshold     = 250;
            let timeNow           = Date.now();
            let timeDifference    = timeNow - app.component.pageTurner.setting.swipeStartTime;
            if( pxDifference < 0){
                pxDifference = -1 * pxDifference; // convert negative to positive
            };
            if( timeDifference < timeThreshold
            &&  pxDifference > distanceThreshold){
                return true;
            }
            else{
                return false;
            };
        };
    };
};

app.component.pageTurner.func.is.swipeDistanceThresholdMet = (pxDifference, threshold)=>{
    let setLeft   = app.component.pageTurner.setting.page[1];
    if((setLeft + pxDifference < setLeft &&
        setLeft + pxDifference > setLeft - threshold)
    || (setLeft + pxDifference > setLeft &&
        setLeft + pxDifference < setLeft + threshold)){
        return false;
    }
    else{
        return true;
    };
};

/**
SET
***/
app.component.pageTurner.func.set.page = ()=>{
    let appWidth    = document.querySelector(".app").getBoundingClientRect().width;
    let currentLeft = app.component.pageTurner.func.get.sliderLeftPx();
    if( app.component.pageTurner.setting.page[0] === "add"){
        if( currentLeft < (-1 * appWidth * 0.25) ){ // currentLeft is greater than what slider would be if start on addPage and dragged 20% negative(pulling viewPage into view)
            let sliderLeft = -1 * appWidth;
            app.component.pageTurner.setting.page = ["view", sliderLeft];
        };
    }
    else
    if( app.component.pageTurner.setting.page[0] === "view"){
        if( currentLeft > (-1 * appWidth * 0.75) ){
            let sliderLeft = 0;
            app.component.pageTurner.setting.page = ["add", sliderLeft];
        };
    };
};

app.component.pageTurner.func.set.page_asReverse = ()=>{
    let appWidth = document.querySelector(".app").getBoundingClientRect().width;
    if( app.component.pageTurner.setting.page[0] === "add"){
        let sliderLeft = -1 * appWidth;
        app.component.pageTurner.setting.page = ["view", sliderLeft]
    }
    else
    if( app.component.pageTurner.setting.page[0] === "view"){
        let sliderLeft = 0;
        app.component.pageTurner.setting.page = ["add", sliderLeft];
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
