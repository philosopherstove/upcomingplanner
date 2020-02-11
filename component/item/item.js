app.component.item = {};
app.component.item.objs = [];
app.component.item.state = {};
app.component.item.state.selected = [false, null];
app.component.item.func = {};


/* function hotkeys:
app.component.item.func.action.submit = ()=>{
app.component.item.func.create.componentObj = (item)=>{
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


/* ACTION */
app.component.item.func.action = {};

app.component.item.func.action.submit = ()=>{
    let fieldValue = app.component.item.state.selected[1].children[1].value;
    if(fieldValue.trim().length > 0 // field NOT empty
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.hideItem();
        // create.componentObj() add to objs and data store
        app.component.item.func.create.componentObj(app.component.item.state.selected[1]);
        // state - timeSlot (active OFF)
        app.component.timeSlot.state.active = false;
        /* state - item (selected OFF) */
        app.component.item.state.selected = [false, null];
    }
    else
    if(fieldValue.trim().length === 0 // field empty
    &&(event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.removeItem();
        // remove componentObj from objs and data store
        /* state - item (selected OFF) */
        app.component.item.state.selected = [false, null];
    };
};


/* CREATE */
app.component.item.func.create = {};

app.component.item.func.create.componentObj = (item)=>{
    let obj = {};
        obj.associated = {};
        obj.associated.day      = app.component.dayDropper.setting.day[0];
        obj.associated.timeSlot = item.parentNode.previousElementSibling.children[0].getAttribute("data_hour"); // 24hr
        obj.setting = {};
        obj.setting.text = item.children[1].value;
        obj.state = {};
        obj.state.selected = false;
    app.component.item.objs.push(obj);
};


/* TRANSITION */
app.component.item.func.transition = {};

app.component.item.func.transition.hideItem = ()=>{
    let item = app.component.item.state.selected[1];
    app.component.item.func.transition.hideItem_blurTile();
    app.component.item.func.transition.hideItem_field(item);
    app.component.item.func.transition.hideItem_headerTime(item);
    app.component.item.func.transition.hideItem_min(item);
    app.component.item.func.transition.hideItem_tile();
    app.component.item.func.transition.hideItem_trash(item);
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
    let tile = app.component.item.state.selected[1];
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
    /* REMOVE OBJ (must happen before remove element)*/
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.setting.text === app.component.item.state.selected[1].children[1].value){

            app.component.item.objs.splice(i,1);
        };
    };
    /* REMOVE ELEMENT */
    app.component.item.state.selected[1].remove();
    /* STATE - (editting OFF) */
    app.component.timeSlot.state.active = false;
    /* STATE - item (selected OFF) */
    app.component.item.state.selected = [false, null];
};

app.component.item.func.transition.removeItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};

app.component.item.func.transition.removeItem_headerTime = ()=>{
    let timeHeader = app.component.item.state.selected[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
};


app.component.item.func.transition.showItem = (item)=>{
    event.stopPropagation();
    // CASE = if state editing off
    if(app.component.timeSlot.state.active === false){
        // STATE - timeSlot (editting ON)
        app.component.timeSlot.state.active = true;
        // STATE - item (selected ON)
        app.component.item.state.selected = [true, item];
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
