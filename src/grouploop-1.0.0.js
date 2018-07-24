/*! 
Name: jQuery grouploop plugin
Verison: 1.0
Author: Scott Alguire
*/

$.fn.extend({
  grouploop: function(options) {
    // Setup default settings
    var settings = $.extend(
      {
        velocity: 2,
        forward: true,
        childNode: ".item",
        childWrapper: ".item-wrap",
        pauseOnHover: true,
        complete: null
      },
      options
    );

    var el = this;
    var w = $(window).width();
    var v = settings.velocity; // velocity
    var curXPos;

    window.addEventListener("resize", function() {
      w = $(window).width();
    });

    if (settings.forward) {
      curXPos = -w;

      $(el).each(function(index, elem) {
        $(elem)
          .find(settings.childWrapper)
          .each(function(index, elem) {
            $(
              $(elem).find(
                $(settings.childNode)
                  .get()
                  .reverse()
              )
            ).each(function() {
              $(this)
                .clone()
                .prependTo(elem);
            });
          });
      });
    } else {
      curXPos = $(el)
        .find(settings.childWrapper)
        .css("transform")
        .split(/[()]/)[1]
        .split(",")[4];

      $(el).each(function(index, elem) {
        $(elem)
          .find(settings.childWrapper)
          .each(function(index, elem) {
            $(elem)
              .find(settings.childNode)
              .each(function() {
                $(this)
                  .clone()
                  .appendTo(elem);
              });
          });
      });
    }

    var myReq;

    function step() {
      if (settings.forward) {
        if (curXPos <= 0) {
          curXPos = curXPos + 1 * v;
          $(el)
            .find(settings.childWrapper)
            .css("transform", "translateX(" + curXPos + "px)");
        } else {
          $(el)
            .find(settings.childWrapper)
            .css("transform", "translateX(" + -w + ")");
          curXPos = -w;
        }
      } else {
        if (curXPos >= -w) {
          curXPos = curXPos - 1 * v;
          $(el)
            .find(settings.childWrapper)
            .css("transform", "translateX(" + curXPos + "px)");
        } else {
          $(el)
            .find(settings.childWrapper)
            .css("transform", "translateX(" + 0 + ")");
          curXPos = 0;
        }
      }

      myReq = window.requestAnimationFrame(step);
    }

    myReq = window.requestAnimationFrame(step);

    if (settings.pauseOnHover) {
      $(this).hover(
        function() {
          cancelAnimationFrame(myReq);
        },
        function() {
          myReq = window.requestAnimationFrame(step);
        }
      );
    }

    return this.each(function() {
      if ($.isFunction(settings.complete)) {
        settings.complete.call(this);
      }
    });
  }
});
