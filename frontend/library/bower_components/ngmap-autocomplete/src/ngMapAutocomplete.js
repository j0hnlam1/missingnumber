/*global _, angular, google*/
(function () {
	'use strict';


	var module = angular.module('ngMapAutocomplete', ['ngMap']);

	/**
	 * This directive extends ng-map module to add an autocomplete field
	 * to the google maps.
	 *
	 * it requires google.maps.Places
	 *
	 * Usage :
	 *
	 * <map>
	 * 		<map-autocomplete placeholder="{{ expression }}" position="{{ expression }}" />
	 * </map>
	 *
	 */
	function mapAutocomplete() {

		return {
			restrict: 'AE',
			require: '^map',
			link: function (scope, element, attrs) {

				var inputElt, autocomplete;

				scope.$parent.$on('mapInitialized', function (event, map) {
					scope.map = map;
					initAutocomplete();
				});

				attrs.$observe('placeholder', function (value) {
					if (_.isString(value) && angular.isDefined(inputElt)) {
						inputElt.attr('placeholder', value);
					}
				});

				function focusOnPlace() {
					var place = autocomplete.getPlace();

					if (angular.isDefined(place.name) && _.isString(place.name)) {

						var service = new google.maps.places.AutocompleteService();

						service.getPlacePredictions({
							input: place.name
						}, function (predictions, status) {

							if (status === 'OK' && predictions.length > 0) {
								var placeSrv = new google.maps.places.PlacesService(scope.map);

								placeSrv.getDetails({
									placeId: predictions[0].place_id
								}, function (resultat, placeSrvStatus) {

									if (placeSrvStatus === 'OK') {
										if (angular.isDefined(resultat.geometry.viewport)) {
											scope.map.fitBounds(resultat.geometry.viewport);
										} else {
											scope.map.setCenter(resultat.geometry.location);
											scope.map.setZoom(12);
										}
									}
								});
							}
						});
					} else {
						scope.map.fitBounds(autocomplete.getPlace().geometry.viewport);
					}
				}

				function initAutocomplete() {
					var placeholder = _.isString(attrs.placeholder) ? attrs.placeholder : 'Type a place here...';
					var position = _.isString(attrs.position) ? attrs.position : google.maps.ControlPosition.TOP_LEFT;

					inputElt = angular.element('<input>').attr('type', 'text')
						.addClass('form-control').addClass('input-sm').css('width', '300px').css('marginTop', '5px')
						.attr('placeholder', placeholder);

					scope.map.controls[position].push(inputElt[0]);

					autocomplete = new google.maps.places.Autocomplete(inputElt[0], {});

					google.maps.event.addDomListener(autocomplete, 'place_changed', focusOnPlace);
				}
			}

		};
	}

	module.directive('mapAutocomplete', mapAutocomplete);
}());