/*

app.component.item = {};
app.component.item.objs = [];
app.component.item.state = {};
app.component.item.func = {};

app.component.item.func.action.submit = ()=>{

app.component.item.func.create.componentObj = (inputObj)=>{

app.component.item.func.transition.hideItem = ()=>{
app.component.item.func.transition.hideItem_blurTile = ()=>{
app.component.item.func.transition.hideItem_field = (item)=>{
app.component.item.func.transition.hideItem_headerTime = (item)=>{
app.component.item.func.transition.hideItem_min = (item)=>{
app.component.item.func.transition.hideItem_tile = ()=>{
app.component.item.func.transition.hideItem_trash = (item)=>{
app.component.item.func.transition.removeItem = ()=>{
app.component.item.func.transition.removeItem_blurTile = ()=>{
app.component.item.func.transition.removeItem_headerTime = ()=>{
app.component.item.func.transition.showItem = (item)=>{
app.component.item.func.transition.showItem_blurTile = ()=>{
app.component.item.func.transition.showItem_field = (tile)=>{
app.component.item.func.transition.showItem_tile = (tile)=>{
app.component.item.func.transition.showItem_trash = (tile)=>{


*/

/* COMPONENT */
app.component.item = {};

/* OBJS */
app.component.item.objs = [];

/* STATE */
app.component.item.state = {};
app.component.item.state.selected = [false, null];

/* FUNC */
app.component.item.func = {};


/* ACTION */
app.component.item.func.action = {};

app.component.item.func.action.submit = ()=>{
    let fieldValue = app.component.timeSlot.state.editting[1].children[1].value;
    if(fieldValue.trim().length > 0 // field NOT empty
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.hideItem();
        // add to data store. create.componentObj()
        // obj start state selected true. Component state change as well.
    }
    else
    if(fieldValue.trim().length === 0 // field empty
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.removeItem();
    };
};


/* CREATE */
app.component.item.func.create = {};

app.component.item.func.create.componentObj = (inputObj)=>{
    // given as argument (1)item text (2)associated day (3)associated timeSlot
    // a component obj is created when an item is successfully submitted
    let obj = {};
        obj.associated = {};
        obj.associated.day      = null; // get from dayDropper selected ("7 Feb 20")
        obj.associated.timeSlot = null; // get from timeSlot element ("4am")
        obj.setting = {};
        obj.setting.text = ""; // get from item input value ("code")
        obj.state = {};
        obj.state.selected = false;
};


/* TRANSITION */
app.component.item.func.transition = {};

app.component.item.func.transition.hideItem = ()=>{
    let item = app.component.timeSlot.state.editting[1];
    // TRANSITION
    app.component.item.func.transition.hideItem_blurTile();
    app.component.item.func.transition.hideItem_field(item);
    app.component.item.func.transition.hideItem_headerTime(item);
    app.component.item.func.transition.hideItem_min(item);
    app.component.item.func.transition.hideItem_tile();
    app.component.item.func.transition.hideItem_trash(item);
    // STATE - (timeSlot edittingItem OFF)
    app.component.timeSlot.state.editting = [false, null];
};

app.component.item.func.transition.hideItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};

app.component.item.func.transition.hideItem_field = (item)=>{
    let field = item.children[1];
        field.classList.add("background_main");
        field.classList.remove("background_white");
        field.setAttribute("readonly", "readonly");
};

app.component.item.func.transition.hideItem_headerTime = (item)=>{
    let headerTime = item.parentNode.previousElementSibling.children[0]
        headerTime.classList.remove("zIndex2");
};

app.component.item.func.transition.hideItem_min = (item)=>{
    let min = item.children[2];
        min.classList.add("displayNone");
};

app.component.item.func.transition.hideItem_tile = ()=>{
    let tile = app.component.timeSlot.state.editting[1];
        tile.classList.add("hideItemTile");
        tile.classList.remove("zIndex2");
};

app.component.item.func.transition.hideItem_trash = (item)=>{
    let trash = item.children[3];
        trash.classList.add("displayNone");
};


app.component.item.func.transition.removeItem = ()=>{
    event.stopPropagation();
    /* TRANSITION */
    app.component.item.func.transition.removeItem_blurTile();
    app.component.item.func.transition.removeItem_headerTime();
    /* REMOVE ELEMENT */
    app.component.timeSlot.state.editting[1].remove();
    /* STATE - (editting OFF) */
    app.component.timeSlot.state.editting = [false, null];
};

app.component.item.func.transition.removeItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};

app.component.item.func.transition.removeItem_headerTime = ()=>{
    let timeHeader = app.component.timeSlot.state.editting[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
};


app.component.item.func.transition.showItem = (item)=>{
    event.stopPropagation();
    // CASE = if state editing off
    if(app.component.timeSlot.state.editting[0] === false){
        // STATE (timeSlot editting ON)
        app.component.timeSlot.state.editting = [true, item];
        // TRANSITION
        app.component.item.func.transition.showItem_blurTile();
        app.component.item.func.transition.showItem_field(item);
        app.component.item.func.transition.showItem_tile(item);
        app.component.item.func.transition.showItem_trash(item);
    };
};

app.component.item.func.transition.showItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.remove("displayNone");
};

app.component.item.func.transition.showItem_field = (tile)=>{
    let field = tile.children[1];
        field.classList.add("background_white");
        field.classList.remove("background_main");
        field.removeAttribute("readonly");
        field.blur();
};

app.component.item.func.transition.showItem_tile = (tile)=>{
    tile.classList.remove("hideItemTile");
    tile.classList.add("zIndex2");
};

app.component.item.func.transition.showItem_trash = (tile)=>{
    let trash = tile.children[3];
        trash.classList.remove("displayNone");
};
