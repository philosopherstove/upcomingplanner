/********
component
*********/
UP.component.timeSlot = {};


/******
setting
*******/
UP.component.timeSlot.setting = {};
UP.component.timeSlot.setting.element = document.querySelector(".timeSlots");


/****
state
*****/
UP.component.timeSlot.state = {};
UP.component.timeSlot.state.editting = [false, null];

/********
functions
*********/
UP.component.timeSlot.func = {};

/*****
ACTION
******/
UP.component.timeSlot.func.action_enterSubmit = ()=>{
    let edittingItemValue = UP.component.timeSlot.state.editting[1].children[1].value;

    // field NOT empty & either hit enter or clicked off(target blurTile)
    if(edittingItemValue.trim().length > 0
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        UP.component.timeSlot.func.transition_hideItemTile();
    }
    else // field empty
    if(edittingItemValue.trim().length === 0
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        UP.component.timeSlot.func.transition_removeItem();
    }
};


/*****
CREATE
******/
UP.component.timeSlot.func.create_append_itemTile = async(me)=>{
    if(UP.component.timeSlot.state.editting[0] === true){ return; };
    // let minValues = await UP.component.timeSlot.func.create_html_minValues();

    let html = `
        <div class="itemTile zIndex2">
            <span class="dot"></span>
            <input class="itemField background_white" spellcheck="false" onkeyup="UP.component.timeSlot.func.action_enterSubmit()">
            <div class="minValues">

            </div>
            <div class="trashIcon" onclick="UP.component.timeSlot.func.transition_removeItem();"></div>
        </div>
    `; // this exculdes minValues

    /* append to slotBody */
    let slotBody = me.nextElementSibling;
        slotBody.insertAdjacentHTML("afterbegin", html);
    /* focus on input text */
    let itemField = me.nextElementSibling.children[0].children[1];
        itemField.focus();
    /* blurTile */
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.remove("displayNone");
    /* headerTime - zindex */
    let headerTime = me.children[0];
        headerTime.classList.add("zIndex2");
    /* STATE - timeSlot (edittingItem) */
    let item = me.nextElementSibling.children[0];
    UP.component.timeSlot.state.editting = [true, item];
};


UP.component.timeSlot.func.create_append_timeSlots = ()=>{
    let wrapper = document.createElement("div");
    let hours   = 24;
    for(let i = 0; i < hours; i++){
        let hr            = i + 1;
        let AMorPM        = UP.component.timeSlot.func.get_AMorPM(hr);
        let hr_12         = UP.component.timeSlot.func.get_to12Hour(hr);
        let html_timeSlot = UP.component.timeSlot.func.create_timeSlot(hr, hr_12, AMorPM);
        wrapper.insertAdjacentHTML("beforeend", html_timeSlot);
        if(i === hours - 1){
            UP.component.timeSlot.setting.element.appendChild(wrapper);
        };
    };
};


UP.component.timeSlot.func.create_html_minValues = ()=>{
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


UP.component.timeSlot.func.create_timeSlot = (hr, hr12, AMorPM)=>{
    let spacingClass           = "";
    if(hr12 < 10){spacingClass = "spacing";}
	let html = `
		<div class="slot">
			<div class="slotHeader" onclick="UP.component.timeSlot.func.create_append_itemTile(this)">
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


/**
GET
**/
UP.component.timeSlot.func.get_AMorPM = (hr)=>{
    if(hr < 13){return 'AM';}
	else{return 'PM';};
};


UP.component.timeSlot.func.get_to12Hour = (hr)=>{
    if(hr > 12){return (hr - 12);}
	else{return hr;};
};


/***
INIT
****/
UP.component.timeSlot.func.init_component = ()=>{
    console.log('init timeSlot');
    UP.component.timeSlot.func.create_append_timeSlots();
};


/*********
TRANSITION
**********/
UP.component.timeSlot.func.transition_hideItemTile = ()=>{
    // tile - hide tile, remove zIndex class
    let tile = UP.component.timeSlot.state.editting[1];
        tile.classList.add("hideItemTile");
        tile.classList.remove("zIndex2");
    // input - background swap, readonly
    let input = tile.children[1];
        input.classList.add("background_main");
        input.classList.remove("background_white");
        input.setAttribute("readonly", "readonly");
    // min, trash, blur tile - displayNone
    let min = tile.children[2];
        min.classList.add("displayNone");
    let trash = tile.children[3];
        trash.classList.add("displayNone");
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
    // headerTime - remove zIndex2
    let headerTime = tile.parentNode.previousElementSibling.children[0]
        headerTime.classList.remove("zIndex2");
    // STATE - (timeSlot edittingItem OFF)
    UP.component.timeSlot.state.editting = [false, null];
};


UP.component.timeSlot.func.transition_removeItem = ()=>{
    /* hide - blurTile */
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
    /* zindex - headerTime */
    let timeHeader = UP.component.timeSlot.state.editting[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
    /* remove item */
    UP.component.timeSlot.state.editting[1].remove();
    /* STATE - (editting OFF) */
    UP.component.timeSlot.state.editting = [false, null];
};




/*

TABLE OF CONTENTS

UP.component.timeSlot = {};

UP.component.timeSlot.setting = {};

UP.component.timeSlot.state = {};

UP.component.timeSlot.func = {};

    ACTION
        UP.component.timeSlot.func.action_enterSubmit = (input)=>{

    CREATE
        UP.component.timeSlot.func.create_append_itemTile = async(me)=>{
        UP.component.timeSlot.func.create_append_timeSlots = ()=>{
        UP.component.timeSlot.func.create_html_minValues = ()=>{
        UP.component.timeSlot.func.create_timeSlot = (hr, hr12, AMorPM)=>{

    GET
        UP.component.timeSlot.func.get_AMorPM = (hr)=>{
        UP.component.timeSlot.func.get_to12Hour = (hr)=>{

    INIT
        UP.component.timeSlot.func.init_component = ()=>{

    TRANSITION
        UP.component.timeSlot.func.transition_hideItemTile = ()=>{
        UP.component.timeSlot.func.transition_removeItem = ()=>{

*/
