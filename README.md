# data-translate
Polymer `^1.0` behavior that provides an easy translation service for your web components

## When to use

If you have some web components that need to be translated, but you don't want to translate it each time you use it.
For example, clear button in input, or login form.

## Usage

You should add it to your component's behaviors.

```javascript
  behaviors: [DataBehaviors.DataTranslate]
  ```
  
Then you should add properties, that you want to be translated. For example, we'll add property `labelClearButton` and it's translations.

```javascript
  properties: {
  
    labelClearButton: {
        type: String,
        computed: "t('labelClearButton', translations, currentLanguage)"  //you have to specify name of property and 2 required arguments :translations, currentLanguage, which are required for notify changes events
    },
    
    translations: {
        type: Object,
        notify: true,
        value: {
            en: {labelClearButton: 'clear'},     //here you can add as many translations as you want
            ru: {labelClearButton: 'стереть'}
        }
  ```
