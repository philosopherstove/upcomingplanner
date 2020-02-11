app.component.timeSlot = {};
app.component.timeSlot.setting = {};
app.component.timeSlot.setting.element = document.querySelector(".timeSlots");
app.component.timeSlot.state = {};
app.component.timeSlot.state.active = false;
app.component.timeSlot.func = {};


/* function hotkeys:
app.component.timeSlot.func.createAppend.itemHTML = ()=>{
app.component.timeSlot.func.create.minValuesHTML = ()=>{
app.component.timeSlot.func.create.timeSlotHTML = (hr, hr12, AMorPM)=>{
app.component.timeSlot.func.create.item = async(me)=>{
app.component.timeSlot.func.createAppend.timeSlots = ()=>{
app.component.timeSlot.func.get.AMorPM = (hr)=>{
app.component.timeSlot.func.get.to12Hour = (hr)=>{
app.component.timeSlot.func.init.component = ()=>{
*/


/* CREATE */
app.component.timeSlot.func.create = {};

app.component.timeSlot.func.create.item = async(timeSlot)=>{
    if(app.component.timeSlot.state.active === true){ return; };
    /* createAppend - item */
    await app.component.timeSlot.func.createAppend.itemHTML(timeSlot);
    /* transition - createItem (header zindex, field focus, blurTile) */
    app.component.timeSlot.func.transition.createItem(timeSlot);
    /* STATE - timeSlot (editting ON) */
    app.component.timeSlot.state.active = true;
    /* STATE - item (selected ON)*/
    let item = timeSlot.nextElementSibling.children[0];
    app.component.item.state.selected = [true, item];
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
            <div class="slotHeader" onclick="app.component.timeSlot.func.create.item(this)">
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

app.component.timeSlot.func.createAppend.itemHTML = (timeSlot)=>{
    return new Promise((resolve)=>{
        let html = `
            <div class="itemTile zIndex2" onclick="app.component.item.func.transition.showItem(this)">
                <span class="dot"></span>
                <input class="itemField background_white" spellcheck="false" onkeyup="app.component.item.func.action.submit()">
                <div class="minValues"></div>
                <div class="trashIcon" onclick="app.component.item.func.transition.removeItem();"></div>
            </div>
        `;
        let slotBody = timeSlot.nextElementSibling;
            slotBody.insertAdjacentHTML("afterbegin", html);
        resolve();
    });
};

app.component.timeSlot.func.createAppend.timeSlots = ()=>{
    return new Promise((resolve)=>{
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
                resolve();
            };
        };
    });
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


/* TRANSITION */
app.component.timeSlot.func.transition = {};

app.component.timeSlot.func.transition.createItem = (element)=>{
    /* focus on input text */
   let itemField = element.nextElementSibling.children[0].children[1];
       itemField.focus();
   /* show blurTile */
   let blurTile = document.querySelector(".blurTile");
       blurTile.classList.remove("displayNone");
   /* headerTime zindex */
   let headerTime = element.children[0];
       headerTime.classList.add("zIndex2");
};
