var TagView = (function() {
	
	function visualizeTags(tag) {
		var tag = $('<a href = #/view/tag/' + tag.objectId + '>')
			.attr('class', 'tag-event')
			.attr('id',tag.objectId)
			.text(tag.name);
			tag.attr("data-id", tag.objectId);
			tag.data('tag', tag);
			tag.css({"margin" : "5px"});
			//$('tag-event').css({"font-size": 16 + tag.visited + "px"});
			return tag;
	}
	
	

	return {
		visualizeTags: visualizeTags	
	}

})();