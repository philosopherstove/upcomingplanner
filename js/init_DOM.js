init_DOM();
async function init_DOM(){

    // Init localStorage token if not present
    if(window.localStorage.getItem("upcomingPlanner") === null){
        let obj = {};
            obj.items = [];
        window.localStorage.setItem("upcomingPlanner", JSON.stringify(obj));
    };

    /* Determine whether to start on addPage or viewPage: determined by number of items */
    let left_determinesStartPage = null;
    let footerButtonsHTML        = null;
    let dataStoreObj             = JSON.parse(localStorage.upcomingPlanner);
    let numberOfItems            = dataStoreObj.items.length;
    if( numberOfItems === 0){
        left_determinesStartPage = 0;
        footerButtonsHTML = `
            <div class="addPageButton pageButton_on">Add</div>
            <div class="viewPageButton pageButton_off">View</div>
        `;
    }
    else{
        left_determinesStartPage = -100;
        footerButtonsHTML = `
            <div class="addPageButton pageButton_off">Add</div>
            <div class="viewPageButton pageButton_on">View</div>
        `;
    };

    let html = `
        <div class="app">
            <div class="slider sliderTrans" style="left:${left_determinesStartPage}%;">
                <div class="addPage">
                    <div class="dropper" onclick="app.component.dayDropper.func.transition.openDropdown()">
                        <p class="currDay_text"></p>
                        <p class="items_daysCountdown"></p>
                        <div class="downArrow"></div>
                    </div>
                    <div class="dropdownMenu_day closedHeight closedBorder">
                        <span class="scrollWrapper">
                            <span class="scrollBar closedHeight">
                                <span class="scrollBall"></span>
                            </span>
                        </span>
                        <div class="dropdownMenu_innerWrapper"></div>
                    </div>
                    <div class="timeSlots"></div>
                    <div class="scrollbar_timeSlots"><span></span></div>
                </div>
                <div class="viewPage"></div>
            </div>
            <div class="footer">
                <div>
                    ${footerButtonsHTML}
                </div>
            </div>
        </div>
    `;

    let body = document.body;
        body.insertAdjacentHTML("afterbegin", html);
};
