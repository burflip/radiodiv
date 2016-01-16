/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */
/**
 *
 * Currently only data-based functionality is working
 *
 * USAGE:
 * Fields structure:
 * "hidden_field_id":{
 *      selectors:[],
 *      type:"radio" // or "checkbox",
 *      selected:true,
 *      value:"string"
 * }
 *
 * Inline declaration only for radio.
 * You may add "radiodiv" class to each div.
 * Data attributes:
 *
 * data-rd-name="string"
 * data-rd-selected=true // optional, default = false
 * data-rd-value="string"
 * 
 * @type {{fields: {}, config: {background_color_hovered: string, background_color_selected: string, animation: boolean, click_callback: Function}}}
 */
(function ($) {
    $.radiodiv = function (options) {
        $.extend(true, $(this).defaults, options);
        initRadiodiv($(this).defaults);
    }
}(jQuery));


$.radiodiv.defaults = {
    fields: {},
    config: {
        background_color_hovered: "radiodiv-hover",
        background_color_selected: "radiodiv-selected",
        animation: false,
        click_callback:function(){}
    }
}

$.radiodiv.hidden_checked = {};

function initRadiodiv(settings) {
    if(settings !== undefined) {
        $.each(settings.fields, function (k, v) {
            if (v.type == "radio" && typeof v.selected != "string") {
                throw "Radiodiv: Illogic options. Multiple radio selection on " + k;
            } else {
                radioDiv(k, v.selectors, v.type, v.selected, v.values);
            }
        });
    }
    $.each($(".radiodiv"), function (k, field) {
        radioDivInline($(field));
    })
}

function radioDiv(name, selectors, type, selected, values) {
    createHiddenIfNotExist(name);
    $.each(selectors, function (k, v) {
        var field = $("#" + v);
        addSelected(field, selected, values[v])
        addListeners(field, type, name, values[v]);
    });
}

function radioDivInline(field) {
    var name = field.data("rd-name"),
        selected = ((field.data("rd-selected")) ? field.data("rd-selected") : false),
        value = field.data("rd-value");

    addSelected(field, selected, value)
    addListeners(field, "radio", name, value);
}

function createHiddenIfNotExist(name) {
    if ($.radiodiv.hidden_checked[name] === undefined) {
        if ($("#" + name).length == 0) {
            if ($("form").length == 0) {
                $("form").append('<input type="hidden" name="' + name + '" id="' + name + '" value="">');
            } else {
                $("body").append('<input type="hidden" name="' + name + '" id="' + name + '" value="">');
            }
            $.radiodiv.hidden_checked[name] = $("#" + name);
        }
    }
}

function addListeners(field, type, name, value) {
    field.on('click', function (event) {
        if (type == "radio") {
            radioClick(event, name);
        } else {
            checkBoxClick(field, name, value)
        }
        (typeof $.radiodiv.defaults.click_callback === "function") ? $.radiodiv.defaults.click_callback(field, type, name, value) : null;
    });

    field.on("mouseenter", function () {
        field.addClass($.radiodiv.defaults.config.background_color_hovered);
    });

    field.on("mouseleave", function () {
        field.removeClass($.radiodiv.defaults.config.background_color_hovered);
    })
}

function addSelected(field, name, selected) {
    if (selected === true) {
        field.addClass("rd-" + name + " " + $.radiodiv.defaults.config.background_color_selected);
    } else {
        field.addClass("rd-" + name);
    }
}

function radioClick(event, name) {
    var field = $(event.currentTarget);

    $("body").find("[data-rd-name='"+name+"']").removeClass($.radiodiv.defaults.config.background_color_selected);
    field.addClass($.radiodiv.defaults.config.background_color_selected);
    $("#"+name).val(field.data("rd-value"));
    console.log($("#example").val());
}

function checkBoxClick(field, name, value) {
    var current_array = $($.radiodiv.hidden_checked[name]).val().split(",");
    if (field.hasClass($.radiodiv.defaults.config.background_color_selected)) {
        field.removeClass($.radiodiv.defaults.config.background_color_selected);
        current_array[field.attr("id")] = "";
    } else {
        field.addClass($.radiodiv.defaults.config.background_color_selected);
        current_array[field.attr("id")] = value;
    }
    $($.radiodiv.hidden_checked[name]).val(current_array.toString());
}