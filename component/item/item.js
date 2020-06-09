app.component.item                 = {};
app.component.item.objs            = [];
app.component.item.state           = {};
app.component.item.state.selected  = [false, false, null];
app.component.item.func            = {};
app.component.item.func.createSet  = {};
app.component.item.func.delete     = {};
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
GIVE
app.component.item.func.give.dayHeader_hidingAttributes = (itemElement)=>{
app.component.item.func.give.dayHeader_onViewPage_showingAttributes = (itemElement)=>{
app.component.item.func.give.dayInfo_onViewPage_updatedInfo = async(dayId)=>{
app.component.item.func.give.field_focus = (timeSlot)=>{
app.component.item.func.give.field_hidingAttributes = (itemElement)=>{
app.component.item.func.give.field_showingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_hidingAttributes = (itemElement)=>{
app.component.item.func.give.hourHeader_showingAttributes = (itemElement)=>{
app.component.item.func.give.itemField_value = ()=>{
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
app.component.item.func.make.dayHeaderHTML = (itemObj)=>{
app.component.item.func.make.dayTextString = (dayId)=>{
app.component.item.func.make.hourHeaderHTML = (itemObj)=>{
app.component.item.func.make.itemHTML = (itemObj)=>{
MAKEAPPEND
app.component.item.func.makeAppend.blurTile = (itemElement)=>{
app.component.item.func.makeAppend.item_toAddPage = (itemObj)=>{
app.component.item.func.makeAppend.item_toViewPage = async()=>{
app.component.item.func.makeAppend.itemNew_toAddPage = (timeSlot)=>{
app.component.item.func.makeAppend.items_onAddPage_forDay = (dayId)=>{
app.component.item.func.makeAppend.items_onViewPage = async()=>{
POST
app.component.item.func.post.item_toDataStore = async()=>{
REMOVE
app.component.item.func.remove.blurTile = ()=>{
app.component.item.func.remove.dayHeader = (dayId)=>{
app.component.item.func.remove.hourHeader = (hourId)=>{
app.component.item.func.remove.item = ()=>{
RETRIEVE
app.component.item.func.retrieve.itemObj_withCreatedId = (createdId)=>{
app.component.item.func.retrieve.itemObjs = ()=>{
SET
app.component.item.func.set.itemObj_inItemObjs = (selectedObj, fieldValue)=>{
app.component.item.func.set.itemObj_inLocalStorage = (selectedObj, fieldValue)=>{
SORT
app.component.item.func.sort.byDay_hour_ms = (a, b)=>{
app.component.item.func.sort.itemObjs_byTime = ()=>{
TRANSITION
app.component.item.func.transition.createItem = async(timeSlot)=>{
app.component.item.func.transition.hideItem = ()=>{
app.component.item.func.transition.removeItem = async()=>{
app.component.item.func.transition.showItem = (itemElement)=>{
UPDATE
app.component.item.func.update.itemObjs_inLocalStorage = ()=>{
*/

/********
CREATESET
*********/
app.component.item.func.createSet.itemObj = (item)=>{
    let obj                      = {};
        obj.associated           = {};
        obj.associated.createdId = Number(item.getAttribute("createdId"));
        obj.associated.day       = app.component.dayDropper.setting.day[0];
        obj.associated.timeSlot  = item.parentNode.previousElementSibling.children[0].getAttribute("hourId"); // 24hr
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
            if( obj.associated.day < startOfToday_ms){
                app.component.item.objs.splice(i,1);
                i--;
            };
            // If obj for today or later || end of loop => resolve
            if( obj.associated.day >= startOfToday_ms
            ||  i === app.component.item.objs.length-1){
                resolve();
            };
        };
    });
};

/***
GIVE
****/
app.component.item.func.give.dayHeader_hidingAttributes = (itemElement)=>{
    let viewPage  = document.querySelector(".viewPage");
    if( viewPage.contains(itemElement)){
        let dayId     = itemElement.getAttribute("dayId");
        let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`).children[0];
            dayHeader.classList.remove("zIndex2");
    };
};

app.component.item.func.give.dayHeader_onViewPage_showingAttributes = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayId");
    let dayHeader = document.querySelector(`.dayBlock[dayId="${dayId}"]`).children[0];
        dayHeader.classList.add("zIndex2");
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
app.component.item.func.make.dayHeaderHTML = (itemObj)=>{
    return new Promise(async(resolve)=>{
        let currentDayId              = app.component.dayDropper.func.get.day()[0];
        let dayId                     = itemObj.associated.day;
        let dayText                   = app.component.item.func.make.dayTextString(dayId);
        let numberOfItemsForDayString = await app.component.dayDropper.func.make.numberOfItemsForDayString(dayId);
        let daysUntilString           = app.component.dayDropper.func.make.daysUntilString(dayId);
        let colorRed                  = "";
        if( currentDayId === dayId){
            colorRed = "colorRed";
        };
        let html = `
            <div class="dayHeader" onclick="app.component.item.func.post.item_toDataStore()">
                <p class="dayText ${colorRed}">${dayText}</p>
                <p class="dayInfo ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
            </div>
        `;
        resolve(html);
    });
};

app.component.item.func.make.dayTextString = (dayId)=>{
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
    let dayId        = itemObj.associated.day;
    let hourId       = itemObj.associated.timeSlot;
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
        <p class="hourHeader ${colorRed}" dayId="${dayId}" hourId="${hourId}">
            <span class="${spacingClass}">${hr_12}</span>
            <span>${AMorPM}</span>
        </p>
    `;
    return html;
};

app.component.item.func.make.itemHTML = (itemObj)=>{
    let createdId = itemObj.associated.createdId;
    let dayId     = itemObj.associated.day;
    let hourId    = itemObj.associated.timeSlot;
    let itemText  = itemObj.setting.text;
    let html = `
        <div class="itemTile hideItemTile" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.transition.showItem(this)">
            <span class="dot"></span>
            <input class="itemField background_main" value="${itemText}" onkeyup="app.component.item.func.post.item_toDataStore()" spellcheck="false" readonly>
            <div class="minValues displayNone"></div>
            <div class="trashIcon displayNone" onclick="app.component.item.func.transition.removeItem()"></div>
        </div>
    `;
    return html;
};

/*********
MAKEAPPEND
**********/
app.component.item.func.makeAppend.blurTile = (itemElement)=>{
    let html     = `<div class="blurTile" onclick="app.component.item.func.post.item_toDataStore()"></div>`;
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

app.component.item.func.makeAppend.item_toAddPage = (itemObj)=>{
    let html     = app.component.item.func.make.itemHTML(itemObj);
    let hourId   = itemObj.associated.timeSlot;
    let slotBody = document.querySelector(".timeSlots").children[0].children[hourId].children[0].nextElementSibling; // hourId used to locate correct slotBody to append to
        slotBody.insertAdjacentHTML("beforeend", html);
};

app.component.item.func.makeAppend.item_toViewPage = async()=>{
    let createdId  = Number(app.component.item.state.selected[2].getAttribute("createdId"));
    let itemObj    = await app.component.item.func.retrieve.itemObj_withCreatedId(createdId);
    let dayId      = itemObj.associated.day;
    let hourId     = itemObj.associated.timeSlot;
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

app.component.item.func.makeAppend.itemNew_toAddPage = (timeSlot)=>{
    return new Promise((resolve)=>{
        let createdId = Date.now();
        let dayId     = app.component.dayDropper.setting.day[0];
        let hourId    = Number(timeSlot.children[0].getAttribute("hourId"));
        let html = `
            <div class="itemTile zIndex2" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.transition.showItem(this)">
                <span class="dot"></span>
                <input class="itemField background_white" spellcheck="false" onkeyup="app.component.item.func.post.item_toDataStore()">
                <div class="minValues displayNone"></div>
                <div class="trashIcon" onclick="app.component.item.func.transition.removeItem()"></div>
            </div>
        `;
        let slotBody = timeSlot.nextElementSibling;
            slotBody.insertAdjacentHTML("afterbegin", html);
        resolve();
    });
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
        <div class="viewItemsWrapper" onscroll="app.component.pageTurner.func.give.slider_swipeLock()">
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

/***
POST
****/
app.component.item.func.post.item_toDataStore = async()=>{
    event.stopPropagation();
    if( app.component.item.state.selected[0] === true){
        let itemElement = app.component.item.state.selected[2];
        let fieldValue  = itemElement.children[1].value;
        if( fieldValue.trim().length > 0
        &&( event.key === "Enter" ||
            event.target.classList.contains("blurTile") ||
            event.target.classList.contains("dayText") ||
            event.target.classList.contains("dayInfo") )
        ){
            let isObjExist = await app.component.item.func.is.objExist(itemElement.getAttribute("createdId"));
            /* Create New Item */
            if( isObjExist[0] === false){
                app.component.item.func.createSet.itemObj(itemElement); // add to objs array and data store
                app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
                app.component.dayDropper.func.makeAppend.menuItems();
                app.component.item.func.makeAppend.item_toViewPage();
                app.component.item.func.give.dayInfo_onViewPage_updatedInfo(Number(itemElement.getAttribute("dayId")));
                let delay_forKeyboardExitOnMobile = setTimeout(()=>{
                    app.component.timeSlot.func.give.scrollBall_heightAttributes();
                },300);
            }
            /* Update Old Item */
            else{
                let itemObj = isObjExist[1];
                await app.component.item.func.set.itemObj_inItemObjs(itemObj, fieldValue);
                await app.component.item.func.set.itemObj_inLocalStorage(itemObj, fieldValue);
                app.component.item.func.give.itemField_value();
                let delay_forKeyboardExitOnMobile = setTimeout(()=>{
                    app.component.timeSlot.func.give.scrollBall_heightAttributes();
                },300);
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
            item_onAddPage.remove();
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
                resolve();
            };
            if( app.component.item.func.is.itemsUnderViewPageDay() === false){
                app.component.item.func.remove.dayHeader(dayId)
                resolve();
            };
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

/**
SET
***/
app.component.item.func.set.itemObj_inItemObjs = (selectedObj, fieldValue)=>{
    return new Promise((resolve)=>{
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === selectedObj.associated.createdId){
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
    if( app.component.item.state.selected[0] === false
    &&  app.component.pageTurner.state.preventClick === false){ // pageTurner can't be preventing click
        await app.component.item.func.makeAppend.itemNew_toAddPage(timeSlot);
        let itemElement = timeSlot.nextElementSibling.children[0];
        app.component.item.func.makeAppend.blurTile(itemElement);
        app.component.item.func.give.field_focus(timeSlot);
        app.component.item.func.give.hourHeader_showingAttributes(itemElement);
        /* state - selected ON */
        app.component.item.state.selected = [true, false, item];
    };
};

app.component.item.func.transition.hideItem = ()=>{
    let itemElement = app.component.item.state.selected[2];
    app.component.item.func.give.dayHeader_hidingAttributes(itemElement);
    app.component.item.func.give.field_hidingAttributes(itemElement);
    app.component.item.func.give.hourHeader_hidingAttributes(itemElement);
    app.component.item.func.give.tile_hidingAttributes(itemElement);
    app.component.item.func.give.trash_hidingAttributes(itemElement);
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.removeItem = async()=>{
    event.stopPropagation();
    let itemElement = app.component.item.state.selected[2];
    let dayId       = Number(itemElement.getAttribute("dayId"));
    /* remove */
    app.component.item.func.remove.blurTile();
    app.component.item.func.remove.item();
    /* delete - itemObj */
    await app.component.item.func.delete.itemObj();
    /* give  */
    app.component.item.func.give.dayHeader_hidingAttributes(itemElement);
    app.component.item.func.give.hourHeader_hidingAttributes(itemElement);
    app.component.item.func.give.dayInfo_onViewPage_updatedInfo(dayId); // must happen after remove
    let delay_forKeyboardExitOnMobile = setTimeout(()=>{
        app.component.timeSlot.func.give.scrollBall_heightAttributes(); // must happen after remove
    },300);
    /* makeAppend */
    app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]); // must happen after remove
    app.component.dayDropper.func.makeAppend.menuItems(); // must happen after remove
    /* state - selected OFF */
    app.component.item.state.selected = [false, false, null];
};

app.component.item.func.transition.showItem = (itemElement)=>{
    event.stopPropagation();
    if( app.component.item.state.selected[0] === false
    &&  app.component.pageTurner.state.preventClick === false){ // pageTurner can't be preventing click
        /* state - selected ON */
        app.component.item.state.selected = [true, false, itemElement];
        app.component.item.func.give.field_showingAttributes(itemElement);
        app.component.item.func.give.hourHeader_showingAttributes(itemElement);
        app.component.item.func.give.tile_showingAttributes(itemElement);
        app.component.item.func.give.trash_showingAttributes(itemElement);
        app.component.item.func.makeAppend.blurTile(itemElement);
        /* Page dependent func */
        let viewPage = document.querySelector(".viewPage");
        if( viewPage.contains(itemElement)){
            app.component.item.func.give.dayHeader_onViewPage_showingAttributes(itemElement);
        };
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
