const app = {};
      app.component = {};
      app.func = {};
      app.func.refreshDaily = ()=>{
          let msInADay              = 86400000;
          let second                = 1000;
          let now_ms                = Date.now();
          let now_string            = new Date();
          let startOfThisDay_string = new Date(now_string.getFullYear(), now_string.getMonth(), now_string.getDate());
          let startOfThisDay_ms     = Date.parse(startOfThisDay_string);
          let nextRefresh_ms        = startOfThisDay_ms + msInADay+second - now_ms;
          let refreshWhenNextDay = setTimeout(()=>{
              location.reload();
          },nextRefresh_ms);
      };
/*************
INITIALIZATION
**************/
app.func.refreshDaily();
