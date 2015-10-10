# data-translate
Polymer `^1.0` behavior that provides an easy translation service for your web components.
It uses same hierarchy as [I18n](https://github.com/svenfuchs/i18n)

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
* `html` - detects and then gets language based on `lang` attribute(property) of
```html
<html lang="en">
```
* `sibling` - detects and then gets language based on closest element (upper) with `lang` attribute(property).  Ex:
```html
<element lang="en">
```
* `self` - detects and then gets language based on current element's `lang` attribute(property). Ex:
```html
<element lang="en">
```
* `browser` - detects and then gets language based on `language` or `userLanguage` or `browserLanguage` or `systemLanguage` property of `window.navigator`. It'll use the first not null.
* `server` - detects language based on url specified in `detectRequestUrl` and `xhr` response from the server.
```html
<element detect-request-url="somecoolurl.json">
```

## Useful functions

* `findAllDataTranslateOnPage()` - returns `Array` of web components that was extended with `DataTranslate` behavior. 

Source: current `document`

* `findAllDataTranslateChildren(bool deep)` - returns `Array` of web components that was extended with `DataTranslate` behavior.

Source: current element's `children`.

`bool deep` - default: `true`. If `true` will search recursively, if `false` will search only in `children` property.

* `findDataTranslateChildrenBySelector(string selectors)` - returns `Array` of web components that was extended with `DataTranslate` behavior. 

Source: current element's `children`. 

It uses [Element.querySelectorAll(selectors)](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll)

* `setPropToAllDataTranslateOnPage(string prop, newval)` - sets the required property for all objects found by `findAllDataTranslateOnPage()`.

* `setPropToAllDataTranslateChildren(string prop, newval, bool self, deep)` - sets the required property for all objects found by `findAllDataTranslateChildren()`. 

Set `self` to `true` if you also want to set current element's property to `newval`.

* `setPropToDataTranslateChildrenBySelector(string selectors, string prop, newval, bool self)` - sets the required property for all objects found by `findDataTranslateChildrenBySelector()`. 

Set `self` to `true` if you also want to set current element's property to `newval`.

* `removeTranslations(string path)` - removes specified translation from all languages.

`path` - path to translation.

## Events

`data-translate-initialize` - fired on `attached` before adding Observer and detecting language.

It's better to add/change translations on this event, otherwise you'll have to switch language for changes to appear.

Also useful to set `detectLanguageFrom` or `getLanguageFrom` property. They're both `reflectToAttribute: true`. So, feel free to set them as atributes.

Example:
```javascript
  element.setPropToAllDataTranslateChildren('detectLanguageFrom', 'browser', true);
```

## Examples:

Data:

```javascript
  properties: {
  
    translations: {
        type: Object,
        notify: true,
        value: {
            en: {
              labels: {
                login: 'Username',
                mainTitle: 'My Super Form',
                password: 'Password'
              }
            },
            ru: {
              labels: {
                login: 'Имя пользователя',
                mainTitle: 'Моя классная форма',
                password: 'Пароль'
              }
            }
        }
    }
  }
```

Use our functions: 
```javascript
  $(document).ready(function(){
          var element = document.querySelector('#ourCoolElement');
          element.addEventListener('data-translate-initialize', function(e) {
              element.setPropToAllDataTranslateChildren('detectLanguageFrom', 'browser', true); // when page is loading  we're detecting our language from user's browser.
              element.removeTranslations('labels.mainTitle'); // we don't want labels.mainTitle to show up
              // we want to change some translations here
              element.translations.en.labels.login = 'Email';
              element.translations.ru.labels.login = 'Электронная почта';
          });
        });
```
