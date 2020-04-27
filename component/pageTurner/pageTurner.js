app.component.pageTurner = {};
app.component.pageTurner.elem = {};
app.component.pageTurner.elem.pagesSlide = document.querySelector(".pagesSlide");
app.component.pageTurner.setting = {};
app.component.pageTurner.setting.pvtr        = app.func.calc.b([.3,.8,.5,.9]);
app.component.pageTurner.setting.startXPx    = null;
app.component.pageTurner.setting.currentXPx  = null;
app.component.pageTurner.setting.startLeftPx = null;
app.component.pageTurner.setting.startWidth  = null;
app.component.pageTurner.state = {};
app.component.pageTurner.state.active = [false, false, null];
app.component.pageTurner.func = {};
app.component.pageTurner.func.anim = {};
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

/***
ANIM
****/
app.component.pageTurner.func.anim.pagesSlide_toPosition = (tTotal, elem, sPos, fPos)=>{
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
};

/**
GET
***/
app.component.pageTurner.func.get.appLeftPx = ()=>{
    let appElement = document.querySelector(".app");
    let pxWidth    = appElement.getBoundingClientRect().width;
    if(app.component.pageTurner.elem.pagesSlide.style.left[app.component.pageTurner.elem.pagesSlide.style.left.length-1] === "%"){
        let leftPercent = Number(app.component.pageTurner.elem.pagesSlide.style.left.split("%")[0]);
        let leftRatio   = leftPercent / 100;
        let leftPx      = pxWidth * leftRatio;
        return leftPx;
    }
    else{
        let leftPx = Number(app.component.pageTurner.elem.pagesSlide.style.left.split("p")[0]);
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
            if( app.func.is.point_withinElement([event.clientX, event.clientY], document.querySelector(".footer")) === true ){
                return; /* if user down within footer */
            };
            app.component.pageTurner.setting.startXPx    = event.clientX;
            app.component.pageTurner.state.active[0]     = true;
            app.component.pageTurner.setting.startLeftPx = app.component.pageTurner.func.get.appLeftPx();
            app.component.pageTurner.elem.pagesSlide.style.left = `${app.component.pageTurner.setting.startLeftPx}px`;
            app.component.pageTurner.setting.startWidth  = appElement.getBoundingClientRect().width;
        });

        appElement.addEventListener("mousemove", ()=>{
            event.stopPropagation();
            if( app.component.pageTurner.state.active[0] === true){
                console.log("MOVE");
                app.component.pageTurner.setting.currentXPx = event.clientX;
                let pxDifference = app.component.pageTurner.setting.currentXPx - app.component.pageTurner.setting.startXPx;
                let newLeft = app.component.pageTurner.setting.startLeftPx + pxDifference;
                app.component.pageTurner.elem.pagesSlide.style.left = `${newLeft}px`;
            };
        });

        appElement.addEventListener("mouseup", ()=>{
            event.stopPropagation();
            if( app.component.pageTurner.state.active[0] === true){
                app.component.pageTurner.state.active[0] = false;
                let tTotal = 320;
                let elem   = app.component.pageTurner.elem.pagesSlide;
                let sPos   = Number(app.component.pageTurner.elem.pagesSlide.style.left.split("p")[0]);
                let fPos   = app.component.pageTurner.setting.startLeftPx; // put back to start -414px
                app.component.pageTurner.func.anim.pagesSlide_toPosition(tTotal, elem, sPos, fPos);
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
