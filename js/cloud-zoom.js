"function" != typeof Object.create &&
  (Object.create = function (b) {
    function a() {}
    return (a.prototype = b), new a();
  }),
  (function (d, a, b, f) {
    var c = {
      init: function (g, h) {
        var j = this;
        (j.elem = h),
          (j.jQueryelem = d(h)),
          (j.imageSrc = j.jQueryelem.data("zoom-image")
            ? j.jQueryelem.data("zoom-image")
            : j.jQueryelem.attr("src")),
          (j.options = d.extend({}, d.fn.elevateZoom.options, g)),
          j.options.tint &&
            ((j.options.lensColour = "none"), (j.options.lensOpacity = "1")),
          "inner" == j.options.zoomType && (j.options.showLens = !1),
          j.jQueryelem.parent().removeAttr("title").removeAttr("alt"),
          (j.zoomImage = j.imageSrc),
          j.refresh(1),
          d("#" + j.options.gallery + " a").click(function (i) {
            return (
              j.options.galleryActiveClass &&
                (d("#" + j.options.gallery + " a").removeClass(
                  j.options.galleryActiveClass
                ),
                d(this).addClass(j.options.galleryActiveClass)),
              i.preventDefault(),
              d(this).data("zoom-image")
                ? (j.zoomImagePre = d(this).data("zoom-image"))
                : (j.zoomImagePre = d(this).data("image")),
              j.swaptheimage(d(this).data("image"), j.zoomImagePre),
              !1
            );
          });
      },
      refresh: function (h) {
        var g = this;
        setTimeout(function () {
          g.fetch(g.imageSrc);
        }, h || g.options.refresh);
      },
      fetch: function (j) {
        var g = this,
          h = new Image();
        (h.onload = function () {
          (g.largeWidth = h.width),
            (g.largeHeight = h.height),
            g.startZoom(),
            (g.currentImage = g.imageSrc),
            g.options.onZoomedImageLoaded(g.jQueryelem);
        }),
          (h.src = j);
      },
      startZoom: function () {
        var g = this;
        if (
          ((g.nzWidth = g.jQueryelem.width()),
          (g.nzHeight = g.jQueryelem.height()),
          (g.isWindowActive = !1),
          (g.isLensActive = !1),
          (g.isTintActive = !1),
          (g.overWindow = !1),
          g.options.imageCrossfade &&
            ((g.zoomWrap = g.jQueryelem.wrap(
              '<div style="height:' +
                g.nzHeight +
                "px;width:" +
                g.nzWidth +
                'px;" class="zoomWrapper" />'
            )),
            g.jQueryelem.css("position", "absolute")),
          (g.zoomLock = 1),
          (g.scrollingLock = !1),
          (g.changeBgSize = !1),
          (g.currentZoomLevel = g.options.zoomLevel),
          (g.nzOffset = g.jQueryelem.offset()),
          (g.widthRatio = g.largeWidth / g.currentZoomLevel / g.nzWidth),
          (g.heightRatio = g.largeHeight / g.currentZoomLevel / g.nzHeight),
          "window" == g.options.zoomType &&
            (g.zoomWindowStyle =
              "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " +
              String(g.options.zoomWindowBgColour) +
              ";width: " +
              String(g.options.zoomWindowWidth) +
              "px;height: " +
              String(g.options.zoomWindowHeight) +
              "px;float: left;background-size: " +
              g.largeWidth / g.currentZoomLevel +
              "px " +
              g.largeHeight / g.currentZoomLevel +
              "px;display: none;z-index:100;border: " +
              String(g.options.borderSize) +
              "px solid " +
              g.options.borderColour +
              ";background-repeat: no-repeat;position: absolute;"),
          "inner" == g.options.zoomType)
        ) {
          var h = g.jQueryelem.css("border-left-width");
          g.zoomWindowStyle =
            "overflow: hidden;margin-left: " +
            String(h) +
            ";margin-top: " +
            String(h) +
            ";background-position: 0px 0px;width: " +
            String(g.nzWidth) +
            "px;height: " +
            String(g.nzHeight) +
            "px;float: left;display: none;cursor:" +
            g.options.cursor +
            ";px solid " +
            g.options.borderColour +
            ";background-repeat: no-repeat;position: absolute;";
        }
        "window" == g.options.zoomType &&
          (g.nzHeight < g.options.zoomWindowWidth / g.widthRatio
            ? (lensHeight = g.nzHeight)
            : (lensHeight = String(g.options.zoomWindowHeight / g.heightRatio)),
          g.largeWidth < g.options.zoomWindowWidth
            ? (lensWidth = g.nzWidth)
            : (lensWidth = g.options.zoomWindowWidth / g.widthRatio),
          (g.lensStyle =
            "background-position: 0px 0px;width: " +
            String(g.options.zoomWindowWidth / g.widthRatio) +
            "px;height: " +
            String(g.options.zoomWindowHeight / g.heightRatio) +
            "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" +
            g.options.lensOpacity +
            ";filter: alpha(opacity = " +
            100 * g.options.lensOpacity +
            "); zoom:1;width:" +
            lensWidth +
            "px;height:" +
            lensHeight +
            "px;background-color:" +
            g.options.lensColour +
            ";cursor:" +
            g.options.cursor +
            ";border: " +
            g.options.lensBorderSize +
            "px solid " +
            g.options.lensBorderColour +
            ";background-repeat: no-repeat;position: absolute;")),
          (g.tintStyle =
            "display: block;position: absolute;background-color: " +
            g.options.tintColour +
            ";filter:alpha(opacity=0);opacity: 0;width: " +
            g.nzWidth +
            "px;height: " +
            g.nzHeight +
            "px;"),
          (g.lensRound = ""),
          "lens" == g.options.zoomType &&
            (g.lensStyle =
              "background-position: 0px 0px;float: left;display: none;border: " +
              String(g.options.borderSize) +
              "px solid " +
              g.options.borderColour +
              ";width:" +
              String(g.options.lensSize) +
              "px;height:" +
              String(g.options.lensSize) +
              "px;background-repeat: no-repeat;position: absolute;"),
          "round" == g.options.lensShape &&
            (g.lensRound =
              "border-top-left-radius: " +
              String(g.options.lensSize / 2 + g.options.borderSize) +
              "px;border-top-right-radius: " +
              String(g.options.lensSize / 2 + g.options.borderSize) +
              "px;border-bottom-left-radius: " +
              String(g.options.lensSize / 2 + g.options.borderSize) +
              "px;border-bottom-right-radius: " +
              String(g.options.lensSize / 2 + g.options.borderSize) +
              "px;"),
          (g.zoomContainer = d(
            '<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' +
              g.nzOffset.left +
              "px;top:" +
              g.nzOffset.top +
              "px;height:" +
              g.nzHeight +
              "px;width:" +
              g.nzWidth +
              'px;"></div>'
          )),
          d("body").append(g.zoomContainer),
          g.options.containLensZoom &&
            "lens" == g.options.zoomType &&
            g.zoomContainer.css("overflow", "hidden"),
          "inner" != g.options.zoomType &&
            ((g.zoomLens = d(
              "<div class='zoomLens' style='" +
                g.lensStyle +
                g.lensRound +
                "'>&nbsp;</div>"
            )
              .appendTo(g.zoomContainer)
              .click(function () {
                g.jQueryelem.trigger("click");
              })),
            g.options.tint &&
              ((g.tintContainer = d("<div/>").addClass("tintContainer")),
              (g.zoomTint = d(
                "<div class='zoomTint' style='" + g.tintStyle + "'></div>"
              )),
              g.zoomLens.wrap(g.tintContainer),
              (g.zoomTintcss = g.zoomLens.after(g.zoomTint)),
              (g.zoomTintImage = d(
                '<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' +
                  g.nzWidth +
                  "px; height: " +
                  g.nzHeight +
                  'px;" src="' +
                  g.imageSrc +
                  '">'
              )
                .appendTo(g.zoomLens)
                .click(function () {
                  g.jQueryelem.trigger("click");
                })))),
          isNaN(g.options.zoomWindowPosition)
            ? (g.zoomWindow = d(
                "<div style='z-index:999;left:" +
                  g.windowOffsetLeft +
                  "px;top:" +
                  g.windowOffsetTop +
                  "px;" +
                  g.zoomWindowStyle +
                  "' class='zoomWindow'>&nbsp;</div>"
              )
                .appendTo("body")
                .click(function () {
                  g.jQueryelem.trigger("click");
                }))
            : (g.zoomWindow = d(
                "<div style='z-index:999;left:" +
                  g.windowOffsetLeft +
                  "px;top:" +
                  g.windowOffsetTop +
                  "px;" +
                  g.zoomWindowStyle +
                  "' class='zoomWindow'>&nbsp;</div>"
              )
                .appendTo(g.zoomContainer)
                .click(function () {
                  g.jQueryelem.trigger("click");
                })),
          (g.zoomWindowContainer = d("<div/>")
            .addClass("zoomWindowContainer")
            .css("width", g.options.zoomWindowWidth)),
          g.zoomWindow.wrap(g.zoomWindowContainer),
          "lens" == g.options.zoomType &&
            g.zoomLens.css({ backgroundImage: "url('" + g.imageSrc + "')" }),
          "window" == g.options.zoomType &&
            g.zoomWindow.css({ backgroundImage: "url('" + g.imageSrc + "')" }),
          "inner" == g.options.zoomType &&
            g.zoomWindow.css({ backgroundImage: "url('" + g.imageSrc + "')" }),
          g.jQueryelem.bind("touchmove", function (j) {
            j.preventDefault();
            var e =
              j.originalEvent.touches[0] || j.originalEvent.changedTouches[0];
            g.setPosition(e);
          }),
          g.zoomContainer.bind("touchmove", function (j) {
            "inner" == g.options.zoomType && g.showHideWindow("show"),
              j.preventDefault();
            var e =
              j.originalEvent.touches[0] || j.originalEvent.changedTouches[0];
            g.setPosition(e);
          }),
          g.zoomContainer.bind("touchend", function (e) {
            g.showHideWindow("hide"),
              g.options.showLens && g.showHideLens("hide"),
              g.options.tint &&
                "inner" != g.options.zoomType &&
                g.showHideTint("hide");
          }),
          g.jQueryelem.bind("touchend", function (e) {
            g.showHideWindow("hide"),
              g.options.showLens && g.showHideLens("hide"),
              g.options.tint &&
                "inner" != g.options.zoomType &&
                g.showHideTint("hide");
          }),
          g.options.showLens &&
            (g.zoomLens.bind("touchmove", function (j) {
              j.preventDefault();
              var e =
                j.originalEvent.touches[0] || j.originalEvent.changedTouches[0];
              g.setPosition(e);
            }),
            g.zoomLens.bind("touchend", function (e) {
              g.showHideWindow("hide"),
                g.options.showLens && g.showHideLens("hide"),
                g.options.tint &&
                  "inner" != g.options.zoomType &&
                  g.showHideTint("hide");
            })),
          g.jQueryelem.bind("mousemove", function (e) {
            0 == g.overWindow && g.setElements("show"),
              (g.lastX === e.clientX && g.lastY === e.clientY) ||
                (g.setPosition(e), (g.currentLoc = e)),
              (g.lastX = e.clientX),
              (g.lastY = e.clientY);
          }),
          g.zoomContainer.bind("mousemove", function (e) {
            0 == g.overWindow && g.setElements("show"),
              (g.lastX === e.clientX && g.lastY === e.clientY) ||
                (g.setPosition(e), (g.currentLoc = e)),
              (g.lastX = e.clientX),
              (g.lastY = e.clientY);
          }),
          "inner" != g.options.zoomType &&
            g.zoomLens.bind("mousemove", function (e) {
              (g.lastX === e.clientX && g.lastY === e.clientY) ||
                (g.setPosition(e), (g.currentLoc = e)),
                (g.lastX = e.clientX),
                (g.lastY = e.clientY);
            }),
          g.options.tint &&
            "inner" != g.options.zoomType &&
            g.zoomTint.bind("mousemove", function (e) {
              (g.lastX === e.clientX && g.lastY === e.clientY) ||
                (g.setPosition(e), (g.currentLoc = e)),
                (g.lastX = e.clientX),
                (g.lastY = e.clientY);
            }),
          "inner" == g.options.zoomType &&
            g.zoomWindow.bind("mousemove", function (e) {
              (g.lastX === e.clientX && g.lastY === e.clientY) ||
                (g.setPosition(e), (g.currentLoc = e)),
                (g.lastX = e.clientX),
                (g.lastY = e.clientY);
            }),
          g.zoomContainer
            .add(g.jQueryelem)
            .mouseenter(function () {
              0 == g.overWindow && g.setElements("show");
            })
            .mouseleave(function () {
              g.scrollLock || g.setElements("hide");
            }),
          "inner" != g.options.zoomType &&
            g.zoomWindow
              .mouseenter(function () {
                (g.overWindow = !0), g.setElements("hide");
              })
              .mouseleave(function () {
                g.overWindow = !1;
              }),
          g.options.zoomLevel,
          g.options.minZoomLevel
            ? (g.minZoomLevel = g.options.minZoomLevel)
            : (g.minZoomLevel = 2 * g.options.scrollZoomIncrement),
          g.options.scrollZoom &&
            g.zoomContainer
              .add(g.jQueryelem)
              .bind(
                "mousewheel DOMMouseScroll MozMousePixelScroll",
                function (e) {
                  (g.scrollLock = !0),
                    clearTimeout(d.data(this, "timer")),
                    d.data(
                      this,
                      "timer",
                      setTimeout(function () {
                        g.scrollLock = !1;
                      }, 250)
                    );
                  var j =
                    e.originalEvent.wheelDelta || -1 * e.originalEvent.detail;
                  return (
                    e.stopImmediatePropagation(),
                    e.stopPropagation(),
                    e.preventDefault(),
                    j / 120 > 0
                      ? g.currentZoomLevel >= g.minZoomLevel &&
                        g.changeZoomLevel(
                          g.currentZoomLevel - g.options.scrollZoomIncrement
                        )
                      : g.options.maxZoomLevel
                      ? g.currentZoomLevel <= g.options.maxZoomLevel &&
                        g.changeZoomLevel(
                          parseFloat(g.currentZoomLevel) +
                            g.options.scrollZoomIncrement
                        )
                      : g.changeZoomLevel(
                          parseFloat(g.currentZoomLevel) +
                            g.options.scrollZoomIncrement
                        ),
                    !1
                  );
                }
              );
      },
      setElements: function (h) {
        var g = this;
        if (!g.options.zoomEnabled) {
          return !1;
        }
        "show" == h &&
          g.isWindowSet &&
          ("inner" == g.options.zoomType && g.showHideWindow("show"),
          "window" == g.options.zoomType && g.showHideWindow("show"),
          g.options.showLens && g.showHideLens("show"),
          g.options.tint &&
            "inner" != g.options.zoomType &&
            g.showHideTint("show")),
          "hide" == h &&
            ("window" == g.options.zoomType && g.showHideWindow("hide"),
            g.options.tint || g.showHideWindow("hide"),
            g.options.showLens && g.showHideLens("hide"),
            g.options.tint && g.showHideTint("hide"));
      },
      setPosition: function (h) {
        var g = this;
        if (!g.options.zoomEnabled) {
          return !1;
        }
        (g.nzHeight = g.jQueryelem.height()),
          (g.nzWidth = g.jQueryelem.width()),
          (g.nzOffset = g.jQueryelem.offset()),
          g.options.tint &&
            "inner" != g.options.zoomType &&
            (g.zoomTint.css({ top: 0 }), g.zoomTint.css({ left: 0 })),
          g.options.responsive &&
            !g.options.scrollZoom &&
            g.options.showLens &&
            (g.nzHeight < g.options.zoomWindowWidth / g.widthRatio
              ? (lensHeight = g.nzHeight)
              : (lensHeight = String(
                  g.options.zoomWindowHeight / g.heightRatio
                )),
            g.largeWidth < g.options.zoomWindowWidth
              ? (lensWidth = g.nzWidth)
              : (lensWidth = g.options.zoomWindowWidth / g.widthRatio),
            (g.widthRatio = g.largeWidth / g.nzWidth),
            (g.heightRatio = g.largeHeight / g.nzHeight),
            "lens" != g.options.zoomType &&
              (g.nzHeight < g.options.zoomWindowWidth / g.widthRatio
                ? (lensHeight = g.nzHeight)
                : (lensHeight = String(
                    g.options.zoomWindowHeight / g.heightRatio
                  )),
              g.options.zoomWindowWidth < g.options.zoomWindowWidth
                ? (lensWidth = g.nzWidth)
                : (lensWidth = g.options.zoomWindowWidth / g.widthRatio),
              g.zoomLens.css("width", lensWidth),
              g.zoomLens.css("height", lensHeight),
              g.options.tint &&
                (g.zoomTintImage.css("width", g.nzWidth),
                g.zoomTintImage.css("height", g.nzHeight))),
            "lens" == g.options.zoomType &&
              g.zoomLens.css({
                width: String(g.options.lensSize) + "px",
                height: String(g.options.lensSize) + "px",
              })),
          g.zoomContainer.css({ top: g.nzOffset.top }),
          g.zoomContainer.css({ left: g.nzOffset.left }),
          (g.mouseLeft = parseInt(h.pageX - g.nzOffset.left)),
          (g.mouseTop = parseInt(h.pageY - g.nzOffset.top)),
          "window" == g.options.zoomType &&
            ((g.Etoppos = g.mouseTop < g.zoomLens.height() / 2),
            (g.Eboppos =
              g.mouseTop >
              g.nzHeight -
                g.zoomLens.height() / 2 -
                2 * g.options.lensBorderSize),
            (g.Eloppos = g.mouseLeft < 0 + g.zoomLens.width() / 2),
            (g.Eroppos =
              g.mouseLeft >
              g.nzWidth -
                g.zoomLens.width() / 2 -
                2 * g.options.lensBorderSize)),
          "inner" == g.options.zoomType &&
            ((g.Etoppos = g.mouseTop < g.nzHeight / 2 / g.heightRatio),
            (g.Eboppos =
              g.mouseTop > g.nzHeight - g.nzHeight / 2 / g.heightRatio),
            (g.Eloppos = g.mouseLeft < 0 + g.nzWidth / 2 / g.widthRatio),
            (g.Eroppos =
              g.mouseLeft >
              g.nzWidth -
                g.nzWidth / 2 / g.widthRatio -
                2 * g.options.lensBorderSize)),
          g.mouseLeft <= 0 ||
          g.mouseTop < 0 ||
          g.mouseLeft > g.nzWidth ||
          g.mouseTop > g.nzHeight
            ? g.setElements("hide")
            : (g.options.showLens &&
                ((g.lensLeftPos = String(g.mouseLeft - g.zoomLens.width() / 2)),
                (g.lensTopPos = String(g.mouseTop - g.zoomLens.height() / 2))),
              g.Etoppos && (g.lensTopPos = 0),
              g.Eloppos &&
                ((g.windowLeftPos = 0), (g.lensLeftPos = 0), (g.tintpos = 0)),
              "window" == g.options.zoomType &&
                (g.Eboppos &&
                  (g.lensTopPos = Math.max(
                    g.nzHeight -
                      g.zoomLens.height() -
                      2 * g.options.lensBorderSize,
                    0
                  )),
                g.Eroppos &&
                  (g.lensLeftPos =
                    g.nzWidth -
                    g.zoomLens.width() -
                    2 * g.options.lensBorderSize)),
              "inner" == g.options.zoomType &&
                (g.Eboppos &&
                  (g.lensTopPos = Math.max(
                    g.nzHeight - 2 * g.options.lensBorderSize,
                    0
                  )),
                g.Eroppos &&
                  (g.lensLeftPos =
                    g.nzWidth - g.nzWidth - 2 * g.options.lensBorderSize)),
              "lens" == g.options.zoomType &&
                ((g.windowLeftPos = String(
                  -1 *
                    ((h.pageX - g.nzOffset.left) * g.widthRatio -
                      g.zoomLens.width() / 2)
                )),
                (g.windowTopPos = String(
                  -1 *
                    ((h.pageY - g.nzOffset.top) * g.heightRatio -
                      g.zoomLens.height() / 2)
                )),
                g.zoomLens.css({
                  backgroundPosition:
                    g.windowLeftPos + "px " + g.windowTopPos + "px",
                }),
                g.changeBgSize &&
                  (g.nzHeight > g.nzWidth
                    ? ("lens" == g.options.zoomType &&
                        g.zoomLens.css({
                          "background-size":
                            g.largeWidth / g.newvalueheight +
                            "px " +
                            g.largeHeight / g.newvalueheight +
                            "px",
                        }),
                      g.zoomWindow.css({
                        "background-size":
                          g.largeWidth / g.newvalueheight +
                          "px " +
                          g.largeHeight / g.newvalueheight +
                          "px",
                      }))
                    : ("lens" == g.options.zoomType &&
                        g.zoomLens.css({
                          "background-size":
                            g.largeWidth / g.newvaluewidth +
                            "px " +
                            g.largeHeight / g.newvaluewidth +
                            "px",
                        }),
                      g.zoomWindow.css({
                        "background-size":
                          g.largeWidth / g.newvaluewidth +
                          "px " +
                          g.largeHeight / g.newvaluewidth +
                          "px",
                      })),
                  (g.changeBgSize = !1)),
                g.setWindowPostition(h)),
              g.options.tint &&
                "inner" != g.options.zoomType &&
                g.setTintPosition(h),
              "window" == g.options.zoomType && g.setWindowPostition(h),
              "inner" == g.options.zoomType && g.setWindowPostition(h),
              g.options.showLens &&
                (g.fullwidth &&
                  "lens" != g.options.zoomType &&
                  (g.lensLeftPos = 0),
                g.zoomLens.css({
                  left: g.lensLeftPos + "px",
                  top: g.lensTopPos + "px",
                })));
      },
      showHideWindow: function (h) {
        var g = this;
        "show" == h &&
          (g.isWindowActive ||
            (g.options.zoomWindowFadeIn
              ? g.zoomWindow.stop(!0, !0, !1).fadeIn(g.options.zoomWindowFadeIn)
              : g.zoomWindow.show(),
            (g.isWindowActive = !0))),
          "hide" == h &&
            g.isWindowActive &&
            (g.options.zoomWindowFadeOut
              ? g.zoomWindow.stop(!0, !0).fadeOut(g.options.zoomWindowFadeOut)
              : g.zoomWindow.hide(),
            (g.isWindowActive = !1));
      },
      showHideLens: function (h) {
        var g = this;
        "show" == h &&
          (g.isLensActive ||
            (g.options.lensFadeIn
              ? g.zoomLens.stop(!0, !0, !1).fadeIn(g.options.lensFadeIn)
              : g.zoomLens.show(),
            (g.isLensActive = !0))),
          "hide" == h &&
            g.isLensActive &&
            (g.options.lensFadeOut
              ? g.zoomLens.stop(!0, !0).fadeOut(g.options.lensFadeOut)
              : g.zoomLens.hide(),
            (g.isLensActive = !1));
      },
      showHideTint: function (h) {
        var g = this;
        "show" == h &&
          (g.isTintActive ||
            (g.options.zoomTintFadeIn
              ? g.zoomTint
                  .css({ opacity: g.options.tintOpacity })
                  .animate()
                  .stop(!0, !0)
                  .fadeIn("slow")
              : (g.zoomTint.css({ opacity: g.options.tintOpacity }).animate(),
                g.zoomTint.show()),
            (g.isTintActive = !0))),
          "hide" == h &&
            g.isTintActive &&
            (g.options.zoomTintFadeOut
              ? g.zoomTint.stop(!0, !0).fadeOut(g.options.zoomTintFadeOut)
              : g.zoomTint.hide(),
            (g.isTintActive = !1));
      },
      setLensPostition: function (e) {},
      setWindowPostition: function (g) {
        var h = this;
        if (isNaN(h.options.zoomWindowPosition)) {
          (h.externalContainer = d("#" + h.options.zoomWindowPosition)),
            (h.externalContainerWidth = h.externalContainer.width()),
            (h.externalContainerHeight = h.externalContainer.height()),
            (h.externalContainerOffset = h.externalContainer.offset()),
            (h.windowOffsetTop = h.externalContainerOffset.top),
            (h.windowOffsetLeft = h.externalContainerOffset.left);
        } else {
          switch (h.options.zoomWindowPosition) {
            case 1:
              (h.windowOffsetTop = h.options.zoomWindowOffety),
                (h.windowOffsetLeft = +h.nzWidth);
              break;
            case 2:
              h.options.zoomWindowHeight > h.nzHeight &&
                ((h.windowOffsetTop =
                  -1 * (h.options.zoomWindowHeight / 2 - h.nzHeight / 2)),
                (h.windowOffsetLeft = h.nzWidth));
              break;
            case 3:
              (h.windowOffsetTop =
                h.nzHeight - h.zoomWindow.height() - 2 * h.options.borderSize),
                (h.windowOffsetLeft = h.nzWidth);
              break;
            case 4:
              (h.windowOffsetTop = h.nzHeight),
                (h.windowOffsetLeft = h.nzWidth);
              break;
            case 5:
              (h.windowOffsetTop = h.nzHeight),
                (h.windowOffsetLeft =
                  h.nzWidth - h.zoomWindow.width() - 2 * h.options.borderSize);
              break;
            case 6:
              h.options.zoomWindowHeight > h.nzHeight &&
                ((h.windowOffsetTop = h.nzHeight),
                (h.windowOffsetLeft =
                  -1 *
                  (h.options.zoomWindowWidth / 2 -
                    h.nzWidth / 2 +
                    2 * h.options.borderSize)));
              break;
            case 7:
              (h.windowOffsetTop = h.nzHeight), (h.windowOffsetLeft = 0);
              break;
            case 8:
              (h.windowOffsetTop = h.nzHeight),
                (h.windowOffsetLeft =
                  -1 * (h.zoomWindow.width() + 2 * h.options.borderSize));
              break;
            case 9:
              (h.windowOffsetTop =
                h.nzHeight - h.zoomWindow.height() - 2 * h.options.borderSize),
                (h.windowOffsetLeft =
                  -1 * (h.zoomWindow.width() + 2 * h.options.borderSize));
              break;
            case 10:
              h.options.zoomWindowHeight > h.nzHeight &&
                ((h.windowOffsetTop =
                  -1 * (h.options.zoomWindowHeight / 2 - h.nzHeight / 2)),
                (h.windowOffsetLeft =
                  -1 * (h.zoomWindow.width() + 2 * h.options.borderSize)));
              break;
            case 11:
              (h.windowOffsetTop = h.options.zoomWindowOffety),
                (h.windowOffsetLeft =
                  -1 * (h.zoomWindow.width() + 2 * h.options.borderSize));
              break;
            case 12:
              (h.windowOffsetTop =
                -1 * (h.zoomWindow.height() + 2 * h.options.borderSize)),
                (h.windowOffsetLeft =
                  -1 * (h.zoomWindow.width() + 2 * h.options.borderSize));
              break;
            case 13:
              (h.windowOffsetTop =
                -1 * (h.zoomWindow.height() + 2 * h.options.borderSize)),
                (h.windowOffsetLeft = 0);
              break;
            case 14:
              h.options.zoomWindowHeight > h.nzHeight &&
                ((h.windowOffsetTop =
                  -1 * (h.zoomWindow.height() + 2 * h.options.borderSize)),
                (h.windowOffsetLeft =
                  -1 *
                  (h.options.zoomWindowWidth / 2 -
                    h.nzWidth / 2 +
                    2 * h.options.borderSize)));
              break;
            case 15:
              (h.windowOffsetTop =
                -1 * (h.zoomWindow.height() + 2 * h.options.borderSize)),
                (h.windowOffsetLeft =
                  h.nzWidth - h.zoomWindow.width() - 2 * h.options.borderSize);
              break;
            case 16:
              (h.windowOffsetTop =
                -1 * (h.zoomWindow.height() + 2 * h.options.borderSize)),
                (h.windowOffsetLeft = h.nzWidth);
              break;
            default:
              (h.windowOffsetTop = h.options.zoomWindowOffety),
                (h.windowOffsetLeft = h.nzWidth);
          }
        }
        (h.isWindowSet = !0),
          (h.windowOffsetTop = h.windowOffsetTop + h.options.zoomWindowOffety),
          (h.windowOffsetLeft =
            h.windowOffsetLeft + h.options.zoomWindowOffetx),
          h.zoomWindow.css({ top: h.windowOffsetTop }),
          h.zoomWindow.css({ left: h.windowOffsetLeft }),
          "inner" == h.options.zoomType &&
            (h.zoomWindow.css({ top: 0 }), h.zoomWindow.css({ left: 0 })),
          (h.windowLeftPos = String(
            -1 *
              ((g.pageX - h.nzOffset.left) * h.widthRatio -
                h.zoomWindow.width() / 2)
          )),
          (h.windowTopPos = String(
            -1 *
              ((g.pageY - h.nzOffset.top) * h.heightRatio -
                h.zoomWindow.height() / 2)
          )),
          h.Etoppos && (h.windowTopPos = 0),
          h.Eloppos && (h.windowLeftPos = 0),
          h.Eboppos &&
            (h.windowTopPos =
              -1 *
              (h.largeHeight / h.currentZoomLevel - h.zoomWindow.height())),
          h.Eroppos &&
            (h.windowLeftPos =
              -1 * (h.largeWidth / h.currentZoomLevel - h.zoomWindow.width())),
          h.fullheight && (h.windowTopPos = 0),
          h.fullwidth && (h.windowLeftPos = 0),
          ("window" != h.options.zoomType && "inner" != h.options.zoomType) ||
            (1 == h.zoomLock &&
              (h.widthRatio <= 1 && (h.windowLeftPos = 0),
              h.heightRatio <= 1 && (h.windowTopPos = 0)),
            h.largeHeight < h.options.zoomWindowHeight && (h.windowTopPos = 0),
            h.largeWidth < h.options.zoomWindowWidth && (h.windowLeftPos = 0),
            h.options.easing
              ? (h.xp || (h.xp = 0),
                h.yp || (h.yp = 0),
                h.loop ||
                  (h.loop = setInterval(function () {
                    (h.xp += (h.windowLeftPos - h.xp) / h.options.easingAmount),
                      (h.yp +=
                        (h.windowTopPos - h.yp) / h.options.easingAmount),
                      h.scrollingLock
                        ? (clearInterval(h.loop),
                          (h.xp = h.windowLeftPos),
                          (h.yp = h.windowTopPos),
                          (h.xp =
                            -1 *
                            ((g.pageX - h.nzOffset.left) * h.widthRatio -
                              h.zoomWindow.width() / 2)),
                          (h.yp =
                            -1 *
                            ((g.pageY - h.nzOffset.top) * h.heightRatio -
                              h.zoomWindow.height() / 2)),
                          h.changeBgSize &&
                            (h.nzHeight > h.nzWidth
                              ? ("lens" == h.options.zoomType &&
                                  h.zoomLens.css({
                                    "background-size":
                                      h.largeWidth / h.newvalueheight +
                                      "px " +
                                      h.largeHeight / h.newvalueheight +
                                      "px",
                                  }),
                                h.zoomWindow.css({
                                  "background-size":
                                    h.largeWidth / h.newvalueheight +
                                    "px " +
                                    h.largeHeight / h.newvalueheight +
                                    "px",
                                }))
                              : ("lens" != h.options.zoomType &&
                                  h.zoomLens.css({
                                    "background-size":
                                      h.largeWidth / h.newvaluewidth +
                                      "px " +
                                      h.largeHeight / h.newvalueheight +
                                      "px",
                                  }),
                                h.zoomWindow.css({
                                  "background-size":
                                    h.largeWidth / h.newvaluewidth +
                                    "px " +
                                    h.largeHeight / h.newvaluewidth +
                                    "px",
                                })),
                            (h.changeBgSize = !1)),
                          h.zoomWindow.css({
                            backgroundPosition:
                              h.windowLeftPos + "px " + h.windowTopPos + "px",
                          }),
                          (h.scrollingLock = !1),
                          (h.loop = !1))
                        : (h.changeBgSize &&
                            (h.nzHeight > h.nzWidth
                              ? ("lens" == h.options.zoomType &&
                                  h.zoomLens.css({
                                    "background-size":
                                      h.largeWidth / h.newvalueheight +
                                      "px " +
                                      h.largeHeight / h.newvalueheight +
                                      "px",
                                  }),
                                h.zoomWindow.css({
                                  "background-size":
                                    h.largeWidth / h.newvalueheight +
                                    "px " +
                                    h.largeHeight / h.newvalueheight +
                                    "px",
                                }))
                              : ("lens" != h.options.zoomType &&
                                  h.zoomLens.css({
                                    "background-size":
                                      h.largeWidth / h.newvaluewidth +
                                      "px " +
                                      h.largeHeight / h.newvaluewidth +
                                      "px",
                                  }),
                                h.zoomWindow.css({
                                  "background-size":
                                    h.largeWidth / h.newvaluewidth +
                                    "px " +
                                    h.largeHeight / h.newvaluewidth +
                                    "px",
                                })),
                            (h.changeBgSize = !1)),
                          h.zoomWindow.css({
                            backgroundPosition: h.xp + "px " + h.yp + "px",
                          }));
                  }, 16)))
              : (h.changeBgSize &&
                  (h.nzHeight > h.nzWidth
                    ? ("lens" == h.options.zoomType &&
                        h.zoomLens.css({
                          "background-size":
                            h.largeWidth / h.newvalueheight +
                            "px " +
                            h.largeHeight / h.newvalueheight +
                            "px",
                        }),
                      h.zoomWindow.css({
                        "background-size":
                          h.largeWidth / h.newvalueheight +
                          "px " +
                          h.largeHeight / h.newvalueheight +
                          "px",
                      }))
                    : ("lens" == h.options.zoomType &&
                        h.zoomLens.css({
                          "background-size":
                            h.largeWidth / h.newvaluewidth +
                            "px " +
                            h.largeHeight / h.newvaluewidth +
                            "px",
                        }),
                      h.largeHeight / h.newvaluewidth <
                      h.options.zoomWindowHeight
                        ? h.zoomWindow.css({
                            "background-size":
                              h.largeWidth / h.newvaluewidth +
                              "px " +
                              h.largeHeight / h.newvaluewidth +
                              "px",
                          })
                        : h.zoomWindow.css({
                            "background-size":
                              h.largeWidth / h.newvalueheight +
                              "px " +
                              h.largeHeight / h.newvalueheight +
                              "px",
                          })),
                  (h.changeBgSize = !1)),
                h.zoomWindow.css({
                  backgroundPosition:
                    h.windowLeftPos + "px " + h.windowTopPos + "px",
                })));
      },
      setTintPosition: function (h) {
        var g = this;
        (g.nzOffset = g.jQueryelem.offset()),
          (g.tintpos = String(
            -1 * (h.pageX - g.nzOffset.left - g.zoomLens.width() / 2)
          )),
          (g.tintposy = String(
            -1 * (h.pageY - g.nzOffset.top - g.zoomLens.height() / 2)
          )),
          g.Etoppos && (g.tintposy = 0),
          g.Eloppos && (g.tintpos = 0),
          g.Eboppos &&
            (g.tintposy =
              -1 *
              (g.nzHeight -
                g.zoomLens.height() -
                2 * g.options.lensBorderSize)),
          g.Eroppos &&
            (g.tintpos =
              -1 *
              (g.nzWidth - g.zoomLens.width() - 2 * g.options.lensBorderSize)),
          g.options.tint &&
            (g.fullheight && (g.tintposy = 0),
            g.fullwidth && (g.tintpos = 0),
            g.zoomTintImage.css({ left: g.tintpos + "px" }),
            g.zoomTintImage.css({ top: g.tintposy + "px" }));
      },
      swaptheimage: function (g, h) {
        var k = this,
          j = new Image();
        k.options.loadingIcon &&
          ((k.spinner = d(
            "<div style=\"background: url('" +
              k.options.loadingIcon +
              "') no-repeat center;height:" +
              k.nzHeight +
              "px;width:" +
              k.nzWidth +
              'px;z-index: 2000;position: absolute; background-position: center center;"></div>'
          )),
          k.jQueryelem.after(k.spinner)),
          k.options.onImageSwap(k.jQueryelem),
          (j.onload = function () {
            (k.largeWidth = j.width),
              (k.largeHeight = j.height),
              (k.zoomImage = h),
              k.zoomWindow.css({
                "background-size": k.largeWidth + "px " + k.largeHeight + "px",
              }),
              k.zoomWindow.css({
                "background-size": k.largeWidth + "px " + k.largeHeight + "px",
              }),
              k.swapAction(g, h);
          }),
          (j.src = h);
      },
      swapAction: function (k, m) {
        var q = this,
          o = new Image();
        if (
          ((o.onload = function () {
            (q.nzHeight = o.height),
              (q.nzWidth = o.width),
              q.options.onImageSwapComplete(q.jQueryelem),
              q.doneCallback();
          }),
          (o.src = k),
          (q.currentZoomLevel = q.options.zoomLevel),
          (q.options.maxZoomLevel = !1),
          "lens" == q.options.zoomType &&
            q.zoomLens.css({ backgroundImage: "url('" + m + "')" }),
          "window" == q.options.zoomType &&
            q.zoomWindow.css({ backgroundImage: "url('" + m + "')" }),
          "inner" == q.options.zoomType &&
            q.zoomWindow.css({ backgroundImage: "url('" + m + "')" }),
          (q.currentImage = m),
          q.options.imageCrossfade)
        ) {
          var p = q.jQueryelem,
            l = p.clone();
          if (
            (q.jQueryelem.attr("src", k),
            q.jQueryelem.after(l),
            l.stop(!0).fadeOut(q.options.imageCrossfade, function () {
              d(this).remove();
            }),
            q.jQueryelem.width("auto").removeAttr("width"),
            q.jQueryelem.height("auto").removeAttr("height"),
            p.fadeIn(q.options.imageCrossfade),
            q.options.tint && "inner" != q.options.zoomType)
          ) {
            var g = q.zoomTintImage,
              j = g.clone();
            q.zoomTintImage.attr("src", m),
              q.zoomTintImage.after(j),
              j.stop(!0).fadeOut(q.options.imageCrossfade, function () {
                d(this).remove();
              }),
              g.fadeIn(q.options.imageCrossfade),
              q.zoomTint.css({ height: q.jQueryelem.height() }),
              q.zoomTint.css({ width: q.jQueryelem.width() });
          }
          q.zoomContainer.css("height", q.jQueryelem.height()),
            q.zoomContainer.css("width", q.jQueryelem.width()),
            "inner" == q.options.zoomType &&
              (q.options.constrainType ||
                (q.zoomWrap.parent().css("height", q.jQueryelem.height()),
                q.zoomWrap.parent().css("width", q.jQueryelem.width()),
                q.zoomWindow.css("height", q.jQueryelem.height()),
                q.zoomWindow.css("width", q.jQueryelem.width()))),
            q.options.imageCrossfade &&
              (q.zoomWrap.css("height", q.jQueryelem.height()),
              q.zoomWrap.css("width", q.jQueryelem.width()));
        } else {
          q.jQueryelem.attr("src", k),
            q.options.tint &&
              (q.zoomTintImage.attr("src", m),
              q.zoomTintImage.attr("height", q.jQueryelem.height()),
              q.zoomTintImage.css({ height: q.jQueryelem.height() }),
              q.zoomTint.css({ height: q.jQueryelem.height() })),
            q.zoomContainer.css("height", q.jQueryelem.height()),
            q.zoomContainer.css("width", q.jQueryelem.width()),
            q.options.imageCrossfade &&
              (q.zoomWrap.css("height", q.jQueryelem.height()),
              q.zoomWrap.css("width", q.jQueryelem.width()));
        }
        q.options.constrainType &&
          ("height" == q.options.constrainType &&
            (q.zoomContainer.css("height", q.options.constrainSize),
            q.zoomContainer.css("width", "auto"),
            q.options.imageCrossfade
              ? (q.zoomWrap.css("height", q.options.constrainSize),
                q.zoomWrap.css("width", "auto"),
                (q.constwidth = q.zoomWrap.width()))
              : (q.jQueryelem.css("height", q.options.constrainSize),
                q.jQueryelem.css("width", "auto"),
                (q.constwidth = q.jQueryelem.width())),
            "inner" == q.options.zoomType &&
              (q.zoomWrap.parent().css("height", q.options.constrainSize),
              q.zoomWrap.parent().css("width", q.constwidth),
              q.zoomWindow.css("height", q.options.constrainSize),
              q.zoomWindow.css("width", q.constwidth)),
            q.options.tint &&
              (q.tintContainer.css("height", q.options.constrainSize),
              q.tintContainer.css("width", q.constwidth),
              q.zoomTint.css("height", q.options.constrainSize),
              q.zoomTint.css("width", q.constwidth),
              q.zoomTintImage.css("height", q.options.constrainSize),
              q.zoomTintImage.css("width", q.constwidth))),
          "width" == q.options.constrainType &&
            (q.zoomContainer.css("height", "auto"),
            q.zoomContainer.css("width", q.options.constrainSize),
            q.options.imageCrossfade
              ? (q.zoomWrap.css("height", "auto"),
                q.zoomWrap.css("width", q.options.constrainSize),
                (q.constheight = q.zoomWrap.height()))
              : (q.jQueryelem.css("height", "auto"),
                q.jQueryelem.css("width", q.options.constrainSize),
                (q.constheight = q.jQueryelem.height())),
            "inner" == q.options.zoomType &&
              (q.zoomWrap.parent().css("height", q.constheight),
              q.zoomWrap.parent().css("width", q.options.constrainSize),
              q.zoomWindow.css("height", q.constheight),
              q.zoomWindow.css("width", q.options.constrainSize)),
            q.options.tint &&
              (q.tintContainer.css("height", q.constheight),
              q.tintContainer.css("width", q.options.constrainSize),
              q.zoomTint.css("height", q.constheight),
              q.zoomTint.css("width", q.options.constrainSize),
              q.zoomTintImage.css("height", q.constheight),
              q.zoomTintImage.css("width", q.options.constrainSize))));
      },
      doneCallback: function () {
        var e = this;
        e.options.loadingIcon && e.spinner.hide(),
          (e.nzOffset = e.jQueryelem.offset()),
          (e.nzWidth = e.jQueryelem.width()),
          (e.nzHeight = e.jQueryelem.height()),
          (e.currentZoomLevel = e.options.zoomLevel),
          (e.widthRatio = e.largeWidth / e.nzWidth),
          (e.heightRatio = e.largeHeight / e.nzHeight),
          "window" == e.options.zoomType &&
            (e.nzHeight < e.options.zoomWindowWidth / e.widthRatio
              ? (lensHeight = e.nzHeight)
              : (lensHeight = String(
                  e.options.zoomWindowHeight / e.heightRatio
                )),
            e.options.zoomWindowWidth < e.options.zoomWindowWidth
              ? (lensWidth = e.nzWidth)
              : (lensWidth = e.options.zoomWindowWidth / e.widthRatio),
            e.zoomLens &&
              (e.zoomLens.css("width", lensWidth),
              e.zoomLens.css("height", lensHeight)));
      },
      getCurrentImage: function () {
        return this.zoomImage;
      },
      getGalleryList: function () {
        var g = this;
        return (
          (g.gallerylist = []),
          g.options.gallery
            ? d("#" + g.options.gallery + " a").each(function () {
                var e = "";
                d(this).data("zoom-image")
                  ? (e = d(this).data("zoom-image"))
                  : d(this).data("image") && (e = d(this).data("image")),
                  e == g.zoomImage
                    ? g.gallerylist.unshift({
                        href: "" + e,
                        title: d(this).find("img").attr("title"),
                      })
                    : g.gallerylist.push({
                        href: "" + e,
                        title: d(this).find("img").attr("title"),
                      });
              })
            : g.gallerylist.push({
                href: "" + g.zoomImage,
                title: d(this).find("img").attr("title"),
              }),
          g.gallerylist
        );
      },
      changeZoomLevel: function (h) {
        var g = this;
        (g.scrollingLock = !0),
          (g.newvalue = parseFloat(h).toFixed(2)),
          (newvalue = parseFloat(h).toFixed(2)),
          (maxheightnewvalue =
            g.largeHeight /
            ((g.options.zoomWindowHeight / g.nzHeight) * g.nzHeight)),
          (maxwidthtnewvalue =
            g.largeWidth /
            ((g.options.zoomWindowWidth / g.nzWidth) * g.nzWidth)),
          "inner" != g.options.zoomType &&
            (maxheightnewvalue <= newvalue
              ? ((g.heightRatio =
                  g.largeHeight / maxheightnewvalue / g.nzHeight),
                (g.newvalueheight = maxheightnewvalue),
                (g.fullheight = !0))
              : ((g.heightRatio = g.largeHeight / newvalue / g.nzHeight),
                (g.newvalueheight = newvalue),
                (g.fullheight = !1)),
            maxwidthtnewvalue <= newvalue
              ? ((g.widthRatio = g.largeWidth / maxwidthtnewvalue / g.nzWidth),
                (g.newvaluewidth = maxwidthtnewvalue),
                (g.fullwidth = !0))
              : ((g.widthRatio = g.largeWidth / newvalue / g.nzWidth),
                (g.newvaluewidth = newvalue),
                (g.fullwidth = !1)),
            "lens" == g.options.zoomType &&
              (maxheightnewvalue <= newvalue
                ? ((g.fullwidth = !0), (g.newvaluewidth = maxheightnewvalue))
                : ((g.widthRatio = g.largeWidth / newvalue / g.nzWidth),
                  (g.newvaluewidth = newvalue),
                  (g.fullwidth = !1)))),
          "inner" == g.options.zoomType &&
            ((maxheightnewvalue = parseFloat(
              g.largeHeight / g.nzHeight
            ).toFixed(2)),
            (maxwidthtnewvalue = parseFloat(g.largeWidth / g.nzWidth).toFixed(
              2
            )),
            newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue),
            newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue),
            maxheightnewvalue <= newvalue
              ? ((g.heightRatio = g.largeHeight / newvalue / g.nzHeight),
                newvalue > maxheightnewvalue
                  ? (g.newvalueheight = maxheightnewvalue)
                  : (g.newvalueheight = newvalue),
                (g.fullheight = !0))
              : ((g.heightRatio = g.largeHeight / newvalue / g.nzHeight),
                newvalue > maxheightnewvalue
                  ? (g.newvalueheight = maxheightnewvalue)
                  : (g.newvalueheight = newvalue),
                (g.fullheight = !1)),
            maxwidthtnewvalue <= newvalue
              ? ((g.widthRatio = g.largeWidth / newvalue / g.nzWidth),
                newvalue > maxwidthtnewvalue
                  ? (g.newvaluewidth = maxwidthtnewvalue)
                  : (g.newvaluewidth = newvalue),
                (g.fullwidth = !0))
              : ((g.widthRatio = g.largeWidth / newvalue / g.nzWidth),
                (g.newvaluewidth = newvalue),
                (g.fullwidth = !1))),
          (scrcontinue = !1),
          "inner" == g.options.zoomType &&
            (g.nzWidth >= g.nzHeight &&
              (g.newvaluewidth <= maxwidthtnewvalue
                ? (scrcontinue = !0)
                : ((scrcontinue = !1),
                  (g.fullheight = !0),
                  (g.fullwidth = !0))),
            g.nzHeight > g.nzWidth &&
              (g.newvaluewidth <= maxwidthtnewvalue
                ? (scrcontinue = !0)
                : ((scrcontinue = !1),
                  (g.fullheight = !0),
                  (g.fullwidth = !0)))),
          "inner" != g.options.zoomType && (scrcontinue = !0),
          scrcontinue &&
            ((g.zoomLock = 0),
            (g.changeZoom = !0),
            g.options.zoomWindowHeight / g.heightRatio <= g.nzHeight &&
              ((g.currentZoomLevel = g.newvalueheight),
              "lens" != g.options.zoomType &&
                "inner" != g.options.zoomType &&
                ((g.changeBgSize = !0),
                g.zoomLens.css({
                  height:
                    String(g.options.zoomWindowHeight / g.heightRatio) + "px",
                })),
              ("lens" != g.options.zoomType && "inner" != g.options.zoomType) ||
                (g.changeBgSize = !0)),
            g.options.zoomWindowWidth / g.widthRatio <= g.nzWidth &&
              ("inner" != g.options.zoomType &&
                g.newvaluewidth > g.newvalueheight &&
                (g.currentZoomLevel = g.newvaluewidth),
              "lens" != g.options.zoomType &&
                "inner" != g.options.zoomType &&
                ((g.changeBgSize = !0),
                g.zoomLens.css({
                  width:
                    String(g.options.zoomWindowWidth / g.widthRatio) + "px",
                })),
              ("lens" != g.options.zoomType && "inner" != g.options.zoomType) ||
                (g.changeBgSize = !0)),
            "inner" == g.options.zoomType &&
              ((g.changeBgSize = !0),
              g.nzWidth > g.nzHeight && (g.currentZoomLevel = g.newvaluewidth),
              g.nzHeight > g.nzWidth &&
                (g.currentZoomLevel = g.newvaluewidth))),
          g.setPosition(g.currentLoc);
      },
      closeAll: function () {
        self.zoomWindow && self.zoomWindow.hide(),
          self.zoomLens && self.zoomLens.hide(),
          self.zoomTint && self.zoomTint.hide();
      },
      changeState: function (e) {
        "enable" == e && (this.options.zoomEnabled = !0),
          "disable" == e && (this.options.zoomEnabled = !1);
      },
    };
    (d.fn.elevateZoom = function (g) {
      return this.each(function () {
        var e = Object.create(c);
        e.init(g, this), d.data(this, "elevateZoom", e);
      });
    }),
      (d.fn.elevateZoom.options = {
        zoomActivation: "hover",
        zoomEnabled: !0,
        preloading: 1,
        zoomLevel: 1,
        scrollZoom: !1,
        scrollZoomIncrement: 0.1,
        minZoomLevel: !1,
        maxZoomLevel: !1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        imageCrossfade: !1,
        constrainType: !1,
        constrainSize: !1,
        loadingIcon: !1,
        cursor: "default",
        responsive: !0,
        onComplete: d.noop,
        onZoomedImageLoaded: function () {},
        onImageSwap: d.noop,
        onImageSwapComplete: d.noop,
      });
  })(jQuery, window, document),
  jQuery("#product-zoom").length > 0 &&
    jQuery("#product-zoom").elevateZoom({
      zoomType: "inner",
      cursor: "crosshair",
      zoomWindowFadeIn: 500,
      zoomWindowFadeOut: 750,
      gallery: "gallery_01",
    }),
  jQuery("#gallery_01 .slider-items").owlCarousel({
    autoplay: !1,
    items: 3,
    itemsDesktop: [1024, 3],
    itemsDesktopSmall: [900, 2],
    itemsTablet: [600, 3],
    itemsMobile: [320, 2],
    navigation: !0,
    navigationText: ['<a class="flex-prev"></a>', '<a class="flex-next"></a>'],
    slideSpeed: 500,
    pagination: !1,
  });
