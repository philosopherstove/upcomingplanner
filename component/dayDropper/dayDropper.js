/*

app.component.dayDropper = {};
app.component.dayDropper.associated = {};
app.component.dayDropper.state = {};
app.component.dayDropper.func = {};

app.component.dayDropper.func.action.closeDropdown = ()=>{
app.component.dayDropper.func.action.openDropdown = ()=>{

app.component.dayDropper.func.apply.currDayStr_toElement = ()=>{

app.component.dayDropper.func.createAppend.htmlInsideDropdown = ()=>{

app.component.dayDropper.func.get.currDay_str = ()=>{

app.component.dayDropper.func.give.body_listenerToCloseDropdown = ()=>{

app.component.dayDropper.func.init.component = async()=>{

*/


/* COMPONENT */
app.component.dayDropper = {};


/* ASSOCIATED */
app.component.dayDropper.associated = {};
app.component.dayDropper.associated.menu = document.querySelector(".dropdownMenu_day");


/* STATE */
app.component.dayDropper.state = {};
app.component.dayDropper.state.day  = null;
app.component.dayDropper.state.open = false;


/* FUNC */
app.component.dayDropper.func = {};


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


/* APPLY */
app.component.dayDropper.func.apply = {};
app.component.dayDropper.func.apply.currDayStr_toElement = ()=>{
    let currDay_str  = app.component.dayDropper.func.get.currDay_str();
    let currDay_text = document.querySelector(".currDay_text");
        currDay_text.innerHTML = currDay_str;
};


/* CREATEAPPEND */
app.component.dayDropper.func.createAppend = {};
app.component.dayDropper.func.createAppend.htmlInsideDropdown = ()=>{
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
            app.component.dayDropper.associated.menu.insertAdjacentHTML("beforeend", html);
        };
    };
};


/* GET */
app.component.dayDropper.func.get = {};
app.component.dayDropper.func.get.currDay_str = ()=>{
    let now_ms          = Date.now();
    let now_full        = `${new Date(now_ms)}`;
    let splits          = now_full.split(" ");
	let curr_month      = splits[1];
	let curr_dayName    = splits[0];
	let curr_dayNum     = splits[2];
    let currDay_text = `${curr_dayName} ${curr_month} ${curr_dayNum}`;
    return currDay_text;
};


/* GIVE */
app.component.dayDropper.func.give = {};
app.component.dayDropper.func.give.body_listenerToCloseDropdown = ()=>{
    let docBody = document.body;
        docBody.addEventListener('click', ()=>{
            app.component.dayDropper.func.action.closeDropdown();
        });
};


/* INIT */
app.component.dayDropper.func.init = {};
app.component.dayDropper.func.init.component = async()=>{
    app.component.dayDropper.func.apply.currDayStr_toElement();
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    app.component.dayDropper.func.give.body_listenerToCloseDropdown();
    /* State - day - defaults to current day */
    app.component.dayDropper.state.day = app.component.dayDropper.func.get.currDay_str();
};
