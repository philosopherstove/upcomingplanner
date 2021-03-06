/***
ITEM
****/
app.component.item = {};
/***
OBJS
****/
app.component.item.objs = [];
/****
STATE
*****/
app.component.item.state          = {};
app.component.item.state.creating = [false, false, null];
app.component.item.state.selected = [false, false, null];
/***
FUNC
****/
app.component.item.func            = {};
/*********
data CRUDS
**********/
app.component.item.func.create     = {}; // C
app.component.item.func.createSet  = {};
app.component.item.func.retrieve   = {}; // R
app.component.item.func.update     = {}; // U
app.component.item.func.delete     = {}; // D
app.component.item.func.set        = {}; // S
/*********
view CRUDS
**********/
app.component.item.func.make       = {}; // C
app.component.item.func.makeAppend = {};
app.component.item.func.get        = {}; // R
app.component.item.func.give       = {}; // U
app.component.item.func.remove     = {}; // D
app.component.item.func.append     = {}; // S
/****
other
*****/
app.component.item.func.event      = {};
app.component.item.func.init       = {};
app.component.item.func.is         = {};
app.component.item.func.sort       = {};
app.component.item.func.transition = {};


/* func hotkeys

**********
data CRUDS
**********
CREATE

CREATESET
app.component.item.func.createSet.itemObj = (item)=>{
RETRIEVE
app.component.item.func.retrieve.itemObj_withCreatedId = (createdId)=>{
app.component.item.func.retrieve.itemObjs = ()=>{
UPDATE
app.component.item.func.update.itemObj_inItemObjs = (selectedObj, fieldValue)=>{
app.component.item.func.update.itemObj_inLocalStorage = (selectedObj, fieldValue)=>{
app.component.item.func.update.itemObjs_inLocalStorage = ()=>{
DELETE
app.component.item.func.delete.itemObj = ()=>{
app.component.item.func.delete.itemObj_fromItemObjs = ()=>{
app.component.item.func.delete.itemObj_fromLocalStorage = ()=>{
app.component.item.func.delete.oldItemObjs_fromItemObjs = ()=>{
SET


**********
view CRUDS
**********
MAKE
app.component.item.func.make.dayHeaderHTML = (itemObj)=>{
app.component.item.func.make.hourHeaderHTML = (itemObj)=>{
app.component.item.func.make.itemHTML = (itemObj, timeSlot)=>{
app.component.item.func.make.minuteBlock = (createdId, dayId, hourId, minuteId)=>{
MAKEAPPEND
app.component.item.func.makeAppend.blurTile = (itemElement)=>{
app.component.item.func.makeAppend.item_toAddPage = (itemObj, location)=>{
app.component.item.func.makeAppend.item_toViewPage = async()=>{
app.component.item.func.makeAppend.item_toViewPage_afterSort = (obj)=>{
app.component.item.func.makeAppend.items_onAddPage_forDay = (dayId)=>{
app.component.item.func.makeAppend.items_onViewPage = async()=>{
GET
app.component.item.func.get.dayText = (dayId)=>{
GIVE
app.component.item.func.give.blurTileItem_hidingAttributes = ()=>{
app.component.item.func.give.blurTileItem_showingAttributes = ()=>{
app.component.item.func.give.dayHeader_hidingAttributes = (itemElement)=>{
app.component.item.func.give.dayHeader_showingAttributes = (itemElement)=>{
app.component.item.func.give.dayInfo_onViewPage_updatedInfo = async(dayId)=>{
app.component.item.func.give.field_focus = (timeSlot)=>{
app.component.item.func.give.field_hidingAttributes = (itemElement)=>{
app.component.item.func.give.field_showingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_hidingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_showingAttributes = (itemElement)=>{
app.component.item.func.give.itemField_value = ()=>{
app.component.item.func.give.minute_hidingAttributes = (itemElement)=>{
app.component.item.func.give.minute_showingAttributes = (itemElement)=>{
app.component.item.func.give.minute_value = (itemId, minuteId)=>{
app.component.item.func.give.minuteMenu_hidingAttributes = (itemElement)=>{
app.component.item.func.give.minuteMenu_showingAttributes = (itemElement)=>{
app.component.item.func.give.selectedMinute_border = (createdId, minuteId)=>{
app.component.item.func.give.tile_hidingAttributes = (itemElement)=>{
app.component.item.func.give.tile_showingAttributes = (itemElement)=>{
app.component.item.func.give.trash_hidingAttributes = (itemElement)=>{
app.component.item.func.give.trash_showingAttributes = (itemElement)=>{
REMOVE
app.component.item.func.remove.blurTile = ()=>{
app.component.item.func.remove.dayHeader = (dayId)=>{
app.component.item.func.remove.hourHeader = (hourId)=>{
app.component.item.func.remove.item = ()=>{
APPEND
app.component.item.func.append.itemTiles_resortedByMinute = ()=>{

*****
other
*****
EVENT
app.component.item.func.event.click_blurTileItem = ()=>{
app.component.item.func.event.click_minute = ()=>{
app.component.item.func.event.click_minuteSelect = async()=>{
app.component.item.func.event.postItem = async()=>{
INIT
app.component.item.func.init.component = async()=>{
IS
app.component.item.func.is.itemsUnderViewPageDay = ()=>{
app.component.item.func.is.itemsUnderViewPageHour = ()=>{
app.component.item.func.is.objExist = (itemId)=>{
SORT
app.component.item.func.sort.byDay_hour_ms = (a, b)=>{
app.component.item.func.sort.itemObjs_byTime = ()=>{
TRANSITION
app.component.item.func.transition.createItem = async(timeSlot)=>{
app.component.item.func.transition.hideItem = ()=>{
app.component.item.func.transition.removeItem = async()=>{
app.component.item.func.transition.showItem = (itemElement)=>{
*/


/*****
APPEND
******/
// resort append
app.component.item.func.append.itemTiles_resortedByMinute = ()=>{
    let dayId     = Number(app.component.item.state.selected[2].getAttribute("dayId"));
    let hourId    = Number(app.component.item.state.selected[2].getAttribute("hourId"));
    let itemTiles = document.querySelectorAll(`.itemTile[dayId="${dayId}"][hourId="${hourId}"]`);
    // remove - itemTiles
    for(x of itemTiles){
        x.remove();
    };
    // makeAppend - items for itemObjs matching day and hour id,
    for(x in app.component.item.objs){
        let obj = app.component.item.objs[x];
        if( obj.associated.dayId === dayId
        &&  obj.associated.hourId === hourId){
            app.component.item.func.makeAppend.item_toAddPage(obj, "beforeend");
            app.component.item.func.makeAppend.item_toViewPage_afterSort(obj);
        };
    };

    // for(let i = app.component.item.objs.length -1; i > -1; i--){ // reverse traverse
    //     let obj = app.component.item.objs[i];
    //     if( obj.associated.dayId === dayId
    //     &&  obj.associated.hourId === hourId){
    //         app.component.item.func.makeAppend.item_toViewPage_afterSort(obj);
    //     };
    // };

    // ... tricky thing is there are two appendDestinations, Q/ so how do you know which items go on which page?
    // ... A/ the itemObjs themselves contain day and hour id, so start a tally of append destinations

};



/********
CREATESET
*********/
app.component.item.func.createSet.itemObj = (item)=>{
    let obj                      = {};
        obj.associated           = {};
        obj.associated.createdId = Number(item.getAttribute("createdId"));
        obj.associated.dayId     = app.component.dayDropper.setting.day[0];
        obj.associated.hourId    = Number(item.parentNode.previousElementSibling.children[0].getAttribute("hourId")); // 24hr
        obj.associated.minuteId  = item.getAttribute("minuteId");
        obj.setting              = {};
        obj.setting.text         = item.children[1].value;
        obj.state                = {};
        obj.state.selected       = false;
    /* push to objs */
    app.component.item.objs.push(obj);
    /* push to data store(for now, localStorage; later, DB) */
    let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
        localStorageObj.items.push(obj);
    window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
};

/*****
DELETE
******/
app.component.item.func.delete.itemObj = ()=>{
    return new Promise(async(resolve)=>{
        await app.component.item.func.delete.itemObj_fromLocalStorage();
        await app.component.item.func.delete.itemObj_fromItemObjs();
        resolve();
    });
};

app.component.item.func.delete.itemObj_fromItemObjs = ()=>{
    return new Promise((resolve)=>{
        if(app.component.item.objs.length === 0){ // no objs
            resolve();
        };
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === Number(app.component.item.state.selected[2].getAttribute("createdId"))){
                app.component.item.objs.splice(i,1);
                resolve();
                return;
            };
            if(Number(i) === app.component.item.objs.length-1){ // end of loop, no match found
                resolve();
            };
        };
    });
};

app.component.item.func.delete.itemObj_fromLocalStorage = ()=>{
    return new Promise((resolve)=>{
        let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
        let localStorageItemObjs = localStorageObj.items;
        if( localStorageItemObjs.length === 0){ // no objs
            resolve();
        };
        for(i in localStorageItemObjs){
            let obj = localStorageItemObjs[i];
            if( obj.associated.createdId === Number(app.component.item.state.selected[2].getAttribute("createdId"))){
                localStorageItemObjs.splice(i,1);
                localStorageObj.items = localStorageItemObjs;
                window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
                resolve();
                return;
            };
            if(Number(i) === localStorageItemObjs.length-1){ // end of loop, no match found
                resolve();
            };
        };
    });
};

app.component.item.func.delete.oldItemObjs_fromItemObjs = ()=>{
    return new Promise((resolve)=>{
        let startOfToday_ms = app.component.dayDropper.setting.day[0];
        if( app.component.item.objs.length === 0){
            resolve();
            return;
        };
        for(let i = 0; i < app.component.item.objs.length; i++){
            let obj = app.component.item.objs[i];
            if( obj.associated.dayId < startOfToday_ms){
                app.component.item.objs.splice(i,1);
                i--;
            };
            // If obj for today or later || end of loop => resolve
            if( obj.associated.dayId >= startOfToday_ms
            ||  i === app.component.item.objs.length-1){
                resolve();
            };
        };
    });
};

/****
EVENT
*****/
app.component.item.func.event.click_blurTileItem = ()=>{
    app.component.item.func.give.blurTileItem_hidingAttributes();
    app.component.item.func.give.minuteMenu_hidingAttributes();
};

app.component.item.func.event.click_minute = ()=>{
    if( app.component.item.state.selected[0] === true){
        let createdId = Number(app.component.item.state.selected[2].getAttribute("createdId"));
        let minuteId  = Number(app.component.item.state.selected[2].getAttribute("minuteId"));
        app.component.item.func.give.minuteMenu_showingAttributes();
        app.component.item.func.give.blurTileItem_showingAttributes();
        app.component.item.func.give.selectedMinute_border(createdId, minuteId);
    };
};

app.component.item.func.event.click_minuteSelect = async()=>{
    event.stopPropagation();
    let createdId = Number(event.target.getAttribute("createdId"));
    let minuteId  = Number(event.target.getAttribute("minuteId"));
    if( app.component.item.state.creating[0] === true){
        // console.log('unneeded');
        // let selectedObj = app.component.item.state.creating[2];
            // selectedObj.minuteId = minuteId;
    }
    else{
        let selectedObj = (await app.component.item.func.is.objExist(createdId))[1];
        /* update */
        await app.component.item.func.update.itemObj_inItemObjs({selectedObj: selectedObj, minuteId: minuteId});
        await app.component.item.func.update.itemObj_inLocalStorage({selectedObj: selectedObj, minuteId: minuteId});
    };
    /* sort - item objs */
    await app.component.item.func.sort.itemObjs_byTime();
    /* give */
    app.component.item.func.give.item_minuteId(createdId, minuteId);
    app.component.item.func.give.blurTileItem_hidingAttributes();
    app.component.item.func.give.minute_value(createdId, minuteId);
    app.component.item.func.give.minuteMenu_hidingAttributes();
    app.component.item.func.give.selectedMinute_border(createdId, minuteId);
};

app.component.item.func.event.postItem = async()=>{
    event.stopPropagation();
    if( app.component.item.state.selected[0] === true){
        let itemElement = app.component.item.state.selected[2];
        let fieldValue  = itemElement.children[1].value;
        if( fieldValue.trim().length > 0
        &&( event.key === "Enter"
        ||  event.target.classList.contains("blurTile")
        ||  event.target.classList.contains("dayText")
        ||  event.target.classList.contains("dayInfo")
        ||  event.target.classList.contains("hourHeader")
        ||  event.target.parentNode.classList.contains("hourHeader") )
        ){
            let isObjExist = await app.component.item.func.is.objExist(itemElement.getAttribute("createdId"));
            /* Create New Item */
            if( isObjExist[0] === false){
                app.component.item.func.createSet.itemObj(itemElement); // add to objs array and data store
                app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
                app.component.dayDropper.func.makeAppend.menuItems();
                app.component.item.func.makeAppend.item_toViewPage();
                app.component.item.func.give.dayInfo_onViewPage_updatedInfo(Number(itemElement.getAttribute("dayId")));
                let delay_forMobileKeyboardExit = setTimeout(()=>{
                    app.component.timeSlot.func.give.scrollBall_heightAttributes();
                },300);
            }
            /* Update Old Item */
            else{
                console.log('if no change, why update?');
                let itemObj = isObjExist[1];
                await app.component.item.func.update.itemObj_inItemObjs({selectedObj: itemObj, fieldValue: fieldValue});
                await app.component.item.func.update.itemObj_inLocalStorage({selectedObj: itemObj, fieldValue: fieldValue});
                app.component.item.func.give.itemField_value();
            };
            app.component.item.func.remove.blurTile();
            app.component.item.func.transition.hideItem(); // needs to fire after createSet.itemObj, because the transition turns state off
        }
        else
        if( fieldValue.trim().length === 0
        &&( event.key === "Enter" ||
            event.target.classList.contains("blurTile"))
        ){
            app.component.item.func.transition.removeItem();
        };
    };
};

/***
GIVE
****/
app.component.item.func.give.blurTileItem_hidingAttributes = ()=>{
    let itemElement      = app.component.item.state.selected[2];
    let createdId        = itemElement.getAttribute("createdId");
    let addPage          = document.querySelector(".addPage");
    let viewPage         = document.querySelector(".viewPage");
    if( addPage.contains(itemElement)){
        var blurTileItem = document.querySelector(`.addPage span[class="blurTile_item"][createdId="${createdId}"]`);
    }
    else
    if( viewPage.contains(itemElement)){
        var blurTileItem = document.querySelector(`.viewPage span[class="blurTile_item"][createdId="${createdId}"]`);
    };
    blurTileItem.classList.add("displayNone");
};

app.component.item.func.give.blurTileItem_showingAttributes = ()=>{
    let itemElement  = app.component.item.state.selected[2];
    let createdId    = app.component.item.state.selected[2].getAttribute("createdId");
    let addPage      = document.querySelector(".addPage");
    let viewPage     = document.querySelector(".viewPage");
    if( addPage.contains(itemElement)){
        var blurTile = document.querySelector(`.addPage .blurTile_item[createdId="${createdId}"]`);
    }
    else
    if( viewPage.contains(itemElement)){
        var blurTile = document.querySelector(`.viewPage .blurTile_item[createdId="${createdId}"]`);
    };
    blurTile.classList.remove("displayNone");
};

app.component.item.func.give.dayHeader_hidingAttributes = (itemElement)=>{
    let viewPage      = document.querySelector(".viewPage");
    if( viewPage.contains(itemElement)){
        let dayId     = itemElement.getAttribute("dayId");
        let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`).children[0];
            dayHeader.classList.remove("zIndex2");
    };
};

app.component.item.func.give.dayHeader_showingAttributes = (itemElement)=>{
    let viewPage      = document.querySelector(".viewPage");
    if( viewPage.contains(itemElement)){
        let dayId     = itemElement.getAttribute("dayId");
        let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`).children[0];
            dayHeader.classList.add("zIndex2");
    };
};

app.component.item.func.give.dayInfo_onViewPage_updatedInfo = async(dayId)=>{
    let numberOfItemsForDayString = await app.component.dayDropper.func.make.numberOfItemsForDayString(dayId);
    let daysUntilString           = app.component.dayDropper.func.make.daysUntilString(dayId);
    let dayInfoElement            = document.querySelector(`.viewPage .dayBlock[dayId="${dayId}"] .dayInfo`);
    if( dayInfoElement === null){return};
        dayInfoElement.innerHTML  = `(${numberOfItemsForDayString}${daysUntilString})`;
};

app.component.item.func.give.field_focus = (timeSlot)=>{
    let itemField = timeSlot.nextElementSibling.children[0].children[1];
        itemField.focus();
};

app.component.item.func.give.field_hidingAttributes = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_main");
        field.classList.remove("background_item");
        field.setAttribute("readonly", "readonly");
        field.blur();
};

app.component.item.func.give.field_showingAttributes = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_item");
        field.classList.remove("background_main");
        field.removeAttribute("readonly");
        field.blur();
};

app.component.item.func.give.hourHeader_hidingAttributes = (itemElement)=>{
    let addPage    = document.querySelector(".addPage");
    let viewPage   = document.querySelector(".viewPage");
    let hourId     = itemElement.getAttribute("hourId");
    let hourHeader = null;
    if( addPage.contains(itemElement)){
        hourHeader = document.querySelector(`.addPage .hourHeader[hourId="${hourId}"]`);
    }
    else
    if( viewPage.contains(itemElement)){
        let dayId  = itemElement.getAttribute("dayId");
        hourHeader = document.querySelector(`.viewPage .hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);
    };
    hourHeader.classList.remove("zIndex2");
};

app.component.item.func.give.hourHeader_showingAttributes = (itemElement)=>{
    let addPage    = document.querySelector(".addPage");
    let viewPage   = document.querySelector(".viewPage");
    let hourId     = itemElement.getAttribute("hourId");
    let hourHeader = null;
    if( addPage.contains(itemElement)){
        hourHeader = document.querySelector(`.addPage .hourHeader[hourId="${hourId}"]`);
    }
    else
    if( viewPage.contains(itemElement)){
        let dayId  = itemElement.getAttribute("dayId");
        hourHeader = document.querySelector(`.viewPage .hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);
    };
    hourHeader.classList.add("zIndex2");
};

app.component.item.func.give.item_minuteId = (createdId, minuteId)=>{
    let items = document.querySelectorAll(`.itemTile[createdId="${createdId}"]`);
    for(x of items){
        x.setAttribute("minuteId", minuteId);
    };
};

app.component.item.func.give.itemField_value = ()=>{
    let createdId    = app.component.item.state.selected[2].getAttribute("createdId");
    let updatedValue = app.component.item.state.selected[2].children[1].value;
    let itemFields   = document.querySelectorAll(`.itemTile[createdId="${createdId}"] > input`);
    for(x of itemFields){
        x.readonly   = false;
        x.value      = updatedValue;
        x.readonly   = true;
    };
};

app.component.item.func.give.minute_hidingAttributes = (itemElement)=>{
    let createdId            = app.component.item.state.selected[2].getAttribute("createdId");
    let minuteId             = app.component.item.state.selected[2].getAttribute("minuteId");
    let minuteElements       = document.querySelectorAll(`.minute[createdId="${createdId}"]`);
    for(minute of minuteElements){
        if( minuteId == 0){
            minute.innerHTML = "";
            minute.classList.add("dot");
        }
        else{
            minute.innerHTML = minuteId;
        }
        minute.classList.remove("selected");
        minute.setAttribute("minuteId", minuteId);
    };
};

app.component.item.func.give.minute_showingAttributes = (itemElement)=>{
    let createdId            = app.component.item.state.selected[2].getAttribute("createdId");
    let minuteId             = app.component.item.state.selected[2].getAttribute("minuteId");
    let minuteElements       = document.querySelectorAll(`.minute[createdId="${createdId}"]`);
    for(minute of minuteElements){
        if( minuteId == 0){
            minute.innerHTML = "0";
            minute.classList.remove("dot");
        }
        else{
            minute.innerHTML = minuteId;
            minute.classList.add("selected");
        }
        minute.setAttribute("minuteId", minuteId);
    };
};

app.component.item.func.give.minute_value = (itemId, minuteId)=>{
    let minuteElements = document.querySelectorAll(`.minute[createdId="${itemId}"]`);
    for(x of minuteElements){
        x.innerHTML = minuteId;
        x.setAttribute("minuteId", minuteId);
    };
};

app.component.item.func.give.minuteMenu_hidingAttributes = ()=>{
    let itemElement = app.component.item.state.selected[2];
    let createdId   = itemElement.getAttribute("createdId");
    let addPage     = document.querySelector(".addPage");
    let viewPage    = document.querySelector(".viewPage");
    let minuteMenu  = null;
    if( addPage.contains(itemElement)){
        minuteMenu  = document.querySelector(`.addPage .minuteMenu[createdId="${createdId}"]`);
    }
    else
    if( viewPage.contains(itemElement)){
        minuteMenu  = document.querySelector(`.viewPage .minuteMenu[createdId="${createdId}"]`);
    };
    minuteMenu.classList.add("displayNone");
};

app.component.item.func.give.minuteMenu_showingAttributes = ()=>{
    let itemElement = app.component.item.state.selected[2];
    let createdId   = itemElement.getAttribute("createdId");
    let addPage     = document.querySelector(".addPage");
    let viewPage    = document.querySelector(".viewPage");
    let minuteMenu  = null;
    if( addPage.contains(itemElement)){
        minuteMenu  = document.querySelector(`.addPage .minuteMenu[createdId="${createdId}"]`);
    }
    else
    if( viewPage.contains(itemElement)){
        minuteMenu  = document.querySelector(`.viewPage .minuteMenu[createdId="${createdId}"]`);
    };
    minuteMenu.classList.add("zIndex2");
    minuteMenu.classList.remove("displayNone");
};

app.component.item.func.give.selectedMinute_border = (createdId, minuteId)=>{
    let selectedMinuteElements   = [];
    let unselectedMinuteElements = [];
    let minuteElements           = document.querySelectorAll(`.minutesWrapper > p[createdId="${createdId}"]`);
    for(x of minuteElements){
        if( Number(x.getAttribute("minuteId")) === minuteId){
            x.classList.add("selected");
        }
        else{
            x.classList.remove("selected");
        };
    };
};

app.component.item.func.give.tile_hidingAttributes = (itemElement)=>{
    itemElement.classList.add("hideItemTile");
    itemElement.classList.remove("zIndex2");
};

app.component.item.func.give.tile_showingAttributes = (itemElement)=>{
    itemElement.classList.remove("hideItemTile");
    itemElement.classList.add("zIndex2");
};

app.component.item.func.give.trash_hidingAttributes = (itemElement)=>{
    let trash = itemElement.children[2];
        trash.classList.add("displayNone");
};

app.component.item.func.give.trash_showingAttributes = (itemElement)=>{
    let trash = itemElement.children[2];
        trash.classList.remove("displayNone");
};

/***
INIT
****/
app.component.item.func.init.component = async()=>{
    /* data retrieval, sorting, updating */
    await app.component.item.func.retrieve.itemObjs();
    await app.component.item.func.sort.itemObjs_byTime();
    await app.component.item.func.delete.oldItemObjs_fromItemObjs();
    app.component.item.func.update.itemObjs_inLocalStorage();
    /* make view */
    app.component.dayDropper.func.makeAppend.dropperText();     // fires here instead of in dayDropper init, because needs # of items for day to fill out dayDropperText
    await app.component.dayDropper.func.makeAppend.menuItems(); // fires here instead of in dayDropper init, because needs # of items for day to fill out dayDropperText
    app.component.dayDropper.func.makeAppend.monthScrollbar();
    app.component.dayDropper.func.set.scrollPositions_forDropdownMenu();
    app.component.item.func.makeAppend.items_onAddPage_forDay(app.component.dayDropper.setting.day[0]);
    app.component.item.func.makeAppend.items_onViewPage();
};

/*
IS
**/
app.component.item.func.is.itemsUnderViewPageDay = ()=>{
    let dayId                        = Number(app.component.item.state.selected[2].getAttribute("dayId"));
    let hourId                       = Number(app.component.item.state.selected[2].getAttribute("hourId"));
    let itemsUnderDayHeader_viewPage = document.querySelectorAll(`.viewPage div.itemTile[dayId="${dayId}"]`);
    if( itemsUnderDayHeader_viewPage.length === 0){ // no items under dayHeader
        return false;
    }
    else{
        return true;
    };
};

app.component.item.func.is.itemsUnderViewPageHour = ()=>{
    let dayId                         = Number(app.component.item.state.selected[2].getAttribute("dayId"));
    let hourId                        = Number(app.component.item.state.selected[2].getAttribute("hourId"));
    let itemsUnderHourHeader_viewPage = document.querySelectorAll(`.viewPage div.itemTile[dayId="${dayId}"][hourId="${hourId}"]`);
    if( itemsUnderHourHeader_viewPage.length === 0){ // no items under  hourHeader
        return false;
    }
    else{
        return true;
    };
};

app.component.item.func.is.objExist = (itemId)=>{
    return new Promise((resolve)=>{
        if(app.component.item.objs.length === 0){
            resolve([false, null]);
            return;
        };
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId == itemId){
                resolve([true, obj]);
                return;
            };
            if(Number(i) === app.component.item.objs.length-1){ // end of loop
                resolve([false, null]);
            };
        };
    });
};

/***
MAKE
****/
app.component.item.func.make.dayHeaderHTML = (itemObj)=>{
    return new Promise(async(resolve)=>{
        let currentDayId              = app.component.dayDropper.func.get.day()[0];
        let dayId                     = itemObj.associated.dayId;
        let dayText                   = app.component.item.func.get.dayText(dayId);
        let numberOfItemsForDayString = await app.component.dayDropper.func.make.numberOfItemsForDayString(dayId);
        let daysUntilString           = app.component.dayDropper.func.make.daysUntilString(dayId);
        let colorRed                  = "";
        if( currentDayId === dayId){
            colorRed                  = "colorRed";
        };
        let html = `
            <div class="dayHeader" onclick="app.component.item.func.event.postItem()">
                <p class="dayText ${colorRed}">${dayText}</p>
                <p class="dayInfo ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
            </div>
        `;
        resolve(html);
    });
};

app.component.item.func.get.dayText = (dayId)=>{
    let dateString = `${new Date(dayId)}`;
    let splits     = dateString.split(" ");
    let month      = splits[1];
    let dayName    = splits[0];
    let dayNum     = splits[2];
    let dayText    = `${dayName} ${month} ${dayNum}`;
    return dayText;
};

app.component.item.func.make.hourHeaderHTML = (itemObj)=>{
    let currentDayId = app.component.dayDropper.func.get.day()[0];
    let dayId        = itemObj.associated.dayId;
    let hourId       = itemObj.associated.hourId;
    let AMorPM       = app.component.timeSlot.func.make.AMorPMString(hourId);
    let hr_12        = app.component.timeSlot.func.make.hour12Number(hourId);
    let colorRed     = "";
    if( currentDayId === dayId){
        colorRed = "colorRed";
    };
    let spacingClass = "";
    if( hr_12 < 10){
        spacingClass = "spacing";
    };
    let html = `
        <p class="hourHeader ${colorRed}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.event.postItem()">
            <span class="${spacingClass}">${hr_12}</span>
            <span>${AMorPM}</span>
        </p>
    `;
    return html;
};

app.component.item.func.get.item_class = ()=>{
    let currentDayId = app.component.dayDropper.func.get.day()[0];
    let colorRed     = "";
    if( currentDayId === dayId){
        var itemClass = "colorRed";
    };
};

app.component.item.func.make.itemHTML = (itemObj, timeSlot)=>{
    if( app.component.item.state.creating[0] === true){
        var createdId  = Date.now();
        var dayId      = app.component.dayDropper.setting.day[0];
        var hourId     = Number(timeSlot.children[0].getAttribute("hourId"));
        var minuteId   = 0;
        var itemText   = "";
        var itemClass  = "itemTile zIndex2";
        var fieldClass = "itemField background_item";
        var readonly   = "";
    }
    else{
        var createdId  = itemObj.associated.createdId;
        var dayId      = itemObj.associated.dayId;
        var hourId     = itemObj.associated.hourId;
        var minuteId   = itemObj.associated.minuteId;
        var itemText   = itemObj.setting.text;
        var itemClass  = "itemTile hideItemTile";
        var fieldClass = "itemField background_main";
        var readonly   = "readonly";
    }
    let html = `
        <div class="${itemClass}" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" minuteId="${minuteId}" onclick="app.component.item.func.transition.showItem(this)">
            ${app.component.item.func.make.minuteBlock(createdId, dayId, hourId, minuteId)}
            <input class="${fieldClass}" value="${itemText}" ${readonly} onkeyup="app.component.item.func.event.postItem()" spellcheck="false">
            <div class="trashIcon displayNone" onclick="app.component.item.func.transition.removeItem()"></div>
            <span class="blurTile_item displayNone" createdId="${createdId}" onclick="app.component.item.func.event.click_blurTileItem()"></span>
        </div>
    `;
    return html;
};

app.component.item.func.make.minuteBlock = (createdId, dayId, hourId, minuteId)=>{
    // Case 1 - minute 0 & not creating
    if( Number(minuteId) === 0
    &&  app.component.item.state.creating[0] === false
    ){
        var minuteClass = `minute dot`;
        var minuteText  = "";
    }
    // Case 2 - else - covers creating item or minuteId not 0
    else{
        var minuteClass = `minute`;
        var minuteText  = minuteId;
    };
    let currentDayId    = app.component.dayDropper.func.get.day()[0];
    if( currentDayId === dayId){
        minuteClass    += " colorRed";
    };
    let html =  `
        <div class="minuteBlock">
            <p class="${minuteClass}" createdId="${createdId}" minuteId="${minuteId}" onclick="app.component.item.func.event.click_minute()">${minuteText}</p>
            <div class="minuteMenu displayNone" createdId="${createdId}">
                <span class="visibilityBacking">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div class="minutesWrapper">
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="0"  onclick="app.component.item.func.event.click_minuteSelect()">0</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="10" onclick="app.component.item.func.event.click_minuteSelect()">10</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="15" onclick="app.component.item.func.event.click_minuteSelect()">15</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="20" onclick="app.component.item.func.event.click_minuteSelect()">20</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="30" onclick="app.component.item.func.event.click_minuteSelect()">30</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="40" onclick="app.component.item.func.event.click_minuteSelect()">40</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="45" onclick="app.component.item.func.event.click_minuteSelect()">45</p>
                    <p createdId="${createdId}" hourId="${hourId}" minuteId="50" onclick="app.component.item.func.event.click_minuteSelect()">50</p>
                </div>
            </div>
        </div>
    `;
    return html;
};


/*********
MAKEAPPEND
**********/
app.component.item.func.makeAppend.blurTile = (itemElement)=>{
    let html     = `<div class="blurTile" onclick="app.component.item.func.event.postItem()"></div>`;
    let addPage  = document.querySelector(".addPage");
    let viewPage = document.querySelector(".viewPage");
    if( addPage.contains(itemElement)){
        addPage.insertAdjacentHTML("afterbegin", html);
    }
    else
    if( viewPage.contains(itemElement)){
        viewPage.insertAdjacentHTML("afterbegin", html);
    };
};

app.component.item.func.makeAppend.item_toAddPage = (itemObj, location)=>{
    let html     = app.component.item.func.make.itemHTML(itemObj);
    let hourId   = itemObj.associated.hourId; // hourId used to locate correct slotBody to append to in next step
    let slotBody = document.querySelector(".timeSlots").children[0].children[hourId].children[0].nextElementSibling;
    if( location === undefined
    ||  location === "afterbegin"){
        slotBody.insertAdjacentHTML("afterbegin", html);
    }
    else
    if( location === "beforeend"){
        slotBody.insertAdjacentHTML("beforeend", html);
    };
};

app.component.item.func.makeAppend.item_toViewPage = async()=>{
    let createdId  = Number(app.component.item.state.selected[2].getAttribute("createdId"));
    let itemObj    = await app.component.item.func.retrieve.itemObj_withCreatedId(createdId);
    let dayId      = itemObj.associated.dayId;
    let hourId     = itemObj.associated.hourId;
    let dayBlocks  = document.querySelectorAll('.dayBlock');
    let dayBlock   = document.querySelector(`.dayBlock[dayId="${dayId}"]`);
    let hourHeader = document.querySelector(`.hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);
    // Case 1 - no dayblocks. This 1st case needs viewItemsWrapper.
    if(dayBlocks.length === 0){
        let html = `
            <div class="viewItemsWrapper" onscroll="app.component.pageTurner.func.give.slider_swipeLock()">
                <div class="dayBlock" dayId="${dayId}">
                    ${await app.component.item.func.make.dayHeaderHTML(itemObj)}
                    ${app.component.item.func.make.hourHeaderHTML(itemObj)}
                    ${app.component.item.func.make.itemHTML(itemObj)}
                </div>
            </div>
        `;
        let viewPage = document.querySelector(".viewPage");
            viewPage.innerHTML = html;
    }
    // Case 2 - no matching dayblock => new dayBlock, append in correct spot
    else
    if(dayBlock === null){
        let html = `
            <div class="dayBlock" dayId="${dayId}">
                ${await app.component.item.func.make.dayHeaderHTML(itemObj)}
                ${app.component.item.func.make.hourHeaderHTML(itemObj)}
                ${app.component.item.func.make.itemHTML(itemObj)}
            </div>
        `;
        /* Loop dayBlocks, when dayId less than given dayBlockId, append before that dayBlock */
        let dayBlocks = document.querySelectorAll(`.dayBlock`);
        for(let i = 0; i < dayBlocks.length; i++){
            let dayBlock   = dayBlocks[i];
            let dayBlockId = Number(dayBlocks[i].getAttribute("dayId"));
            if( dayId < dayBlockId){
                dayBlock.insertAdjacentHTML("beforebegin", html);
                break;
            };
            if(i === dayBlocks.length-1){
                let viewItemsWrapper = document.querySelector(".viewItemsWrapper");
                    viewItemsWrapper.innerHTML += html;
            };
        };
    }
    // Case 3 - dayblock, no hourHeader => find dayBlock, createAppend hourHeader to appropriate spot
    else
    if( dayBlock   !== null
    &&  hourHeader === null){
        let html = `
            ${app.component.item.func.make.hourHeaderHTML(itemObj)}
            ${app.component.item.func.make.itemHTML(itemObj)}
        `;
        let hourHeaders = document.querySelectorAll(`.hourHeader[dayId="${dayId}"]`);
        for(let i = 0; i < hourHeaders.length; i++){
            let hourHeader    = hourHeaders[i];
            let hourHeaderId = Number(hourHeader.getAttribute("hourId"));
            if( hourId < hourHeaderId){
                hourHeader.insertAdjacentHTML("beforebegin", html);
                break;
            };
            if(i === hourHeaders.length-1){
                let itemsForHourHeader = document.querySelectorAll(`.viewPage .itemTile[dayId="${dayId}"][hourId="${hourHeaderId}"]`);
                    itemsForHourHeader[itemsForHourHeader.length-1].insertAdjacentHTML("afterend", html);
            };
        };
    }
    // Case 4 - dayblock & hourHeader => find hourHeader, append hourHeader to appropriate spot
    else
    if( dayBlock   !== null
    &&  hourHeader !== null){
        let html = app.component.item.func.make.itemHTML(itemObj);
        let itemTilesForMatchingHourHeader = document.querySelectorAll(`.viewPage .itemTile[dayId="${dayId}"][hourId="${hourId}"]`);
            itemTilesForMatchingHourHeader[0].insertAdjacentHTML("beforebegin", html);
    };
};

// problems:
// should not fire in cases where creating a fresh new item
app.component.item.func.makeAppend.item_toViewPage_afterSort = (obj)=>{
    let html                      = app.component.item.func.make.itemHTML(obj);
    let dayId                     = Number(obj.associated.dayId);
    let hourId                    = Number(obj.associated.hourId);
    let dayBlock                  = document.querySelector(`.viewPage .dayBlock[dayId="${dayId}"]`);
    let hourHeader                = document.querySelector(`.viewPage .hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);
    let hourHeaderAfterHourHeader = hourHeader.nextElementSibling;

    if( hourHeaderAfterHourHeader !== null
    &&  hourHeaderAfterHourHeader.classList.contains("hourHeader") // can see an hourHeader after relevant hourHeader
    ){
        hourHeaderAfterHourHeader.insertAdjacentHTML("beforebegin", html);
    }
    else{
        dayBlock.insertAdjacentHTML("beforeend", html);
    };
};

app.component.item.func.makeAppend.items_onAddPage_forDay = (dayId)=>{
    return new Promise((resolve)=>{
        for(let i = app.component.item.objs.length-1; i > -1; i--){
            let obj = app.component.item.objs[i];
            if( obj.associated.dayId === dayId){
                app.component.item.func.makeAppend.item_toAddPage(obj);
            };
            if(i === 0){ // end of loop
                resolve();
            };
        };
    });
};

app.component.item.func.makeAppend.items_onViewPage = async()=>{
    let setDay  = null;
    let setHour = null;
    let html = `
        <div class="viewItemsWrapper" onscroll="app.component.pageTurner.func.give.slider_swipeLock()">
    `;
    for(let i in app.component.item.objs){
        let itemObj = app.component.item.objs[i];
        let dayId   = itemObj.associated.dayId;
        let hourId  = Number(itemObj.associated.hourId);
        if( setDay === null){ // first iteration
            setDay  = dayId;
            setHour = hourId;
            html += `
                    <div class="dayBlock" dayId="${setDay}">
                        ${await app.component.item.func.make.dayHeaderHTML(itemObj)}
                        ${app.component.item.func.make.hourHeaderHTML(itemObj)}
                        ${app.component.item.func.make.itemHTML(itemObj)}
            `;
        }
        else
        if( setDay  === dayId    // same day
        &&  setHour === hourId){ // same hour
            html += `
                        ${app.component.item.func.make.itemHTML(itemObj)}
            `;
        }
        else
        if( setDay  === dayId    // same day
        &&  setHour !== hourId){ // diff hour
            setHour = hourId;
            html += `
                        ${app.component.item.func.make.hourHeaderHTML(itemObj)}
                        ${app.component.item.func.make.itemHTML(itemObj)}
            `;
        }
        else
        if( setDay !== dayId){ // diff day
            setDay  = dayId;
            setHour = hourId;
            html += `
                    </div>
                    <div class="dayBlock" dayId="${setDay}">
                        ${await app.component.item.func.make.dayHeaderHTML(itemObj)}
                        ${app.component.item.func.make.hourHeaderHTML(itemObj)}
                        ${app.component.item.func.make.itemHTML(itemObj)}
            `;
        };
        if(Number(i) === app.component.item.objs.length-1){ // end of loop, closing tags & append
            html += `
                    </div>
                </div>
            `;
            let viewPage = document.querySelector(".viewPage");
                viewPage.insertAdjacentHTML("afterbegin", html);
        };
    };
};

/*****
REMOVE
******/
app.component.item.func.remove.blurTile = (itemElement)=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.remove();
};

app.component.item.func.remove.dayHeader = (dayId)=>{
    let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`);
        dayHeader.remove();
};

app.component.item.func.remove.hourHeader = (dayId, hourId)=>{
    let hourHeader = document.querySelector(`.dayBlock[dayId="${dayId}"] p.hourHeader[hourId="${hourId}"]`);
        hourHeader.remove();
};

app.component.item.func.remove.item = ()=>{
    return new Promise((resolve)=>{
        let createdId       = Number(app.component.item.state.selected[2].getAttribute("createdId"));
        let item_onAddPage  = document.querySelector(`.addPage .itemTile[createdId="${createdId}"]`);
        if( item_onAddPage !== null){
            item_onAddPage.remove();
        };
        let item_onViewPage = document.querySelector(`.viewPage .itemTile[createdId="${createdId}"]`);
        if( item_onViewPage === null){
            resolve();
            return;
        }
        else{
            let dayId  = Number(item_onViewPage.getAttribute("dayId"));
            let hourId = Number(item_onViewPage.getAttribute("hourId"));
            item_onViewPage.remove();
            if( app.component.item.func.is.itemsUnderViewPageHour() === false){
                app.component.item.func.remove.hourHeader(dayId, hourId);
                // resolve();
            };
            if( app.component.item.func.is.itemsUnderViewPageDay() === false){
                app.component.item.func.remove.dayHeader(dayId)
                // resolve();
            };
            resolve();
        };
    });
};

/*******
RETRIEVE
********/
app.component.item.func.retrieve.itemObj_withCreatedId = (createdId)=>{
    return new Promise((resolve)=>{
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( Number(obj.associated.createdId) === Number(createdId)){
                resolve(obj);
                return;
            };
        };
    });
};

app.component.item.func.retrieve.itemObjs = ()=>{
    return new Promise((resolve)=>{
        let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
        app.component.item.objs = localStorageObj.items;
        resolve();
    });
};

/***
SORT
****/
app.component.item.func.sort.byDay_hour_ms = (a, b)=>{
    let dayA       = Number(a.associated.dayId);
    let dayB       = Number(b.associated.dayId);
    let hourA      = Number(a.associated.hourId);
    let hourB      = Number(b.associated.hourId);
    let minuteA    = Number(a.associated.minuteId);
    let minuteB    = Number(b.associated.minuteId);
    let createdA   = Number(a.associated.createdId);
    let createdB   = Number(b.associated.createdId);
    let comparison = 0;
    if( dayA > dayB){
        comparison = 1;
    }
    else
    if( dayA < dayB){
        comparison = -1;
    }
    else
    if( dayA === dayB){
        if( hourA > hourB){
            comparison = 1;
        }
        else
        if( hourA < hourB){
            comparison = -1;

        }
        else
        if( hourA === hourB){
            if( minuteA > minuteB){
                comparison = 1;
            }
            else
            if( minuteA < minuteB){
                comparison = -1;
            }
            else
            if( minuteA === minuteB){
                if( createdA > createdB){
                    comparison = -1;
                }
                else
                if(createdA < createdB){
                    comparison = 1;
                };
            };
        };
    };
    return comparison;
};

app.component.item.func.sort.itemObjs_byTime = ()=>{
    return new Promise((resolve)=>{
        resolve(app.component.item.objs.sort(app.component.item.func.sort.byDay_hour_ms));
    });
};

/*********
TRANSITION
**********/
app.component.item.func.transition.createItem = async(timeSlot)=>{
    if( app.component.item.state.selected[0] === false
    &&  app.component.pageTurner.state.preventClick === false // pageTurner can't be preventing click
    ){
        /* state - creating ON */
        app.component.item.state.creating = [true, false, {}]; // must be before make itemHTML, because new item depends on creating state
        /* make - item */
        let html     = app.component.item.func.make.itemHTML(null, timeSlot);
        /* append - item */
        let slotBody = timeSlot.nextElementSibling;
            slotBody.insertAdjacentHTML("afterbegin", html);
        /* can get itemElement like this after append */
        let itemElement = timeSlot.nextElementSibling.children[0];
        /* makeAppend - blurTile */
        app.component.item.func.makeAppend.blurTile(itemElement);
        /* give - field focus, hourHeader_showingAttr */
        app.component.item.func.give.field_focus(timeSlot);
        app.component.item.func.give.hourHeader_showingAttributes(itemElement);
        /* state - selected ON */
        app.component.item.state.selected = [true, false, itemElement];
    };
};

app.component.item.func.transition.hideItem = ()=>{
    let itemElement = app.component.item.state.selected[2];
    app.component.item.func.give.dayHeader_hidingAttributes(itemElement);
    app.component.item.func.give.field_hidingAttributes(itemElement);
    app.component.item.func.give.hourHeader_hidingAttributes(itemElement);
    app.component.item.func.give.minute_hidingAttributes(itemElement);
    app.component.item.func.give.tile_hidingAttributes(itemElement);
    app.component.item.func.give.trash_hidingAttributes(itemElement);

    console.log('transition.hideItem', app.component.item.state.creating, 'creating');
    // // if there has been a minute order change
    // // and not a new item for that day-hour
    if( app.component.item.state.creating[0] === false){
        app.component.item.func.append.itemTiles_resortedByMinute();
    };

    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
    app.component.item.state.creating = [false, false, null];
};
// app.component.item.is.

app.component.item.func.transition.removeItem = async()=>{
    event.stopPropagation();
    let itemElement = app.component.item.state.selected[2];
    let dayId       = Number(itemElement.getAttribute("dayId"));
    /* delete - itemObj */
    await app.component.item.func.delete.itemObj();
    /* give */
    app.component.item.func.give.dayHeader_hidingAttributes(itemElement);
    app.component.item.func.give.hourHeader_hidingAttributes(itemElement);
    /* remove */
    app.component.item.func.remove.blurTile();
    app.component.item.func.remove.item();
    /* give - after remove */
    app.component.item.func.give.dayInfo_onViewPage_updatedInfo(dayId);
    let delay_forMobileKeyboardExit = setTimeout(()=>{
        app.component.timeSlot.func.give.scrollBall_heightAttributes();
    },300);
    /* makeAppend - after remove */
    app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.makeAppend.menuItems();
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.showItem = (itemElement)=>{
    event.stopPropagation();
    if( app.component.item.state.selected[0] === false
    &&  app.component.pageTurner.state.preventClick === false){ // pageTurner can't be preventing click
        /* state - selected ON */
        app.component.item.state.selected = [true, false, itemElement];
        app.component.item.func.give.dayHeader_showingAttributes(itemElement);
        app.component.item.func.give.field_showingAttributes(itemElement);
        app.component.item.func.give.hourHeader_showingAttributes(itemElement);
        app.component.item.func.give.minute_showingAttributes(itemElement);
        app.component.item.func.give.tile_showingAttributes(itemElement);
        app.component.item.func.give.trash_showingAttributes(itemElement);
        app.component.item.func.makeAppend.blurTile(itemElement);
    };
};

/*****
UPDATE
******/
// app.component.item.func.update.itemObj_inItemObjs = (selectedObj, fieldValue)=>{
//     return new Promise((resolve)=>{
//         for(i in app.component.item.objs){
//             let obj = app.component.item.objs[i];
//             if( obj.associated.createdId === selectedObj.associated.createdId){
//                 obj.setting.text = fieldValue;
//                 resolve();
//                 return;
//             };
//         };
//     });
// };

app.component.item.func.update.itemObj_inItemObjs = ({selectedObj, fieldValue, minuteId}={selectedObj: selectedObj, fieldValue: fieldValue, minuteId: minuteId})=>{
    return new Promise((resolve)=>{
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === selectedObj.associated.createdId){
                if( fieldValue !== undefined){
                    obj.setting.text = fieldValue;
                };
                if( minuteId !== undefined){
                    obj.associated.minuteId = minuteId;
                };
                resolve();
                return;
            };
        };
    });
};

// app.component.item.func.update.itemObj_inLocalStorage = (selectedObj, fieldValue)=>{
//     return new Promise((resolve)=>{
//         let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
//         let localStorageItemObjs = localStorageObj.items;
//         for(i in localStorageItemObjs){
//             let obj = localStorageItemObjs[i];
//             if( obj.associated.createdId === selectedObj.associated.createdId){
//                 obj.setting.text      = fieldValue;
//                 localStorageObj.items = localStorageItemObjs;
//                 window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
//                 resolve();
//                 return;
//             };
//         };
//     });
// };

app.component.item.func.update.itemObj_inLocalStorage = ({selectedObj, fieldValue, minuteId}={selectedObj: selectedObj, fieldValue: fieldValue, minuteId: minuteId})=>{
    return new Promise((resolve)=>{
        let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
        let localStorageItemObjs = localStorageObj.items;
        for(i in localStorageItemObjs){
            let obj = localStorageItemObjs[i];
            if( obj.associated.createdId === selectedObj.associated.createdId){
                if( fieldValue !== undefined){
                    obj.setting.text = fieldValue;
                };
                if( minuteId !== undefined){
                    obj.associated.minuteId = minuteId;
                };
                localStorageObj.items = localStorageItemObjs;
                window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
                resolve();
                return;
            };
        };
    });
};

app.component.item.func.update.itemObjs_inLocalStorage = ()=>{
    let localStorageObj   = JSON.parse(localStorage.upcomingPlanner);
    localStorageObj.items = app.component.item.objs;
    window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
};
