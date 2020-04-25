app.component.item = {};
app.component.item.objs = [];
app.component.item.state = {};
app.component.item.state.selected = [false, false, null];
app.component.item.func = {};
app.component.item.func.createSet  = {};
app.component.item.func.delete     = {};
app.component.item.func.get        = {};
app.component.item.func.give       = {};
app.component.item.func.init       = {};
app.component.item.func.is         = {};
app.component.item.func.make       = {};
app.component.item.func.makeAppend = {};
app.component.item.func.post       = {};
app.component.item.func.remove     = {};
app.component.item.func.retrieve   = {};
app.component.item.func.set        = {};
app.component.item.func.sort       = {};
app.component.item.func.transition = {};
app.component.item.func.update     = {};

/* func hotkeys:
CREATESET
app.component.item.func.createSet.itemObj = (item)=>{
DELETE
app.component.item.func.delete.itemObj = ()=>{
app.component.item.func.delete.itemObj_fromItemObjs = ()=>{
app.component.item.func.delete.itemObj_fromLocalStorage = ()=>{
app.component.item.func.delete.oldItemObjs_fromItemObjs = ()=>{
GET
app.component.item.func.get.dayText_fromDayId = (dayId)=>{
app.component.item.func.get.itemObj_fromCreatedId = (createdId)=>{
GIVE
app.component.item.func.give.dayHeader_onViewPage_hidingAttributes = (itemElement)=>{
app.component.item.func.give.dayHeader_onViewPage_showingAttributes = (itemElement)=>{
app.component.item.func.give.dayInfo_onViewPage_updatedInfo = async(dayId)=>{
app.component.item.func.give.field_focus = (timeSlot)=>{
app.component.item.func.give.field_hidingAttributes = (itemElement)=>{
app.component.item.func.give.field_showingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_onAddPage_hidingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_onAddPage_showingAttributes_withItem = (itemElement)=>{
app.component.item.func.give.hourHeader_onAddPage_showingAttributes_withTimeSlot = (timeSlot)=>{
app.component.item.func.give.hourHeader_onViewPage_hidingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_onViewPage_showingAttributes = (itemElement)=>{
app.component.item.func.give.item_onAddPage_value = ()=>{
app.component.item.func.give.item_onViewPage_value = ()=>{
app.component.item.func.give.min_hidingAttributes = (itemElement)=>{
app.component.item.func.give.tile_hidingAttributes = (itemElement)=>{
app.component.item.func.give.tile_showingAttributes = (itemElement)=>{
app.component.item.func.give.trash_hidingAttributes = (itemElement)=>{
app.component.item.func.give.trash_showingAttributes = (itemElement)=>{
INIT
app.component.item.func.init.component = async()=>{
IS
app.component.item.func.is.itemsUnderViewPageDay = ()=>{
app.component.item.func.is.itemsUnderViewPageHour = ()=>{
app.component.item.func.is.objExist = ()=>{
MAKE
app.component.item.func.make.dayHeader = (itemObj)=>{
app.component.item.func.make.hourHeader = (itemObj)=>{
app.component.item.func.make.item = (itemObj)=>{
MAKEAPPEND
app.component.item.func.makeAppend.blurTile_toAddPage = ()=>{
app.component.item.func.makeAppend.blurTile_toViewPage = ()=>{
app.component.item.func.makeAppend.itemEmpty_toAddPage = (timeSlot)=>{
app.component.item.func.makeAppend.item_toAddPage = (itemObj)=>{
app.component.item.func.makeAppend.item_toViewPage = async()=>{
app.component.item.func.makeAppend.items_onAddPage_forDay = (dayId)=>{
app.component.item.func.makeAppend.items_onViewPage = async()=>{
POST
app.component.item.func.post.item_fromAddPage_toDataStore = async()=>{
app.component.item.func.post.item_fromViewPage_toDataStore = async()=>{
REMOVE
app.component.item.func.remove.blurTile = ()=>{
app.component.item.func.remove.blurTile_fromViewPage = ()=>{
app.component.item.func.remove.dayHeader = (dayId)=>{
app.component.item.func.remove.hourHeader = (hourId)=>{
app.component.item.func.remove.item_fromAddPage = ()=>{
app.component.item.func.remove.item_fromViewPage = ()=>{
RETRIEVE
app.component.item.func.retrieve.itemObjs = ()=>{
SET
app.component.item.func.set.itemObj_inItemObjs = (selectedObj, fieldValue)=>{
app.component.item.func.set.itemObj_inLocalStorage = (selectedObj, fieldValue)=>{
SORT
app.component.item.func.sort.byDay_hour_ms = (a, b)=>{
app.component.item.func.sort.itemObjs_byTime = ()=>{
TRANSITION
app.component.item.func.transition.createItem = async(timeSlot)=>{
app.component.item.func.transition.hideItem_onAddPage = ()=>{
app.component.item.func.transition.hideItem_onViewPage = ()=>{
app.component.item.func.transition.removeItem_fromAddPage = async()=>{
app.component.item.func.transition.removeItem_fromViewPage = async()=>{
app.component.item.func.transition.showItem_onAddPage = async(itemElement)=>{
app.component.item.func.transition.showItem_onViewPage = (itemElement)=>{
UPDATE
app.component.item.func.update.itemObjs_inLocalStorage = ()=>{
*/

/********
CREATESET
*********/
app.component.item.func.createSet.itemObj = (item)=>{
    let obj = {};
        obj.associated = {};
        obj.associated.createdId = Number(item.getAttribute("createdId"));
        obj.associated.day       = app.component.dayDropper.setting.day[0];
        obj.associated.timeSlot  = item.parentNode.previousElementSibling.children[0].getAttribute("hourId"); // 24hr
        obj.setting = {};
        obj.setting.text = item.children[1].value;
        obj.state = {};
        obj.state.selected = false;
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
        for(let i = 0; i < app.component.item.objs.length; i++){
            let obj = app.component.item.objs[i];
            if( obj.associated.day < startOfToday_ms){
                app.component.item.objs.splice(i,1);
                i--;
            }
            else // obj for today or later || end of loop => resolve
            if( obj.associated.day >= startOfToday_ms
            ||  i === app.component.item.objs.length-1){
                resolve();
                return;
            };
        };
    });
};

/**
GET
***/
app.component.item.func.get.dayText_fromDayId = (dayId)=>{
    let dateString = `${new Date(dayId)}`;
    let splits     = dateString.split(" ");
    let month      = splits[1];
    let dayName    = splits[0];
    let dayNum     = splits[2];
    let dayText    = `${dayName} ${month} ${dayNum}`;
    return dayText;
};

app.component.item.func.get.itemObj_fromCreatedId = (createdId)=>{
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

/***
GIVE
****/
app.component.item.func.give.dayHeader_onViewPage_hidingAttributes = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayId");
    let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`).children[0];
        dayHeader.classList.remove("zIndex2");
};

app.component.item.func.give.dayHeader_onViewPage_showingAttributes = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayId");
    let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`).children[0];
        dayHeader.classList.add("zIndex2");
};

app.component.item.func.give.dayInfo_onViewPage_updatedInfo = async(dayId)=>{
    let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayId);
    let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(dayId);
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
        field.classList.remove("background_white");
        field.setAttribute("readonly", "readonly");
};

app.component.item.func.give.field_showingAttributes = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_white");
        field.classList.remove("background_main");
        field.removeAttribute("readonly");
        field.blur();
};

app.component.item.func.give.hourHeader_onAddPage_hidingAttributes = (itemElement)=>{
    let timeHeader = itemElement.parentNode.previousElementSibling.children[0];
        timeHeader.classList.remove("zIndex2");
};

app.component.item.func.give.hourHeader_onAddPage_showingAttributes_withItem = (itemElement)=>{
    let headerTime = itemElement.parentNode.previousElementSibling.children[0];
        headerTime.classList.add("zIndex2");
};

app.component.item.func.give.hourHeader_onAddPage_showingAttributes_withTimeSlot = (timeSlot)=>{
    let headerTime = timeSlot.children[0];
        headerTime.classList.add("zIndex2");
};

app.component.item.func.give.hourHeader_onViewPage_hidingAttributes = (itemElement)=>{
    let dayId        = itemElement.getAttribute("dayId");
    let hourId       = itemElement.getAttribute("hourId");
    let headerOfItem = document.querySelector(`.viewPage .hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);
        headerOfItem.classList.remove("zIndex2");
};

app.component.item.func.give.hourHeader_onViewPage_showingAttributes = (itemElement)=>{
    let dayId        = itemElement.getAttribute("dayId");
    let hourId       = itemElement.getAttribute("hourId");
    let headerOfItem = document.querySelector(`.viewPage .hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);
        headerOfItem.classList.add("zIndex2");
};

app.component.item.func.give.item_onAddPage_value = ()=>{
    let createdId        = app.component.item.state.selected[2].getAttribute("createdId");
    let updatedValue     = app.component.item.state.selected[2].children[1].value;
    let itemElementField = document.querySelector(`.addPage .itemTile[createdId="${createdId}"] > input`);
    if (itemElementField === null){return;};
        itemElementField.readonly = false;
        itemElementField.value = updatedValue;
        itemElementField.readonly = true;
};

app.component.item.func.give.item_onViewPage_value = ()=>{
    let createdId        = app.component.item.state.selected[2].getAttribute("createdId");
    let updatedValue     = app.component.item.state.selected[2].children[1].value;
    let itemElementField = document.querySelector(`.viewPage .itemTile[createdId="${createdId}"] > input`);
    if (itemElementField === null){return;};
        itemElementField.readonly = false;
        itemElementField.value = updatedValue;
        itemElementField.readonly = true;
};

app.component.item.func.give.min_hidingAttributes = (itemElement)=>{
    let min = itemElement.children[2];
        min.classList.add("displayNone");
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
    let trash = itemElement.children[3];
        trash.classList.add("displayNone");
};

app.component.item.func.give.trash_showingAttributes = (itemElement)=>{
    let trash = itemElement.children[3];
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
    app.component.dayDropper.func.makeAppend.dropperText(); // fires here instead of in dayDropper init, because needs # of items for day to fill out dayDropperText
    app.component.dayDropper.func.makeAppend.menuItems();   // fires here instead of in dayDropper init, because needs # of items for day to fill out dayDropperText
    app.component.item.func.makeAppend.items_onAddPage_forDay(app.component.dayDropper.setting.day[0]);
    app.component.item.func.makeAppend.items_onViewPage();
};

/*
IS
**/
app.component.item.func.is.itemsUnderViewPageDay = ()=>{
    let createdId = Number(app.component.item.state.selected[2].getAttribute("createdId"));
    let dayId     = null;
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.createdId === createdId){
            dayId = obj.associated.day;
        };
        if(Number(i) === app.component.item.objs.length-1
        && dayId !== null){
            let itemsUnderViewPageDay = document.querySelectorAll(`.viewPage div.itemTile[dayId="${dayId}"]`);
            if( itemsUnderViewPageDay.length === 0){ // no items under dayHeader
                return false;
            }
            else{
                return true;
            };
        };
    };
};

app.component.item.func.is.itemsUnderViewPageHour = ()=>{
    let createdId = Number(app.component.item.state.selected[2].getAttribute("createdId"));
    let dayId     = null;
    let hourId    = null;
    for(i in app.component.item.objs){
        let obj = app.component.item.objs[i];
        if( obj.associated.createdId === createdId){
            dayId  = obj.associated.day;
            hourId = obj.associated.timeSlot;
        };
        if(Number(i) === app.component.item.objs.length-1
        && hourId !== null){
            let itemsUnderViewPageHour = document.querySelectorAll(`.viewPage div.itemTile[dayId="${dayId}"][hourId="${hourId}"]`);
            if( itemsUnderViewPageHour.length === 0){ // no items under dayHeader > hourHeader
                return false;
            }
            else{
                return true;
            };
        };
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
app.component.item.func.make.dayHeader = (itemObj)=>{
    return new Promise(async(resolve)=>{
        let currentDayId              = app.component.dayDropper.func.get.day()[0];
        let dayId                     = itemObj.associated.day;
        let dayText                   = app.component.item.func.get.dayText_fromDayId(dayId);
        let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayId);
        let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(dayId);
        let colorRed                  = "";
        if( currentDayId === dayId){
            colorRed = "colorRed";
        };
        let html = `
            <div class="dayHeader">
                <p class="dayText ${colorRed}">${dayText}</p>
                <p class="dayInfo ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
            </div>
        `;
        resolve(html);
    });
};

app.component.item.func.make.hourHeader = (itemObj)=>{
    let currentDayId = app.component.dayDropper.func.get.day()[0];
    let dayId        = itemObj.associated.day;
    let hourId       = itemObj.associated.timeSlot;
    let AMorPM       = app.component.timeSlot.func.get.AMorPM(hourId);
    let hr_12        = app.component.timeSlot.func.get.to12Hour(hourId);
    let colorRed     = "";
    if( currentDayId === dayId){
        colorRed = "colorRed";
    };
    let spacingClass = "";
    if( hr_12 < 10){
        spacingClass = "spacing";
    };
    let html = `
        <p class="hourHeader ${colorRed}" dayId="${dayId}" hourId="${hourId}">
            <span class="${spacingClass}">${hr_12}</span>
            <span>${AMorPM}</span>
        </p>
    `;
    return html;
};

app.component.item.func.make.item = (itemObj)=>{
    let createdId = itemObj.associated.createdId;
    let dayId     = itemObj.associated.day;
    let hourId    = itemObj.associated.timeSlot;
    let itemText  = itemObj.setting.text;
    let html = `
        <div class="itemTile hideItemTile" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.transition.showItem_onViewPage(this)">
            <span class="dot"></span>
            <input class="itemField background_main" value="${itemText}" onkeyup="app.component.item.func.post.item_fromViewPage_toDataStore()" spellcheck="false" readonly>
            <div class="minValues displayNone"></div>
            <div class="trashIcon displayNone" onclick="app.component.item.func.transition.removeItem_fromViewPage();"></div>
        </div>
    `;
    return html;
};

/*********
MAKEAPPEND
**********/
app.component.item.func.makeAppend.blurTile_toAddPage = ()=>{
    let html = `<div class="blurTile" onclick="app.component.item.func.post.item_fromAddPage_toDataStore();"></div>`;
    let addPage = document.querySelector(".addPage");
        addPage.insertAdjacentHTML("afterbegin", html);
};

app.component.item.func.makeAppend.blurTile_toViewPage = ()=>{
    let html = `<div class="blurTile" onclick="app.component.item.func.post.item_fromViewPage_toDataStore();"></div>`;
    let viewPage = document.querySelector(".viewPage");
        viewPage.insertAdjacentHTML("afterbegin", html);
};

app.component.item.func.makeAppend.itemEmpty_toAddPage = (timeSlot)=>{
    return new Promise((resolve)=>{
        let createdId = Date.now();
        let dayId     = app.component.dayDropper.setting.day[0];
        let hourId    = Number(timeSlot.children[0].getAttribute("hourId"));
        let html = `
            <div class="itemTile zIndex2" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.transition.showItem_onAddPage(this)">
                <span class="dot"></span>
                <input class="itemField background_white" spellcheck="false" onkeyup="app.component.item.func.post.item_fromAddPage_toDataStore();">
                <div class="minValues displayNone"></div>
                <div class="trashIcon" onclick="app.component.item.func.transition.removeItem_fromAddPage();"></div>
            </div>
        `;
        let slotBody = timeSlot.nextElementSibling;
            slotBody.insertAdjacentHTML("afterbegin", html);
        resolve();
    });
};

app.component.item.func.makeAppend.item_toAddPage = (itemObj)=>{
    let html     = app.component.item.func.make.item(itemObj);
    let hourId   = itemObj.associated.timeSlot;
    let slotBody = document.querySelector(".timeSlots").children[0].children[hourId].children[0].nextElementSibling; // hourId used to locate correct slotBody to append to
        slotBody.insertAdjacentHTML("beforeend", html);
};

app.component.item.func.makeAppend.item_toViewPage = async()=>{
    let createdId  = Number(app.component.item.state.selected[2].getAttribute("createdId"));
    let itemObj    = await app.component.item.func.get.itemObj_fromCreatedId(createdId);
    let dayId      = itemObj.associated.day;
    let hourId     = itemObj.associated.timeSlot;
    let dayBlocks  = document.querySelectorAll('.dayBlock');
    let dayBlock   = document.querySelector(`.dayBlock[dayId="${dayId}"]`);
    let hourHeader = document.querySelector(`.hourHeader[dayId="${dayId}"][hourId="${hourId}"]`);

    // Case 1 - no dayblocks => order of append doesn't matter for 1st. This 1st case needs viewItemsWrapper
    if(dayBlocks.length === 0){
        let html = `
            <div class="dayBlock" dayId="${dayId}">
                ${await app.component.item.func.make.dayHeader(itemObj)}
                ${app.component.item.func.make.hourHeader(itemObj)}
                ${app.component.item.func.make.item(itemObj)}
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
    // Case 2 - no matching dayblock => new dayBlock, append in correct spot
    else
    if(dayBlock === null){
        let html = `
            <div class="dayBlock" dayId="${dayId}">
                ${await app.component.item.func.make.dayHeader(itemObj)}
                ${app.component.item.func.make.hourHeader(itemObj)}
                ${app.component.item.func.make.item(itemObj)}
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
    // Case 3 - dayblock, no hourHeader => find dayBlock, createAppend hourHeader to approriate spot
    else
    if( dayBlock   !== null
    &&  hourHeader === null){
        let html = `
            ${app.component.item.func.make.hourHeader(itemObj)}
            ${app.component.item.func.make.item(itemObj)}
        `;
        let hourHeaders = document.querySelectorAll(`.hourHeader[dayId="${dayId}"]`);
        for(let i = 0; i < hourHeaders.length; i++){
            let hourHeader_1    = hourHeaders[i];
            let hourHeader_1_id = Number(hourHeader_1.getAttribute("hourId"));
            let hourHeader_2    = hourHeaders[i+1];
            if( hourHeader_2 === undefined){ // If only 1 || the last hourHeader => append right inside hourHeader_1
                let itemsForHourHeader_1 = document.querySelectorAll(`.viewPage .itemTile[dayId="${dayId}"][hourId="${hourHeader_1_id}"]`);
                itemsForHourHeader_1[itemsForHourHeader_1.length-1].insertAdjacentHTML("afterend", html);
            }
            else{ // get next hourHeader_2_id. If item id falls between current header and next header => append before next header begins
                let hourHeader_2_id = Number(hourHeader_2.getAttribute("hourId"));
                if( hourId > hourHeader_1_id
                &&  hourId < hourHeader_2_id){
                    hourHeader_2.insertAdjacentHTML("beforebegin", html);
                    break;
                };
            };
        };
    }
    // Case 4 - dayblock & hourHeader => find hourHeader, append hourHeader to appropriate spot
    else
    if( dayBlock   !== null
    &&  hourHeader !== null){ // there is an hourHeader
        let html = app.component.item.func.make.item(itemObj);
        let itemTilesForMatchingHourHeader = document.querySelectorAll(`.viewPage .itemTile[dayId="${dayId}"][hourId="${hourId}"]`);
            itemTilesForMatchingHourHeader[0].insertAdjacentHTML("beforebegin", html);
    };
};

app.component.item.func.makeAppend.items_onAddPage_forDay = (dayId)=>{
    return new Promise((resolve)=>{
        for(let i = app.component.item.objs.length-1; i > -1; i--){
            let obj = app.component.item.objs[i];
            if( obj.associated.day === dayId){
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
        <div class="viewItemsWrapper">
    `;
    for(let i in app.component.item.objs){
        let itemObj = app.component.item.objs[i];
        let dayId   = itemObj.associated.day;
        let hourId  = Number(itemObj.associated.timeSlot);
        if( setDay === null){ // first iteration
            setDay  = dayId;
            setHour = hourId;
            html += `
                    <div class="dayBlock" dayId="${setDay}">
                        ${await app.component.item.func.make.dayHeader(itemObj)}
                        ${app.component.item.func.make.hourHeader(itemObj)}
                        ${app.component.item.func.make.item(itemObj)}
            `;
        }
        else
        if( setDay  === dayId    // same day
        &&  setHour === hourId){ // same hour
            html += app.component.item.func.make.item(itemObj);
        }
        else
        if( setDay  === dayId    // same day
        &&  setHour !== hourId){ // diff hour
            setHour = hourId;
            html += `
                        ${app.component.item.func.make.hourHeader(itemObj)}
                        ${app.component.item.func.make.item(itemObj)}
            `;
        }
        else
        if( setDay !== dayId){ // diff day
            setDay  = dayId;
            setHour = hourId;
            html += `
                    </div>
                    <div class="dayBlock" dayId="${setDay}">
                        ${await app.component.item.func.make.dayHeader(itemObj)}
                        ${app.component.item.func.make.hourHeader(itemObj)}
                        ${app.component.item.func.make.item(itemObj)}
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

/***
POST
****/
app.component.item.func.post.item_fromAddPage_toDataStore = async()=>{
    event.stopPropagation();
    let fieldValue = app.component.item.state.selected[2].children[1].value;
    if( fieldValue.trim().length > 0 // field NOT empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        let itemId = app.component.item.state.selected[2].getAttribute("createdId");
        let isObjExist = await app.component.item.func.is.objExist(itemId);
        if( isObjExist[0] === true){ // update old componentObj
            let itemObj = isObjExist[1];
            await app.component.item.func.set.itemObj_inItemObjs(itemObj, fieldValue);
            await app.component.item.func.set.itemObj_inLocalStorage(itemObj, fieldValue);
            app.component.item.func.give.item_onAddPage_value();
            app.component.item.func.give.item_onViewPage_value();
        }
        else{
            app.component.item.func.createSet.itemObj(app.component.item.state.selected[2]); // add to objs array and data store
            app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
            app.component.dayDropper.func.makeAppend.menuItems();
            app.component.item.func.makeAppend.item_toViewPage();
            let dayId = Number(app.component.item.state.selected[2].getAttribute("dayId"));
            app.component.item.func.give.dayInfo_onViewPage_updatedInfo(dayId);
        };
        app.component.item.func.transition.hideItem_onAddPage(); // needs to fire after createSet.itemObj, because the transition turns state off
        app.component.item.func.remove.blurTile();
        let delay_forKeyboardExitOnMobile = setTimeout(()=>{
            app.component.timeSlot.func.give.scrollBall_heightAttributes();
        },300);
    }
    else // field empty && (either hit enter || clicked off(clicked blurTile))
    if( fieldValue.trim().length === 0
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        app.component.item.func.transition.removeItem_fromAddPage();
    };
};

app.component.item.func.post.item_fromViewPage_toDataStore = async()=>{
    event.stopPropagation();
    let fieldValue = app.component.item.state.selected[2].children[1].value;
    if( fieldValue.trim().length > 0 // field NOT empty && (either hit enter || clicked off(clicked blurTile))
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        let createdId = app.component.item.state.selected[2].getAttribute("createdId");
        let itemObj   = await app.component.item.func.get.itemObj_fromCreatedId(createdId);
        await app.component.item.func.set.itemObj_inItemObjs(itemObj, fieldValue);
        await app.component.item.func.set.itemObj_inLocalStorage(itemObj, fieldValue);
        app.component.item.func.give.item_onAddPage_value();
        app.component.item.func.give.item_onViewPage_value();
        app.component.item.func.transition.hideItem_onViewPage();
        app.component.item.func.remove.blurTile_fromViewPage();
    }
    else
    if( fieldValue.trim().length === 0 // field empty && (either hit enter || clicked off(clicked blurTile))
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){
        app.component.item.func.transition.removeItem_fromViewPage();
    };
};

/*****
REMOVE
******/
app.component.item.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".addPage .blurTile");
        blurTile.remove();
};

app.component.item.func.remove.blurTile_fromViewPage = ()=>{
    let blurTile = document.querySelector(".viewPage .blurTile");
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

app.component.item.func.remove.item_fromAddPage = ()=>{
    let itemId = app.component.item.state.selected[2].getAttribute("createdId");
    let itemFromAddPage = document.querySelector(`.itemTile[createdId="${itemId}"]`);
    if( itemFromAddPage !== null){
        itemFromAddPage.remove();
    };
};

app.component.item.func.remove.item_fromViewPage = ()=>{
    return new Promise((resolve)=>{
        let createdId               = Number(app.component.item.state.selected[2].getAttribute("createdId"));
        let itemElementFromViewPage = document.querySelector(`.viewPage .itemTile[createdId="${createdId}"]`);
        let dayId                   = Number(itemElementFromViewPage.getAttribute("dayId"));
        let hourId                  = Number(itemElementFromViewPage.getAttribute("hourId"));
        if (itemElementFromViewPage === null){ // need to avoid in case of removing an as yet to be created item(pre-submission)
            resolve();
        };
        itemElementFromViewPage.remove();
        if( app.component.item.func.is.itemsUnderViewPageHour() === false){
            app.component.item.func.remove.hourHeader(dayId, hourId);
            resolve();
        };
        if( app.component.item.func.is.itemsUnderViewPageDay() === false){
            app.component.item.func.remove.dayHeader(dayId)
            resolve();
        };
    });
};
// above function needs improvement. It works, but should promise to check itemsUnderViewPageHour, then check hoursUnderViewPageDay, then resolve

/*******
RETRIEVE
********/
app.component.item.func.retrieve.itemObjs = ()=>{
    return new Promise((resolve)=>{
        let localStorageObj = JSON.parse(localStorage.upcomingPlanner);
        app.component.item.objs = localStorageObj.items;
        resolve();
    });
};

/**
SET
***/
app.component.item.func.set.itemObj_inItemObjs = (selectedObj, fieldValue)=>{
    return new Promise((resolve)=>{
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if(obj.associated.createdId === selectedObj.associated.createdId){
                obj.setting.text = fieldValue;
                resolve();
                return;
            };
        };
    });
};

app.component.item.func.set.itemObj_inLocalStorage = (selectedObj, fieldValue)=>{
    return new Promise((resolve)=>{
        let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
        let localStorageItemObjs = localStorageObj.items;
        for(i in localStorageItemObjs){
            let obj = localStorageItemObjs[i];
            if( obj.associated.createdId === selectedObj.associated.createdId){
                obj.setting.text      = fieldValue;
                localStorageObj.items = localStorageItemObjs;
                window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
                resolve();
                return;
            };
        };
    });
};

/***
SORT
****/
app.component.item.func.sort.byDay_hour_ms = (a, b)=>{
    let dayA       = Number(a.associated.day);
    let dayB       = Number(b.associated.day);
    let hourA      = Number(a.associated.timeSlot);
    let hourB      = Number(b.associated.timeSlot);
    let createdA   = Number(a.associated.createdId);
    let createdB   = Number(b.associated.createdId);
    let comparison = 0;
    if(dayA > dayB){
        comparison = 1;
    }
    else
    if(dayA < dayB){
        comparison = -1;
    }
    else
    if(dayA === dayB){
        if(hourA > hourB){
            comparison = 1;
        }
        else
        if(hourA < hourB){
            comparison = -1;
        }
        else
        if(hourA === hourB){
            if(createdA > createdB){
                comparison = -1;
            }
            else
            if(createdA < createdB){
                comparison = 1;
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
    if(app.component.item.state.selected[0] === true){
        return;
    };
    await app.component.item.func.makeAppend.itemEmpty_toAddPage(timeSlot);
    app.component.item.func.makeAppend.blurTile_toAddPage();
    app.component.item.func.give.field_focus(timeSlot);
    app.component.item.func.give.hourHeader_onAddPage_showingAttributes_withTimeSlot(timeSlot);
    /* state - selected ON */
    let item = timeSlot.nextElementSibling.children[0];
    app.component.item.state.selected = [true, false, item];
};

app.component.item.func.transition.hideItem_onAddPage = ()=>{
    /* give - hidingAttributes to addPage's blurTile, field, headerTime, min, tile, trash */
    let itemElement = app.component.item.state.selected[2];
    app.component.item.func.give.field_hidingAttributes(itemElement);
    app.component.item.func.give.min_hidingAttributes(itemElement);
    app.component.item.func.give.tile_hidingAttributes(itemElement);
    app.component.item.func.give.hourHeader_onAddPage_hidingAttributes(itemElement)
    app.component.item.func.give.trash_hidingAttributes(itemElement);
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.hideItem_onViewPage = ()=>{
    /* give - hidingAttributes to viewPage's dayHeader, field, hourHeader, tile, trash */
    let itemElement = app.component.item.state.selected[2];
    if( itemElement === null){return};
    app.component.item.func.give.dayHeader_onViewPage_hidingAttributes(itemElement); // DIFF
    app.component.item.func.give.field_hidingAttributes(itemElement); // SAME
    app.component.item.func.give.hourHeader_onViewPage_hidingAttributes(itemElement); // DIFF
    app.component.item.func.give.tile_hidingAttributes(itemElement); // SAME
    app.component.item.func.give.trash_hidingAttributes(itemElement);
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.removeItem_fromAddPage = async()=>{
    event.stopPropagation();
    let itemElement = app.component.item.state.selected[2];
    /* give - hourHeader */
    app.component.item.func.give.hourHeader_onAddPage_hidingAttributes(itemElement);
    /* remove - blurTile, items from both pages */
    app.component.item.func.remove.blurTile();
    app.component.item.func.remove.item_fromAddPage();
    app.component.item.func.remove.item_fromViewPage();
    /* delete - itemObj */
    await app.component.item.func.delete.itemObj();
    /* give - height to timeSlot scrollBall - must happen after item element removal, since scrollBall height takes into account the number of item elements present */
    let delay_forKeyboardExitOnMobile = setTimeout(()=>{
        app.component.timeSlot.func.give.scrollBall_heightAttributes();
    },300);
    /* makeAppend - dropperText, menuItems */
    app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.makeAppend.menuItems();
    /* give - dayInfoOnViewPage */
    let dayId = Number(itemElement.getAttribute("dayId"));
    app.component.item.func.give.dayInfo_onViewPage_updatedInfo(dayId);
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.removeItem_fromViewPage = async()=>{
    event.stopPropagation();
    let itemElement = app.component.item.state.selected[2];
    /* give - hidingAttributes to dayHeader, hourHeader */
    app.component.item.func.give.dayHeader_onViewPage_hidingAttributes(itemElement);
    app.component.item.func.give.hourHeader_onViewPage_hidingAttributes(itemElement);
    /* remove - blurTile, items from both pages */
    app.component.item.func.remove.blurTile_fromViewPage();
    app.component.item.func.remove.item_fromViewPage();
    app.component.item.func.remove.item_fromAddPage();
    /* delete - itemObj */
    await app.component.item.func.delete.itemObj();
    /* give - height to timeSlot scrollBall - must happen after item element removal, since scrollBall height takes into account the number of item elements present */
    let delay_forKeyboardExitOnMobile = setTimeout(()=>{
        app.component.timeSlot.func.give.scrollBall_heightAttributes();
    },300);
    /* makeAppend - dropperText, menuItems */
    app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.makeAppend.menuItems();
    /* give - dayInfoOnViewPage */
    let dayId = Number(itemElement.getAttribute("dayId"));
    app.component.item.func.give.dayInfo_onViewPage_updatedInfo(dayId);
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.showItem_onAddPage = async(itemElement)=>{
    event.stopPropagation();
    if( app.component.item.state.selected[0] === false){
        /* state - selected ON */
        app.component.item.state.selected = [true, false, itemElement];
        /* give - showingAttribiutes field, hourHeader, tile, trash */
        app.component.item.func.give.field_showingAttributes(itemElement);
        app.component.item.func.give.hourHeader_onAddPage_showingAttributes_withItem(itemElement);
        app.component.item.func.give.tile_showingAttributes(itemElement);
        app.component.item.func.give.trash_showingAttributes(itemElement);
        /* makeAppend - blurTile */
        app.component.item.func.makeAppend.blurTile_toAddPage();
    };
};

app.component.item.func.transition.showItem_onViewPage = (itemElement)=>{
    event.stopPropagation();
    if( app.component.item.state.selected[0] === false){
        /* state - selected ON */
        app.component.item.state.selected = [true, false, itemElement];
        /* give - showingAttributes dayHeader, field, hourHeader, tile, trash */
        app.component.item.func.give.dayHeader_onViewPage_showingAttributes(itemElement); // DIFF
        app.component.item.func.give.field_showingAttributes(itemElement); // SAME
        app.component.item.func.give.hourHeader_onViewPage_showingAttributes(itemElement); // DIFF
        app.component.item.func.give.tile_showingAttributes(itemElement); // SAME
        app.component.item.func.give.trash_showingAttributes(itemElement); // SAME
        /* makeAppend - blurTile */
        app.component.item.func.makeAppend.blurTile_toViewPage();
    };
};

/*****
UPDATE
******/
app.component.item.func.update.itemObjs_inLocalStorage = ()=>{
    let localStorageObj   = JSON.parse(localStorage.upcomingPlanner);
    localStorageObj.items = app.component.item.objs;
    window.localStorage.setItem("upcomingPlanner", JSON.stringify(localStorageObj));
};
