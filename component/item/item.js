app.component.item = {};
app.component.item.objs = [];
app.component.item.state = {};
app.component.item.state.selected = [false, null];
app.component.item.func = {};
app.component.item.func.create     = {};
app.component.item.func.get        = {};
app.component.item.func.give       = {};
app.component.item.func.init       = {};
app.component.item.func.is         = {};
app.component.item.func.remove     = {};
app.component.item.func.set        = {};
app.component.item.func.transition = {};

/* func hotkeys:
app.component.item.func.create.componentObj = (item)=>{
app.component.item.func.get.isObjExist = ()=>{
app.component.item.func.get.itemObj_from_createdId = (createdId)=>{
app.component.item.func.give.item_to_dataStore = async()=>{
app.component.item.func.init.component = ()=>{
app.component.item.func.remove.itemObj = ()=>{
app.component.item.func.remove.itemElementFromViewPage = ()=>{
app.component.item.func.remove.itemObj_from_itemObjs = ()=>{
app.component.item.func.remove.itemObj_from_localStorage = ()=>{
app.component.item.func.remove.oldItemObjs_from_itemObjs = ()=>{
app.component.item.func.remove.oldItemObjs_from_localStorage = ()=>{
app.component.item.func.transition.hideItem = ()=>{
app.component.item.func.transition.hideItem_field = (item)=>{
app.component.item.func.transition.hideItem_headerTime = (item)=>{
app.component.item.func.transition.hideItem_min = (item)=>{
app.component.item.func.transition.hideItem_tile = ()=>{
app.component.item.func.transition.hideItem_trash = (item)=>{
app.component.item.func.transition.removeItem = async()=>{
app.component.item.func.transition.removeItem_headerTime = ()=>{
app.component.item.func.transition.showItem = async(item)=>{
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
        obj.associated.timeSlot  = item.parentNode.previousElementSibling.children[0].getAttribute("data_hour"); // 24hr
        obj.setting = {};
        obj.setting.text = item.children[1].value;
        obj.state = {};
        obj.state.selected = false;
    // push to objs
    app.component.item.objs.push(obj);
    // push to data store(for now, that's localStorage)
    let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
        localStorageObj.items.push(obj);
    window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
};

/* GET */
app.component.item.func.get.isObjExist = ()=>{
    return new Promise((resolve)=>{
        let selectedItem = app.component.item.state.selected[1];
        if(app.component.item.objs.length === 0){
            resolve([false, null]);
        };
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === Number(selectedItem.getAttribute("createdId"))){
                resolve([true, obj])
            };
            if(Number(i) === app.component.item.objs.length-1){ // end of loop
                resolve([false, null]);
            };
        };
    });
};

app.component.item.func.get.itemObj_from_createdId = (createdId)=>{
    return new Promise((resolve)=>{
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === createdId){
                resolve(obj);
            };
        };
    });
};

/* GIVE */
app.component.item.func.give.item_to_dataStore = async()=>{
    event.stopPropagation();
    let fieldValue = app.component.item.state.selected[1].children[1].value;
    if( fieldValue.trim().length > 0 // field NOT empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        let isObjExist = await app.component.item.func.get.isObjExist();
        if( isObjExist[0] === true){ // update old componentObj
            let selectedObj = isObjExist[1];
            await app.component.item.func.set.componentObj_in_objs(selectedObj, fieldValue);
            await app.component.item.func.set.componentObj_in_localStorage(selectedObj, fieldValue);
        }
        else{
            // CREATE       componentObj
            // CREATEAPPEND dayDropperText, htmlInsideDropdown
            // GIVE         height_to_scrollBall
            app.component.item.func.create.componentObj(app.component.item.state.selected[1]); // add to objs array and data store
            app.component.dayDropper.func.createAppend.dayDropperText(app.component.dayDropper.setting.day[0]);
            app.component.dayDropper.func.createAppend.htmlInsideDropdown();
            app.component.timeSlot.func.give.height_to_scrollBall();
        };
        app.component.item.func.transition.hideItem(); // needs to fire after create.componentObj, because the transition turns state off
        app.component.timeSlot.func.remove.blurTile();
    }
    else
    if( fieldValue.trim().length === 0 // field empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.removeItem();
    };
};

/* INIT */
app.component.item.func.init.component = ()=>{
    let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
    app.component.item.objs = localStorageObj.items; // move localStorage item info into item objs
    app.component.dayDropper.func.createAppend.dayDropperText();
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    app.component.dayDropper.func.createAppend.itemsForDay(app.component.dayDropper.setting.day[0]);
    app.component.item.func.remove.oldItemObjs_from_itemObjs();
    app.component.item.func.remove.oldItemObjs_from_localStorage();
};

/* is */

app.component.item.func.is.itemsUnderViewPageDay = ()=>{
    let createdId = Number(app.component.item.state.selected[1].getAttribute("createdId"));
    let dayId     = null;
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.createdId === createdId){
            dayId = obj.associated.day;
        };
        if(Number(i) === app.component.item.objs.length-1
        && dayId !== null){
            let itemsUnderViewPageDay = document.querySelectorAll(`div.itemTile_vl[dayMS="${dayId}"]`);
            if( itemsUnderViewPageDay.length === 0){ // no itemsUnderHour
                return false;
            }
            else{
                return true;
            };
        };
    };
}

app.component.item.func.is.itemsUnderViewPageHour = ()=>{
    let createdId = Number(app.component.item.state.selected[1].getAttribute("createdId"));
    let hourId     = null;
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.createdId === createdId){
            hourId = obj.associated.timeSlot;
        };
        if(Number(i) === app.component.item.objs.length-1
        && hourId !== null){
            let itemsUnderViewPageDay = document.querySelectorAll(`div.itemTile_vl[data_hour="${hourId}"]`);
            if( itemsUnderViewPageDay.length === 0){ // no itemsUnderHour
                return false;
            }
            else{
                return true;
            };
        };
    };
}

/* REMOVE */
app.component.item.func.remove.dayHeader = (dayId)=>{
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`);
        dayHeader.remove();
};

app.component.item.func.remove.hourHeader = (hourId)=>{
    let hourHeader = document.querySelector(`.dayBlock > p.hourHeader_vl[data_hour="${hourId}"]`);
        hourHeader.remove();
};

app.component.item.func.remove.itemElementFromViewPage = ()=>{
    return new Promise((resolve)=>{
        let createdId               = Number(app.component.item.state.selected[1].getAttribute("createdId"));
        let itemElementFromViewPage = document.querySelector(`.itemTile_vl[createdId="${createdId}"]`);
        let dayId                   = Number(itemElementFromViewPage.getAttribute("dayMS"));
        let hourId                  = Number(itemElementFromViewPage.getAttribute("data_hour"));
        itemElementFromViewPage.remove();
        if(app.component.item.func.is.itemsUnderViewPageHour() === false){
            app.component.item.func.remove.hourHeader(hourId);
            resolve();
        };
        if( app.component.item.func.is.itemsUnderViewPageDay() === false){
            app.component.item.func.remove.dayHeader(dayId)
            resolve();
        };
    });
};

app.component.item.func.remove.itemObj = ()=>{
    return new Promise(async(resolve)=>{
        await app.component.item.func.remove.itemObj_from_localStorage();
        await app.component.item.func.remove.itemObj_from_itemObjs();
        resolve();
    });
};

app.component.item.func.remove.itemObj_from_itemObjs = ()=>{
    return new Promise((resolve)=>{
        if(app.component.item.objs.length === 0){ // no objs
            resolve();
        };
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === Number(app.component.item.state.selected[1].getAttribute("createdId"))){
                app.component.item.objs.splice(i,1);
                resolve();
            };
            if(Number(i) === app.component.item.objs.length-1){ // end of loop, no match found
                resolve();
            };
        };
    });
};

app.component.item.func.remove.itemObj_from_localStorage = ()=>{
    return new Promise((resolve)=>{
        let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
        let localStorageItemObjs = localStorageObj.items;
        if( localStorageItemObjs.length === 0){ // no objs
            resolve();
        };
        for(i in localStorageItemObjs){
            let obj = localStorageItemObjs[i];
            if( obj.associated.createdId === Number(app.component.item.state.selected[1].getAttribute("createdId"))){
                localStorageItemObjs.splice(i,1);
                localStorageObj.items = localStorageItemObjs;
                window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
                resolve();
            };
            if(Number(i) === localStorageItemObjs.length-1){ // end of loop, no match found
                resolve();
            };
        };
    });
};

app.component.item.func.remove.oldItemObjs_from_itemObjs = ()=>{
    let startOfToday_ms = app.component.dayDropper.setting.day[0];
    for(let i = app.component.item.objs.length-1; i > -1; i--){
        let obj = app.component.item.objs[i];
        if( obj.associated.day < startOfToday_ms){
            app.component.item.objs.splice(i,1);
        };
    };
};

app.component.item.func.remove.oldItemObjs_from_localStorage = ()=>{
    let startOfToday_ms      = app.component.dayDropper.setting.day[0];
    let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
    let localStorageItemObjs = localStorageObj.items;
    for(let i = localStorageItemObjs.length-1; i > -1; i--){
        let obj = localStorageItemObjs[i];
        if( obj.associated.day < startOfToday_ms){
            localStorageItemObjs.splice(i,1);
        };
        if(i === 0){ // end of loop, update localStorage
            localStorageObj.items = localStorageItemObjs;
            window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
        };
    };
};

/* SET */
app.component.item.func.set.componentObj_in_objs = (selectedObj, fieldValue)=>{
    return new Promise((resolve)=>{
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if(obj.associated.createdId === selectedObj.associated.createdId){
                obj.setting.text = fieldValue;
                resolve();
            };
        };
    });
};

app.component.item.func.set.componentObj_in_localStorage = (selectedObj, fieldValue)=>{
    return new Promise((resolve)=>{
        let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
        let localStorageItemObjs = localStorageObj.items;
        for(i in localStorageItemObjs){
            let obj = localStorageItemObjs[i];
            if( obj.associated.createdId === selectedObj.associated.createdId){
                obj.setting.text = fieldValue;
                localStorageObj.items = localStorageItemObjs;
                window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
                resolve();
            };
        };
    });
};

/* TRANSITION */
app.component.item.func.transition.hideItem = ()=>{
    /* TRANSITION - blurTile, field, headerTime, min, tile, trash elements*/
    let item = app.component.item.state.selected[1];
    app.component.item.func.transition.hideItem_field(item);
    app.component.item.func.transition.hideItem_headerTime(item);
    app.component.item.func.transition.hideItem_min(item);
    app.component.item.func.transition.hideItem_tile();
    app.component.item.func.transition.hideItem_trash(item);
    /* STATE - timeSlot(active OFF), item(selected OFF) */
    app.component.timeSlot.state.active = false;
    app.component.item.state.selected   = [false, null];
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

app.component.item.func.transition.removeItem = async()=>{
    event.stopPropagation();
    /* TRANSITION - headerTime */
    app.component.item.func.transition.removeItem_headerTime();
    /* CREATEAPPEND - daydropper text, htmlInsideDropdown  */
    app.component.dayDropper.func.createAppend.dayDropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    /* REMOVE - item, blurTile */
    app.component.item.state.selected[1].remove();
    app.component.timeSlot.func.remove.blurTile();
    /* REMOVE - itemElement from viewPage */
    // await app.component.item.func.remove.itemElementFromViewPage();
    app.component.item.func.remove.itemElementFromViewPage();
    /* GIVE - height to scrollBall */
    app.component.timeSlot.func.give.height_to_scrollBall(); // must happen after item element removal, since scrollBall height takes into account the number of item elements present
    /* REMOVE - itemObj */
    await app.component.item.func.remove.itemObj();
    /* STATE - timeSlot(editting OFF), item(selected OFF)) */
    app.component.timeSlot.state.active = false;
    app.component.item.state.selected   = [false, null];
};

app.component.item.func.transition.removeItem_headerTime = ()=>{
    let timeHeader = app.component.item.state.selected[1].parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
};

app.component.item.func.transition.showItem = async(item)=>{
    event.stopPropagation();
    // if timeSlot(active OFF)
    if( app.component.timeSlot.state.active === false){
        /* STATE - timeSlot(active ON), item(selected ON) */
        app.component.timeSlot.state.active = true;
        app.component.item.state.selected   = [true, item];
        /* TRANSITION - field, tile, trash elements */
        app.component.item.func.transition.showItem_field(item);
        app.component.item.func.transition.showItem_tile(item);
        app.component.item.func.transition.showItem_trash(item);
        /* CREATEAPPEND - blurTile */
        app.component.timeSlot.func.createAppend.blurTile();
    };
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
