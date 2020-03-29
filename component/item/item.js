app.component.item = {};
app.component.item.objs = [];
app.component.item.state = {};
app.component.item.state.selected = [false, null];
app.component.item.func = {};
app.component.item.func.create       = {};
app.component.item.func.createAppend = {};
app.component.item.func.get          = {};
app.component.item.func.give         = {};
app.component.item.func.init         = {};
app.component.item.func.is           = {};
app.component.item.func.remove       = {};
app.component.item.func.set          = {};
app.component.item.func.transition   = {};
app.component.item.func.update       = {};

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

/* createAppend */

app.component.item.func.createAppend.itemElementToViewPage = async()=>{
    let createdId                 = Number(app.component.item.state.selected[1].getAttribute("createdId"));
    let itemObj                   = await app.component.item.func.get.itemObj_from_createdId(createdId);
    let dayId                     = itemObj.associated.day;
    let hourId                    = itemObj.associated.timeSlot;
    let dayText                   = app.component.viewList.func.get.dayText_from_dayMS(dayId);
    let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayId);
    let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(dayId);
    let AMorPM                    = app.component.timeSlot.func.get.AMorPM(hourId);
    let hr_12                     = app.component.timeSlot.func.get.to12Hour(hourId);

    // try to find on view page with selector, if there, just changing the text
    // otherwise, check day and hour, if there, add under hour
    // if, day there but no hour, add under day with new hour
    let dayBlocks  = document.querySelectorAll('.dayBlock');
    let dayBlock   = document.querySelector(`.dayBlock[dayMS="${dayId}"]`);
    let hourHeader = document.querySelector(`.hourHeader_vl[dayMS="${dayId}"][data_hour="${hourId}"]`);

    let currentDayMS = app.component.dayDropper.func.get.day()[0];
    let colorRed = "";
    if( currentDayMS === dayId){
        colorRed = "colorRed";
    };

    // case 1 - no dayblocks => order of append doesn't matter for 1st. This 1st case needs viewItemsWrapper
    if(dayBlocks.length === 0){
        let spacingClass = "";
        if(hr_12 < 10){spacingClass = "spacing";}
        let html = `
            <div class="dayBlock" dayMS="${dayId}">
                <div class="dayHeader_vl">
                    <p class="dayText_vl ${colorRed}">${dayText}</p>
                    <p class="dayInfo_vl ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
                </div>
                <p class="hourHeader_vl ${colorRed}" dayMS="${dayId}" data_hour="${hourId}">
                    <span class="${spacingClass}">${hr_12}</span>
                    <span>${AMorPM}</span>
                </p>
                <div class="itemTile_vl hideItemTile_vl" createdId="${itemObj.associated.createdId}" dayMS="${dayId}" data_hour="${hourId}" onclick="app.component.viewList.func.transition.showItem(this)">
                    <span class="dot_vl"></span>
                    <input class="itemField_vl background_main_vl" value="${itemObj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                    <div class="minValues_vl displayNone"></div>
                    <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                </div>
            </div>
        `;
        let viewItemsWrapper = document.querySelector(".viewItemsWrapper");
        if( viewItemsWrapper === null){
            viewItemsWrapper           = document.createElement("div");
            viewItemsWrapper.className = "viewItemsWrapper";
            viewItemsWrapper.innerHTML = html;
            let viewPage = document.querySelector(".viewPage");
                viewPage.appendChild(viewItemsWrapper);
        }
        else{
            viewItemsWrapper.innerHTML = html;
        };
    }
    // case 2 - no matching dayblock => new dayBlock, append in correct spot
    else
    if(dayBlock === null){
        let spacingClass = "";
        if(hr_12 < 10){spacingClass = "spacing";}
        let html = `
            <div class="dayBlock" dayMS="${dayId}">
                <div class="dayHeader_vl">
                    <p class="dayText_vl ${colorRed}">${dayText}</p>
                    <p class="dayInfo_vl ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
                </div>
                <p class="hourHeader_vl ${colorRed}" dayMS="${dayId}" data_hour="${hourId}">
                    <span class="${spacingClass}">${hr_12}</span>
                    <span>${AMorPM}</span>
                </p>
                <div class="itemTile_vl hideItemTile_vl" createdId="${itemObj.associated.createdId}" dayMS="${dayId}" data_hour="${hourId}" onclick="app.component.viewList.func.transition.showItem(this)">
                    <span class="dot_vl"></span>
                    <input class="itemField_vl background_main_vl" value="${itemObj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                    <div class="minValues_vl displayNone"></div>
                    <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                </div>
            </div>
        `;
        /* How to determine where to append dayBlock:
        --- querySelectorAll dayBlock
        --- loop them
        --- greater/less than compare dayId and dayBlockId
        --- when dayId greater than given dayBlockId,
        --- insert new dayBlock before this dayBlock */
        let dayBlocks = document.querySelectorAll(`.dayBlock`);
        for(let i = 0; i < dayBlocks.length; i++){
            let dayBlock   = dayBlocks[i];
            let dayBlockId = Number(dayBlocks[i].getAttribute("dayMS"));
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
    // case 3 - dayblock, no hourHeader => find dayBlock, createAppend hourHeader to approriate spot
    else
    if( dayBlock   !== null
    &&  hourHeader === null){
        let hourHeaders = document.querySelectorAll(`.hourHeader_vl[dayMS="${dayId}"]`);
        let spacingClass = "";
        if(hr_12 < 10){spacingClass = "spacing";}
        let html = `
            <p class="hourHeader_vl ${colorRed}" dayMS="${dayId}" data_hour="${hourId}">
                <span class="${spacingClass}">${hr_12}</span>
                <span>${AMorPM}</span>
            </p>
            <div class="itemTile_vl hideItemTile_vl" createdId="${itemObj.associated.createdId}" dayMS="${dayId}" data_hour="${hourId}" onclick="app.component.viewList.func.transition.showItem(this)">
                <span class="dot_vl"></span>
                <input class="itemField_vl background_main_vl" value="${itemObj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                <div class="minValues_vl displayNone"></div>
                <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
            </div>
        `;
        for(let i = 0; i < hourHeaders.length; i++){
            let hourHeaderId = Number(hourHeaders[i].getAttribute("data_hour"));
            if(hourId > hourHeaderId){ // exceed hourHeaderId, append as last of itemTiles for that hour
                let itemTilesForLastHourHeader = document.querySelectorAll(`.itemTile_vl[dayMS="${dayId}"][data_hour="${hourHeaderId}"]`);
                    itemTilesForLastHourHeader[itemTilesForLastHourHeader.length-1].insertAdjacentHTML("afterend", html);
                break;
            }
            else
            if(i === hourHeaders.length-1){ // get to end/never exceeded a present hourHeaderId, append after matching hourHeader
                let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"] > .dayHeader_vl`);
                    dayHeader.insertAdjacentHTML('afterend', html);
            };
        };
    }
    // case 4 - dayblock & hourHeader => find hourHeader, append hourHeader to appropriate spot
    else
    if( dayBlock   !== null
    &&  hourHeader !== null){ // there is an hourHeader
        let html = `
            <div class="itemTile_vl hideItemTile_vl" createdId="${itemObj.associated.createdId}" dayMS="${dayId}" data_hour="${hourId}" onclick="app.component.viewList.func.transition.showItem(this)">
                <span class="dot_vl"></span>
                <input class="itemField_vl background_main_vl" value="${itemObj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                <div class="minValues_vl displayNone"></div>
                <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
            </div>
        `;
        let itemTilesForMatchingHourHeader = document.querySelectorAll(`.itemTile_vl[dayMS="${dayId}"][data_hour="${hourId}"]`);
            itemTilesForMatchingHourHeader[0].insertAdjacentHTML("beforebegin", html);
    };
};

/* get */

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
            if( Number(obj.associated.createdId) === Number(createdId)){
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
            app.component.item.func.give.value_to_itemElementOnAddPage();
            app.component.item.func.give.value_to_itemElementOnViewPage();
        }
        else{
            app.component.item.func.create.componentObj(app.component.item.state.selected[1]); // add to objs array and data store
            app.component.dayDropper.func.createAppend.dayDropperText(app.component.dayDropper.setting.day[0]);
            app.component.dayDropper.func.createAppend.htmlInsideDropdown();
            app.component.item.func.createAppend.itemElementToViewPage();

            let dayId = Number(app.component.item.state.selected[1].getAttribute("dayId"));
            app.component.item.func.update.dayInfoOnViewPage(dayId);
        };
        app.component.item.func.transition.hideItem(); // needs to fire after create.componentObj, because the transition turns state off
        app.component.timeSlot.func.remove.blurTile();
        let delay_forKeyboardExitOnMobile = setTimeout(()=>{
            app.component.timeSlot.func.give.height_to_scrollBall();
        },300);
    }
    else
    if( fieldValue.trim().length === 0 // field empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.item.func.transition.removeItem();
    };
};

app.component.item.func.give.value_to_itemElementOnAddPage = ()=>{
    let createdId        = app.component.item.state.selected[1].getAttribute("createdId");
    let updatedValue     = app.component.item.state.selected[1].children[1].value;
    let itemElementField = document.querySelector(`.itemTile[createdId="${createdId}"] > input`);
        itemElementField.readonly = false;
        itemElementField.value = updatedValue;
        itemElementField.readonly = true;

}

app.component.item.func.give.value_to_itemElementOnViewPage = ()=>{
    let createdId        = app.component.item.state.selected[1].getAttribute("createdId");
    let updatedValue     = app.component.item.state.selected[1].children[1].value;
    let itemElementField = document.querySelector(`.itemTile_vl[createdId="${createdId}"] > input`);
        itemElementField.readonly = false;
        itemElementField.value = updatedValue;
        itemElementField.readonly = true;
};

/* INIT */
app.component.item.func.init.component = ()=>{
    let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
    app.component.item.objs = localStorageObj.items; // move localStorage item info into item objs
    // app.component.dayDropper.func.createAppend.dayDropperText();
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
};

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
};

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
        let createdId = Number(app.component.item.state.selected[1].getAttribute("createdId"));
        let itemElementFromViewPage = document.querySelector(`.itemTile_vl[createdId="${createdId}"]`);
        if (itemElementFromViewPage === null){ // need to avoid in case of removing an as yet to be created item(pre-submission)
            resolve();
        };
        let dayId  = Number(itemElementFromViewPage.getAttribute("dayMS"));
        let hourId = Number(itemElementFromViewPage.getAttribute("data_hour"));
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
    /* REMOVE - item, blurTile */
    app.component.item.state.selected[1].remove();
    app.component.timeSlot.func.remove.blurTile();
    /* REMOVE - itemElement from viewPage */
    // await app.component.item.func.remove.itemElementFromViewPage();
    app.component.item.func.remove.itemElementFromViewPage();
    /* GIVE - height to scrollBall */
    let delay_forKeyboardExitOnMobile = setTimeout(()=>{
        app.component.timeSlot.func.give.height_to_scrollBall(); // must happen after item element removal, since scrollBall height takes into account the number of item elements present
    },300);
    /* REMOVE - itemObj */
    await app.component.item.func.remove.itemObj();
    /* CREATEAPPEND - daydropper text, htmlInsideDropdown */
    app.component.dayDropper.func.createAppend.dayDropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    /* UPDATE - dayInfo on */
    let dayId = Number(app.component.item.state.selected[1].getAttribute("dayId"));
    app.component.item.func.update.dayInfoOnViewPage(dayId);
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

/* update */

app.component.item.func.update.dayInfoOnViewPage = async(dayId)=>{
    let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayId);
    let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(dayId);
    let dayInfoElement            = document.querySelector(`.viewPage .dayBlock[dayMS="${dayId}"] .dayInfo_vl`);
    if( dayInfoElement === null){return};
        dayInfoElement.innerHTML  = `(${numberOfItemsForDayString}${daysUntilString})`;
};
