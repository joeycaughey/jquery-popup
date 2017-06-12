var Popup = {
    type: false,
    assets: {},
    options: {},
    init: function(options) {
        var self = this;

        options.fullscreen = (options.fullscreen) ? options.fullscreen : false;

        options.width = (options.width) ? options.width : 300;
        options.width = (options.fullscreen) ? "100%" : options.width;
        options.height = (options.height) ? options.height : 400;
        options.height = (options.fullscreen) ? "100%" : options.height;

        options.variables = (options.variables) ? options.variables : {};
        options.url = (options.url) ? options.url : false;
        options.content = (options.content) ? options.content : false;
        options.nopadding = (options.nopadding) ? options.nopadding : false;
        options.callback = (options.callback) ? options.callback : false;


        self.options = options;

        // Calculations
        screen_width = $(window).width();
        screen_height = $(window).height();
 

        // Create Popup
        self.assets.popup = $('<div id="popup" style="display: none;"></div>')
            .width(options.width)
            .css("min-height", options.height)

        // Disable Page Scrolling
        $('html, body').css({
            'overflow': 'hidden',
            'height': '100%'
        });


        if (options.fullscreen) {
            self.assets.popup.addClass("fullscreen");
        }


        // Set Popup Background 
        if (options.background) {
            self.assets.popup.css("background", options.background);
        }

        if (options.url) {
            $.get(options.url, function(html) {
                // Build Popup Asset 
                self.build(html);
            });

        } else if (options.content) {
            self.build(options.content);
        }
        this.blockout();
    },
    callback: function(parameters) {
        var self = this;
        self.options.callback(parameters);
    },
    build: function(popup_html) {
        var self = this;

        // Close Button
        var close_button = $('<a href="javascript: Popup.close();" id="popup_close"></a>')
            .append($('<i class="fa fa-2x fa-times-circle-o">'))
            .on("click", function() {
                Popup.close();
            });

        // Set Popup HTML
        self.assets.popup
            .html(popup_html)
            .append(close_button);


        $("#popup").html(self.assets.popup.html());

        if (self.options.nopadding) {
            setTimeout(function() {
                $("#popup").css({
                    padding: '0px'
                });
            }, 100);
        }

        // Popup Form Actions
        var thisform = $(self.assets.popup).find("form");

        if (!self.options.callback) {
            thisform.submit(function(e) {
                e.preventDefault();
                $.post(self.options.url, thisform.serialize(), function(html) {
                    if (thisform.hasClass("external")) {
                        $("body").html(html);
                    } else {
                        self.build(html);
                    }
                });
            });
        }

        // Internalize Links
        thisform.find("a").on("click", function(e) {
            if (!$(this).hasClass("external")) {
                 e.preventDefault();
                $.get($(this).attr("href"), function(html) {
                    self.build(html);
                });
            }
        });

        thisform.find('input').on("keypress", function(e) {
            // Enter pressed?
            var key = e.which ? e.which : e.keyCode;
            if (key == 13) {
                $(e.target).closest('form').submit();
            }
        });


    },
    blockout: function() {
        var self = this;
        $("#blockout").remove();

        var blockout = $('<div id="blockout" style="display: none;"></div>')
            .width($(window).width())
            .height($(window).height())
            .css("z-index", 4000)
            .show();

        $("body").prepend(
            blockout.append(
                self.assets.popup.fadeIn(400, function() {
                    $(this).show();
                })
            )
        );

        $(document).keyup(function(e) {
            //alert(e.keyCode);
            if (e.keyCode == 27) {
                //alert("Close");
                self.close();
            }
        });

        $(window).resize(function() {
            self.position();
        })
    },
    close: function() {
        $("#blockout, #popup").fadeOut(200);
        $("#blockout").remove();
        $("body").css("overflow", "visible");

        // re-Enable page Scrolling
        $('html, body').css({
            'overflow': 'auto',
            'height': 'auto'
        });
    },
    alert: function(options) {
    	var self = this;
        var options = $.extend({
            width: 300,
            height: 100,
            content: 'Invalid login information. Try again.'
        }, options)

        self.init(options);
        setTimeout(function() {
            self.close();
        }, 1500);
    }

}

$(window).on("resize", function() {
    if ($("#popup").length != 0) {
        $("#blockout").width("100%").height("100%");
    }
});
