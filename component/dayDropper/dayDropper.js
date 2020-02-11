app.component.dayDropper = {};
app.component.dayDropper.associated = {};
app.component.dayDropper.associated.menu = document.querySelector(".dropdownMenu_day");
app.component.dayDropper.setting = {};
app.component.dayDropper.setting.day = null;
app.component.dayDropper.state = {};
app.component.dayDropper.state.open = false;
app.component.dayDropper.func = {};


/* function hotkeys:
app.component.dayDropper.func.action.closeDropdown = ()=>{
app.component.dayDropper.func.action.openDropdown = ()=>{
app.component.dayDropper.func.createAppend.htmlInsideDropdown = ()=>{
app.component.dayDropper.func.get.currentDay = ()=>{
app.component.dayDropper.func.give.listenerToCloseDropdown_to_body = ()=>{
app.component.dayDropper.func.give.currDayStr_to_dayDropperElement = ()=>{
app.component.dayDropper.func.init.component = async()=>{
*/


/* ACTION */
app.component.dayDropper.func.action = {};

app.component.dayDropper.func.action.closeDropdown = ()=>{
    if(app.component.dayDropper.state.open === true){
       app.component.dayDropper.associated.menu.classList.add("displayNone");
       app.component.dayDropper.state.open = false;
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
app.component.dayDropper.func.createAppend = {};

app.component.dayDropper.func.createAppend.htmlInsideDropdown = ()=>{
    // get startOfDay_text & startOfDay_ms
    let now_dateString  = new Date();
    let startOfDay_text = new Date(now_dateString.getFullYear(), now_dateString.getMonth(), now_dateString.getDate());
    let startOfDay_ms   = Date.parse(startOfDay_text);
    let incr_ms         = startOfDay_ms;
    // other variables for year loop
    let html            = "";
    let lookAheadRange  = 365; // 1 year
    let msInADay        = 86400000;
    // year loop
    for(let i = 0; i < lookAheadRange; i++){
        let dateString = `${new Date(incr_ms)}`;
        let splits     = dateString.split(" ");
		let month      = splits[1];
		let dayName    = splits[0];
		let dayNum     = splits[2];
        let day_text   = `${dayName} ${month} ${dayNum}`;

        let numberOfItemsString;
        // not found
        numberOfItemsString = ``;
        // else
        // numberOfItemsString = `${} items - `;

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

        let html_piece = `
            <p day_ms="${incr_ms}" day_text="${day_text}" onclick="app.component.dayDropper.func.set.day(this)">
                <span class="dd_date">
                    <span>${dayName}</span>
                    <span>${month}</span>
                    <span>${dayNum}</span>
                </span>
                <span class="dd_info">
                    <span>(${numberOfItemsString}${daysUntilString})</span>
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
app.component.dayDropper.func.get = {};

app.component.dayDropper.func.get.currentDay = ()=>{ // returns array holding normalized days ms & text
    let now_dateString  = new Date();
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


/* GIVE */
app.component.dayDropper.func.give = {};

app.component.dayDropper.func.give.listenerToCloseDropdown_to_body = ()=>{
    let docBody = document.body;
        docBody.addEventListener('click', ()=>{
            app.component.dayDropper.func.action.closeDropdown();
        });
};

app.component.dayDropper.func.give.currDayStr_to_dayDropperElement = ()=>{
    let currDay_str  = app.component.dayDropper.func.get.currentDay()[1];
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = currDay_str;
};

app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement = (day_text)=>{
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = day_text;
};


/* INIT */
app.component.dayDropper.func.init = {};

app.component.dayDropper.func.init.component = async()=>{
    app.component.dayDropper.func.give.currDayStr_to_dayDropperElement();
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    app.component.dayDropper.func.give.listenerToCloseDropdown_to_body();
    /* State - day - defaults to current day */
    app.component.dayDropper.setting.day = app.component.dayDropper.func.get.currentDay();
};


/* SET */
app.component.dayDropper.func.set = {};

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
    // loop itemObjs and insert relevant
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if(obj.associated.day === day_ms){
            app.component.dayDropper.func.createAppend.filledItem(obj);
        };
    };
    // update dropdown text for selected day
    app.component.dayDropper.func.give.selectedDayString_to_dayDropperElement(day_text);
};


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
