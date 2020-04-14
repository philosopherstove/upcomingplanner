app.component.dayDropper = {};
app.component.dayDropper.setting = {};
app.component.dayDropper.setting.day = null;
app.component.dayDropper.state = {};
app.component.dayDropper.state.open = [false, false, null];
app.component.dayDropper.func = {};
app.component.dayDropper.func.createAppend = {};
app.component.dayDropper.func.get          = {};
app.component.dayDropper.func.give         = {};
app.component.dayDropper.func.init         = {};
app.component.dayDropper.func.remove       = {};
app.component.dayDropper.func.set          = {};
app.component.dayDropper.func.transition   = {};

/* func hotkeys:
CREATEAPPEND
app.component.dayDropper.func.createAppend.blurTile = ()=>{
app.component.dayDropper.func.createAppend.dayDropperText = (ms)=>{
app.component.dayDropper.func.createAppend.dayDropperText_day = (dayText)=>{
app.component.dayDropper.func.createAppend.dayDropperText_info = async(dayId)=>{
app.component.dayDropper.func.createAppend.htmlInsideDropdown = async()=>{
GET
app.component.dayDropper.func.get.day = (ms)=>{
app.component.dayDropper.func.get.daysUntilString = (ms)=>{
app.component.dayDropper.func.get.dropdownHighlightClass = (numberOfItemsForDayString)=>{
app.component.dayDropper.func.get.numberOfItemsForDayString = (ms)=>{
GIVE
app.component.dayDropper.func.give.closeDropdownListener_to_body = ()=>{
app.component.dayDropper.func.give.closedBorder_to_dropdownMenu = ()=>{
app.component.dayDropper.func.give.closedHeight_to_dropdownMenu = ()=>{
app.component.dayDropper.func.give.closedHeight_to_dropdownMenuScrollBar = ()=>{
app.component.dayDropper.func.give.openBorder_to_dropdowMenu = ()=>{
app.component.dayDropper.func.give.openHeight_to_dropdownMenu = ()=>{
app.component.dayDropper.func.give.openHeight_to_dropdownMenuScrollBar = ()=>{
app.component.dayDropper.func.give.height_to_scrollBall = ()=>{
app.component.dayDropper.func.give.scrollListener_to_dropdownMenu = ()=>{
app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
app.component.dayDropper.func.give.zIndex2_to_dropper = ()=>{
INIT
app.component.dayDropper.func.init.component = ()=>{
REMOVE
app.component.dayDropper.func.remove.blurTile = ()=>{
app.component.dayDropper.func.remove.zIndex2_from_dropper = ()=>{
SET
app.component.dayDropper.func.set.day = async(dayDropperDayElement)=>{
TRANSITION
app.component.dayDropper.func.transition.closeDropdown = async()=>{
app.component.dayDropper.func.transition.openDropdown = ()=>{
*/

/***********
CREATEAPPEND
************/
app.component.dayDropper.func.createAppend.blurTile = ()=>{
    let html = `<div class="blurTile" onclick="app.component.dayDropper.func.transition.closeDropdown()"></div>`;
    let addPage = document.querySelector(".addPage");
        addPage.insertAdjacentHTML("afterbegin", html);
};

app.component.dayDropper.func.createAppend.dayDropperText = (ms)=>{
    let day     = app.component.dayDropper.func.get.day(ms);
    let dayId   = day[0];
    let dayText = day[1];
    app.component.dayDropper.func.createAppend.dayDropperText_day(dayText);
    app.component.dayDropper.func.createAppend.dayDropperText_info(dayId);
};

app.component.dayDropper.func.createAppend.dayDropperText_day = (dayText)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = dayText;
};

app.component.dayDropper.func.createAppend.dayDropperText_info = async(dayId)=>{
    let numberOfItemsForDayString     = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayId);
    let daysUntilString               = app.component.dayDropper.func.get.daysUntilString(dayId);
    let items_daysCountdown           = document.querySelector(".items_daysCountdown");
        items_daysCountdown.innerHTML = `${numberOfItemsForDayString}${daysUntilString}`;
};

app.component.dayDropper.func.createAppend.htmlInsideDropdown = async()=>{
    let startOfDay_ms  = app.component.dayDropper.func.get.day()[0];
    let incr_ms        = startOfDay_ms;
    let html           = "";
    let lookAheadRange = 365; // 1 year
    let msInADay       = 86400000;
    for(let i = 0; i < lookAheadRange; i++){ // year loop
        let dateString                = `${new Date(incr_ms)}`;
        let splits                    = dateString.split(" ");
        let month                     = splits[1];
        let dayName                   = splits[0];
        let dayNum                    = splits[2];
        let day_text                  = `${dayName} ${month} ${dayNum}`;
        let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(incr_ms);
        let dropdownHighlightClass    = app.component.dayDropper.func.get.dropdownHighlightClass(numberOfItemsForDayString);
        let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(incr_ms);
        let html_piece = `
            <p dayId="${incr_ms}" day_text="${day_text}" class="${dropdownHighlightClass}" onclick="app.component.dayDropper.func.set.day(this)">
                <span class="dd_date">
                    <span>${dayName}</span>
                    <span>${month}</span>
                    <span>${dayNum}</span>
                </span>
                <span class="dd_info">
                    <span">(${numberOfItemsForDayString}${daysUntilString})</span>
                </span>
            </p>
        `;
        html    += html_piece;
        incr_ms += msInADay;
        if( i === lookAheadRange - 1){ // end of loop
            let dropdownMenuInnerWrapper = document.querySelector(".dropdownMenu_innerWrapper");
                dropdownMenuInnerWrapper.innerHTML = "";
                dropdownMenuInnerWrapper.insertAdjacentHTML("beforeend", html);
        };
    };
};

/**
GET
***/
/*
Will return day as an array: [ ms(startOfDay), `${dayName} ${month} ${dayNum}` ].
If pass-in ms, will return for passed in day, otherwise, will do for current day.
*/
app.component.dayDropper.func.get.day = (ms)=>{
    let now_dateString;
    if( ms === undefined){
        now_dateString  = new Date();
    }
    else{
        now_dateString  = new Date(ms);
    };
    let startOfDay_text = new Date(now_dateString.getFullYear(), now_dateString.getMonth(), now_dateString.getDate());
        startOfDay_text = startOfDay_text.toString();
    let startOfDay_ms   = Date.parse(startOfDay_text);
    let splits          = startOfDay_text.split(" ");
    let month           = splits[1];
    let dayName         = splits[0];
    let dayNum          = splits[2];
    let day_text        = `${dayName} ${month} ${dayNum}`;
    return [startOfDay_ms, day_text];
};

app.component.dayDropper.func.get.daysUntilString = (ms)=>{
    let msInADay  = 86400000;
    let todayMS   = app.component.dayDropper.func.get.day()[0];
    let daysUntil = Math.round( (ms-todayMS)/msInADay );
    let daysUntilString;
    if( daysUntil === 0){
        daysUntilString = `today`;
    }
    else
    if( daysUntil === 1){
        daysUntilString = `in 1 day`;
    }
    else{
        daysUntilString = `in ${daysUntil} days`;
    };
    return daysUntilString;
};

app.component.dayDropper.func.get.dropdownHighlightClass = (numberOfItemsForDayString)=>{
    let dropdownHighlightClass = "";
    if( numberOfItemsForDayString.length > 0){
        dropdownHighlightClass = "dropdownItemHighlight";
    };
    return dropdownHighlightClass;
};

app.component.dayDropper.func.get.numberOfItemsForDayString = (ms)=>{
    return new Promise((resolve)=>{
        if( app.component.item.objs.length === 0){
            let numberOfItemsForDayString = "";
            resolve(numberOfItemsForDayString);
        }
        else{
            let numberOfItems = 0;
            for(i in app.component.item.objs){
                let obj = app.component.item.objs[i];
                if( obj.associated.day === ms){
                    numberOfItems++;
                };
                if( Number(i) === app.component.item.objs.length -1){ // end of loop
                    let numberOfItemsForDayString;
                    if( numberOfItems === 0){
                        numberOfItemsForDayString = "";
                    }
                    else
                    if( numberOfItems === 1){ // 1 item grammar
                        numberOfItemsForDayString = `${numberOfItems} item - `;
                    }
                    else{
                        numberOfItemsForDayString = `${numberOfItems} items - `;
                    };
                    resolve(numberOfItemsForDayString);
                };
            };
        }
    });
};

/***
GIVE
****/
app.component.dayDropper.func.give.closeDropdownListener_to_body = ()=>{
    let docBody = document.body;
        docBody.addEventListener('click', ()=>{
            app.component.dayDropper.func.transition.closeDropdown();
        });
};

app.component.dayDropper.func.give.closedBorder_to_dropdownMenu = ()=>{
    return new Promise((resolve)=>{
        let waitForHeightTransitionToFinish = setTimeout(()=>{
            let dropdownMenu = document.querySelector(".dropdownMenu_day");
                dropdownMenu.classList.add("closedBorder");
                dropdownMenu.classList.remove("openBorder");
            resolve();
        },200);
    });
};

app.component.dayDropper.func.give.closedHeight_to_dropdownMenu = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.classList.add("closedHeight");
        dropdownMenu.classList.remove("openHeight");
};

app.component.dayDropper.func.give.closedHeight_to_dropdownMenuScrollBar = ()=>{
    let scrollBar = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.classList.add("closedHeight");
        scrollBar.classList.remove("openHeight");
};

app.component.dayDropper.func.give.openBorder_to_dropdowMenu = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.classList.add("openBorder");
        dropdownMenu.classList.remove("closedBorder");
};

app.component.dayDropper.func.give.openHeight_to_dropdownMenu = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.classList.add("openHeight");
        dropdownMenu.classList.remove("closedHeight");
};

app.component.dayDropper.func.give.openHeight_to_dropdownMenuScrollBar = ()=>{
    let scrollBar = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.classList.add("openHeight");
        scrollBar.classList.remove("closedHeight");
};

app.component.dayDropper.func.give.height_to_scrollBall = ()=>{
    let height_noOverflow   = 390;
    let height_withOverflow = 17155;
    let barHeight           = 380;
    let heightRatio         = (height_noOverflow / height_withOverflow) * (barHeight / height_noOverflow);
    let ballHeight          = Math.ceil( (barHeight * heightRatio) * (barHeight / height_noOverflow) );
    let ball                = document.querySelector(".dropdownMenu_day .scrollBall");
        ball.style.height   = `${ballHeight}px`;
        ball.setAttribute('heightRatio', heightRatio);
};

app.component.dayDropper.func.give.scrollListener_to_dropdownMenu = ()=>{
    let dropdownMenu_day = document.querySelector(".dropdownMenu_day");
        dropdownMenu_day.addEventListener("scroll", ()=>{
            let scrollTop            = event.srcElement.scrollTop;
            let ball                 = document.querySelector(".dropdownMenu_day .scrollBall");
                ballHeightRatio      = ball.getAttribute("heightRatio");
                ball.style.marginTop = `${scrollTop * ballHeightRatio}px`;
        });
};

app.component.dayDropper.func.give.scrollTopDefault_to_dropdownMenu = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.scrollTop = 0;
};

app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = day_text;
};

app.component.dayDropper.func.give.zIndex2_to_dropper = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.add("zIndex2");
};

/***
INIT
****/
/*
One might expect to find the following functions in the dayDropper initialization:
- app.component.dayDropper.func.createAppend.dayDropperText()
- app.component.dayDropper.func.createAppend.htmlInsideDropdown()
The firing of these functions is deferred to the item component initialization.
The reason is because the dayDropperText and htmlInsideDropdown need to be aware of the items to be set properly.
Also, one cannot simply initialize the dayDropper after the item component because the item component has initial functions that need to be aware of the day.
Either way, there is a catch-22 between these two components.
*/
app.component.dayDropper.func.init.component = ()=>{
    app.component.dayDropper.func.give.closeDropdownListener_to_body();
    app.component.dayDropper.func.give.height_to_scrollBall();
    app.component.dayDropper.func.give.scrollListener_to_dropdownMenu();
    app.component.dayDropper.setting.day = app.component.dayDropper.func.get.day();
};

/*****
REMOVE
******/
app.component.dayDropper.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.remove();
};

app.component.dayDropper.func.remove.zIndex2_from_dropper = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.remove("zIndex2");
};

/**
SET
***/
app.component.dayDropper.func.set.day = async(dayDropperDayElement)=>{
    let day_ms   = Number(dayDropperDayElement.getAttribute("dayId"));
    let day_text = dayDropperDayElement.getAttribute("day_text");
    app.component.dayDropper.setting.day = [day_ms, day_text];
    app.component.dayDropper.func.createAppend.dayDropperText(day_ms);
    app.component.timeSlot.func.remove.timeSlotsDivElement();       // remove - old timeSlots
    await app.component.timeSlot.func.createAppend.timeSlots();     // createAppend - new timeSlots
    await app.component.item.func.createAppend.itemsForDay(day_ms); // must happen after createAppend.timeSlots()
    app.component.timeSlot.func.give.height_to_scrollBall();        // must happen after createAppend.itemsForDay(). timeSlots with items have a larger height than timeSlots without, thus need to calculate different scrollBall height based on number of number of items for the given day
};

/*********
TRANSITION
**********/
app.component.dayDropper.func.transition.closeDropdown = async()=>{
    if( app.component.dayDropper.state.open[0] === true
    &&  app.component.dayDropper.state.open[1] === false){
        event.stopPropagation();
        app.component.dayDropper.state.open[1] = true; // turn transitioning bool ON
        app.component.dayDropper.func.give.closedHeight_to_dropdownMenu();
        app.component.dayDropper.func.give.closedHeight_to_dropdownMenuScrollBar();
        app.component.dayDropper.func.remove.blurTile();
        app.component.dayDropper.func.remove.zIndex2_from_dropper();
        app.component.dayDropper.func.give.closedBorder_to_dropdownMenu()
        .then(()=>{
            app.component.dayDropper.state.open[0] = false; // turn open state OFF
            app.component.dayDropper.state.open[1] = false; // turn transitioning bool OFF
        });
    };
};

app.component.dayDropper.func.transition.openDropdown = ()=>{
    if( app.component.dayDropper.state.open[0] === false
    &&  app.component.dayDropper.state.open[1] === false){
        event.stopPropagation();
        app.component.dayDropper.state.open[1] = true; // turn transitioning bool ON
        app.component.dayDropper.func.createAppend.blurTile();
        app.component.dayDropper.func.give.openBorder_to_dropdowMenu();
        app.component.dayDropper.func.give.openHeight_to_dropdownMenu();
        app.component.dayDropper.func.give.openHeight_to_dropdownMenuScrollBar();
        app.component.dayDropper.func.give.scrollTopDefault_to_dropdownMenu();
        app.component.dayDropper.func.give.zIndex2_to_dropper();
        app.component.dayDropper.state.open[0] = true;  // turn open state bool ON
        app.component.dayDropper.state.open[1] = false; // turn transition bool OFF
    };
};
