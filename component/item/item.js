app.component.item = {};
app.component.item.objs = [];
app.component.item.state = {};
app.component.item.state.selected = [false, null];
app.component.item.func = {};
app.component.item.func.action     = {};
app.component.item.func.create     = {};
app.component.item.func.get        = {};
app.component.item.func.give       = {};
app.component.item.func.init       = {};
app.component.item.func.remove     = {};
app.component.item.func.transition = {};

/* func hotkeys:
app.component.item.func.create.componentObj = (item)=>{
app.component.item.func.get.itemObj_from_createdId = (createdId)=>{
app.component.item.func.give.item_to_dataStore = ()=>{
app.component.item.func.init.component = ()=>{
app.component.item.func.remove.itemObj_fromLocalStorage = ()=>{
app.component.item.func.remove.itemObj_fromItemObjs = ()=>{
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

/* CREATE */
app.component.item.func.create.componentObj = (item)=>{
    let obj = {};
        obj.associated = {};
        obj.associated.createdId = Number(item.getAttribute("createdId"));
        obj.associated.day       = app.component.dayDropper.setting.day[0];
        obj.associated.element   = item;
        obj.associated.timeSlot  = item.parentNode.previousElementSibling.children[0].getAttribute("data_hour"); // 24hr
        obj.setting = {};
        obj.setting.text = item.children[1].value;
        obj.state = {};
        obj.state.selected = false;
    app.component.item.objs.push(obj);
    // push to data store. For now, localStorage.
    let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
        localStorageObj.items.push(obj);
    window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
};

/* GET */
app.component.item.func.get.itemObj_from_createdId = (createdId)=>{
    return new Promise((resolve)=>{
        console.log('created id', createdId);
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === createdId){
                resolve(obj);
            };
        };
    });
};

/* GIVE */
app.component.item.func.give.item_to_dataStore = ()=>{
    let fieldValue = app.component.item.state.selected[1].children[1].value;
    if( fieldValue.trim().length > 0 // field NOT empty
    && (event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.create.componentObj(app.component.item.state.selected[1]); // add to objs array and data store
        app.component.item.func.transition.hideItem(); // needs to fire after create.componentObj, because the transition turns state off
    }
    else
    if( fieldValue.trim().length === 0 // field empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.removeItem();
    };
};

/* INIT */
app.component.item.func.init.component = ()=>{
    // get item info from localStorage into item component objs array
    let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
    app.component.item.objs = localStorageObj.items;
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    // populate relevant items
    app.component.dayDropper.func.createAppend.itemsForDay(app.component.dayDropper.setting.day[0]);
    // numberOfItemsString in dropdown

};

/* REMOVE */
app.component.item.func.remove.itemObj_fromLocalStorage = ()=>{
    let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
    let localStorageItemObjs = localStorageObj.items;
    for(i in localStorageItemObjs){
        let obj = localStorageItemObjs[i];
        if( obj.associated.createdId === Number(app.component.item.state.selected[1].getAttribute("createdId"))){
            localStorageItemObjs.splice(i,1);
            localStorageObj.items = localStorageItemObjs;
            window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
        };
    };
};

app.component.item.func.remove.itemObj_fromItemObjs = ()=>{
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.createdId === Number(app.component.item.state.selected[1].getAttribute("createdId"))){
            app.component.item.objs.splice(i,1);
        };
    };
};

/* TRANSITION */
app.component.item.func.transition.hideItem = ()=>{
    let item = app.component.item.state.selected[1];
    app.component.item.func.transition.hideItem_blurTile();
    app.component.item.func.transition.hideItem_field(item);
    app.component.item.func.transition.hideItem_headerTime(item);
    app.component.item.func.transition.hideItem_min(item);
    app.component.item.func.transition.hideItem_tile();
    app.component.item.func.transition.hideItem_trash(item);
    // STATES - timeSlot (active OFF), item (selected OFF)
    app.component.timeSlot.state.active = false;
    app.component.item.state.selected   = [false, null];
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
    /* REMOVE - itemObj from localStorage & itemObjs */
    app.component.item.func.remove.itemObj_fromLocalStorage(); // must happen before removing obj from objs
    app.component.item.func.remove.itemObj_fromItemObjs();
    /* REMOVE - element */
    app.component.item.state.selected[1].remove();
    /* STATES - timeSlot (editting OFF, item (selected OFF)) */
    app.component.timeSlot.state.active = false;
    app.component.item.state.selected   = [false, null];
};

app.component.item.func.transition.removeItem_blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.classList.add("displayNone");
};

app.component.item.func.transition.removeItem_headerTime = ()=>{
    let timeHeader = app.component.item.state.selected[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
};

app.component.item.func.transition.showItem = async(item)=>{
    event.stopPropagation();
    // CASE = if state editing off
    if( app.component.timeSlot.state.active === false){
        // STATES - timeSlot (active ON), item (selected ON)
        app.component.timeSlot.state.active = true;
        app.component.item.state.selected   = [true, item];
        // TRANSITIONS
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
