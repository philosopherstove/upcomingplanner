app.component.dayDropper = {};
app.component.dayDropper.setting = {};
app.component.dayDropper.setting.day = null;
app.component.dayDropper.state = {};
app.component.dayDropper.state.open = [false, false, null];
app.component.dayDropper.func = {};
app.component.dayDropper.func.get          = {};
app.component.dayDropper.func.give         = {};
app.component.dayDropper.func.init         = {};
app.component.dayDropper.func.makeAppend   = {};
app.component.dayDropper.func.remove       = {};
app.component.dayDropper.func.set          = {};
app.component.dayDropper.func.transition   = {};

/* func hotkeys:
GET
app.component.dayDropper.func.get.day = (ms)=>{
app.component.dayDropper.func.get.daysUntilString = (ms)=>{
app.component.dayDropper.func.get.dropdownHighlightClass = (numberOfItemsForDayString)=>{
app.component.dayDropper.func.get.numberOfItemsForDayString = (ms)=>{
GIVE
app.component.dayDropper.func.give.body_closingDropdownListener = ()=>{
app.component.dayDropper.func.give.dropper_openAttributes = ()=>{
app.component.dayDropper.func.give.dropper_closedAttributes = ()=>{
app.component.dayDropper.func.give.menu_closedAttributes = ()=>{
app.component.dayDropper.func.give.menu_openAttributes = ()=>{
app.component.dayDropper.func.give.menu_scrollListener = ()=>{
app.component.dayDropper.func.give.menu_scrollTopDefault = ()=>{
app.component.dayDropper.func.give.scrollBall_heightAttributes = ()=>{
app.component.dayDropper.func.give.scrollBar_closedAttributes = ()=>{
app.component.dayDropper.func.give.scrollBar_openAttributes = ()=>{
INIT
app.component.dayDropper.func.init.component = ()=>{
MAKEAPPEND
app.component.dayDropper.func.makeAppend.blurTile = ()=>{
app.component.dayDropper.func.makeAppend.dropperText = (ms)=>{
app.component.dayDropper.func.makeAppend.dropperText_day = (dayText)=>{
app.component.dayDropper.func.makeAppend.dropperText_info = async(dayId)=>{
app.component.dayDropper.func.makeAppend.menuItems = async()=>{
REMOVE
app.component.dayDropper.func.remove.blurTile = ()=>{
SET
app.component.dayDropper.func.set.day = async(dayDropperDayElement)=>{
TRANSITION
app.component.dayDropper.func.transition.closeDropdown = async()=>{
app.component.dayDropper.func.transition.openDropdown = ()=>{
*/

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
        };
    });
};

/***
GIVE
****/
app.component.dayDropper.func.give.body_closingDropdownListener = ()=>{
    let docBody = document.body;
        docBody.addEventListener('click', ()=>{
            app.component.dayDropper.func.transition.closeDropdown();
        });
};

app.component.dayDropper.func.give.dropper_closedAttributes = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.remove("zIndex2");
};

app.component.dayDropper.func.give.dropper_openAttributes = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.add("zIndex2");
};

app.component.dayDropper.func.give.menu_closedAttributes = ()=>{
    return new Promise((resolve)=>{
        let dropdownMenu = document.querySelector(".dropdownMenu_day");
            dropdownMenu.classList.add("closedHeight");
            dropdownMenu.classList.remove("openHeight");
        let waitForHeightTransitionToFinish = setTimeout(()=>{
            dropdownMenu.classList.add("closedBorder");
            dropdownMenu.classList.remove("openBorder");
            resolve();
        },200);
    });
};

app.component.dayDropper.func.give.menu_openAttributes = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.classList.add("openBorder");
        dropdownMenu.classList.remove("closedBorder");
        dropdownMenu.classList.add("openHeight");
        dropdownMenu.classList.remove("closedHeight");
};

app.component.dayDropper.func.give.menu_scrollListener = ()=>{
    let dropdownMenu_day = document.querySelector(".dropdownMenu_day");
        dropdownMenu_day.addEventListener("scroll", ()=>{
            let scrollTop            = event.srcElement.scrollTop;
            let ball                 = document.querySelector(".dropdownMenu_day .scrollBall");
                ballHeightRatio      = ball.getAttribute("heightRatio");
                ball.style.marginTop = `${scrollTop * ballHeightRatio}px`;
        });
};

app.component.dayDropper.func.give.menu_scrollTopDefault = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.scrollTop = 0;
};

app.component.dayDropper.func.give.scrollBall_heightAttributes = ()=>{
    let height_noOverflow   = 390;
    let height_withOverflow = 17155;
    let barHeight           = 380;
    let heightRatio         = (height_noOverflow / height_withOverflow) * (barHeight / height_noOverflow);
    let ballHeight          = Math.ceil( (barHeight * heightRatio) * (barHeight / height_noOverflow) );
    let ball                = document.querySelector(".dropdownMenu_day .scrollBall");
        ball.style.height   = `${ballHeight}px`;
        ball.setAttribute('heightRatio', heightRatio);
};

app.component.dayDropper.func.give.scrollBar_closedAttributes = ()=>{
    let scrollBar = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.classList.add("closedHeight");
        scrollBar.classList.remove("openHeight");
};

app.component.dayDropper.func.give.scrollBar_openAttributes = ()=>{
    let scrollBar = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.classList.add("openHeight");
        scrollBar.classList.remove("closedHeight");
};

/***
INIT
****/
/*
One might expect to find the following functions in the dayDropper initialization:
- app.component.dayDropper.func.makeAppend.dropperText()
- app.component.dayDropper.func.makeAppend.menuItems()
The firing of these functions is deferred to the item component initialization.
The reason is because the dayDropperText and htmlInsideDropdown need to be aware of the items to be set properly.
Also, one cannot simply initialize the dayDropper after the item component because the item component has initial functions that need to be aware of the day.
Either way, there is a catch-22 between these two components.
*/
app.component.dayDropper.func.init.component = ()=>{
    app.component.dayDropper.func.give.body_closingDropdownListener();
    app.component.dayDropper.func.give.menu_scrollListener();
    app.component.dayDropper.func.give.scrollBall_heightAttributes();
    app.component.dayDropper.setting.day = app.component.dayDropper.func.get.day();
};

/*********
MAKEAPPEND
**********/
app.component.dayDropper.func.makeAppend.blurTile = ()=>{
    let html = `<div class="blurTile" onclick="app.component.dayDropper.func.transition.closeDropdown()"></div>`;
    let addPage = document.querySelector(".addPage");
        addPage.insertAdjacentHTML("afterbegin", html);
};

app.component.dayDropper.func.makeAppend.dropperText = (ms)=>{
    let day     = app.component.dayDropper.func.get.day(ms);
    let dayId   = day[0];
    let dayText = day[1];
    app.component.dayDropper.func.makeAppend.dropperText_day(dayText);
    app.component.dayDropper.func.makeAppend.dropperText_info(dayId);
};

app.component.dayDropper.func.makeAppend.dropperText_day = (dayText)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = dayText;
};

app.component.dayDropper.func.makeAppend.dropperText_info = async(dayId)=>{
    let numberOfItemsForDayString     = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayId);
    let daysUntilString               = app.component.dayDropper.func.get.daysUntilString(dayId);
    let items_daysCountdown           = document.querySelector(".items_daysCountdown");
        items_daysCountdown.innerHTML = `${numberOfItemsForDayString}${daysUntilString}`;
};

app.component.dayDropper.func.makeAppend.menuItems = async()=>{
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

/*****
REMOVE
******/
app.component.dayDropper.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.remove();
};

/**
SET
***/
app.component.dayDropper.func.set.day = async(dayDropperDayElement)=>{
    let day_ms   = Number(dayDropperDayElement.getAttribute("dayId"));
    let day_text = dayDropperDayElement.getAttribute("day_text");
    app.component.dayDropper.setting.day = [day_ms, day_text];
    app.component.dayDropper.func.makeAppend.dropperText(day_ms);
    app.component.timeSlot.func.remove.timeSlotsWrap();       // remove - old timeSlots
    await app.component.timeSlot.func.makeAppend.timeSlots();     // createAppend - new timeSlots
    await app.component.item.func.makeAppend.items_onAddPage_forDay(day_ms); // must happen after createAppend.timeSlots()
    app.component.timeSlot.func.give.scrollBall_heightAttributes(); // must happen after createAppend.itemsForDay(). timeSlots with items have a larger height than timeSlots without, thus need to calculate different scrollBall height based on number of number of items for the given day
};

/*********
TRANSITION
**********/
app.component.dayDropper.func.transition.closeDropdown = async()=>{
    if( app.component.dayDropper.state.open[0] === true
    &&  app.component.dayDropper.state.open[1] === false){
        event.stopPropagation();
        app.component.dayDropper.state.open[1] = true; // turn transitioning bool ON
        app.component.dayDropper.func.give.dropper_closedAttributes();
        app.component.dayDropper.func.give.scrollBar_closedAttributes();
        app.component.dayDropper.func.give.menu_closedAttributes()
        .then(()=>{
            app.component.dayDropper.state.open[0] = false; // turn open state OFF
            app.component.dayDropper.state.open[1] = false; // turn transitioning bool OFF
        });
        app.component.dayDropper.func.remove.blurTile();
    };
};

app.component.dayDropper.func.transition.openDropdown = ()=>{
    if( app.component.dayDropper.state.open[0] === false
    &&  app.component.dayDropper.state.open[1] === false){
        event.stopPropagation();
        app.component.dayDropper.state.open[1] = true; // turn transitioning bool ON
        app.component.dayDropper.func.makeAppend.blurTile();
        app.component.dayDropper.func.give.dropper_openAttributes();
        app.component.dayDropper.func.give.menu_openAttributes();
        app.component.dayDropper.func.give.menu_scrollTopDefault();
        app.component.dayDropper.func.give.scrollBar_openAttributes();
        app.component.dayDropper.state.open[0] = true;  // turn open state bool ON
        app.component.dayDropper.state.open[1] = false; // turn transition bool OFF
    };
};
