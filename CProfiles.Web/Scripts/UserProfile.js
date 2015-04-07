/**
 * UserProfile.js v1.0.0
 * http://www.Cynapsys.de
 *
 * Copyright 2014, Cynapsys
 * http://www.Cynapsys.de 
 *
 * @author Mohamed Elkhames Bakir <mek.bakir@cynapsys.de>
 */


(function (window) {
    /**
	 * extend obj function
	 */
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
	 * UserProfile function
	 */
    function UserProfile(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }
    function AlertBak(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }
    function NumberSpinner(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }


    /**
	 * UserProfile options
	 */
    UserProfile.prototype.options = {
        // element to which the usp will be appended
        // defaults to the document.body
        wrapper: document.body,
        color: '',
        //The user Image source
        ImageSource: '/Images/avatarCyn.jpg',
        //the User Name
        UserName: 'User Profile',
        //the user ch1
        ch1: 'Tunisie',
        ch1Class:"",
        //the user ch2
        ch2: 'Développeur',
        //ch3
        ch3: 'Cynapsys',
        //ch3 Url
        urlCh3: 'http://www.cynapsys.de',
        //list of skills 
        //list must be at format {'el1':'style1','el2':'style2',....} 
        //where styles are 'default','success','info','danger','warning','primary'
        list: { 'Html5': 'default', 'CSS3': 'info' },
        CssClass: '',

    }
    /**
	 * AlertBak options
	 */
    AlertBak.prototype.options = {
        // element to which the usp will be appended
        // defaults to the document.body
        wrapper: document.body,
        color: 'danger',
        message: ' - Une erreur est survenue !',
        title: 'Erreur',
        ttl: 0,
        icon:'',
        CssClass: '',

    }
    /**
 * NumberSpinner options
 */
    NumberSpinner.prototype.options = {
        // element to which the usp will be appended
        // defaults to the document.body
        wrapper: document.body,
        color: 'default',
        min: -9999,
        max: 9999,
        size: 3,
        name: 'spinner',
        label: 'Valeur',
        valeur: 1,
        CssClass: '',
        aria: {},
        required: '', 

    }
    /**
	 * init function
	 * initialize and cache some vars
	 */
    UserProfile.prototype._init = function () {
        // create HTML structure
        this.usp = document.createElement('div');
        this.usp.className = 'media ' + this.options.CssClass;
        var strinner = '<a class="pull-left" href="#">';
        strinner += '<img  class="media-object dp img-circle dp-' + this.options.color + '" src="' + this.options.ImageSource + '" style="width: 100px;height:100px;">';
        strinner += '</a>';

        strinner += '<div class="media-body">';
        strinner += '<h4 class="media-heading">' + this.options.UserName
            +' '+ this.options.ch1 
            +'</h4>'
        strinner += '<h5>' + this.options.ch2 + '  <a href="' + this.options.urlCh3 + '"   id="ch3">' + this.options.ch3 + '</a></h5>'
        strinner += '<hr style="margin:8px auto" class="dp-' + this.options.color + '">'

        var list = this.options.list;
        for (var el in list) {
            if (list.hasOwnProperty(el)) {
                strinner += '<span style="margin-right:2px" class="label label-' + list[el] + '">' + el + '</span>';
            }
        }

        strinner += '</div>';
        this.usp.innerHTML = strinner;

        // append to body or the element specified in options.wrapper
        this.options.wrapper.insertBefore(this.usp, this.options.wrapper.firstChild);
        $(this.usp).children('a').children('img').hide();
        $(this.usp).children('a').children('img').show('pulsate', { easing: 'easeInOutBounce' }, 500);
    }
    AlertBak.prototype._init = function () {
        // create HTML structure
        this.alb = document.createElement('div');
        this.alb.className = 'oaerror ' + this.options.color;
        var strinner = '<span class="glyphicon glyphicon-'+this.options.icon+'" aria-hidden="true"></span><strong style="margin-left:15px;" >' + this.options.title + '</strong>' + this.options.message + '<span class="ns-close glyphicon glyphicon-remove"></span></div>';
        this.alb.innerHTML = strinner;

        // append to body or the element specified in options.wrapper
        this.options.wrapper.insertBefore(this.alb, this.options.wrapper.firstChild);
        // init events
        this._initEvents();
    }
    NumberSpinner.prototype._init = function () {
        // create HTML structure
        this.spn = document.createElement('div');
        this.spn.className ='form-group'+ this.options.CssClass; 
        var arias = this.options.aria;
      
        var strinner = '<label for="' + this.options.name + '" class="control-label" >' + this.options.label + '</label>'
        + '<div class="input-group number-spinner ">'
        + '<span class="input-group-btn data-dwn">'
        + '<button type="button" class="btn btn-' + this.options.color + '" data-dir="dwn"><span class="glyphicon glyphicon-minus"></span></button>'
        + ' </span>'
        + '<input type="number" ' +this.options.required+' name="'+ this.options.name + '" id="' + this.options.name + '" class="form-control text-center" value="' + this.options.valeur + '" min="' + this.options.min + '" max="' + this.options.max + '"';

        for (var ar in arias) {
            if (arias.hasOwnProperty(ar)) {
                strinner += ' data-' + ar + '="' + arias[ar]+'"';
            }
        }

        strinner += '/>'
        + '<span class="input-group-btn data-up">'
        + '<button type="button" class="btn btn-' + this.options.color + '" data-dir="up"><span class="glyphicon glyphicon-plus"></span></button>'
        + '</span>'
        + '</div>'
        + '<span class="help-block with-errors"></span>'
        this.spn.innerHTML = strinner;

        // append to body or the element specified in options.wrapper
        this.options.wrapper.insertBefore(this.spn, this.options.wrapper.firstChild);
    }

    /**
	 * init events
	 */
    AlertBak.prototype._initEvents = function () {
        var self = this;
        // dismiss notification
        if (this.options.ttl > 0) {
            setTimeout(function () {
                self.dismiss();
            }, this.options.ttl);
        }
        this.alb.querySelector('.ns-close').addEventListener('click', function () { self.dismiss(); });
    }

    AlertBak.prototype.dismiss = function () {
        var self = this;
        try {
            self.options.wrapper.removeChild(this.alb);
        } catch (e) { return }
    }


    /**
	 * add to global namespace
	 */
    window.UserProfile = UserProfile;
    window.AlertBak = AlertBak;
    window.NumberSpinner = NumberSpinner;

})(window);


/**
 *
 * Module pour "Chargement..." dialog avec  Bootstrap
 *
 */

var IndChargement = (function ($) {

    var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

    return {
        /**
		 *  
		 * @param message message personalisé
		 * @param options options personalisée:
		 * 				  options.dialogSize - bootstrap postfix : dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix : progress bar type, e.g. "success", "warning".
		 */
        show: function (message, options) {
            //  defaults
            var settings = $.extend({
                dialogSize: '',
                progressType: ''
            }, options);
            if (typeof message === 'undefined' || message == '') {
                message = 'Chargement';
            }
            if (typeof options === 'undefined') {
                options = {};
            }
            // Configuration 
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog');
            if (settings.progressType) {
                $dialog.find('.modal-dialog').addClass('modal-' + settings.dialogSize);
            }
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            /**
            * ouvrir dialog
            */
            $dialog.modal();
        },
        /**
		 * fermer dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    }

})(jQuery);




$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});

function NumberSpinnerInit(step) {
    var action;
    $(".number-spinner button").mousedown(function () {
        btn = $(this);
        input = btn.closest('.number-spinner').find('input');
        btn.closest('.number-spinner').find('button').prop("disabled", false);

        if (btn.attr('data-dir') == 'up') {
            action = setInterval(function () {
                if (input.attr('max') == undefined || parseFloat(input.val()) < parseFloat(input.attr('max'))) {

                    input.val(parseFloat(input.val()) + parseFloat(step));
                } else {
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 50);
        } else {
            action = setInterval(function () {
                if (input.attr('min') == undefined || parseFloat(input.val()) > parseFloat(input.attr('min'))) {
                    input.val(parseFloat(input.val()) - step);
                } else {
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 50);
        }

    }).mouseup(function () {
        clearInterval(action);
        input.trigger("change");
    });
}









