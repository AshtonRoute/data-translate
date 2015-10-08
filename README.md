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
## Options

There are also options that you can specify for detection and changing of language.

```javascript
  detectLanguageFrom: {
    type: String,
    notify: true,
    reflectToAttribute: true,
    value: 'html' // any of available values
  },
  
  getLanguageFrom: {
      type: String,
      notify: true,
      reflectToAttribute: true,
      value: 'html' //all except server
    }
   ```
Values are:
* `html` - detects or sets language based on `lang` attribute(property) of
```html
<html lang="en">
```
* `sibling` - detects or sets language based on closest element (upper) with `lang` attribute(property).  Ex:
```html
<element lang="en">
```
* `self` - detects or sets language based on current element's `lang` attribute(property). Ex:
```html
<element lang="en">
```
* `browser` - detects or sets language based on `language` or `userLanguage` or `browserLanguage` or `systemLanguage` property of `window.navigator`. It'll use the first not null.
* `server` - detects language based on `xhr` response from server.
