app.component.viewList = {};
app.component.viewList.state = {};
app.component.viewList.state.itemActive = [false, null];
app.component.viewList.func = {};
app.component.viewList.func.delete     = {};
app.component.viewList.func.get        = {};
app.component.viewList.func.give       = {};
app.component.viewList.func.init       = {};
app.component.viewList.func.is         = {};
app.component.viewList.func.makeAppend = {};
app.component.viewList.func.post       = {};
app.component.viewList.func.remove     = {};
app.component.viewList.func.sort       = {};
app.component.viewList.func.transition = {};

/* func hotkeys:
DELETE
app.component.viewList.func.delete.itemObj = ()=>{
app.component.viewList.func.delete.itemObj_from_itemObjs = ()=>{
app.component.viewList.func.delete.itemObj_from_localStorage = ()=>{
GET
app.component.viewList.func.get.dayText_from_dayMS = (dayMS)=>{
GIVE
app.component.viewList.func.give.dayHeader_hidingAttributes = (itemElement)=>{
app.component.viewList.func.give.dayHeader_showingAttributes = (itemElement)=>{
app.component.viewList.func.give.field_hidingAttributes = (itemElement)=>{
app.component.viewList.func.give.field_showingAttributes = (itemElement)=>{
app.component.viewList.func.give.hourHeader_hidingAttributes = (itemElement)=>{
app.component.viewList.func.give.hourHeader_showingAttributes = (itemElement)=>{
app.component.viewList.func.give.itemOnAddPage_value = ()=>{
app.component.viewList.func.give.itemOnViewPage_value = ()=>{
app.component.viewList.func.give.tile_hidingAttributes = (itemElement)=>{
app.component.viewList.func.give.tile_showingAttributes = (itemElement)=>{
app.component.viewList.func.give.trash_hidingAttributes = (itemElement)=>{
app.component.viewList.func.give.trash_showingAttributes = (itemElement)=>{
INIT
app.component.viewList.func.init.component = async()=>{
IS
app.component.viewList.func.is.itemsUnderDay = ()=>{
app.component.viewList.func.is.itemsUnderHour = ()=>{
MAKEAPPEND
app.component.viewList.func.makeAppend.blurTile = ()=>{
app.component.viewList.func.makeAppend.viewItems = async(sorted)=>{
POST
app.component.viewList.func.post.item_to_dataStore = async()=>{
REMOVE
app.component.viewList.func.remove.blurTile = ()=>{
app.component.viewList.func.remove.dayHeader = ()=>{
app.component.viewList.func.remove.hourHeader = ()=>{
app.component.viewList.func.remove.item_fromAddPage = ()=>{
app.component.viewList.func.remove.item_fromViewPage = ()=>{
SORT
app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot = ()=>{
TRANSITION
app.component.viewList.func.transition.hideItem = ()=>{
app.component.viewList.func.transition.removeItem = async()=>{
app.component.viewList.func.transition.showItem = (itemElement)=>{
*/

/*****
DELETE
******/
app.component.viewList.func.delete.itemObj = ()=>{
    return new Promise(async(resolve)=>{
        await app.component.viewList.func.delete.itemObj_from_localStorage();
        await app.component.viewList.func.delete.itemObj_from_itemObjs();
        resolve();
    });
};

app.component.viewList.func.delete.itemObj_from_itemObjs = ()=>{
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

app.component.viewList.func.delete.itemObj_from_localStorage = ()=>{
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

/**
GET
***/
app.component.viewList.func.get.dayText_from_dayMS = (dayMS)=>{
    let dateString = `${new Date(dayMS)}`;
    let splits     = dateString.split(" ");
    let month      = splits[1];
    let dayName    = splits[0];
    let dayNum     = splits[2];
    let dayText    = `${dayName} ${month} ${dayNum}`;
    return dayText;
};

/***
GIVE
****/
app.component.viewList.func.give.dayHeader_hidingAttributes = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayMS");
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`).children[0];
        dayHeader.classList.remove("zIndex2");
};

app.component.viewList.func.give.dayHeader_showingAttributes = (itemElement)=>{
    let dayId     = itemElement.getAttribute("dayMS");
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`).children[0];
        dayHeader.classList.add("zIndex2");
};

app.component.viewList.func.give.field_hidingAttributes = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_main_vl");
        field.classList.remove("background_white_vl");
        field.setAttribute("readonly", "readonly");
};

app.component.viewList.func.give.field_showingAttributes = (itemElement)=>{
    let field = itemElement.children[1];
        field.classList.add("background_white_vl");
        field.classList.remove("background_main_vl");
        field.removeAttribute("readonly");
        field.blur();
};

app.component.viewList.func.give.hourHeader_hidingAttributes = (itemElement)=>{
    let dayId        = itemElement.getAttribute("dayMS");
    let hourId       = itemElement.getAttribute("data_hour");
    let headerOfItem = document.querySelector(`.dayBlock[dayMS="${dayId}"] > p.hourHeader_vl[data_hour="${hourId}"]`);
        headerOfItem.classList.remove("zIndex2");
};

app.component.viewList.func.give.hourHeader_showingAttributes = (itemElement)=>{
    let dayId        = itemElement.getAttribute("dayMS");
    let hourId       = itemElement.getAttribute("data_hour");
    let headerOfItem = document.querySelector(`.dayBlock[dayMS="${dayId}"] > p.hourHeader_vl[data_hour="${hourId}"]`);
        headerOfItem.classList.add("zIndex2");
};

app.component.viewList.func.give.itemOnAddPage_value = ()=>{
    let createdId                 = app.component.viewList.state.itemActive[1].getAttribute("createdId");
    let updatedValue              = app.component.viewList.state.itemActive[1].children[1].value;
    let itemElementField          = document.querySelector(`.itemTile[createdId="${createdId}"] > input`);
    if( itemElementField === null){return};
        itemElementField.readonly = false;
        itemElementField.value    = updatedValue;
        itemElementField.readonly = true;
};

app.component.viewList.func.give.itemOnViewPage_value = ()=>{
    let createdId                 = app.component.viewList.state.itemActive[1].getAttribute("createdId");
    let updatedValue              = app.component.viewList.state.itemActive[1].children[1].value;
    let itemElementField          = document.querySelector(`.itemTile_vl[createdId="${createdId}"] > input`);
        itemElementField.readonly = false;
        itemElementField.value    = updatedValue;
        itemElementField.readonly = true;
};

app.component.viewList.func.give.tile_hidingAttributes = (itemElement)=>{
    itemElement.classList.add("hideItemTile_vl");
    itemElement.classList.remove("zIndex2");
};

app.component.viewList.func.give.tile_showingAttributes = (itemElement)=>{
    itemElement.classList.remove("hideItemTile_vl");
    itemElement.classList.add("zIndex2");
};

app.component.viewList.func.give.trash_hidingAttributes = (itemElement)=>{
    let trash = itemElement.children[3];
        trash.classList.add("displayNone");
};

app.component.viewList.func.give.trash_showingAttributes = (itemElement)=>{
    let trash = itemElement.children[3];
        trash.classList.remove("displayNone");
};

/***
INIT
****/
app.component.viewList.func.init.component = async()=>{
    let sorted = await app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot();
    app.component.viewList.func.makeAppend.viewItems(sorted);
};

/*
IS
**/
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

/*********
MAKEAPPEND
**********/
app.component.viewList.func.makeAppend.blurTile = ()=>{
    let html = `<div class="blurTile" onclick="app.component.viewList.func.post.item_to_dataStore()"></div>`;
    let viewPage = document.querySelector(".viewPage");
        viewPage.insertAdjacentHTML("afterbegin", html);
};

app.component.viewList.func.makeAppend.viewItems = async(sorted)=>{
    let html = `
        <div class="viewItemsWrapper">
    `;
    let setDay       = null;
    let setHour      = null;
    let currentDayMS = app.component.dayDropper.func.get.day()[0];

    for(let i in sorted){

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

        let colorRed = "";
        if( currentDayMS === dayMS){
            colorRed = "colorRed";
        };

        if( setDay === null){  // first iteration
            // console.log('1st');
            setDay     = dayMS;
            setHour    = timeSlot;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            let spacingClass = "";
            if(hr_12 < 10){
                spacingClass = "spacing";
            };
            html += `
                    <div class="dayBlock" dayMS="${setDay}">
                        <div class="dayHeader_vl" onclick="app.component.viewList.func.transition.hideItem(); app.component.viewList.func.remove.blurTile()">
                            <p class="dayText_vl ${colorRed}">${day_text}</p>
                            <p class="dayInfo_vl ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
                        </div>
                        <p class="hourHeader_vl ${colorRed}" dayMS="${setDay}" data_hour="${timeSlot}">
                            <span class="${spacingClass}">${hr_12}</span>
                            <span>${AMorPM}</span>
                        </p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.post.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if( setDay  === dayMS      // same day
        &&  setHour === timeSlot){ // same hour
            // console.log(`same day & hour
            //     text=${obj.setting.text}
            //     dayMS=${dayMS}, setDay=${setDay}
            //     timeSlot=${timeSlot}, setHour=${setHour}
            // `);
            html += `
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.post.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if( setDay  === dayMS      // same day
        &&  setHour !== timeSlot){ // diff hour
            // console.log(`same day, diff hour
            //     text=${obj.setting.text}
            //     dayMS=${dayMS}, setDay=${setDay}
            //     timeSlot=${timeSlot}, setHour=${setHour}
            // `);
            setHour    = timeSlot;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            let spacingClass = "";
            if(hr_12 < 10){spacingClass = "spacing";}
            html += `
                        <p class="hourHeader_vl ${colorRed}" dayMS="${setDay}" data_hour="${timeSlot}">
                            <span class="${spacingClass}">${hr_12}</span>
                            <span>${AMorPM}</span>
                        </p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.post.item_to_dataStore()" spellcheck="false" readonly>
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if(setDay !== dayMS){      // diff day
            // console.log(`diff day
            //     text=${obj.setting.text}
            //     dayMS=${dayMS}
            //     timeSlot=${timeSlot}
            // `);
            setDay     = dayMS;
            setHour    = timeSlot;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            let spacingClass = "";
            if(hr_12 < 10){spacingClass = "spacing";}
            html += `
                    </div>
                    <div class="dayBlock" dayMS="${setDay}">
                        <div class="dayHeader_vl" onclick="app.component.viewList.func.transition.hideItem(); app.component.viewList.func.remove.blurTile()">
                            <p class="dayText_vl ${colorRed}">${day_text}</p>
                            <p class="dayInfo_vl ${colorRed}">(${numberOfItemsForDayString}${daysUntilString})</p>
                        </div>
                        <p class="hourHeader_vl ${colorRed}" dayMS="${setDay}" data_hour="${timeSlot}">
                            <span class="${spacingClass}">${hr_12}</span>
                            <span>${AMorPM}</span>
                        </p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" dayMS="${setDay}" data_hour="${timeSlot}" onclick="app.component.viewList.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.post.item_to_dataStore()" spellcheck="false" readonly>
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

/***
POST
****/
app.component.viewList.func.post.item_to_dataStore = async()=>{
    event.stopPropagation();
    let fieldValue = app.component.viewList.state.itemActive[1].children[1].value;
    if( fieldValue.trim().length > 0 // field NOT empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        let createdId = app.component.viewList.state.itemActive[1].getAttribute("createdId");
        let itemObj   = await app.component.item.func.get.itemObj_from_createdId(createdId);
        await app.component.item.func.set.itemObj_in_itemObjs(itemObj, fieldValue);
        await app.component.item.func.set.itemObj_in_localStorage(itemObj, fieldValue);
        app.component.viewList.func.give.itemOnAddPage_value();
        app.component.viewList.func.give.itemOnViewPage_value();
        app.component.viewList.func.transition.hideItem(); // needs to fire after create.componentObj, because the transition turns state off
        app.component.viewList.func.remove.blurTile();
    }
    else
    if( fieldValue.trim().length === 0 // field empty
    &&( event.key === "Enter" || event.target.classList.contains("blurTile")) ){ // AND either hit enter OR clicked off(clicked blurTile)
        app.component.viewList.func.transition.removeItem();
    };
};

/*****
REMOVE
******/
app.component.viewList.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
    if( blurTile === null){return};
        blurTile.remove();
};

app.component.viewList.func.remove.dayHeader = ()=>{
    let dayId     = app.component.viewList.state.itemActive[1].getAttribute("dayMS");
    let dayHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"]`);
        dayHeader.remove();
};

app.component.viewList.func.remove.hourHeader = ()=>{
    let dayId      = app.component.viewList.state.itemActive[1].getAttribute("dayMS");
    let hourId     = app.component.viewList.state.itemActive[1].getAttribute("data_hour");
    let hourHeader = document.querySelector(`.dayBlock[dayMS="${dayId}"] > p.hourHeader_vl[data_hour="${hourId}"]`);
        hourHeader.remove();
};

app.component.viewList.func.remove.item_fromAddPage = ()=>{
    let createdId = app.component.viewList.state.itemActive[1].getAttribute("createdId");
    let itemFromAddPage = document.querySelector(`.itemTile[createdId="${createdId}"]`);
    if( itemFromAddPage !== null){
        itemFromAddPage.remove();
    };
};

app.component.viewList.func.remove.item_fromViewPage = ()=>{
    let itemElement = app.component.viewList.state.itemActive[1];
        itemElement.remove();
    if( app.component.viewList.func.is.itemsUnderHour() === false){
        app.component.viewList.func.remove.hourHeader();
    };
    if( app.component.viewList.func.is.itemsUnderDay() === false){
        app.component.viewList.func.remove.dayHeader();
    };
};

/***
SORT
****/
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

/*********
TRANSITION
**********/
app.component.viewList.func.transition.hideItem = ()=>{
    /* give */
    let itemElement = app.component.viewList.state.itemActive[1];
    if( itemElement === null){return};
    app.component.viewList.func.give.dayHeader_hidingAttributes(itemElement);
    app.component.viewList.func.give.field_hidingAttributes(itemElement);
    app.component.viewList.func.give.hourHeader_hidingAttributes(itemElement);
    app.component.viewList.func.give.tile_hidingAttributes(itemElement);
    app.component.viewList.func.give.trash_hidingAttributes(itemElement);
    /* state - activeItem OFF */
    app.component.viewList.state.itemActive = [false, null];
};

app.component.viewList.func.transition.removeItem = async()=>{
    event.stopPropagation();
    /* give - attributes */
    let itemElement = app.component.viewList.state.itemActive[1];
    app.component.viewList.func.give.dayHeader_hidingAttributes(itemElement);
    app.component.viewList.func.give.hourHeader_hidingAttributes(itemElement);
    /* remove */
    app.component.viewList.func.remove.blurTile();
    app.component.viewList.func.remove.item_fromViewPage();
    app.component.viewList.func.remove.item_fromAddPage();
    /* delete - itemObj */
    await app.component.viewList.func.delete.itemObj();
    /* give - height to timeSlot scrollBall */
    app.component.timeSlot.func.give.scrollBall_heightAttributes();
    /* makeAppend */
    app.component.dayDropper.func.makeAppend.dropperText(app.component.dayDropper.setting.day[0]);
    app.component.dayDropper.func.makeAppend.menuItems();
    /* give - dayInfoOnViewPage */
    let dayId = Number(itemElement.getAttribute("dayMS"));
    app.component.item.func.give.dayInfoOnViewPage_updatedInfo(dayId);
    /* state - itemActive OFF */
    app.component.viewList.state.itemActive = [false, null];
};

app.component.viewList.func.transition.showItem = (itemElement)=>{
    event.stopPropagation();
    // if itemActive OFF
    if( app.component.viewList.state.itemActive[0] === false){
        /* state - itemActive ON */
        app.component.viewList.state.itemActive = [true, itemElement];
        /* give - attributes */
        app.component.viewList.func.give.dayHeader_showingAttributes(itemElement);
        app.component.viewList.func.give.field_showingAttributes(itemElement);
        app.component.viewList.func.give.hourHeader_showingAttributes(itemElement);
        app.component.viewList.func.give.tile_showingAttributes(itemElement);
        app.component.viewList.func.give.trash_showingAttributes(itemElement);
        /* makeAppend - blurTile */
        app.component.viewList.func.makeAppend.blurTile();
    };
};
