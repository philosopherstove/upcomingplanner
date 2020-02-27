app.component.viewList = {};
app.component.viewList.func = {};
app.component.viewList.func.createAppend = {};
app.component.viewList.func.init         = {};
app.component.viewList.func.sort         = {};

app.component.viewList.func.createAppend.viewItems = async(sorted)=>{
    // console.log(sorted);
    let html = `
        <div class="viewItemsWrapper">
    `;
    let setDay  = null;
    let setHour = null;
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

        if( setDay === null){ // first iteration
            console.log('1st');
            setDay     = dayMS;
            setHour    = timeSlot;
            console.log(setHour, 'init setHour');
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            html += `
                    <div class="dayBlock" dayMS="${setDay}">
                        <div class="dayHeader">
                            <p class="dayText_view">${day_text}</p>
                            <p class="dayInfo_view">(${numberOfItemsForDayString}${daysUntilString})</p>
                        </div>
                        <p class="hourHeader_vl" data_hour="${timeSlot}">${hr_12}${AMorPM}</p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" onclick="app.component.item.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false">
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if( setDay  === dayMS      // same day
        &&  setHour === timeSlot){ // same hour
            console.log("same");
            html += `
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" onclick="app.component.item.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false">
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if( setDay  === dayMS      // same day
        &&  setHour !== timeSlot){ // diff hour
            console.log(setHour, 'setHour');
            setHour    = timeSlot;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            html += `
                        <p class="hourHeader_vl" data_hour="${timeSlot}">${hr_12}${AMorPM}</p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" onclick="app.component.item.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false">
                            <div class="minValues_vl displayNone"></div>
                            <div class="trashIcon_vl displayNone" onclick="app.component.viewList.func.transition.removeItem();"></div>
                        </div>
            `;
        }
        else
        if(setDay !== dayMS){      // diff day
            console.log('diff day');
            setDay     = dayMS;
            setHour    = null;
            let AMorPM = app.component.timeSlot.func.get.AMorPM(timeSlot);
            let hr_12  = app.component.timeSlot.func.get.to12Hour(timeSlot);
            html += `
                    </div>
                    <div class="dayBlock" dayMS="${setDay}">
                        <div class="dayHeader">
                            <p class="dayText_view">${day_text}</p>
                            <p class="dayInfo_view">(${numberOfItemsForDayString}${daysUntilString})</p>
                        </div>
                        <p class="hourHeader_vl" data_hour="${timeSlot}">${hr_12}${AMorPM}</p>
                        <div class="itemTile_vl hideItemTile_vl" createdId="${obj.associated.createdId}" onclick="app.component.item.func.transition.showItem(this)">
                            <span class="dot_vl"></span>
                            <input class="itemField_vl background_main_vl" value="${obj.setting.text}" onkeyup="app.component.viewList.func.give.item_to_dataStore()" spellcheck="false">
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
            let upcomingPage = document.querySelector(".upcomingPage");
                upcomingPage.insertAdjacentHTML("afterbegin", html);
        };
    };
};

app.component.viewList.func.init.component = async()=>{
    console.log("init viewList");
    let sorted = await app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot();
    app.component.viewList.func.createAppend.viewItems(sorted);
};

app.component.viewList.func.sort.itemsObjs_by_dayAndTimeSlot = ()=>{
    return new Promise((resolve)=>{
        resolve(app.component.item.objs.sort(compare));
    });
    function compare(a, b){
        let dayA       = a.associated.day;
        let timeSlotA  = Number(a.associated.timeSlot);
        let dayB       = b.associated.day;
        let timeSlotB  = Number(b.associated.timeSlot);
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
            if(timeSlotA > timeSlotB){
                comparison = 1;
            }
            else
            if(timeSlotA < timeSlotB){
                comparison = -1;
            }
            else
            if(timeSlotA === timeSlotB){
                comparison = 0;
            };
        };
        return comparison;
    }
};
