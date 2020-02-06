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



/* ACTION */
app.component.timeSlot.func.action = {};
app.component.timeSlot.func.action.enterSubmit = ()=>{
    let edittingItemValue = app.component.timeSlot.state.editting[1].children[1].value;
    if(edittingItemValue.trim().length > 0 // field NOT empty
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.timeSlot.func.transition.hideItemTile();
    }
    else
    if(edittingItemValue.trim().length === 0 // field empty
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.timeSlot.func.transition.removeItem();
    };
};


/* CREATEAPPEND */
app.component.timeSlot.func.createAppend = {};
app.component.timeSlot.func.createAppend.itemTile = async(me)=>{
    if(app.component.timeSlot.state.editting[0] === true){ return; };
    let html = `
        <div class="itemTile zIndex2" onclick="app.component.timeSlot.func.transition.showItem(this)">
            <span class="dot"></span>
            <input class="itemField background_white" spellcheck="false" onkeyup="app.component.timeSlot.func.action.enterSubmit()">
            <div class="minValues"></div>
            <div class="trashIcon" onclick="app.component.timeSlot.func.transition.removeItem();"></div>
        </div>
    `;
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
    app.component.timeSlot.state.editting = [true, item];
};


app.component.timeSlot.func.createAppend.timeSlots = ()=>{
    let wrapper = document.createElement("div");
    let hours   = 24;
    for(let i = 0; i < hours; i++){
        let hr            = i + 1;
        let AMorPM        = app.component.timeSlot.func.get.AMorPM(hr);
        let hr_12         = app.component.timeSlot.func.get.to12Hour(hr);
        let html_timeSlot = app.component.timeSlot.func.create.timeSlot(hr, hr_12, AMorPM);
        wrapper.insertAdjacentHTML("beforeend", html_timeSlot);
        if(i === hours - 1){
            app.component.timeSlot.setting.element.appendChild(wrapper);
        };
    };
};


/* CREATE */
app.component.timeSlot.func.create = {};
app.component.timeSlot.func.create.html_minValues = ()=>{
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


app.component.timeSlot.func.create.timeSlot = (hr, hr12, AMorPM)=>{
    let spacingClass           = "";
    if(hr12 < 10){spacingClass = "spacing";}
	let html = `
		<div class="slot">
			<div class="slotHeader" onclick="app.component.timeSlot.func.createAppend.itemTile(this)">
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
    console.log('init timeSlot');
    app.component.timeSlot.func.createAppend.timeSlots();
};


/* TRANSITION */
app.component.timeSlot.func.transition = {};
app.component.timeSlot.func.transition.hideItemTile = ()=>{
    let item = app.component.timeSlot.state.editting[1];
    // TRANSITION
    app.component.timeSlot.func.transition.hideItemTile_blurTile();
    app.component.timeSlot.func.transition.hideItemTile_field(item);
    app.component.timeSlot.func.transition.hideItemTile_headerTime(item);
    app.component.timeSlot.func.transition.hideItem_min(item);
    app.component.timeSlot.func.transition.hideItemTile_tile();
    app.component.timeSlot.func.transition.hideItemTile_trash(item);
    // STATE - (timeSlot edittingItem OFF)
    app.component.timeSlot.state.editting = [false, null];
};

app.component.timeSlot.func.transition.hideItemTile_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};


app.component.timeSlot.func.transition.hideItemTile_field = (item)=>{
    let field = item.children[1];
        field.classList.add("background_main");
        field.classList.remove("background_white");
        field.setAttribute("readonly", "readonly");
};


app.component.timeSlot.func.transition.hideItemTile_headerTime = (item)=>{
    let headerTime = item.parentNode.previousElementSibling.children[0]
        headerTime.classList.remove("zIndex2");
};


app.component.timeSlot.func.transition.hideItem_min = (item)=>{
    let min = item.children[2];
        min.classList.add("displayNone");
};


app.component.timeSlot.func.transition.hideItemTile_tile = ()=>{
    let tile = app.component.timeSlot.state.editting[1];
        tile.classList.add("hideItemTile");
        tile.classList.remove("zIndex2");
};

app.component.timeSlot.func.transition.hideItemTile_trash = (item)=>{
    let trash = item.children[3];
        trash.classList.add("displayNone");
};


app.component.timeSlot.func.transition.removeItem = ()=>{
    event.stopPropagation();
    /* TRANSITION */
    app.component.timeSlot.func.transition.removeItem_blurTile();
    app.component.timeSlot.func.transition.removeItem_headerTime();
    /* REMOVE ELEMENT */
    app.component.timeSlot.state.editting[1].remove();
    /* STATE - (editting OFF) */
    app.component.timeSlot.state.editting = [false, null];
};


app.component.timeSlot.func.transition.removeItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};


app.component.timeSlot.func.transition.removeItem_headerTime = ()=>{
    let timeHeader = app.component.timeSlot.state.editting[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
};


app.component.timeSlot.func.transition.showItem = (item)=>{
    event.stopPropagation();
    // CASE = if state editing off
    if(app.component.timeSlot.state.editting[0] === false){
        // STATE (timeSlot editting ON)
        app.component.timeSlot.state.editting = [true, item];
        // TRANSITION
        app.component.timeSlot.func.transition.showItem_blurTile();
        app.component.timeSlot.func.transition.showItem_tile(item);
        app.component.timeSlot.func.transition.showItem_field(item);
        app.component.timeSlot.func.transition.showItem_trash(item);
    };
};


app.component.timeSlot.func.transition.showItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.remove("displayNone");
};


app.component.timeSlot.func.transition.showItem_tile = (tile)=>{
    tile.classList.remove("hideItemTile");
    tile.classList.add("zIndex2");
};


app.component.timeSlot.func.transition.showItem_field = (tile)=>{
    let field = tile.children[1];
        field.classList.add("background_white");
        field.classList.remove("background_main");
        field.removeAttribute("readonly");
};


app.component.timeSlot.func.transition.showItem_trash = (tile)=>{
    let trash = tile.children[3];
        trash.classList.remove("displayNone");
};



/*

TABLE OF CONTENTS

app.component.timeSlot = {};
app.component.timeSlot.setting = {};
app.component.timeSlot.state = {};
app.component.timeSlot.func = {};

    ACTION
        app.component.timeSlot.func.action.enterSubmit = (input)=>{

    CREATEAPPEND
        app.component.timeSlot.func.createAppend.itemTile = async(me)=>{
        app.component.timeSlot.func.createAppend.timeSlots = ()=>{

    CREATE
        app.component.timeSlot.func.create.html_minValues = ()=>{
        app.component.timeSlot.func.create.timeSlot = (hr, hr12, AMorPM)=>{

    GET
        app.component.timeSlot.func.get.AMorPM = (hr)=>{
        app.component.timeSlot.func.get.to12Hour = (hr)=>{

    INIT
        app.component.timeSlot.func.init.component = ()=>{

    TRANSITION
        app.component.timeSlot.func.transition.hideItemTile = ()=>{
        app.component.timeSlot.func.transition.hideItemTile_blurTile = ()=>{
        app.component.timeSlot.func.transition.hideItemTile_field = (tile)=>{
        app.component.timeSlot.func.transition.hideItemTile_headerTime = (tile)=>{
        app.component.timeSlot.func.transition.hideItem_min = (tile)=>{
        app.component.timeSlot.func.transition.hideItemTile_tile = ()=>{
        app.component.timeSlot.func.transition.hideItemTile_trash = (tile)=>{

        app.component.timeSlot.func.transition.removeItem = ()=>{
        app.component.timeSlot.func.transition.showItem = (me)=>{

*/
