import $ from "jquery";

$.fn.vTabs = function(s = null) {
  const elm = $(this); // Wrapper element
  const tT = $(this).find('.vtab-toggle'); // All .vtab-toggle elements
  const tC = $(this).find('.vtab-content'); // All .vtab-content elements
  const cW = tC.first().parent(); // content Wrapper

  let maxContentHeight;
  let ux = '';
  let initialized = false;

  // Default settings
  let settings = {
    'hover': false,
    'mobileOnly': false,
    'variableHeight': true,
    'mobileViewportWidth': 639,
  };

  if (s !== null) {
    $.each(s, function( key, value ) {
      console.log('key', key);

      settings[key] = value;
    });
  }

  console.log('settings', settings);

  if (settings.hover) {
    ux = 'mouseenter';
  }

  function init() {
    const vW = $(window).width();

    if (settings.mobileOnly && vW > settings.mobileViewportWidth) {
      return;
    }

    cW.css('position', 'relative');
    cW.css('transition', 'height 0.4s ease-in-out');
    tC.first().addClass('active');
  
    // Make each and every tab content position absolute, so that they are overlapping each other.
    tC.each(function() {
      const tc = $(this);
  
      tc.css('position', 'absolute');
      tc.css('width', '100%');
      tc.css('top', '0');
      tc.css('left', '0');
    });
  
    maxContentHeight = getMaxContentHeight(tC);

    // Hide all tab content upon initialize
    tC.hide();
    // Remove all active class
    tC.removeClass('active');
    tT.removeClass('active');
      // Show first tab content
    tC.first().show();
    tC.first().addClass('active');
    tT.first().addClass('active');

    // Tab toggle click handler
    tT.on('click ' + ux, function() {
      if (!initialized) { return; }
      
      const target = $($(this).data('target'));

      if (target.hasClass('active')) { return; }

      tC.fadeOut();
      tC.removeClass('active');
      target.fadeIn();
      target.addClass('active');

      tT.removeClass('active');
      $(this).addClass('active');
      
      if (settings.variableHeight) {
        setTimeout(() => {
          cW.css('height', target.outerHeight());
        }, 10);
      }
    });

    // Set wrapper height to active content's height
    setTimeout(() => {
      if (settings.variableHeight) {
        cW.css('height', tC.first().outerHeight());
      } else {
        cW.css('height', maxContentHeight);
      }
    }, 10);

    initialized = true;
  }

  function kill() {
    cW.removeAttr("style");
    tC.removeAttr("style");
    tC.removeClass('active');
    tT.removeClass('active');

    initialized = false;
  }

  function getMaxContentHeight(elms) {
    let h = 0;
    
    elms.each(function() {
      if ($(this).outerHeight() > 0) {
        h = $(this).outerHeight();
      }
    });

    return h;
  }

  let vTabsTimeout;

  $(window).on('resize', function() {
    clearTimeout(vTabsTimeout);

    vTabsTimeout = setTimeout(() => {
      const vW = $(window).width();

      if (settings.mobileOnly && vW > settings.mobileViewportWidth) {
        if (initialized) {
          kill();
          return;
        }
      } else {
        if (!initialized) {
          init();
          return;
        }
      }

      if (settings.variableHeight) {
        const activeTab = elm.find('.vtab-content.active');
    
        cW.css('height', activeTab.outerHeight());
      } else {
        maxContentHeight = getMaxContentHeight(tC);
        cW.css('height', maxContentHeight);
      }
    }, 10);
  });

  init();
}