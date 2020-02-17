const app = {};
      app.component = {};
      app.func = {};
      app.func.refreshDaily = ()=>{
          let msInADay            = 86400000;
          let second              = 1000;
          let now_ms              = Date.now();
          let now_string          = new Date();
          let startOfToday_string = new Date(now_string.getFullYear(), now_string.getMonth(), now_string.getDate());
          let startOfToday_ms     = Date.parse(startOfToday_string);
          let nextRefresh_ms      = startOfToday_ms + msInADay+second - now_ms;
          let refreshWhenNextDay  = setTimeout(()=>{
              location.reload();
          },nextRefresh_ms);
      };

/* INITIALIZATION */
app.func.refreshDaily();
