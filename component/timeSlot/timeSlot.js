/*

app.component.timeSlot = {};
app.component.timeSlot.setting = {};
app.component.timeSlot.state = {};
app.component.timeSlot.func = {};

app.component.timeSlot.func.create.itemHTML = ()=>{
app.component.timeSlot.func.create.minValuesHTML = ()=>{
app.component.timeSlot.func.create.timeSlotHTML = (hr, hr12, AMorPM)=>{

app.component.timeSlot.func.createAppend.item = async(me)=>{
app.component.timeSlot.func.createAppend.timeSlots = ()=>{

app.component.timeSlot.func.get.AMorPM = (hr)=>{
app.component.timeSlot.func.get.to12Hour = (hr)=>{

app.component.timeSlot.func.init.component = ()=>{

*/


/* COMPONENT */
app.component.timeSlot = {};

/* SETTING */
app.component.timeSlot.setting = {};
app.component.timeSlot.setting.element = document.querySelector(".timeSlots");

/* STATE */
app.component.timeSlot.state = {};
app.component.timeSlot.state.editting = [false, null];

/* FUNC */
app.component.timeSlot.func = {};


/* CREATE */
app.component.timeSlot.func.create = {};

app.component.timeSlot.func.create.itemHTML = ()=>{
    return new Promise((resolve)=>{
        let html = `
            <div class="itemTile zIndex2" onclick="app.component.item.func.transition.showItem(this)">
                <span class="dot"></span>
                <input class="itemField background_white" spellcheck="false" onkeyup="app.component.item.func.action.submit()">
                <div class="minValues"></div>
                <div class="trashIcon" onclick="app.component.item.func.transition.removeItem();"></div>
            </div>
        `;
        resolve(html);
    });
};

app.component.timeSlot.func.create.minValuesHTML = ()=>{
    return new Promise((resolve)=>{
        let html = "";
        let minuteNumbers = ["--", "10", "15", "20", "30", "40", "45", "50"];
        for(let i = 0; i < minuteNumbers.length; i++){
            let number = minuteNumbers[i];
            html += `<p>${number}</p>`;
            if(i === minuteNumbers.length - 1){
                resolve(html);
            };
        };
    });
};

app.component.timeSlot.func.create.timeSlotHTML = (hr, hr12, AMorPM)=>{
    let spacingClass = "";
    if(hr12 < 10){spacingClass = "spacing";}
	let html = `
        <div class="slot">
            <div class="slotHeader" onclick="app.component.timeSlot.func.createAppend.item(this)">
                <p class="time" data_hour="${hr}">
                    <span class="${spacingClass}">${hr12}</span>
                    <span>${AMorPM}</span>
                </p>
                <div class="addButton"></div>
            </div>
            <div class="slotBody"></div>
        </div>
    `;
    return html;
};


/* CREATEAPPEND */
app.component.timeSlot.func.createAppend = {};

app.component.timeSlot.func.createAppend.item = async(me)=>{
    if(app.component.timeSlot.state.editting[0] === true){ return; };
    let html = await app.component.timeSlot.func.create.itemHTML();
    /* append to slotBody */
    let slotBody = me.nextElementSibling;
        slotBody.insertAdjacentHTML("afterbegin", html);
    /* focus on input text */
    let itemField = me.nextElementSibling.children[0].children[1];
        itemField.focus();
    /* blurTile - show */
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.remove("displayNone");
    /* headerTime - zindex */
    let headerTime = me.children[0];
        headerTime.classList.add("zIndex2");
    /* STATE - timeSlot (edittingItem) */
    let item = me.nextElementSibling.children[0];
    app.component.timeSlot.state.editting = [true, item];

    // fistly, state should be on item component
    // second, there should be item component and item obj level states
    // should have a toggle fuction for this like previously
    // app.component.item.state.selected = [true, item];
    // obj.state.selected = true;
};

app.component.timeSlot.func.createAppend.timeSlots = ()=>{
    let wrapper = document.createElement("div");
    let hours   = 24;
    for(let i = 0; i < hours; i++){
        let hr            = i + 1;
        let AMorPM        = app.component.timeSlot.func.get.AMorPM(hr);
        let hr_12         = app.component.timeSlot.func.get.to12Hour(hr);
        let html_timeSlot = app.component.timeSlot.func.create.timeSlotHTML(hr, hr_12, AMorPM);
        wrapper.insertAdjacentHTML("beforeend", html_timeSlot);
        if(i === hours - 1){
            app.component.timeSlot.setting.element.appendChild(wrapper);
        };
    };
};


/* GET */
app.component.timeSlot.func.get = {};

app.component.timeSlot.func.get.AMorPM = (hr)=>{
    if(hr < 13){return 'AM';}
	else{return 'PM';};
};

app.component.timeSlot.func.get.to12Hour = (hr)=>{
    if(hr > 12){return (hr - 12);}
	else{return hr;};
};


/* INIT */
app.component.timeSlot.func.init = {};

app.component.timeSlot.func.init.component = ()=>{
    app.component.timeSlot.func.createAppend.timeSlots();
};
