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

    // field NOT empty & either hit enter or clicked off(target blurTile)
    if(edittingItemValue.trim().length > 0
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        app.component.timeSlot.func.transition.hideItemTile();
    }
    else // field empty
    if(edittingItemValue.trim().length === 0
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        app.component.timeSlot.func.transition.removeItem();
    }
};


/* CREATEAPPEND */
app.component.timeSlot.func.createAppend = {};
app.component.timeSlot.func.createAppend.itemTile = async(me)=>{
    if(app.component.timeSlot.state.editting[0] === true){ return; };
    // let minValues = await app.component.timeSlot.func.create.html_minValues();

    let html = `
        <div class="itemTile zIndex2" onclick="app.component.timeSlot.func.transition.showItem(this)">
            <span class="dot"></span>
            <input class="itemField background_white" spellcheck="false" onkeyup="app.component.timeSlot.func.action.enterSubmit()">
            <div class="minValues">

            </div>
            <div class="trashIcon" onclick="app.component.timeSlot.func.transition.removeItem();"></div>
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
    // TRANSITION
    app.component.timeSlot.func.transition.hideItemTile_tile();
    app.component.timeSlot.func.transition.hideItemTile_field();
    app.component.timeSlot.func.transition.hideItem_min();
    app.component.timeSlot.func.transition.hideItemTile_trash();
    app.component.timeSlot.func.transition.hideItemTile_blurTile();
    app.component.timeSlot.func.transition.hideItemTile_headerTime();
    // STATE - (timeSlot edittingItem OFF)
    app.component.timeSlot.state.editting = [false, null];
};


app.component.timeSlot.func.transition.hideItemTile_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};


app.component.timeSlot.func.transition.hideItemTile_field = ()=>{
    let field = tile.children[1];
        field.classList.add("background_main");
        field.classList.remove("background_white");
        field.setAttribute("readonly", "readonly");
};


app.component.timeSlot.func.transition.hideItemTile_headerTime = ()=>{
    let headerTime = tile.parentNode.previousElementSibling.children[0]
        headerTime.classList.remove("zIndex2");
};


app.component.timeSlot.func.transition.hideItem_min = ()=>{
    let min = tile.children[2];
        min.classList.add("displayNone");
};


app.component.timeSlot.func.transition.hideItemTile_tile = ()=>{
    let tile = app.component.timeSlot.state.editting[1];
        tile.classList.add("hideItemTile");
        tile.classList.remove("zIndex2");
};

app.component.timeSlot.func.transition.hideItemTile_trash = ()=>{
    let trash = tile.children[3];
        trash.classList.add("displayNone");
};


app.component.timeSlot.func.transition.removeItem = ()=>{
    event.stopPropagation();
    /* hide - blurTile */
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
    /* zindex - headerTime */
    let timeHeader = app.component.timeSlot.state.editting[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
    /* remove item */
    app.component.timeSlot.state.editting[1].remove();
    /* STATE - (editting OFF) */
    app.component.timeSlot.state.editting = [false, null];
};


app.component.timeSlot.func.transition.showItem = (me)=>{
    console.log("show item", me);
    event.stopPropagation();
    // if state editing off,
    if(app.component.timeSlot.state.editting[0] === false){
        // STATE - timeSlot editting ON
        app.component.timeSlot.state.editting = [true, me];
        // blurTile - display
        let blurTile = document.querySelector(".blurTile");
            blurTile.classList.remove("displayNone");
        // item - remove hide class
        me.classList.remove("hideItemTile");
        // item - increase z index
        me.classList.add("zIndex2");
        // field - background color swap, field editable(remove readonly)
        let field = me.children[1];
            field.classList.add("background_white");
            field.classList.remove("background_main");
            field.removeAttribute("readonly");
        // trash - display
        let trash = me.children[3];
            trash .classList.remove("displayNone");
    };
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
        app.component.timeSlot.func.transition.hideItemTile_field = ()=>{
        app.component.timeSlot.func.transition.hideItemTile_headerTime = ()=>{
        app.component.timeSlot.func.transition.hideItem_min = ()=>{
        app.component.timeSlot.func.transition.hideItemTile_tile = ()=>{
        app.component.timeSlot.func.transition.hideItemTile_trash = ()=>{

        app.component.timeSlot.func.transition.removeItem = ()=>{
        app.component.timeSlot.func.transition.showItem = (me)=>{

*/
