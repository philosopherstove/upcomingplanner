app.component.timeSlot = {};
app.component.timeSlot.setting = {};
app.component.timeSlot.setting.element = document.querySelector(".timeSlots");
app.component.timeSlot.state = {};
app.component.timeSlot.state.active = false;
app.component.timeSlot.func = {};
app.component.timeSlot.func.create       = {};
app.component.timeSlot.func.createAppend = {};
app.component.timeSlot.func.get          = {};
app.component.timeSlot.func.give         = {};
app.component.timeSlot.func.init         = {};
app.component.timeSlot.func.remove       = {};
app.component.timeSlot.func.transition   = {};

/* func hotkeys:
app.component.timeSlot.func.create.item = async(timeSlot)=>{
app.component.timeSlot.func.create.minValuesHTML = ()=>{
app.component.timeSlot.func.create.timeSlotHTML = (hr, hr12, AMorPM)=>{
app.component.timeSlot.func.createAppend.blurTile = ()=>{
app.component.timeSlot.func.createAppend.itemHTML = (timeSlot)=>{
app.component.timeSlot.func.createAppend.timeSlots = ()=>{
app.component.timeSlot.func.give.height_to_scrollBall = ()=>{
app.component.timeSlot.func.give.scrollListener_to_timeSlots = ()=>{
app.component.timeSlot.func.give.scrollTopDefault_to_timeSlots = ()=>{
app.component.timeSlot.func.get.AMorPM = (hr)=>{
app.component.timeSlot.func.get.to12Hour = (hr)=>{
app.component.timeSlot.func.init.component = async()=>{
app.component.timeSlot.func.remove.blurTile = ()=>{
app.component.timeSlot.func.transition.createdItem = (element)=>{
*/

/* CREATE */
app.component.timeSlot.func.create.item = async(timeSlot)=>{
    if(app.component.timeSlot.state.active === true){ return; };
    await app.component.timeSlot.func.createAppend.itemHTML(timeSlot);
    app.component.timeSlot.func.transition.createdItem(timeSlot);
    /* STATES - timeSlot (active ON), item (selected ON) */
    app.component.timeSlot.state.active = true;
    let item = timeSlot.nextElementSibling.children[0];
    app.component.item.state.selected = [true, item];
};

app.component.timeSlot.func.create.minValuesHTML = ()=>{
    return new Promise((resolve)=>{
        let html = "";
        let minuteNumbers = ["--", "10", "15", "20", "30", "40", "45", "50"];
        for(let i = 0; i < minuteNumbers.length; i++){
            let number = minuteNumbers[i];
            html += `<p>${number}</p>`;
            if(i === minuteNumbers.length - 1){
                resolve(html);
            };
        };
    });
};

app.component.timeSlot.func.create.timeSlotHTML = (hr, hr12, AMorPM)=>{
    let spacingClass = "";
    if(hr12 < 10){spacingClass = "spacing";}
    let html = `
        <div class="slot">
            <div class="slotHeader" onclick="app.component.timeSlot.func.create.item(this)">
                <p class="time" data_hour="${hr}">
                    <span class="${spacingClass}">${hr12}</span>
                    <span>${AMorPM}</span>
                </p>
                <div class="addButton"></div>
            </div>
            <div class="slotBody"></div>
        </div>
    `;
    return html;
};

/* CREATEAPPEND */
app.component.timeSlot.func.createAppend.blurTile = ()=>{
    let html = `<div class="blurTile" onclick="app.component.item.func.give.item_to_dataStore();"></div>`;
    let addPage = document.querySelector(".addPage");
        addPage.insertAdjacentHTML("afterbegin", html);
};

app.component.timeSlot.func.createAppend.itemHTML = (timeSlot)=>{
    return new Promise((resolve)=>{
        let createdId = Date.now();
        let dayId     = app.component.dayDropper.setting.day[0];
        let hourId    = Number(timeSlot.children[0].getAttribute("data_hour"));
        let html = `
            <div class="itemTile zIndex2" createdId="${createdId}" dayId="${dayId}" hourId="${hourId}" onclick="app.component.item.func.transition.showItem(this)">
                <span class="dot"></span>
                <input class="itemField background_white" spellcheck="false" onkeyup="app.component.item.func.give.item_to_dataStore();">
                <div class="minValues displayNone"></div>
                <div class="trashIcon" onclick="app.component.item.func.transition.removeItem();"></div>
            </div>
        `;
        let slotBody = timeSlot.nextElementSibling;
            slotBody.insertAdjacentHTML("afterbegin", html);
        resolve();
    });
};

app.component.timeSlot.func.createAppend.timeSlots = ()=>{
    return new Promise((resolve)=>{
        let wrapper = document.createElement("div");
        let hours   = 24;
        for(let i = 0; i < hours; i++){
            let hr            = i + 1;
            let AMorPM        = app.component.timeSlot.func.get.AMorPM(hr);
            let hr_12         = app.component.timeSlot.func.get.to12Hour(hr);
            let html_timeSlot = app.component.timeSlot.func.create.timeSlotHTML(hr, hr_12, AMorPM);
            wrapper.insertAdjacentHTML("beforeend", html_timeSlot);
            if(i === hours - 1){
                app.component.timeSlot.setting.element.appendChild(wrapper);
                app.component.timeSlot.func.give.scrollTopDefault_to_timeSlots();
                resolve();
            };
        };
    });
};

/* GET */
app.component.timeSlot.func.get.AMorPM = (hr)=>{
    if(hr < 12){
        return 'AM';
    }
    else{
        return 'PM';
    };
};

app.component.timeSlot.func.get.to12Hour = (hr)=>{
    if(hr > 12){
        return (hr - 12);
    }
    else{
        return hr;
    };
};

/* GIVE */
app.component.timeSlot.func.give.height_to_scrollBall = ()=>{
    let timeSlots           = document.querySelector(".timeSlots");
    let timeSlots_div       = timeSlots.children[0];
    let height_noOverflow   = timeSlots.getBoundingClientRect().height;
    let height_withOverflow = timeSlots_div.getBoundingClientRect().height;
    let heightRatio         = height_noOverflow / height_withOverflow;
    let bar                 = document.querySelector(".scrollbar_timeSlots");
    let barHeight           = bar.getBoundingClientRect().height;
    let numberOfItemsOnPage = document.querySelectorAll(".itemTile").length;
    let ballHeight          = (barHeight * heightRatio) + numberOfItemsOnPage - 34;
    let ball                = document.querySelector(".scrollbar_timeSlots > span");
        ball.style.height   = `${ballHeight}px`;
        ball.setAttribute("heightRatio", heightRatio);
};

app.component.timeSlot.func.give.scrollListener_to_timeSlots = ()=>{
    let timeSlots = document.querySelector(".timeSlots");
        timeSlots.addEventListener("scroll", ()=>{
            let scrollTop            = event.srcElement.scrollTop;
            let ball                 = document.querySelector(".scrollbar_timeSlots > span");
                ballHeightRatio      = ball.getAttribute("heightRatio");
                ball.style.marginTop = `${scrollTop * ballHeightRatio}px`;
        });
};

app.component.timeSlot.func.give.scrollTopDefault_to_timeSlots = ()=>{
    let waitForSlotToAppend = setInterval(()=>{
        let timeSlots     = document.querySelector(".timeSlots");
        let top_timeSlots = timeSlots.getBoundingClientRect().top;
        let top_target    = top_timeSlots + 15;

        let top_7AMSlot  = document.querySelector(".slot:nth-of-type(7)").getBoundingClientRect().top;
        if( top_7AMSlot !== top_target){
            let newScrollTop;
            if(top_7AMSlot < top_target){
                let difference   = top_target - top_7AMSlot;
                newScrollTop = timeSlots.scrollTop - difference;
            }
            else
            if(top_7AMSlot > top_target){
                let difference = top_7AMSlot - top_target;
                newScrollTop = timeSlots.scrollTop + difference;
            };
            timeSlots.scrollTop = newScrollTop;
            clearInterval(waitForSlotToAppend);
        };
    },1);
};

/* INIT */
app.component.timeSlot.func.init.component = async()=>{
    await app.component.timeSlot.func.createAppend.timeSlots();
    app.component.timeSlot.func.give.height_to_scrollBall();
    app.component.timeSlot.func.give.scrollListener_to_timeSlots();
};

/* REMOVE */
app.component.timeSlot.func.remove.blurTile = ()=>{
    let blurTile = document.querySelector(".blurTile");
        blurTile.remove();
};

/* TRANSITION */
app.component.timeSlot.func.transition.createdItem = (element)=>{
    app.component.timeSlot.func.createAppend.blurTile();
    let headerTime = element.children[0];
        headerTime.classList.add("zIndex2"); // header z-index above blurTile
    let itemField = element.nextElementSibling.children[0].children[1];
        itemField.focus(); // focus in field
};
