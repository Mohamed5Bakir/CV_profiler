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
	 * Wizard function
	 */
    function Wizard(options) {
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }


    /**
	 * Wizard options
	 */
    Wizard.prototype.options = {
        // element to which the wiz will be appended
        // defaults to the document.body
        wrapper: document.body,
        color: '',
        data: '',


    }
    /**
	 * init function
	 * initialize and cache some vars
	 */
    Wizard.prototype._init = function () {
        // create HTML structure
        this.wiz = document.createElement('div');
        this.wiz.className = 'wizard ';
        var setupPanel = '<div class="stepwizard"> <div class="stepwizard-row setup-panel">',
            setupContent = '<form role="form" data-toggle="validator" id="fieldForm">';
        var data = this.options.data;
        $.each(data, function (index, item) {
            var disabled = ' disabled = "disabled"';
            var btnType = 'btn-default'
            if (index == 0) { disabled = ''; btnType = 'btn-primary' }
            setupPanel += '<div class="stepwizard-step"><a href="#step-' + (index + 1) + '" type="button" class="btn ' + btnType + ' btn-circle"'
            + disabled + '>' + (index + 1)
            + '</a> <p>' + item.GroupName + '</p></div>';
        });
        $.each(data, function (index, group) {
            var component = "";
            var fields = group.CustomFields;
            setupContent += '<div class="row setup-content" id="step-' + (index + 1) + '" data-step="' + (index + 1) + '">'
                + '<div class="col-xs-12">'
                + '<div class="col-md-12">'
                + '<h3>' + group.GroupName + '</h3>'

            $.each(fields, function (index, item) {
                switch (item.DataType) {
                    case 1: {
                        setupContent += AddInput(item.InfoName, item.TextType, item.HaveMany, item.required);
                        break;
                    }  case 2: {
                        if (item.IntType == 1) {
                            setupContent += '<div class="row" id="' + item.InfoName + 'NumWrapper" data-label="' + item.InfoName
                                + '" data-min="' + item.Min + '" data-max="' + item.Max + '" data-pas="1" data-req="' + item.required + '"></div>';
                            // AddNumeric(item.InfoName, item.Min, item.Max, 1, item.required,item.InfoName + 'Wrapper');
                        }
                        else if (item.IntType == 2) {
                            setupContent += AddStar(item.InfoName, item.Max, item.required);
                        }
                        break;
                    }  case 3: {
                        //setupContent += AddNumeric(item.InfoName, item.Min, item.Max, 0.1, item.required);
                        break;
                    }  case 4: {
                        // setupContent += AddNumeric(item.InfoName, item.Min, item.Max, 0.01, item.required);
                        break;
                    } case 5: {
                        setupContent += AddDateNormal(item.InfoName, item.required);
                        break;
                    } case 6: {
                        setupContent += AddSelectList(item.InfoName, item.Defaults, item.required);
                        break;
                    }
                    default: break;
                }
            });
            setupContent += '<button class="btn btn-primary nextBtn pull-right" type="button">Continuer</button>'
            + '</div>'
            + '</div>'
            + '</div>';

        });
        setupPanel += '<div class="stepwizard-step">'
        + '<a href="#step-' + (this.options.data.length + 1) + '" type="button" class="btn btn-default btn-circle" disabled="disabled">' + (this.options.data.length + 1) + '</a>'
        + '<p>Terminer</p>'
        + '</div>';
        setupPanel += '</div></div>';
        setupContent += '<div class="row setup-content" id="step-' + (this.options.data.length + 1) + '" data-step="' + (this.options.data.length + 1) + '">'
        + '<div class="col-xs-12">'
        + '<div class="col-md-12">'
        + '<p>Recap</p>'
        + '<button class="btn btn-primary nextBtn btn-lg pull-right" type="submit">Vailder</button>'
        + '</div>'
        + '</div>'
        + '</div>';
        setupContent += '</form>';
        setupContent += '<div class="progress stepwizard-progress">'
            + '<div class="progress-bar progress-bar-default" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'
            + '</div>';
        this.wiz.innerHTML = setupPanel + setupContent;


        this.options.wrapper.insertBefore(this.wiz, this.options.wrapper.firstChild);
    }




    /**
     * add to global namespace
     */
    window.Wizard = Wizard;

})(window);

function initializeWizard() {
    var stepCount = $(".setup-content").length;
    var star = $("[id*=Star]");
    star.each(function (i, e) {
        var echelle = $(e).attr('data-echelle');
        $(e).starrr({ numStars: echelle, starSize: 'xx-large' });
        $(e).on('starrr:change', function (i, value) {
            $(e).children('input').val(value == null ? 0 : value);
        });
    });

    var numWrappers = $("[id*=NumWrapper]");
    numWrappers.each(function (i, e) {
        var label = $(e).attr('data-label');
        var min = $(e).attr('data-min');
        var max = $(e).attr('data-max');
        var pas = $(e).attr('data-pas');
        var req = $(e).attr('data-req');
        AddNumeric(label, min, max, pas, req, e)
    });

    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        clearBtn: true,
        language: "fr",
        autoclose: true,
        todayHighlight: true
    });
    $('.stepwizard-step').css('width', (100 / stepCount) + '%');
    var navListItems = $('div.setup-panel div a'),
                      allWells = $('.setup-content'),
                      allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            step = curStep.attr('data-step'),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid) {
            nextStepWizard.removeAttr('disabled').trigger('click');
            //update progress
            var percent = (parseInt(step) / (stepCount - 1)) * 100;
            $('.progress-bar').css({ width: percent + '%' });

        }
    });

    $('div.setup-panel div a.btn-primary').trigger('click');

    $(document).on('keyup', 'div.form-group-options div.input-group-option:last-child input', function () {
        var sInputGroupHtml = $(this).parent().html();
        var sInputGroupClasses = $(this).parent().attr('class');
        $(this).parent().parent().append('<div class="' + sInputGroupClasses + '">' + sInputGroupHtml + '</div>');
    });
    $(document).on('click', 'div.form-group-options .input-group-addon-remove', function () {
        $(this).parent().remove();
    });
    $(document).on('click', 'div.form-group-options .input-group-addon-removeAll', function () {
        $('.input-group-option:not(:last-child)').remove();
    });

}




function AddInputNormal(label, type, req) {
    var required = ''; if (req) required = 'required';
    var inputType = "text"; var pattern = '';
    if (type == 2) { inputType = 'email'; pattern = 'pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"'; }
    if (type == 3) { inputType = 'url'; pattern = 'pattern="https?://.+"'; }
    if (type == 4) { inputType = 'tel'; pattern = 'pattern="(\+?\d[- .]*){7,13}"'; }
    return '<div class="form-group">'
              + '<label class="control-label">' + label + '</label>'
              + '<input type="' + inputType + '" ' + required + ' ' + pattern + ' name="' + label + '" id="' + label + '" class="form-control" placeholder="' + label + '" />'
              + '<span class="help-block with-errors"></span>'
              + '</div>';
}

function AddDateNormal(label, req) {
    var required = ''; if (req) required = 'required';
    return '<div class="form-group row">'
              + '<div class=" col-sm-3">'
              + '<label class="control-label">' + label + '</label>'
              + ' <div class="input-group date">'
              + '<input type="text" name="' + label + '" id="' + label + '" class="form-control" ' + required + '><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>'
              + '</div>'
              + '<span class="help-block with-errors"></span>'
              + '</div>'
              + '</div>';

}

function AddNumeric(label, min, max, step, req, wrapper) {
    var required = ''; if (req) required = 'required';
    new NumberSpinner({
        wrapper: wrapper,
        color: 'default',
        min: min,
        max: max,
        size: 4,
        name: label,
        label: label,
        CssClass: '',
        required: required
    });
    NumberSpinnerInit(step);
}


function AddStar(label, echelle, req) {
    var required = ''; if (req) required = 'required';
    return '<div class="form-group">'
        + '<label class="control-label">' + label + '</label>'
    + '<div class="row">'
    + '<div class="col-sm-12">'
    + '<div id="' + label + 'Star" class="starrr" data-echelle="' + echelle + '">'
    + '<input type="hidden" name="' + label + '" id="' + label + '" value="0"/></div>'
    + '</div>'
    + '</div>'
        + '<span class="help-block with-errors"></span>'
    + '</div>';
}

function AddMultipleInput(label, type, req) {
    var required = ''; if (req) required = 'required';
    var inputType = "text"; var pattern = '';
    if (type == 2) { inputType = 'email'; pattern = 'pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"'; }
    if (type == 3) { inputType = 'url'; pattern = 'pattern="https?://.+"'; }
    if (type == 4) { pattern = 'pattern="(\+?\d[- .]*){7,13}"'; }
    return ' <div class="form-group form-group-options ">'

        + '<label class="control-label">' + label + '</label>'
     + '<div class="row">'
     + '<div class="input-group input-group-option col-sm-2">'
     + '<input type="' + inputType + '" name="option[]"  ' + pattern + '  class="form-control"  placeholder="Cliquer pour ajouter"/>'
     + '<span class="input-group-addon input-group-addon-remove">'
     + '<span class="glyphicon glyphicon-remove"></span>'
     + '</span>'
     + '<span class="input-group-addon input-group-addon-removeAll">'
     + '<span class="glyphicon glyphicon-remove-circle"></span>'
     + '</span>'
     + '</div>'
     + '</div> '
     + '<span class="help-block with-errors"></span></div> ';

}

function AddInput(label, type, multiple, req) {

    if (multiple) return AddMultipleInput(label, type, req);
    else return AddInputNormal(label, type, req);
}
function AddSelectList(label, defaults, req) {
    var options = defaults.split(";");
  
    var required = ''; if (req) required = 'required';
    var Res = '<div class="form-group">'
             + '<label class="control-label">' + label + '</label>'
             + '<select   ' + required + '  name="' + label + '" id="' + label + '" class="form-control" placeholder="' + label + '" >'

    $.each(options, function (index, item) {
        if (item != "") {
            Res+='<option value="'+item+'">'+item+'</option>'
        }
    });

    Res += '</select></div>';
    return Res
}















