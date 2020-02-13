app.component.dayDropper = {};
app.component.dayDropper.associated = {};
app.component.dayDropper.associated.menu = document.querySelector(".dropdownMenu_day");
app.component.dayDropper.setting = {};
app.component.dayDropper.setting.day = null;
app.component.dayDropper.state = {};
app.component.dayDropper.state.open = false;
app.component.dayDropper.func = {};
app.component.dayDropper.func.action = {};
app.component.dayDropper.func.createAppend = {};
app.component.dayDropper.func.get = {};
app.component.dayDropper.func.give = {};
app.component.dayDropper.func.init = {};
app.component.dayDropper.func.set = {};

/* func hotkeys:
app.component.dayDropper.func.action.closeDropdown = ()=>{
app.component.dayDropper.func.insertItemsForDay = (day_ms)=>{
app.component.dayDropper.func.action.openDropdown = ()=>{
app.component.dayDropper.func.createAppend.filledItem = (obj)=>{
app.component.dayDropper.func.createAppend.htmlInsideDropdown = async()=>{
app.component.dayDropper.func.get.day = (ms)=>{
app.component.dayDropper.func.get.daysUntilString = (i, startOfDay_ms, incr_ms, msInADay)=>{
app.component.dayDropper.func.get.numberOfItemsForDayString = (ms)=>{
app.component.dayDropper.func.give.closeDropdownListener_to_body = ()=>{
app.component.dayDropper.func.give.currDayStr_to_dayDropperElement = ()=>{
app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
app.component.dayDropper.func.init.component = async()=>{
app.component.dayDropper.func.set.day = async(dayElement)=>{
*/

/* ACTION */
app.component.dayDropper.func.action.closeDropdown = ()=>{
    if(app.component.dayDropper.state.open === true){
       app.component.dayDropper.associated.menu.classList.add("displayNone");
       app.component.dayDropper.state.open = false;
    };
};

app.component.dayDropper.func.insertItemsForDay = (day_ms)=>{
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.day === day_ms){
            app.component.dayDropper.func.createAppend.filledItem(obj);
        };
    };
};

app.component.dayDropper.func.action.openDropdown = ()=>{
    if(app.component.dayDropper.state.open === false){
       event.stopPropagation();
       app.component.dayDropper.associated.menu.classList.remove("displayNone");
       app.component.dayDropper.state.open = true;
    };
};

/* CREATEAPPEND */
app.component.dayDropper.func.createAppend.filledItem = (obj)=>{
    let hour     = obj.associated.timeSlot; // hour used to locate correct timeSlot
    let timeSlot = document.querySelector(".timeSlots").children[0].children[hour-1].children[0];
    let html = `
        <div class="itemTile hideItemTile" onclick="app.component.item.func.transition.showItem(this)">
            <span class="dot"></span>
            <input class="itemField background_main" spellcheck="false" onkeyup="app.component.item.func.action.submit()" value="${obj.setting.text}">
            <div class="minValues displayNone"></div>
            <div class="trashIcon displayNone" onclick="app.component.item.func.transition.removeItem();"></div>
        </div>
    `;
    let slotBody = timeSlot.nextElementSibling;
        slotBody.insertAdjacentHTML("beforeend", html);
};

app.component.dayDropper.func.createAppend.htmlInsideDropdown = async()=>{
    let startOfDay_ms   = app.component.dayDropper.func.get.day()[0];
    let incr_ms         = startOfDay_ms;
    // other variables for year loop
    let html            = "";
    let lookAheadRange  = 365; // 1 year
    let msInADay        = 86400000;
    // year loop
    for(let i = 0; i < lookAheadRange; i++){
        let dateString                = `${new Date(incr_ms)}`;
        let splits                    = dateString.split(" ");
        let month                     = splits[1];
        let dayName                   = splits[0];
        let dayNum                    = splits[2];
        let day_text                  = `${dayName} ${month} ${dayNum}`;
        let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(incr_ms);
        let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(i, startOfDay_ms, incr_ms, msInADay);
        let html_piece = `
            <p day_ms="${incr_ms}" day_text="${day_text}" onclick="app.component.dayDropper.func.set.day(this)">
                <span class="dd_date">
                    <span>${dayName}</span>
                    <span>${month}</span>
                    <span>${dayNum}</span>
                </span>
                <span class="dd_info">
                    <span>(${numberOfItemsForDayString}${daysUntilString})</span>
                </span>
            </p>
        `;
        html    += html_piece;
        incr_ms += msInADay;
        if(i === lookAheadRange - 1){
            app.component.dayDropper.associated.menu.insertAdjacentHTML("beforeend", html);
        };
    };
};

/* GET */
app.component.dayDropper.func.get.day = (ms)=>{ // returns array holding normalized days ms & text
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

app.component.dayDropper.func.get.daysUntilString = (i, startOfDay_ms, incr_ms, msInADay)=>{
    let daysUntilString;
    if(i === 0){ /* special case */
        daysUntilString = `today`;
    }
    else
    if(i === 1){ /* special case */
        daysUntilString = `in 1 day`;
    }
    else{ /* norm */
        let daysUntil = (incr_ms - startOfDay_ms) / msInADay ;
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
            app.component.dayDropper.func.action.closeDropdown();
        });
};

app.component.dayDropper.func.give.currDayStr_to_dayDropperElement = ()=>{
    let currDay_str  = app.component.dayDropper.func.get.day()[1];
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = currDay_str;
};

app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = day_text;
};

/* INIT */
app.component.dayDropper.func.init.component = async()=>{
    app.component.dayDropper.func.give.currDayStr_to_dayDropperElement();
    // app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    app.component.dayDropper.func.give.closeDropdownListener_to_body();
    app.component.dayDropper.setting.day = app.component.dayDropper.func.get.day(); /* SET - day(defaults to current day) */
};

/* SET */
app.component.dayDropper.func.set.day = async(dayElement)=>{
    // pull day ms & text from element
    let day_ms   = Number(dayElement.getAttribute("day_ms"));
    let day_text = dayElement.getAttribute("day_text");
    // set day - dayDropper
    app.component.dayDropper.setting.day = [day_ms, day_text];
    // remove old timeSlots
    let timeSlotsWrap = document.querySelector(".timeSlots").children[0];
        timeSlotsWrap.remove();
    // createAppend new timeSlots
    await app.component.timeSlot.func.createAppend.timeSlots();
    // insert items for day
    app.component.dayDropper.func.insertItemsForDay(day_ms);
    // update dropdown text for selected day
    app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement(day_text);
};
