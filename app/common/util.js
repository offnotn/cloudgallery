"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var dialogs = require("ui/dialogs");
var nativescript_exit_1 = require("nativescript-exit");
var Settings = require("application-settings");
var Util = /** @class */ (function () {
    function Util(router, route) {
        this.router = router;
        this.route = route;
        this.DEBUG = false;
        this.LOGTOSETTINGS = false;
        this.id = "UTIL_" + this.getTimestamp();
        this.loggerReset();
    }
    Util.prototype.getID = function () {
        return this.id;
    };
    Util.prototype.replaceAll = function (text, search, replacement) {
        return text.replace(new RegExp(search, 'g'), replacement);
    };
    Util.prototype.loggerReset = function () {
        var LOGAGE = Settings.getNumber("_LOGAGE");
        if (LOGAGE == null)
            LOGAGE = 0;
        if (LOGAGE >= 1) {
            LOGAGE = 0;
            Settings.setString("_LOG", "");
        }
        Settings.setNumber("_LOGAGE", LOGAGE + 1);
    };
    Util.prototype.loggerAppend = function (newLog) {
        var log = Settings.getString("_LOG");
        Settings.setString("_LOG", log + newLog);
    };
    Util.prototype.log = function (tag, obj) {
        if (this.DEBUG) {
            try {
                if (this.LOGTOSETTINGS) {
                    this.loggerAppend(tag + "\n");
                    if (obj != null)
                        this.loggerAppend(JSON.stringify(obj, null, 10) + "\n");
                }
                console.log(tag);
                if (obj != null)
                    console.log(JSON.stringify(obj, null, 10));
            }
            catch (ex) { }
        }
    };
    Util.prototype.sleep = function (time) {
        return new Promise(function (resolve) { return setTimeout(resolve, time); });
        /* Usage!
            util.sleep(500).then(() => {
                // Do something after the sleep!
            })
        */
    };
    Util.prototype.exit = function () {
        nativescript_exit_1.exit();
    };
    Util.prototype.navigate = function (to) {
        var path = [to];
        this.log("Navigate to", path);
        this.router.navigate(path, {
            transition: {
                name: "fadeIn",
                duration: 500,
                curve: "linear"
            }
        });
    };
    Util.prototype.navigatePage = function (to) {
        var path = ['root', { outlets: { rootoutlet: [to] } }];
        this.log("Navigate to", path);
        this.router.navigate(path, {
            transition: {
                name: "slideLeft",
                duration: 500,
                curve: "linear"
            }
        });
    };
    Util.prototype.navigateSection = function (to) {
        var path = ['base', { outlets: { baseoutlet: [to] } }];
        this.log("Navigate to", path);
        this.router.navigate(path, {
            transition: {
                name: "slideLeft",
                duration: 500,
                curve: "linear"
            }
        });
    };
    /* handle android back button */
    Util.prototype.navigateBack = function () {
        this.log("Navigate back", this.route.url);
        if (this.route.url != "/root/(rootoutlet:login)" &&
            this.route.url != "/base/(baseoutlet:home)") {
            this.router.back();
        }
        else {
            dialogs.confirm({
                title: "",
                message: "Sei sicuro di voler uscire dall'app?",
                okButtonText: "Esci",
                cancelButtonText: "Non ancora"
            }).then(function (confirm) {
                if (confirm)
                    nativescript_exit_1.exit();
            });
        }
    };
    Util.prototype.onTouchEffect = function (e) {
        if (e.type = "tap" && e.action == "down") {
            e.view.style.opacity = "0.5";
        }
        if (e.type = "tap" && e.action == "up") {
            e.view.style.opacity = "1";
        }
    };
    Util.prototype.getTimestamp = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var year_s = String("0000" + year).slice(-4);
        var month_s = String("00" + month).slice(-2);
        var day_s = String("00" + day).slice(-2);
        var hour_s = String("00" + hour).slice(-2);
        var minute_s = String("00" + minute).slice(-2);
        var second_s = String("00" + second).slice(-2);
        var timestamp = year_s + month_s + day_s + hour_s + minute_s + second_s;
        return timestamp;
    };
    Util.prototype.isValidEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    Util = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_2.RouterExtensions,
            router_1.Router])
    ], Util);
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBMkM7QUFDM0MsMENBQXlDO0FBQ3pDLHNEQUErRDtBQUMvRCxvQ0FBc0M7QUFDdEMsdURBQXlDO0FBQ3pDLCtDQUFpRDtBQUlqRDtJQU1JLGNBQ1ksTUFBdUIsRUFDdkIsS0FBYTtRQURiLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFObEIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBT3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLG9CQUFLLEdBQVo7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0seUJBQVUsR0FBakIsVUFBa0IsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0sMEJBQVcsR0FBbEI7UUFDSSxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLEVBQUUsQ0FBQSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUM7WUFBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFD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Q0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksU0FBUyxHQUFHLE1BQU0sR0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELDJCQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2QsSUFBSSxFQUFFLEdBQUcsd0pBQXdKLENBQUM7UUFDbEssTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQTVKUSxJQUFJO1FBRGhCLGlCQUFVLEVBQUU7eUNBUVUseUJBQWdCO1lBQ2hCLGVBQU07T0FSaEIsSUFBSSxDQThKaEI7SUFBRCxXQUFDO0NBQUEsQUE5SkQsSUE4SkM7QUE5Slksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgZXhpdCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1leGl0JztcclxuaW1wb3J0ICogYXMgU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXRpbCB7XHJcblxyXG4gICAgcHVibGljIERFQlVHID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTE9HVE9TRVRUSU5HUyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjpSb3V0ZXJFeHRlbnNpb25zLCBcclxuICAgICAgICBwcml2YXRlIHJvdXRlOiBSb3V0ZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBcIlVUSUxfXCIgKyB0aGlzLmdldFRpbWVzdGFtcCgpOyAgIFxyXG4gICAgICAgIHRoaXMubG9nZ2VyUmVzZXQoKTsgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJRCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVwbGFjZUFsbCh0ZXh0LCBzZWFyY2gsIHJlcGxhY2VtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShuZXcgUmVnRXhwKHNlYXJjaCwgJ2cnKSwgcmVwbGFjZW1lbnQpO1xyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgbG9nZ2VyUmVzZXQoKSB7XHJcbiAgICAgICAgdmFyIExPR0FHRSA9IFNldHRpbmdzLmdldE51bWJlcihcIl9MT0dBR0VcIik7XHJcbiAgICAgICAgaWYoTE9HQUdFPT1udWxsKSBMT0dBR0UgPSAwO1xyXG4gICAgICAgIGlmKExPR0FHRT49MSkge1xyXG4gICAgICAgICAgICBMT0dBR0UgPSAwO1xyXG4gICAgICAgICAgICBTZXR0aW5ncy5zZXRTdHJpbmcoXCJfTE9HXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZXR0aW5ncy5zZXROdW1iZXIoXCJfTE9HQUdFXCIsIExPR0FHRSsxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nZ2VyQXBwZW5kKG5ld0xvZykge1xyXG4gICAgICAgIHZhciBsb2cgPSBTZXR0aW5ncy5nZXRTdHJpbmcoXCJfTE9HXCIpO1xyXG4gICAgICAgIFNldHRpbmdzLnNldFN0cmluZyhcIl9MT0dcIiwgbG9nICsgbmV3TG9nKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nKHRhZywgb2JqKSB7XHJcbiAgICAgICAgaWYodGhpcy5ERUJVRykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5MT0dUT1NFVFRJTkdTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXJBcHBlbmQodGFnICsgXCJcXG5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYob2JqIT1udWxsKSB0aGlzLmxvZ2dlckFwcGVuZChKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDEwKSArIFwiXFxuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFnKTtcclxuICAgICAgICAgICAgICAgIGlmKG9iaiE9bnVsbCkgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAxMCkpO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGV4KSB7fVxyXG4gICAgICAgIH1cclxuICAgIH0gICBcclxuXHJcbiAgICBwdWJsaWMgc2xlZXAodGltZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKSk7XHJcblxyXG4gICAgICAgIC8qIFVzYWdlIVxyXG4gICAgICAgICAgICB1dGlsLnNsZWVwKDUwMCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgYWZ0ZXIgdGhlIHNsZWVwIVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICovXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4aXQoKSB7XHJcbiAgICAgICAgZXhpdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuYXZpZ2F0ZSh0bykge1xyXG4gICAgICAgIGxldCBwYXRoID0gW3RvXTtcclxuICAgICAgICB0aGlzLmxvZyhcIk5hdmlnYXRlIHRvXCIsIHBhdGgpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHBhdGgsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVJblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7ICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgbmF2aWdhdGVQYWdlKHRvKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSBbJ3Jvb3QnLCB7IG91dGxldHM6IHsgcm9vdG91dGxldDogW3RvXSB9IH0gXTtcclxuICAgICAgICB0aGlzLmxvZyhcIk5hdmlnYXRlIHRvXCIsIHBhdGgpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHBhdGgsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7ICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuYXZpZ2F0ZVNlY3Rpb24odG8pIHsgXHJcbiAgICAgICAgbGV0IHBhdGggPSBbJ2Jhc2UnLCB7IG91dGxldHM6IHsgYmFzZW91dGxldDogW3RvXSB9IH0gXTtcclxuICAgICAgICB0aGlzLmxvZyhcIk5hdmlnYXRlIHRvXCIsIHBhdGgpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHBhdGgsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7ICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qIGhhbmRsZSBhbmRyb2lkIGJhY2sgYnV0dG9uICovXHJcbiAgICBwdWJsaWMgbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIHRoaXMubG9nKFwiTmF2aWdhdGUgYmFja1wiLCB0aGlzLnJvdXRlLnVybCk7XHJcbiAgICAgICAgaWYodGhpcy5yb3V0ZS51cmwhPVwiL3Jvb3QvKHJvb3RvdXRsZXQ6bG9naW4pXCIgJiZcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZS51cmwhPVwiL2Jhc2UvKGJhc2VvdXRsZXQ6aG9tZSlcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIuYmFjaygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybSh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiU2VpIHNpY3VybyBkaSB2b2xlciB1c2NpcmUgZGFsbCdhcHA/XCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRXNjaVwiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb24gYW5jb3JhXCJcclxuICAgICAgICAgICAgfSkudGhlbihjb25maXJtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpcm0pIGV4aXQoKTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblRvdWNoRWZmZWN0KGUpIHtcclxuICAgICAgICBpZihlLnR5cGU9XCJ0YXBcIiAmJiBlLmFjdGlvbj09XCJkb3duXCIpIHsgXHJcbiAgICAgICAgICAgIGUudmlldy5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjsgXHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZihlLnR5cGU9XCJ0YXBcIiAmJiBlLmFjdGlvbj09XCJ1cFwiKSB7IFxyXG4gICAgICAgICAgICBlLnZpZXcuc3R5bGUub3BhY2l0eSA9IFwiMVwiOyBcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUaW1lc3RhbXAoKSB7XHJcbiAgICAgICAgdmFyIG5vdyAgICAgPSBuZXcgRGF0ZSgpOyBcclxuICAgICAgICB2YXIgeWVhciAgICA9IG5vdy5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIHZhciBtb250aCAgID0gbm93LmdldE1vbnRoKCkrMTsgXHJcbiAgICAgICAgdmFyIGRheSAgICAgPSBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIHZhciBob3VyICAgID0gbm93LmdldEhvdXJzKCk7XHJcbiAgICAgICAgdmFyIG1pbnV0ZSAgPSBub3cuZ2V0TWludXRlcygpO1xyXG4gICAgICAgIHZhciBzZWNvbmQgID0gbm93LmdldFNlY29uZHMoKTsgXHJcblxyXG4gICAgICAgIGxldCB5ZWFyX3MgPSBTdHJpbmcoXCIwMDAwXCIgKyB5ZWFyKS5zbGljZSgtNCk7XHJcbiAgICAgICAgbGV0IG1vbnRoX3MgPSBTdHJpbmcoXCIwMFwiICsgbW9udGgpLnNsaWNlKC0yKTtcclxuICAgICAgICBsZXQgZGF5X3MgPSBTdHJpbmcoXCIwMFwiICsgZGF5KS5zbGljZSgtMik7XHJcbiAgICAgICAgbGV0IGhvdXJfcyA9IFN0cmluZyhcIjAwXCIgKyBob3VyKS5zbGljZSgtMik7XHJcbiAgICAgICAgbGV0IG1pbnV0ZV9zID0gU3RyaW5nKFwiMDBcIiArIG1pbnV0ZSkuc2xpY2UoLTIpO1xyXG4gICAgICAgIGxldCBzZWNvbmRfcyA9IFN0cmluZyhcIjAwXCIgKyBzZWNvbmQpLnNsaWNlKC0yKTtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVzdGFtcCA9IHllYXJfcyArIG1vbnRoX3MgKyBkYXlfcyArIGhvdXJfcyArIG1pbnV0ZV9zICsgc2Vjb25kX3M7ICAgXHJcbiAgICAgICAgcmV0dXJuIHRpbWVzdGFtcDtcclxuICAgIH0gICAgICAgICBcclxuXHJcbiAgICBpc1ZhbGlkRW1haWwoZW1haWwpIHtcclxuICAgICAgICB2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgICAgICByZXR1cm4gcmUudGVzdChlbWFpbCk7XHJcbiAgICB9ICAgIFxyXG5cclxufSJdfQ==