# ngMapAutoComplete
This package provides an AngularJS directive working in addition of ngMap module (see Credits).

Google Places autocomplete text box on your Google Maps

![Screenshot](https://github.com/sdum/ngMapAutoComplete/blob/master/docs/map.png)

## Installation

1- Install from bower
  ```
  bower install ngmap-autocomplete
  ```

2- Include the Places library with the google maps :
  ```html
  <script src="//maps.google.com/maps/api/js?libraries=places"></script>
  ```
3- Include the ngMapAutocomplete module :
  ```html
  <script src="https://rawgit.com/sdum/ngMapAutoComplete/master/src/ngMapAutocomplete.js"></script>
  ```

4- Add ngMapAutocomplete module as a dependency
  ```javascript
  angular.module('myApp', ['ngMapAutocomplete']);
  ```

## Usage

Add the following markup <map-autocomplete /> to your exsting ngMap. Optionally, you can provide a placeholder text for the text box and specify the position of it on the map.

  ```html
<map center="-34.397, 150.644" zoom="8" pan-control="false" zoom-control="true" zoom-control-options="{style: 'SMALL'}">
  <map-autocomplete placeholder="{{ 'Type a place here...' }}" position="{{google.maps.ControlPosition.TOP_LEFT}}" />
</map>
  ```

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits
This package is a plugin for ngMap :
Allen Kim [https://github.com/allenhwkim/angularjs-google-maps](https://github.com/allenhwkim/angularjs-google-maps)

## License
[MIT License](https://github.com/allenhwkim/angularjs-google-maps/blob/master/LICENSE)
