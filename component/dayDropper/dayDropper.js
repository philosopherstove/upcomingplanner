app.component.dayDropper = {};
app.component.dayDropper.associated = {};
app.component.dayDropper.associated.menu         = document.querySelector(".dropdownMenu_day");
app.component.dayDropper.associated.innerWrapper = document.querySelector(".dropdownMenu_innerWrapper");
app.component.dayDropper.setting = {};
app.component.dayDropper.setting.day = null;
app.component.dayDropper.state = {};
app.component.dayDropper.state.open = false;
app.component.dayDropper.func = {};
app.component.dayDropper.func.createAppend = {};
app.component.dayDropper.func.get          = {};
app.component.dayDropper.func.give         = {};
app.component.dayDropper.func.init         = {};
app.component.dayDropper.func.remove       = {};
app.component.dayDropper.func.set          = {};
app.component.dayDropper.func.transition   = {};

/* func hotkeys:
app.component.dayDropper.func.createAppend.dayDropperText = (ms)=>{
app.component.dayDropper.func.createAppend.dayDropperText_day = (dayText)=>{
app.component.dayDropper.func.createAppend.dayDropperText_info = async(ms)=>{
app.component.dayDropper.func.createAppend.filledItem = (obj)=>{
app.component.dayDropper.func.createAppend.htmlInsideDropdown = async()=>{
app.component.dayDropper.func.createAppend.itemsForDay = (day_ms)=>{
app.component.dayDropper.func.get.day = (ms)=>{
app.component.dayDropper.func.get.daysUntilString = (ms)=>{
app.component.dayDropper.func.get.numberOfItemsForDayString = (ms)=>{
app.component.dayDropper.func.give.closeDropdownListener_to_body = ()=>{
app.component.dayDropper.func.give.currDayStr_to_dayDropperElement = ()=>{
app.component.dayDropper.func.give.height_to_scrollBall = ()=>{
app.component.dayDropper.func.give.scrollListener_to_dropdownMenu = ()=>{
app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
app.component.dayDropper.func.init.component = async()=>{
app.component.dayDropper.func.remove.blurTile = ()=>{
app.component.dayDropper.func.remove.timeSlotsDivElement = ()=>{
app.component.dayDropper.func.set.day = async(dayElement)=>{
app.component.dayDropper.func.transition.closeDropdown = ()=>{
app.component.dayDropper.func.transition.openDropdown = ()=>{
*/

/* CREATEAPPEND */
app.component.dayDropper.func.createAppend.blurTile = ()=>{
    let html = `<div class="blurTile" onclick="app.component.dayDropper.func.transition.closeDropdown()"></div>`;
    let addPage = document.querySelector(".addPage");
        addPage.insertAdjacentHTML("afterbegin", html);
};

app.component.dayDropper.func.createAppend.dayDropperText = (ms)=>{
    let day     = app.component.dayDropper.func.get.day(ms);
    let dayMS   = day[0];
    let dayText = day[1];
    app.component.dayDropper.func.createAppend.dayDropperText_day(dayText);
    app.component.dayDropper.func.createAppend.dayDropperText_info(dayMS);
};

app.component.dayDropper.func.createAppend.dayDropperText_day = (dayText)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = dayText;
};

app.component.dayDropper.func.createAppend.dayDropperText_info = async(ms)=>{
    let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(ms);
    let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(ms);
    let items_daysCountdown       = document.querySelector(".items_daysCountdown");
        items_daysCountdown.innerHTML = `${numberOfItemsForDayString}${daysUntilString}`;
};

app.component.dayDropper.func.createAppend.filledItem = (obj)=>{
    let createdId = obj.associated.createdId;
    let itemText  = obj.setting.text;
    let dayId     = obj.associated.day;
    let hourId    = obj.associated.timeSlot; // hourId used to locate correct slotBody to append to
    let html = `
        <div class="itemTile hideItemTile" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.transition.showItem(this)">
            <span class="dot"></span>
            <input class="itemField background_main" spellcheck="false" onkeyup="app.component.item.func.give.item_to_dataStore()" value="${itemText}">
            <div class="minValues displayNone"></div>
            <div class="trashIcon displayNone" onclick="app.component.item.func.transition.removeItem();"></div>
        </div>
    `;
    let slotBody = document.querySelector(".timeSlots").children[0].children[hourId-1].children[0].nextElementSibling;
        slotBody.insertAdjacentHTML("beforeend", html);
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
        let highlightClass            = "";
        if( numberOfItemsForDayString.length > 0){
            highlightClass = "dropdownItemHighlight";
        };
        let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(incr_ms);
        let html_piece = `
            <p day_ms="${incr_ms}" day_text="${day_text}" class="${highlightClass}" onclick="app.component.dayDropper.func.set.day(this)">
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
        if(i === lookAheadRange - 1){
            app.component.dayDropper.associated.innerWrapper.innerHTML = "";
            app.component.dayDropper.associated.innerWrapper.insertAdjacentHTML("beforeend", html);
        };
    };
};

app.component.dayDropper.func.createAppend.itemsForDay = (day_ms)=>{
    for(let i = app.component.item.objs.length-1; i > -1; i--){
        let obj = app.component.item.objs[i];
        if( obj.associated.day === day_ms){
            app.component.dayDropper.func.createAppend.filledItem(obj);
        };
    };
};

/* GET */

// will return day as [ms(startOfDay), `${dayName} ${month} ${dayNum}`]
// if pass-in ms, will return for passed in day, otherwise, will do for current day
app.component.dayDropper.func.get.day = (ms)=>{
    let now_dateString;
    if(ms === undefined){
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
    if(daysUntil === 0){
        daysUntilString = `today`;
    }
    else
    if(daysUntil === 1){
        daysUntilString = `in 1 day`;
    }
    else{
        daysUntilString = `in ${daysUntil} days`;
    };
    return daysUntilString;
};

app.component.dayDropper.func.get.numberOfItemsForDayString = (ms)=>{
    return new Promise((resolve)=>{
        if(app.component.item.objs.length === 0){
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
                if(Number(i) === app.component.item.objs.length -1){
                    let numberOfItemsForDayString;
                    if( numberOfItems === 0){
                        numberOfItemsForDayString = "";
                    }
                    else
                    if( numberOfItems === 1){
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

/* GIVE */
app.component.dayDropper.func.give.closeDropdownListener_to_body = ()=>{
    let docBody = document.body;
        docBody.addEventListener('click', ()=>{
            app.component.dayDropper.func.transition.closeDropdown();
        });
};

app.component.dayDropper.func.give.currDayStr_to_dayDropperElement = ()=>{
    let currDay_str  = app.component.dayDropper.func.get.day()[1];
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = currDay_str;
};

app.component.dayDropper.func.give.currNumberOfItems_to_dayDropperElement = ()=>{
    let numberOfItems = 0;
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.day === app.component.dayDropper.setting.day[0]){
            numberOfItems++;
        };
        if(Number(i) === app.component.item.objs.length-1){ // end of loop
            let items_daysCountdown = document.querySelector(".items_daysCountdown");
                items_daysCountdown.innerHTML = `{}`;
        };
    };
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
    app.component.dayDropper.associated.menu.scrollTop = 0;
};

app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = day_text;
};

app.component.dayDropper.func.give.zIndex_to_dropper = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.add("zIndex2");
};

/* INIT */
app.component.dayDropper.func.init.component = async()=>{
    // app.component.dayDropper.func.give.currDayStr_to_dayDropperElement();
    app.component.dayDropper.func.give.closeDropdownListener_to_body();
    app.component.dayDropper.func.give.height_to_scrollBall();
    app.component.dayDropper.func.give.scrollListener_to_dropdownMenu();
    app.component.dayDropper.setting.day = app.component.dayDropper.func.get.day(); /* SET - day(defaults to current day) */
};

/* REMOVE */
app.component.dayDropper.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.remove();
};

app.component.dayDropper.func.remove.timeSlotsDivElement = ()=>{
    let timeSlotsWrap = document.querySelector(".timeSlots").children[0];
        timeSlotsWrap.remove();
};

app.component.dayDropper.func.remove.zIndex_from_dropper = ()=>{
    let dropper = document.querySelector(".dropper");
        dropper.classList.remove("zIndex2");
};

/* SET */
app.component.dayDropper.func.set.day = async(dayElement)=>{
    let day_ms   = Number(dayElement.getAttribute("day_ms"));
    let day_text = dayElement.getAttribute("day_text");
    app.component.dayDropper.setting.day = [day_ms, day_text]; // SET - dayDropper day
    app.component.dayDropper.func.remove.timeSlotsDivElement(); // remove old timeSlots
    await app.component.timeSlot.func.createAppend.timeSlots(); // createAppend new timeSlots
    app.component.dayDropper.func.createAppend.itemsForDay(day_ms);
    app.component.dayDropper.func.createAppend.dayDropperText(day_ms);
    app.component.timeSlot.func.give.height_to_scrollBall();  // timeSlots with items have a larger height than timeSlots without, thus need to calculate different scrollBall height based on number of number of items for the given day
};

/* TRANSITION */
app.component.dayDropper.func.transition.closeDropdown = async()=>{
    if( app.component.dayDropper.state.open === true){
        event.stopPropagation();
        app.component.dayDropper.state.open = null;
        app.component.dayDropper.func.transition.closeDropdown_closedHeight();
        app.component.dayDropper.func.transition.closeDropdown_closedScrollBarHeight();
        app.component.dayDropper.func.remove.blurTile();
        app.component.dayDropper.func.remove.zIndex_from_dropper();
        app.component.dayDropper.func.transition.closeDropdown_closedBorder()
        .then(()=>{
            app.component.dayDropper.state.open = false;
        });
    };
};

app.component.dayDropper.func.transition.closeDropdown_closedBorder = ()=>{
    return new Promise((resolve)=>{
        let waitForHeightTransitionToFinish = setTimeout(()=>{
            app.component.dayDropper.associated.menu.classList.add("closedBorder");
            app.component.dayDropper.associated.menu.classList.remove("openBorder");
            resolve();
        },200);
    });
};

app.component.dayDropper.func.transition.closeDropdown_closedHeight = ()=>{
    app.component.dayDropper.associated.menu.classList.add("closedHeight");
    app.component.dayDropper.associated.menu.classList.remove("openHeight");
};

app.component.dayDropper.func.transition.closeDropdown_closedScrollBarHeight = ()=>{
    let scrollBar = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.classList.add("closedHeight");
        scrollBar.classList.remove("openHeight");
};

app.component.dayDropper.func.transition.openDropdown = ()=>{
    if( app.component.dayDropper.state.open === false){
        event.stopPropagation();
        app.component.dayDropper.state.open = null;
        app.component.dayDropper.func.createAppend.blurTile();
        app.component.dayDropper.func.give.scrollTopDefault_to_dropdownMenu();
        app.component.dayDropper.func.give.zIndex_to_dropper();
        app.component.dayDropper.func.transition.openDropdown_openBorder();
        app.component.dayDropper.func.transition.openDropdown_openHeight();
        app.component.dayDropper.func.transition.openDropdown_openScrollBarHeight();
        app.component.dayDropper.state.open = true;
    };
};

app.component.dayDropper.func.transition.openDropdown_openBorder = ()=>{
    app.component.dayDropper.associated.menu.classList.add("openBorder");
    app.component.dayDropper.associated.menu.classList.remove("closedBorder");
};

app.component.dayDropper.func.transition.openDropdown_openHeight = ()=>{
    app.component.dayDropper.associated.menu.classList.add("openHeight");
    app.component.dayDropper.associated.menu.classList.remove("closedHeight");
};

app.component.dayDropper.func.transition.openDropdown_openScrollBarHeight = ()=>{
    let scrollBar = document.querySelector(".dropdownMenu_day .scrollBar");
        scrollBar.classList.add("openHeight");
        scrollBar.classList.remove("closedHeight");
};
