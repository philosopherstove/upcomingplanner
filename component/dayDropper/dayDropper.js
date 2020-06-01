app.component.dayDropper = {};
app.component.dayDropper.setting = {};
app.component.dayDropper.setting.day = null;
app.component.dayDropper.setting.scrollMonth = null;
app.component.dayDropper.state = {};
app.component.dayDropper.state.open = [false, false, null];
app.component.dayDropper.func = {};
app.component.dayDropper.func.get        = {};
app.component.dayDropper.func.give       = {};
app.component.dayDropper.func.init       = {};
app.component.dayDropper.func.make       = {};
app.component.dayDropper.func.makeAppend = {};
app.component.dayDropper.func.remove     = {};
app.component.dayDropper.func.set        = {};
app.component.dayDropper.func.transition = {};

/* func hotkeys:
GET
app.component.dayDropper.func.get.day = (ms)=>{
app.component.dayDropper.func.get.monthsStartingFromCurrent = ()=>{
GIVE
app.component.dayDropper.func.give.dropdownMenu_scrollTopForMonth = ()=>{
app.component.dayDropper.func.give.dropper_closedAttributes = ()=>{
app.component.dayDropper.func.give.dropper_openAttributes = ()=>{
app.component.dayDropper.func.give.flashSign_flashAttributes = (month)=>{
app.component.dayDropper.func.give.menu_closedAttributes = ()=>{
app.component.dayDropper.func.give.menu_openAttributes = ()=>{
app.component.dayDropper.func.give.menu_scrollListener = ()=>{
app.component.dayDropper.func.give.menu_scrollTopDefault = ()=>{
app.component.dayDropper.func.give.scrollBall_heightAttributes = ()=>{
app.component.dayDropper.func.give.scrollBar_closedAttributes = ()=>{
app.component.dayDropper.func.give.scrollBar_openAttributes = ()=>{
INIT
app.component.dayDropper.func.init.component = ()=>{
MAKE
app.component.dayDropper.func.make.daysUntilString = (ms)=>{
app.component.dayDropper.func.make.dropdownHighlightClass = (numberOfItemsForDayString)=>{
app.component.dayDropper.func.make.monthsInMonthScrollbar = (months)=>{
app.component.dayDropper.func.make.numberOfItemsForDayString = (ms)=>{
MAKEAPPEND
app.component.dayDropper.func.makeAppend.blurTile = ()=>{
app.component.dayDropper.func.makeAppend.dropperText = (ms)=>{
app.component.dayDropper.func.makeAppend.dropperText_day = (dayText)=>{
app.component.dayDropper.func.makeAppend.dropperText_info = async(dayId)=>{
app.component.dayDropper.func.makeAppend.menuItems = async()=>{
app.component.dayDropper.func.makeAppend.monthScrollbar = ()=>{
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
 * Will return day as an array: [ ms(startOfDay), `${dayName} ${month} ${dayNum}` ].
 * If pass-in ms, will return for passed in day, otherwise, will do for current day.
**/
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

app.component.dayDropper.func.get.monthsStartingFromCurrent = ()=>{
    let monthNum = new Date().getMonth() + 1;
    let dayNum   = new Date().getDate();
    let currMonthSplit = false;
    if( dayNum > 1){
        currMonthSplit = true;
    };
    let months = [];
    for(let i = 1; i < 13; i++){
        months.push(new Date(null,i,null).toLocaleString('default', {month: 'short'}))
        if( i === 12){
            months = months.splice(monthNum-1).concat(months);
            if( currMonthSplit === true){
                months.push(new Date(null,monthNum,null).toLocaleString('default', {month: 'short'}));
            };
        };
    };
    return months;
};

/***
GIVE
****/
app.component.dayDropper.func.give.dropper_closedAttributes = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.remove("zIndex2");
};

app.component.dayDropper.func.give.dropper_openAttributes = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.add("zIndex2");
};

app.component.dayDropper.func.give.flashSign_flashAttributes = (month)=>{
    let flashSign           = document.querySelector(".flashSign");
        flashSign.innerHTML = month;
        flashSign.classList.add("flashSign_fade");
    let removeFlashClasses = setTimeout(()=>{
        flashSign.classList.remove("flashSign_fade");
    },900);
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
    app.component.dayDropper.func.give.monthQuickBar_colorAttributes();
    return new Promise((resolve)=>{
        let waitForTransitionToFinish = setTimeout(()=>{
            resolve();
        },200);
    });
};

app.component.dayDropper.func.give.menu_scrollListener = ()=>{
    let dropdownMenu_day = document.querySelector(".dropdownMenu_day");
        dropdownMenu_day.addEventListener("scroll", ()=>{
            let scrollTop            = event.srcElement.scrollTop;
            let ball                 = document.querySelector(".dropdownMenu_day .scrollBall");
                ballHeightRatio      = ball.getAttribute("heightRatio");
                ball.style.marginTop = `${scrollTop * ballHeightRatio}px`;
            app.component.dayDropper.func.give.monthQuickBar_colorAttributes();
        });
};

app.component.dayDropper.func.give.monthQuickBar_colorAttributes = ()=>{
    let currScrollPosition = document.querySelector(".dropdownMenu_day").scrollTop;
    let monthItems         = document.querySelectorAll(".dropdownMenu_day .monthScrollbar p");
    let scrollPositions    = [];
    for(x of monthItems){
        scrollPositions.push(x.getAttribute("scrolltop"));
    };
    let month = null;
    for(let i = 0; i < scrollPositions.length; i++){
        let scrollPosition     = scrollPositions[i];
        let nextScrollPosition = scrollPositions[i+1];
        if(
            (currScrollPosition >= scrollPosition &&
             currScrollPosition < nextScrollPosition)
            ||
            (i === scrollPositions.length - 1 &&
             currScrollPosition >= scrollPosition)
        ){
            monthItems[i].classList.add('blue_1_color');
        }
        else{
            monthItems[i].classList.remove('blue_1_color');
        };
    };
};

app.component.dayDropper.func.give.menu_scrollTopDefault = ()=>{
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.scrollTop = 0;
};

app.component.dayDropper.func.give.scrollBall_heightAttributes = ()=>{
    let numOfStartingMonth = new Date().getDate();
    if( numOfStartingMonth === 1){
        numOfStartingMonth = 0;
    };

    let ratioThroughYear = numOfStartingMonth/365;

    let height_noOverflow   = 390;
    let height_withOverflow = 17155;
    let barHeight           = 380;

    let scrollBarPaddingTop = ratioThroughYear * barHeight;

    let scrollBar                  = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.style.paddingTop = `${scrollBarPaddingTop}px`;

    let heightRatio = (height_noOverflow / height_withOverflow) * (barHeight / height_noOverflow);
        heightRatio = heightRatio - (heightRatio * ratioThroughYear);

    let ballHeight = Math.ceil( (barHeight * heightRatio) * (barHeight / height_noOverflow) );
        ballHeight = Math.ceil(ballHeight - (ballHeight * ratioThroughYear));

    let ball              = document.querySelector(".dropdownMenu_day .scrollBall");
        ball.style.height = `${ballHeight}px`;
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
 * One might expect to find the following functions in the dayDropper initialization:
 * - app.component.dayDropper.func.makeAppend.dropperText()
 * - app.component.dayDropper.func.makeAppend.menuItems()
 * The firing of these functions is deferred to the item component initialization.
 * The reason is because the dayDropperText and htmlInsideDropdown need to be aware of the items to be set properly.
 * Also, one cannot simply initialize the dayDropper after the item component because the item component has initial functions that need to be aware of the day.
 * Either way, there is a catch-22 between these two components.
**/
app.component.dayDropper.func.init.component = ()=>{
    app.component.dayDropper.func.give.menu_scrollListener();
    app.component.dayDropper.func.give.scrollBall_heightAttributes();
    app.component.dayDropper.setting.day = app.component.dayDropper.func.get.day();
};

/***
MAKE
****/
app.component.dayDropper.func.make.daysUntilString = (ms)=>{
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

app.component.dayDropper.func.make.dropdownHighlightClass = (numberOfItemsForDayString)=>{
    let dropdownHighlightClass = "";
    if( numberOfItemsForDayString.length > 0){
        dropdownHighlightClass = "dropdownItemHighlight";
    };
    return dropdownHighlightClass;
};

app.component.dayDropper.func.make.monthsInMonthScrollbar = (months)=>{
    let html = "";
    for(let i = 0; i < months.length; i++){
        let monthName = months[i];
        let scrollTop = null;
        if( i === 0){
            scrollTop = 0;
        }
        else{
            scrollTop = document.querySelector(`.dropdownMenu_innerWrapper > p[day_text~='${monthName}'][day_text~='01']`).offsetTop;
        };
        html += `<p scrollTop="${scrollTop}" onclick="app.component.dayDropper.func.give.dropdownMenu_scrollTopForMonth(); app.component.dayDropper.func.give.flashSign_flashAttributes('${monthName}')">${monthName}</p>`;
    };
    return html;
};

app.component.dayDropper.func.give.dropdownMenu_scrollTopForMonth = ()=>{
    event.stopPropagation();
    let scrollTop = event.target.getAttribute("scrollTop");
    let dropdownMenu = document.querySelector(".dropdownMenu_day");
        dropdownMenu.scrollTo({
            top: scrollTop
        });
};

app.component.dayDropper.func.make.numberOfItemsForDayString = (ms)=>{
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
    let numberOfItemsForDayString     = await app.component.dayDropper.func.make.numberOfItemsForDayString(dayId);
    let daysUntilString               = app.component.dayDropper.func.make.daysUntilString(dayId);
    let items_daysCountdown           = document.querySelector(".items_daysCountdown");
        items_daysCountdown.innerHTML = `${numberOfItemsForDayString}${daysUntilString}`;
};

app.component.dayDropper.func.makeAppend.menuItems = async()=>{
    return new Promise(async(resolve)=>{
        let startOfDay_ms  = app.component.dayDropper.func.get.day()[0];
        let incr_ms        = startOfDay_ms;
        let html           = "";
        let lookAheadRange = 365; // 1 year
        let msInADay       = 86400000;
        for(let i = 0; i < lookAheadRange; i++){ // 1 year loop
            let dateString                = `${new Date(incr_ms)}`;
            let splits                    = dateString.split(" ");
            let month                     = splits[1];
            let dayName                   = splits[0];
            let dayNum                    = splits[2];
            let day_text                  = `${dayName} ${month} ${dayNum}`;
            let numberOfItemsForDayString = await app.component.dayDropper.func.make.numberOfItemsForDayString(incr_ms);
            let dropdownHighlightClass    = app.component.dayDropper.func.make.dropdownHighlightClass(numberOfItemsForDayString);
            let daysUntilString           = app.component.dayDropper.func.make.daysUntilString(incr_ms);
            let html_piece = `
                <p dayId="${incr_ms}" day_text="${day_text}" class="${dropdownHighlightClass}" onclick="app.component.dayDropper.func.set.day(this); app.component.dayDropper.func.transition.closeDropdown()">
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
                resolve();
            };
        };
    });
};

app.component.dayDropper.func.makeAppend.monthScrollbar = ()=>{
    let monthScrollbar = document.querySelector(".monthScrollbar");
        monthScrollbar.insertAdjacentHTML("afterbegin", app.component.dayDropper.func.make.monthsInMonthScrollbar(app.component.dayDropper.func.get.monthsStartingFromCurrent()));
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
    app.component.timeSlot.func.remove.timeSlotsWrap();                      // remove - old timeSlots
    await app.component.timeSlot.func.makeAppend.timeSlots();                // makeAppend - new timeSlots
    await app.component.item.func.makeAppend.items_onAddPage_forDay(day_ms); // must happen after makeAppen.timeSlots()
    app.component.timeSlot.func.give.scrollBall_heightAttributes();          // must happen after makeAppend.items_onAddPage_forDay(). timeSlots with items have a larger height than timeSlots without, thus need to calculate different scrollBall height based on number of number of items for the given day
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
    &&  app.component.dayDropper.state.open[1] === false
    &&  app.component.pageTurner.state.preventClick === false){ // pageTurner can't be preventing click
        event.stopPropagation();
        app.component.dayDropper.state.open[1] = true; // turn transitioning bool ON
        app.component.dayDropper.func.makeAppend.blurTile();
        app.component.dayDropper.func.give.dropper_openAttributes();
        app.component.dayDropper.func.give.menu_openAttributes()
        .then(()=>{
            app.component.dayDropper.state.open[0] = true;  // turn open state bool ON
            app.component.dayDropper.state.open[1] = false; // turn transition bool OFF
        });
        app.component.dayDropper.func.give.menu_scrollTopDefault();
        app.component.dayDropper.func.give.scrollBar_openAttributes();
    };
};
