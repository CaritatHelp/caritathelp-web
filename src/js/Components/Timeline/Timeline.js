'use strict';

require('./News');

module.exports = require('angular').module('caritathelp.component.timeline', [
	'caritathelp.component.news'
])
.directive('timeline', ['$stateParams', 'userService', 'DataVolunteers', 'DataAssociations', 'DataEvents', 'DataNews', 'Template',
	function ($stateParams, userService, DataVolunteers, DataAssociations, DataEvents, DataNews, Template) {
		return {
			controllerAs: 'timeline',
			templateUrl: Template.component('Timeline/timeline'),
			bindToController: {
				tlType: '='
			},
			controller: function () {
				var vm = this;
				var usc = userService;
				var volunteers = DataVolunteers;
				var associations = DataAssociations;
				var events = DataEvents;
				var news = DataNews;

				vm.news = [];
				vm.currentUser = usc.user();
				vm.loaded = false;
			// Sauvegarde du type de timeline
				if (vm.tlType) {
					vm.type = vm.tlType;
				}	else {
					vm.type = 'home';
				}

			// Récupération de la liste des news
				if (vm.type === 'volunteer') {
					vm.id = $stateParams.id ? $stateParams.id : vm.currentUser.id;
					volunteers.news(vm.id)
					.then(function (response) {
						vm.news = response.data.response;
						vm.loaded = true;
					});
				} else if (vm.type === 'association') {
					associations.news($stateParams.id)
					.then(function (response) {
						vm.news = response.data.response;
						vm.loaded = true;
					});
				} else if (vm.type === 'event') {
					events.news($stateParams.id)
					.then(function (response) {
						vm.news = response.data.response;
						vm.loaded = true;
					});
				} else if (!$stateParams.id) {
					news.all()
					.then(function (response) {
						vm.news = response.data.response;
						vm.loaded = true;
					});
				}

				vm.postNews = function () {
					if (vm.type === 'volunteer' || vm.type === 'home') {
						news.volunteers($stateParams.id ? $stateParams.id : vm.currentUser.id, vm.newNews)
						.success(function (data) {
							vm.news.unshift(data.response);
							vm.newNews = '';
						});
					} else if (vm.type === 'association') {
						news.associations($stateParams.id, vm.newNews)
						.success(function (data) {
							vm.news.unshift(data.response);
							vm.newNews = '';
						});
					} else if (vm.type === 'event') {
						news.events($stateParams.id, vm.newNews)
						.success(function (data) {
							vm.news.unshift(data.response);
							vm.newNews = '';
						});
					}
				};
			}
		};
	}]);
