app.component.viewList = {};
app.component.viewList.state = {};
app.component.viewList.state.itemActive = [false, null];
app.component.viewList.func = {};
app.component.viewList.func.createAppend = {};
app.component.viewList.func.get          = {};
app.component.viewList.func.give         = {};
app.component.viewList.func.init         = {};
app.component.viewList.func.is           = {};
app.component.viewList.func.remove       = {};
app.component.viewList.func.set          = {};
app.component.viewList.func.sort         = {};
app.component.viewList.func.transition   = {};

/* func hotkeys:
app.component.viewList.func.createAppend.blurTile = ()=>{
app.component.viewList.func.createAppend.viewItems = async(sorted)=>{
app.component.viewList.func.get.isObjExist = ()=>{
app.component.viewList.func.give.item_to_dataStore = async()=>{
app.component.viewList.func.init.component = async()=>{
app.component.viewList.func.is.itemsUnderDay = ()=>{
app.component.viewList.func.is.itemsUnderHour = ()=>{
app.component.viewList.func.remove.blurTile = ()=>{
app.component.viewList.func.remove.itemElement = ()=>{
app.component.viewList.func.remove.itemElementFromAddPage = ()=>{
app.component.viewList.func.remove.itemObj = ()=>{
app.component.viewList.func.remove.itemObj_from_itemObjs = ()=>{
app.component.viewList.func.remove.itemObj_from_localStorage = ()=>{
app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot = ()=>{
app.component.viewList.func.transition.hideItem = ()=>{
app.component.viewList.func.transition.hideItem_dayHeader = (itemElement)=>{
app.component.viewList.func.transition.hideItem_field = (itemElement)=>{
app.component.viewList.func.transition.hideItem_hourHeader = (itemElement)=>{
app.component.viewList.func.transition.hideItem_tile = ()=>{
app.component.viewList.func.transition.hideItem_trash = (itemElement)=>{
app.component.viewList.func.transition.removeItem = async()=>{
app.component.viewList.func.transition.showItem = (itemElement)=>{
app.component.viewList.func.transition.showItem_dayHeader = (itemElement)=>{
app.component.viewList.func.transition.showItem_field = (itemElement)=>{
app.component.viewList.func.transition.showItem_hourHeader = (itemElement)=>{
app.component.viewList.func.transition.showItem_tile = (itemElement)=>{
app.component.viewList.func.transition.showItem_trash = (itemElement)=>{
*/

/* createAppend */

app.component.viewList.func.createAppend.blurTile = ()=>{
    let html = `<div class="blurTile" onclick="app.component.viewList.func.give.item_to_dataStore();"></div>`;
    let viewPage = document.querySelector(".viewPage");
        viewPage.insertAdjacentHTML("afterbegin", html);
};

app.component.viewList.func.createAppend.viewItems = async(sorted)=>{
    let html = `
        <div class="viewItemsWrapper">
    `;
    let setDay  = null;
    let setHour = null;
    for(let i in sorted){
    // for(let i = sorted.length-1; i > -1; i--){
        // console.log('hi')
        let obj      = sorted[i];
        let dayMS    = obj.associated.day;
        let timeSlot = Number(obj.associated.timeSlot);

        let dateString                = `${new Date(dayMS)}`;
        let splits                    = dateString.split(" ");
        let month                     = splits[1];
        let dayName                   = splits[0];
        let dayNum                    = splits[2];
        let day_text                  = `${dayName} ${month} ${dayNum}`;

        let numberOfItemsForDayString = await app.component.dayDropper.func.get.numberOfItemsForDayString(dayMS);
        let daysUntilString           = app.component.dayDropper.func.get.daysUntilString(dayMS);

        if( setDay === null){      // first iteration
            setDay     = dayMS;
            setHour    = timeSlot;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            html += `
                    <div class="dayBlock" dayMS="${setDay}">
                        <div class="dayHeader_vl">
                            <p class="dayText_vl">${day_text}</p>
                            <p class="dayInfo_vl">(${numberOfItemsForDayString}${daysUntilString})</p>
                        </div>
                        <p class="hourHeader_vl" dayMS="${setDay}" data_hour="${timeSlot}">
                            <span>${hr_12}</span>
                            <span>${AMorPM}</span>
                        </p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if( setDay  === dayMS      // same day
        &&  setHour === timeSlot){ // same hour
            html += `
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if( setDay  === dayMS      // same day
        &&  setHour !== timeSlot){ // diff hour
            setHour    = timeSlot;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            html += `
                        <p class="hourHeader_vl" dayMS="${setDay}" data_hour="${timeSlot}">${hr_12} ${AMorPM}</p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if(setDay !== dayMS){      // diff day
            setDay     = dayMS;
            setHour    = null;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            html += `
                    </div>
                    <div class="dayBlock" dayMS="${setDay}">
                        <div class="dayHeader_vl">
                            <p class="dayText_vl">${day_text}</p>
                            <p class="dayInfo_vl">(${numberOfItemsForDayString}${daysUntilString})</p>
                        </div>
                        <p class="hourHeader_vl" dayMS="${setDay}" data_hour="${timeSlot}">${hr_12} ${AMorPM}</p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        };

        if(Number(i) === sorted.length-1){ // end of loop, closing tags
            html += `
                    </div>
                </div>
            `;
            let viewPage = document.querySelector(".viewPage");
                viewPage.insertAdjacentHTML("afterbegin", html);
        };
    };
};

/* get */

app.component.viewList.func.get.dayText_from_dayMS = (dayMS)=>{
    let dateString = `${new Date(dayMS)}`;
    let splits     = dateString.split(" ");
    let month      = splits[1];
    let dayName    = splits[0];
    let dayNum     = splits[2];
    let dayText    = `${dayName} ${month} ${dayNum}`;
    return dayText;
};

app.component.viewList.func.get.isObjExist = ()=>{
    return new Promise((resolve)=>{
        let selectedItem = app.component.viewList.state.itemActive[1];
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

/* give */

app.component.viewList.func.give.item_to_dataStore = async()=>{
    event.stopPropagation();
    let fieldValue = app.component.viewList.state.itemActive[1].children[1].value;
    if( fieldValue.trim().length > 0 // field NOT empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        let createdId = app.component.viewList.state.itemActive[1].getAttribute("createdId");
        let itemObj   = await app.component.item.func.get.itemObj_from_createdId(createdId);
        await app.component.item.func.set.componentObj_in_objs(itemObj, fieldValue);
        await app.component.item.func.set.componentObj_in_localStorage(itemObj, fieldValue);
        app.component.viewList.func.give.value_to_itemElementOnAddPage();
        app.component.viewList.func.give.value_to_itemElementOnViewPage();
        app.component.viewList.func.transition.hideItem(); // needs to fire after create.componentObj, because the transition turns state off
        app.component.viewList.func.remove.blurTile();
    }
    else
    if( fieldValue.trim().length === 0 // field empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.viewList.func.transition.removeItem();
    };
};

app.component.viewList.func.give.value_to_itemElementOnAddPage = ()=>{
    let createdId                 = app.component.viewList.state.itemActive[1].getAttribute("createdId");
    let updatedValue              = app.component.viewList.state.itemActive[1].children[1].value;
    let itemElementField          = document.querySelector(`.itemTile[createdId="${createdId}"] > input`);
    if( itemElementField === null){return};
        itemElementField.readonly = false;
        itemElementField.value    = updatedValue;
        itemElementField.readonly = true;
};

app.component.viewList.func.give.value_to_itemElementOnViewPage = ()=>{
    let createdId                 = app.component.viewList.state.itemActive[1].getAttribute("createdId");
    let updatedValue              = app.component.viewList.state.itemActive[1].children[1].value;
    let itemElementField          = document.querySelector(`.itemTile_vl[createdId="${createdId}"] > input`);
        itemElementField.readonly = false;
        itemElementField.value    = updatedValue;
        itemElementField.readonly = true;
};

/* init */

app.component.viewList.func.init.component = async()=>{
    let sorted = await app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot();
    app.component.viewList.func.createAppend.viewItems(sorted);
};

/* is */

app.component.viewList.func.is.itemsUnderDay = ()=>{
    let activeItem     = app.component.viewList.state.itemActive[1];
    let dayId          = activeItem.getAttribute("dayMS");
    let itemsUnderDay  = document.querySelectorAll(`div.itemTile_vl[dayMS="${dayId}"]`);
    if( itemsUnderDay.length === 0){ // no itemsUnderHour
        return false;
    }
    else{
        return true;
    };
};

app.component.viewList.func.is.itemsUnderHour = ()=>{
    let activeItem     = app.component.viewList.state.itemActive[1];
    let dayId          = activeItem.getAttribute("dayMS");
    let hourId         = activeItem.getAttribute("data_hour");
    let itemsUnderHour = document.querySelectorAll(`div.itemTile_vl[dayMS="${dayId}"][data_hour="${hourId}"]`);
    if( itemsUnderHour.length === 0){ // no itemsUnderHour
        return false;
    }
    else{
        return true;
    };
};

/* remove */

app.component.viewList.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.remove();
};

app.component.viewList.func.remove.dayHeader = ()=>{
    let dayId     = app.component.viewList.state.itemActive[1].getAttribute("dayMS");
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`);
        dayHeader.remove();
};

app.component.viewList.func.remove.hourHeader = ()=>{
    let hourId       = app.component.viewList.state.itemActive[1].getAttribute("data_hour");
    let hourHeader = document.querySelector(`.dayBlock > p.hourHeader_vl[data_hour="${hourId}"]`);
        hourHeader.remove();
};

app.component.viewList.func.remove.itemElement = ()=>{
    let itemElement = app.component.viewList.state.itemActive[1];
        itemElement.remove();
    if(app.component.viewList.func.is.itemsUnderHour() === false){
        app.component.viewList.func.remove.hourHeader();
    };
    if(app.component.viewList.func.is.itemsUnderDay() === false){
        app.component.viewList.func.remove.dayHeader();
    };
};

app.component.viewList.func.remove.itemElementFromAddPage = ()=>{
    let createdId = app.component.viewList.state.itemActive[1].getAttribute("createdId");
    let itemFromAddPage = document.querySelector(`.itemTile[createdId="${createdId}"]`);
    if( itemFromAddPage !== null){
        itemFromAddPage.remove();
    };
};

app.component.viewList.func.remove.itemObj = ()=>{
    return new Promise(async(resolve)=>{
        await app.component.viewList.func.remove.itemObj_from_localStorage();
        await app.component.viewList.func.remove.itemObj_from_itemObjs();
        resolve();
    });
};

app.component.viewList.func.remove.itemObj_from_itemObjs = ()=>{
    return new Promise((resolve)=>{
        if(app.component.item.objs.length === 0){ // no objs
            resolve();
        };
        for(i in app.component.item.objs){
            let obj = app.component.item.objs[i];
            if( obj.associated.createdId === Number(app.component.viewList.state.itemActive[1].getAttribute("createdId"))){
                app.component.item.objs.splice(i,1);
                resolve();
            };
            if(Number(i) === app.component.item.objs.length-1){ // end of loop, no match found
                resolve();
            };
        };
    });
};

app.component.viewList.func.remove.itemObj_from_localStorage = ()=>{
    return new Promise((resolve)=>{
        let localStorageObj      = JSON.parse(localStorage.upcomingPlanner);
        let localStorageItemObjs = localStorageObj.items;
        if( localStorageItemObjs.length === 0){ // no objs
            resolve();
        };
        for(i in localStorageItemObjs){
            let obj = localStorageItemObjs[i];
            if( obj.associated.createdId === Number(app.component.viewList.state.itemActive[1].getAttribute("createdId"))){
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

/* sort */

app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot = ()=>{
    return new Promise((resolve)=>{
        resolve(app.component.item.objs.sort(compare));
    });
    function compare(a, b){
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
};

app.component.viewList.func.transition.hideItem = ()=>{
    /* TRANSITION - blurTile, field, headerTime, min, tile, trash elements*/
    let itemElement = app.component.viewList.state.itemActive[1];
    app.component.viewList.func.transition.hideItem_dayHeader(itemElement);
    app.component.viewList.func.transition.hideItem_field(itemElement);
    app.component.viewList.func.transition.hideItem_hourHeader(itemElement);
    app.component.viewList.func.transition.hideItem_tile(itemElement);
    app.component.viewList.func.transition.hideItem_trash(itemElement);
    /* STATE - activeItem OFF */
    app.component.viewList.state.itemActive = [false, null];
};

app.component.viewList.func.transition.hideItem_dayHeader = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayMS");
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`).children[0];
        dayHeader.classList.remove("zIndex2");
};

app.component.viewList.func.transition.hideItem_field = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_main_vl");
        field.classList.remove("background_white_vl");
        field.setAttribute("readonly", "readonly");
};

app.component.viewList.func.transition.hideItem_hourHeader = (itemElement)=>{
    let dayId        = itemElement.getAttribute("dayMS");
    let hourId       = itemElement.getAttribute("data_hour");
    let headerOfItem = document.querySelector(`.dayBlock[dayMS="${dayId}"] > p.hourHeader_vl[data_hour="${hourId}"]`);
        headerOfItem.classList.remove("zIndex2");
};

app.component.viewList.func.transition.hideItem_tile = (itemElement)=>{
    itemElement.classList.add("hideItemTile_vl");
    itemElement.classList.remove("zIndex2");
};

app.component.viewList.func.transition.hideItem_trash = (itemElement)=>{
    let trash = itemElement.children[3];
        trash.classList.add("displayNone");
};

app.component.viewList.func.transition.removeItem = async()=>{
    event.stopPropagation();
    /* TRANSITION - hide - day and hour zIndex */
    let itemElement = app.component.viewList.state.itemActive[1];
    app.component.viewList.func.transition.hideItem_dayHeader(itemElement);
    app.component.viewList.func.transition.hideItem_hourHeader(itemElement);
    /* REMOVE - elements */
    app.component.viewList.func.remove.blurTile();
    app.component.viewList.func.remove.itemElement();
    app.component.viewList.func.remove.itemElementFromAddPage();
    /* REMOVE - itemObjs */
    await app.component.viewList.func.remove.itemObj();
    /* CREATEAPPEND - daydropper text, htmlInsideDropdown (has to happen after itemObj removed) */
    app.component.dayDropper.func.createAppend.dayDropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.createAppend.htmlInsideDropdown();
    /* UPDATE - dayInfoOnViewPage */
    let dayId = Number(itemElement.getAttribute("dayMS"));
    app.component.item.func.update.dayInfoOnViewPage(dayId);
    /* STATE - itemActive OFF */
    app.component.viewList.state.itemActive = [false, null];
};

// app.component.viewList.func.transition.hideItem_headerTimeElement = ()=>{
//
// };

// app.component.viewList.func.transition.removeItem_headerTimeZIndex = ()=>{
//     let hourId       = app.component.viewList.state.itemActive[1].getAttribute("data_hour");
//     let headerOfItem = document.querySelector(`.dayBlock > p.hourHeader_vl[data_hour="${hourId}"]`);
//         headerOfItem.classList.remove("zIndex2");
// };

app.component.viewList.func.transition.showItem = (itemElement)=>{
    event.stopPropagation();
    // if itemActive OFF
    if( app.component.viewList.state.itemActive[0] === false){
        /* STATE - itemActive ON */
        app.component.viewList.state.itemActive = [true, itemElement];
        /* TRANSITION - field, tile, trash elements */
        app.component.viewList.func.transition.showItem_dayHeader(itemElement);
        app.component.viewList.func.transition.showItem_field(itemElement);
        app.component.viewList.func.transition.showItem_hourHeader(itemElement);
        app.component.viewList.func.transition.showItem_tile(itemElement);
        app.component.viewList.func.transition.showItem_trash(itemElement);
        /* CREATEAPPEND - blurTile */
        app.component.viewList.func.createAppend.blurTile();
    };
};

app.component.viewList.func.transition.showItem_dayHeader = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayMS");
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`).children[0];
        dayHeader.classList.add("zIndex2");
};

app.component.viewList.func.transition.showItem_field = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_white_vl");
        field.classList.remove("background_main_vl");
        field.removeAttribute("readonly");
        field.blur();
};

app.component.viewList.func.transition.showItem_hourHeader = (itemElement)=>{
    let dayId        = itemElement.getAttribute("dayMS");
    let hourId       = itemElement.getAttribute("data_hour");
    let headerOfItem = document.querySelector(`.dayBlock[dayMS="${dayId}"] > p.hourHeader_vl[data_hour="${hourId}"]`);
        headerOfItem.classList.add("zIndex2");
};

app.component.viewList.func.transition.showItem_tile = (itemElement)=>{
    itemElement.classList.remove("hideItemTile_vl");
    itemElement.classList.add("zIndex2");
};

app.component.viewList.func.transition.showItem_trash = (itemElement)=>{
    let trash = itemElement.children[3];
        trash.classList.remove("displayNone");
};
