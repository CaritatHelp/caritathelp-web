'use strict';
module.exports = ['dataService', function (dataService) {
	var data = dataService;
	this.apiurl = dataService.getApiUrl();

	this.all = function () {
		return data.get('news');
	};
	this.post = function (content, group_type, group_id, privacy) {
		// @TODO: add title, news_type and as_group
		var parameters = {
			content: content,
			news_type: 'Status',
			group_id: group_id,
			group_type: group_type,
			privacy: privacy
		};
		return data.post('news/wall_message', parameters);
	};
	this.volunteers = function (volunteer_id, content, privacy) {
		return this.post(content, 'Volunteer', volunteer_id, privacy);
	};
	this.associations = function (assoc_id, content, privacy) {
		return this.post(content, 'Assoc', assoc_id, privacy);
	};
	this.events = function (event_id, content, privacy) {
		return this.post(content, 'Event', event_id, privacy);
	};
	this.get = function (id) {
		return data.get('news/' + id);
	};
	this.comments = function (id) {
		return data.get('news/' + id + '/comments');
	};

	this.postComment = function (news_id, content) {
		var parameters = {new_id: news_id, content: content};
		return data.post('comments', parameters);
	};
	this.updateComment = function (id, content) {
		return data.put('comments/' + id, {content: content});
	};
	this.getComment = function (id) {
		return data.get('comments/' + id);
	};
	this.deleteComment = function (id) {
		return data.remove('comments/' + id);
	};
}];
