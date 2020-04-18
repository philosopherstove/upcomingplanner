app.component.timeSlot = {};
app.component.timeSlot.func = {};
app.component.timeSlot.func.create       = {};
app.component.timeSlot.func.createAppend = {};
app.component.timeSlot.func.get          = {};
app.component.timeSlot.func.give         = {};
app.component.timeSlot.func.init         = {};
app.component.timeSlot.func.remove       = {};

/* func hotkeys:
CREATE
app.component.timeSlot.func.create.minValuesHTML = ()=>{
app.component.timeSlot.func.create.timeSlotHTML = (hr, hr12, AMorPM)=>{
CREATEAPPEND
app.component.timeSlot.func.createAppend.timeSlots = ()=>{
GET
app.component.timeSlot.func.get.AMorPM = (hr)=>{
app.component.timeSlot.func.get.to12Hour = (hr)=>{
GIVE
app.component.timeSlot.func.give.scrollBall_heightAttributes = ()=>{
app.component.timeSlot.func.give.timeSlots_scrollListener = ()=>{
app.component.timeSlot.func.give.timeSlots_scrollTopDefault = ()=>{
INIT
app.component.timeSlot.func.init.component = async()=>{
REMOVE
app.component.timeSlot.func.remove.timeSlotsWrap = ()=>{
*/

/*****
CREATE
******/
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
    if( hr12 < 10){spacingClass = "spacing";}
    let html = `
        <div class="slot">
            <div class="slotHeader" onclick="app.component.item.func.transition.createNewItem(this)">
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

/***********
CREATEAPPEND
************/
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
                let timeSlots = document.querySelector(".timeSlots");
                    timeSlots.appendChild(wrapper);
                app.component.timeSlot.func.give.timeSlots_scrollTopDefault();
                resolve();
            };
        };
    });
};

/**
GET
***/
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

/***
GIVE
****/
app.component.timeSlot.func.give.scrollBall_heightAttributes = ()=>{
    let timeSlots           = document.querySelector(".timeSlots");
    let timeSlots_div       = timeSlots.children[0];
    let height_noOverflow   = timeSlots.getBoundingClientRect().height;
    let height_withOverflow = timeSlots_div.getBoundingClientRect().height;
    let heightRatio         = height_noOverflow / height_withOverflow;
    let bar                 = document.querySelector(".scrollbar_timeSlots");
    let barHeight           = bar.getBoundingClientRect().height;
    let numberOfItemsOnPage = document.querySelectorAll(".timeSlots .itemTile").length;
    let ballHeight          = (barHeight * heightRatio) + numberOfItemsOnPage - 34;
    let ball                = document.querySelector(".scrollbar_timeSlots > span");
        ball.style.height   = `${ballHeight}px`;
        ball.setAttribute("heightRatio", heightRatio);
};

app.component.timeSlot.func.give.timeSlots_scrollListener = ()=>{
    let timeSlots = document.querySelector(".timeSlots");
        timeSlots.addEventListener("scroll", ()=>{
            let scrollTop            = event.srcElement.scrollTop;
            let ball                 = document.querySelector(".scrollbar_timeSlots > span");
                ballHeightRatio      = ball.getAttribute("heightRatio");
                ball.style.marginTop = `${scrollTop * ballHeightRatio}px`;
        });
};

app.component.timeSlot.func.give.timeSlots_scrollTopDefault = ()=>{
    let waitForSlotToAppend = setInterval(()=>{
        let timeSlots     = document.querySelector(".timeSlots");
        let top_timeSlots = timeSlots.getBoundingClientRect().top;
        let top_target    = top_timeSlots + 15;
        let top_7AMSlot   = document.querySelector(".slot:nth-of-type(7)").getBoundingClientRect().top;
        if( top_7AMSlot !== top_target){
            let newScrollTop;
            if( top_7AMSlot < top_target){
                let difference = top_target - top_7AMSlot;
                newScrollTop   = timeSlots.scrollTop - difference;
            }
            else
            if( top_7AMSlot > top_target){
                let difference = top_7AMSlot - top_target;
                newScrollTop   = timeSlots.scrollTop + difference;
            };
            timeSlots.scrollTop = newScrollTop;
            clearInterval(waitForSlotToAppend);
        };
    },1);
};

/***
INIT
****/
app.component.timeSlot.func.init.component = async()=>{
    await app.component.timeSlot.func.createAppend.timeSlots();
    app.component.timeSlot.func.give.scrollBall_heightAttributes();
    app.component.timeSlot.func.give.timeSlots_scrollListener();
};

/*****
REMOVE
******/
app.component.timeSlot.func.remove.timeSlotsWrap = ()=>{
    let timeSlotsWrap = document.querySelector(".timeSlots").children[0];
        timeSlotsWrap.remove();
};
