function initResponsive(scheduler, autoChangeToAgenda) {
  var startInAgenda = autoChangeToAgenda;

  // regular header height for Terrace or Flat skin
  var navbarHeight = 130,
    //regular header for Glossy or Standart skin
    navbarClassicHeight = 23,
    // height for Terrace and Flat in Mobile mode
    navbarMobileHeight = 130,
    // height for Glossy and Standart in Mobile mode
    navbarClassicMobileHeight = 140,
    // load QuickInfo if mobile browser detected
    loadQuickInfo = true,
    // navbar label formats for Regular and Mobile modes
    scaleDate = "%F, %D %d",
    scaleDateMobile = "%D %d";
  // we’ll need to handle Glossy and Standart(classic) skins
  // a bit differently from Terrace and Flat
  var classic = { "glossy": true, "classic": true };

  function setSizes(navHeight, navHeightClassicSkin, scaleDate) {
    scheduler.xy.nav_height = navHeight;

    if (classic[scheduler.skin]) {
      scheduler.xy.nav_height = navHeightClassicSkin;
    }

    scheduler.templates.week_scale_date = function(date) {
      return scheduler.date.date_to_str(scaleDate)(date);
    };
  }

  var skipAutoChangeToAgenda = false;
  scheduler.attachEvent("onBeforeViewChange", function setNavbarHeight(old_mode, old_date, new_mode, new_date) {
    /* set sizes based on screen size */
    if (typeof scheduler !== "undefined") {
      // Mode is manually changed from agenda.
      if (old_mode === 'agenda' && new_mode !== 'agenda' && startInAgenda) {
        startInAgenda = false;
        if (window.innerWidth <= 900) {
          // Mode was manually set away from agenda. We should not set to agenda again until it is greater then 900 again.
          skipAutoChangeToAgenda = true;
        }
      }

      if (startInAgenda && old_mode === 'agenda' && new_mode === 'agenda' && window.innerWidth > 900) {
        // Agenda view was set automatically, and we are now beyond 900px width. Go back to month.
        scheduler.setCurrentView(new Date(), 'month');
      } else if ((old_mode === undefined || old_mode === 'month') && new_mode === 'month' && window.innerWidth <= 900 && !skipAutoChangeToAgenda && autoChangeToAgenda) {
        // Change view to agenda if in month mode, and not already changing to agenda.
        startInAgenda = true;
        if (old_mode === undefined) {
          // View is set later, so we need to set it after next tick.
          setTimeout(function() {
            scheduler.setCurrentView(new Date(), 'agenda');
          }, 0);
        } else {
          scheduler.setCurrentView(new Date(), 'agenda');
        }

      } else {
        if (window.innerWidth > 900) {
          skipAutoChangeToAgenda = false;
        }
        if (window.innerWidth >= 1351) {
          setSizes(navbarHeight, navbarClassicHeight, scaleDate);
        } else {
          setSizes(navbarMobileHeight, navbarClassicMobileHeight, scaleDateMobile);
        }
      }
    }
    return true;
  });

  scheduler.attachEvent("onSchedulerResize", function() {
    scheduler.setCurrentView();
  });

  scheduler.attachEvent("onTemplatesReady", function() {
    if (classic[scheduler.skin]) {
      addCss("/Calendar/css/dhtmlxscheduler-responsive-classic.css");
    }
  });

  function addCss(source) {
    var cssFileTag = document.createElement("link");
    cssFileTag.setAttribute("rel", "stylesheet");
    cssFileTag.setAttribute("type", "text/css");
    cssFileTag.setAttribute("href", getAbsoluteUrl(source));

    document.getElementsByTagName("head")[0].appendChild(cssFileTag);
  }

  // Set current view after next tick. This needs to be done because of some position problems.
  var calendarRefreshIntervalCount = 0;
  var calendarRefreshInterval = setInterval(function() {
    scheduler.setCurrentView();
    calendarRefreshIntervalCount++;
    if (calendarRefreshIntervalCount === 30) { // 3 seconds   
      clearInterval(calendarRefreshInterval);
    }
  }, 100);
}

export default initResponsive