/*! 
Name: jQuery grouploop plugin
Verison: 1.0
Author: Scott Alguire
Repository: https://github.com/scottalguire/grouploop
*/

(function($) {
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
          complete: null,
          stickFirstItem: false
        },
        options
      );

      var curXPos;
      var stickyItemWidth;
      var el = this;
      var w =
        $(window).width() <= 768 ? $(window).width() * 2 : $(window).width();
      var v = settings.velocity; // velocity
      var wrapperWidth =
        $(window).width() <= 768 ? $(el).width() * 2 : $(el).width();
      var firstItem = $(el)
        .find(settings.childWrapper + " " + settings.childNode)
        .first();
      var numChildren = $(el).find(
        settings.childWrapper + " " + settings.childNode
      ).length;

      if (settings.stickFirstItem) {
        stickFirstItemFunc();
      } else {
        stickyItemWidth = 0;
      }

      function stickFirstItemFunc() {
        stickyItemWidth = wrapperWidth / (numChildren - 1);
        el.css("position", "relative");
        firstItem.remove();
        firstItem.css({
          position: "absolute",
          top: "0",
          left: "0",
          width: stickyItemWidth,
          height: "100%",
          "z-index": "999"
        });
        firstItem.prependTo(el).find(settings.childWrapper);
        // console.log(
        //   "wrapperWidth:" +
        //     wrapperWidth +
        //     "\n" +
        //     "numChildren: " +
        //     numChildren +
        //     "\n" +
        //     "stickyItemWidth: " +
        //     stickyItemWidth
        // );
      }

      window.addEventListener("resize", function() {
        w = $(window).width();

        // console.log(w);
        if (w <= 768) {
          console.log("Small breakpoint. Wrapper width is currently doubled.");
          w = w * 2;
          wrapperWidth = $(el).width() * 2;
        } else {
          w = $(window).width();
          wrapperWidth = $(el).width();
        }
        if (settings.stickFirstItem) {
          stickFirstItemFunc();
        }
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
              .css("transform", "translateX(" + -w - stickyItemWidth + ")");
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
})(jQuery);
