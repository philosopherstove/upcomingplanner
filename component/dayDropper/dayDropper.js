/********
component
*********/
UP.component.dayDropper = {};


/*********
associated
**********/
UP.component.dayDropper.associated = {};
UP.component.dayDropper.associated.menu = document.querySelector(".dropdownMenu_day");


/****
state
*****/
UP.component.dayDropper.state = {};
UP.component.dayDropper.state.open = false;


/********
functions
*********/
UP.component.dayDropper.func = {};

/*****
ACTION
******/
UP.component.dayDropper.func.action_closeDropdown = ()=>{
    if(UP.component.dayDropper.state.open === true){
        UP.component.dayDropper.associated.menu.classList.add("displayNone");
        UP.component.dayDropper.state.open = false;
    };
};


UP.component.dayDropper.func.action_openDropdown = ()=>{
    if(UP.component.dayDropper.state.open === false){
        event.stopPropagation();
        UP.component.dayDropper.associated.menu.classList.remove("displayNone");
        UP.component.dayDropper.state.open = true;
    };
};


/****
APPLY
*****/
UP.component.dayDropper.func.apply_currDayStr_toElement = ()=>{
    let currDay_str  = UP.component.dayDropper.func.get_currDay_str();
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = currDay_str;
};


/*****
CREATE
******/
UP.component.dayDropper.func.create_append_htmlInsideDropdown = ()=>{
    let html           = "";
    let lookAheadRange = 365;
    let now_ms         = Date.now();
    let incr_ms        = now_ms;
    let msInADay       = 86400000;

    for(let i = 0; i < lookAheadRange; i++){
        let writtenDate = `${new Date(incr_ms)}`;
        let splits      = writtenDate.split(" ");
		let month       = splits[1];
		let dayName     = splits[0];
		let dayNum      = splits[2];

        let numItemsString;
        // not found
        numItemsString = ``;
        // else
        // numItemsString = `${} items - `;

        let daysUntilString;
        if(i === 0){ /* special case */
            daysUntilString = `today`;
        }
        else
        if(i === 1){ /* special case */
            daysUntilString = `in 1 day`;
        }
        else{ /* norm */
            let daysUntil = (incr_ms - now_ms) / msInADay ;
            daysUntilString = `in ${daysUntil} days`;
        };

        let html_piece = `
            <p ms="${incr_ms}">
                <span class="dd_date">
                    <span>${dayName}</span>
                    <span>${month}</span>
                    <span>${dayNum}</span>
                </span>
                <span class="dd_info">
                    <span>(${numItemsString}${daysUntilString})</span>
                </span>
            </p>
        `;

        html    += html_piece;
        incr_ms += msInADay;

        if(i === lookAheadRange - 1){
            UP.component.dayDropper.associated.menu.insertAdjacentHTML("beforeend", html);
        };
    };
};


/**
GET
***/
UP.component.dayDropper.func.get_currDay_str = ()=>{
    let now_ms          = Date.now();
    let now_full        = `${new Date(now_ms)}`;
    let splits          = now_full.split(" ");
	let curr_month      = splits[1];
	let curr_dayName    = splits[0];
	let curr_dayNum     = splits[2];
    let currDay_text = `${curr_dayName} ${curr_month} ${curr_dayNum}`;
    return currDay_text;
};


/***
GIVE
****/
UP.component.dayDropper.func.give_body_listenerToCloseDropdown = ()=>{
    let docBody = document.body;
        docBody.addEventListener('click', ()=>{
            UP.component.dayDropper.func.action_closeDropdown();
        });
};


/***
INIT
****/
UP.component.dayDropper.func.init_component = async()=>{
    UP.component.dayDropper.func.apply_currDayStr_toElement();
    UP.component.dayDropper.func.create_append_htmlInsideDropdown();
    UP.component.dayDropper.func.give_body_listenerToCloseDropdown();
};




/*

TABLE OF CONTENTS

UP.component.dayDropper = {};

UP.component.dayDropper.associated = {};

UP.component.dayDropper.state = {};

UP.component.dayDropper.func = {};
    ACTION
        UP.component.dayDropper.func.action_closeDropdown = ()=>{
        UP.component.dayDropper.func.action_openDropdown = ()=>{

    APPLY
        UP.component.dayDropper.func.apply_currDayStr_toElement = ()=>{

    CREATE
        UP.component.dayDropper.func.create_append_htmlInsideDropdown = ()=>{

    GET
        UP.component.dayDropper.func.get_currDay_str = ()=>{

    GIVE
        UP.component.dayDropper.func.give_body_listenerToCloseDropdown = ()=>{

    INIT
        UP.component.dayDropper.func.init_component = async()=>{

*/
