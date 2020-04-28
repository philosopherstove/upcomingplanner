app.component.pageTurner = {};
app.component.pageTurner.setting = {};
app.component.pageTurner.setting.pvtr        = app.func.calc.b([.3,.8,.5,.9]);
app.component.pageTurner.setting.startXPx    = null;
app.component.pageTurner.setting.currentXPx  = null;
app.component.pageTurner.setting.startLeftPx = null;
app.component.pageTurner.setting.startWidth  = null;
app.component.pageTurner.state = {};
app.component.pageTurner.state.active = [false, false, null];
app.component.pageTurner.state.preventClick = false;
app.component.pageTurner.func = {};
app.component.pageTurner.func.anim  = {};
app.component.pageTurner.func.event = {};
app.component.pageTurner.func.get   = {};
app.component.pageTurner.func.give  = {};
app.component.pageTurner.func.init  = {};

/*
func hotkeys:
ANIM
app.component.pageTurner.func.anim.slider_toPosition = (tTotal, elem, sPos, fPos)=>{
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
            clearInterval(check);
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
// if(app.component.pageTurner.state.active[1] === false){
//     let currLeft = app.component.pageTurner.func.get.appLeftPx();
//     let slider = document.querySelector(".slider");
//         slider.style.left = `${currLeft}px`;
//     cancelAnimationFrame(animId);
// };
            animId = requestAnimationFrame(animate);
        };
    };
    let tStart = Date.now();
    let tFinal = tStart + tTotal;
    let animId;
    animate();

    let check = setInterval(()=>{
        console.log('i');
        if(app.component.pageTurner.state.active[1] === false){
            console.log('NEW');
            let currLeft = app.component.pageTurner.func.get.appLeftPx();
            let slider = document.querySelector(".slider");
                slider.style.left = `${currLeft}px`;
            cancelAnimationFrame(animId);
            clearInterval(check);
        };

    },1);

};

/****
EVENT
*****/
app.component.pageTurner.func.event.userDown = ()=>{
    // event.stopPropagation();
    // event.preventDefault();
    let appElement = document.querySelector(".app");
    if( app.component.pageTurner.state.active[0] === false){
        if( app.func.is.point_withinElement([event.clientX, event.clientY], document.querySelector(".footer")) === true ){
            return; /* if user down within footer */
        };

        // console.log("DOWN");

        // app.component.pageTurner.state.active[0]     = true;
        // app.component.pageTurner.state.active[1]     = false;

        app.component.pageTurner.setting.startLeftPx = app.component.pageTurner.func.get.appLeftPx(); // ui set-up with %. This converts to px.
        app.component.pageTurner.setting.startWidth  = appElement.getBoundingClientRect().width;
        app.component.pageTurner.setting.startXPx    = event.clientX;
        if(app.component.pageTurner.setting.startXPx == undefined){ // event.clientX undefined on touch devices. So then use event.touches[0].clientX
            app.component.pageTurner.setting.startXPx = event.touches[0].clientX;
            console.log('better', app.component.pageTurner.setting.startXPx);
        };
        let slider = document.querySelector(".slider");
            slider.style.left = `${app.component.pageTurner.setting.startLeftPx}px`; // sets initial left to converted px.
            slider.classList.remove("sliderTrans");

        console.log("startLeftPx", app.component.pageTurner.setting.startLeftPx);
        console.log("startXPx", app.component.pageTurner.setting.startXPx);

        app.component.pageTurner.state.active[0]     = true;
        app.component.pageTurner.state.active[1]     = false;
    };
};

app.component.pageTurner.func.event.userMove = ()=>{
    // event.stopPropagation();
    // event.preventDefault();
    if( app.component.pageTurner.state.active[0] === true){
        // console.log("MOVE");
        app.component.pageTurner.state.preventClick = true;
        app.component.pageTurner.setting.currentXPx = event.clientX;
        let pxDifference      = app.component.pageTurner.setting.currentXPx - app.component.pageTurner.setting.startXPx;
        let newLeft           = app.component.pageTurner.setting.startLeftPx + pxDifference;

        // console.log('new left', newLeft);

        let slider            = document.querySelector(".slider");
            slider.style.left = `${newLeft}px`;
    };
};

app.component.pageTurner.func.event.userUp = ()=>{
    // event.stopPropagation();
    // event.preventDefault();
    if( app.component.pageTurner.state.active[0] === true){
        // console.log("UP");
        app.component.pageTurner.state.active[0] = false;
        app.component.pageTurner.state.active[1] = true;
        let tTotal = 320;
        let slider = document.querySelector(".slider");
        let sPos   = Number(slider.style.left.split("p")[0]);
        let fPos   = app.component.pageTurner.setting.startLeftPx; // put back to start. Later need px for add or view page.
        app.component.pageTurner.func.anim.slider_toPosition(tTotal, slider, sPos, fPos);
        let waitUntilTransitionFinished = setTimeout(()=>{
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

        // appElement.addEventListener("mousedown", ()=>{
        //     event.stopPropagation();
        //     if( app.component.pageTurner.state.active[0] === false){
        //         if( app.func.is.point_withinElement([event.clientX, event.clientY], document.querySelector(".footer")) === true ){
        //             return; /* if user down within footer */
        //         };
        //
        //         // console.log("DOWN");
        //
        //         // app.component.pageTurner.state.active[0]     = true;
        //         // app.component.pageTurner.state.active[1]     = false;
        //
        //         app.component.pageTurner.setting.startLeftPx = app.component.pageTurner.func.get.appLeftPx(); // ui set-up with %. This converts to px.
        //         app.component.pageTurner.setting.startWidth  = appElement.getBoundingClientRect().width;
        //         app.component.pageTurner.setting.startXPx    = event.clientX;
        //         let slider = document.querySelector(".slider");
        //             slider.style.left = `${app.component.pageTurner.setting.startLeftPx}px`; // sets initial left to converted px.
        //             slider.classList.remove("sliderTrans");
        //
        //         console.log("startLeftPx", app.component.pageTurner.setting.startLeftPx);
        //         console.log("startXPx", app.component.pageTurner.setting.startXPx);
        //
        //         app.component.pageTurner.state.active[0]     = true;
        //         app.component.pageTurner.state.active[1]     = false;
        //     };
        // });
        appElement.addEventListener("mousedown", app.component.pageTurner.func.event.userDown);
        appElement.addEventListener("touchstart", app.component.pageTurner.func.event.userDown);

        // appElement.addEventListener("mousemove", ()=>{
        //     event.stopPropagation();
        //     if( app.component.pageTurner.state.active[0] === true){
        //         // console.log("MOVE");
        //         app.component.pageTurner.state.preventClick = true;
        //         app.component.pageTurner.setting.currentXPx = event.clientX;
        //         let pxDifference      = app.component.pageTurner.setting.currentXPx - app.component.pageTurner.setting.startXPx;
        //         let newLeft           = app.component.pageTurner.setting.startLeftPx + pxDifference;
        //
        //         // console.log('new left', newLeft);
        //
        //         let slider            = document.querySelector(".slider");
        //             slider.style.left = `${newLeft}px`;
        //     };
        // });
        appElement.addEventListener("mousemove", app.component.pageTurner.func.event.userMove);
        appElement.addEventListener("touchmove", app.component.pageTurner.func.event.userMove);

        // appElement.addEventListener("mouseup", ()=>{
        //     event.stopPropagation();
        //     if( app.component.pageTurner.state.active[0] === true){
        //         // console.log("UP");
        //         app.component.pageTurner.state.active[0] = false;
        //         app.component.pageTurner.state.active[1] = true;
        //         let tTotal = 320;
        //         let slider = document.querySelector(".slider");
        //         let sPos   = Number(slider.style.left.split("p")[0]);
        //         let fPos   = app.component.pageTurner.setting.startLeftPx; // put back to start. Later need px for add or view page.
        //         app.component.pageTurner.func.anim.slider_toPosition(tTotal, slider, sPos, fPos);
        //         let waitUntilTransitionFinished = setTimeout(()=>{
        //             slider.classList.add("sliderTrans");
        //             app.component.pageTurner.state.preventClick = false;
        //         },tTotal);
        //     };
        // });
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
};
