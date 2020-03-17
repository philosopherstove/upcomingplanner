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
    let dataStoreObj             = JSON.parse(localStorage.upcomingPlanner);
    let numberOfItems            = dataStoreObj.items.length;
    if( numberOfItems === 0){
        left_determinesStartPage = 0;
    }
    else{
        left_determinesStartPage = -100;
    };

    let html = `
        <div class="app">
            <div class="pagesSlide slideTrans" style="left:${left_determinesStartPage}%;">
                <div class="addPage">
                    <div class="dropper borderHighlight_off" onclick="app.component.dayDropper.func.transition.openDropdown()">
                        <p class="currDay_text"></p>
                        <p class="items_daysCountdown"></p>
                        <div class="downArrow"></div>
                    </div>
                    <div class="dropdownMenu_day displayNone">
                        <span class="scrollWrapper">
                            <span class="scrollBar">
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
                    <div class="addPageButton pageButton_on">Add</div>
                    <div class="viewPageButton pageButton_off">View</div>
                </div>
            </div>
        </div>
    `;

    let body = document.body;
        body.insertAdjacentHTML("afterbegin", html);
};
