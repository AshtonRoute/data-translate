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
        computed: "t('labelClearButton', translations, currentLanguage)"  //you have to specify path to property and 2 required arguments: translations and currentLanguage, which are required to notify changes in Polymer
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

* `t(string path)` - returns translation based on `translations[currentLanguage] + path`. Required in Polymer computed properties.

* `detectLanguage()` - detects language based on `detectLanguageFrom` property and sets returned value to `currentLanguage` property. Useful when `detectLanguageFrom` was set to `server`. You'll have to call `detectLanguage()` to grab language from the server. Then `detectLanguage()` will automatically assign received value to `currentLanguage` property and update DOM. 

* `updateLanguage()` - updates object based on `getLanguageFrom` (later just `object`) with value of `currentLanguage` property. Basically, you should use this method if you want to update `object` manually. But remember that translations will only be updated if `currentLanguage` has changed. If you assigned `server` to `detectLanguageFrom`, then this method will be called automatically on successful response of `updateLanguage()` after receiving new language from server.

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

* `data-translate-initialize` - fired on `attached` before adding Observer and detecting language.

It's better to add/change translations on this event, otherwise you'll have to switch language for changes to appear.

Also useful to set `detectLanguageFrom` or `getLanguageFrom` property. They're both `reflectToAttribute: true`. So, feel free to set them as atributes.

Example:
```javascript
  element.setPropToAllDataTranslateChildren('detectLanguageFrom', 'browser', true);
```

* `current-language-change` - fired when `currentLanguage` property changes.
* `translations-change` - fired when `translations` property changes.

## Examples:

Data:

```javascript
  properties: {
  
    mySuperLogin: {
      type: String,
      computed: "t('labels.login', translations, currentLanguage)"
    },
    
    mySuperTitle: {
      type: String,
      computed: "t('labels.mainTitle', translations, currentLanguage)"
    },
    
    mySuperPass: {
      type: String,
      computed: "t('labels.password', translations, currentLanguage)"
    },
  
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
          
          element.addEventListener('current-language-change', function(e) {
            console.log('My login: ' + element.mySuperLogin);
          });
        });
```
