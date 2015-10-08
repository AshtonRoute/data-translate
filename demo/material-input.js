(function () {

    this.materialInput = {

        is: 'material-input',

        behaviors: [DataBehaviors.DataTranslate],

        properties: {

            clearButton: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },

            labelClearButton: {
                type: String,
                computed: "t('labelClearButton', translations, currentLanguage)"
            },

            showHide: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },

            translations: {
                type: Object,
                notify: true,
                value: {
                    en: {labelClearButton: 'clear'},
                    ru: {labelClearButton: 'стереть'}
                }
            }
        },

        clearInput: function () {
            var input = this.$.input;
            input.value = '';
            input = input.$.input;
            input.focus();
        },

        showHideInputContent: function () {
            if (this.showHide) {
                if(!this._tempType) {
                    this._tempType = this.type;
                }

                if (this.type === 'password') {
                    if(this._tempType !== 'password') {
                        this.type = this._tempType;
                    }
                    else {
                        this.type = 'text';
                    }                    
                }

                else {
                    this.type = 'password';
                }

                this.$.input.$.input.focus();
            }
        },

        resetType: function () {
            if(this._tempType && this.type !== this._tempType) {
                this.type = this._tempType;
            }
        },

        isClearAndHaveValue: function (clrbtn, val) {
            return (clrbtn && val);
        }
    };

}());
