var TagsController =(function() {

	function getAndVisualizeTags() {
        var tagsAside = $('#tags');
		var tagsDiv = $('<p>');
        tagsAside.append(tagsDiv);
		var tagsPromise = tagModule.getAllTags();
		tagsPromise.success(function(data) {
			var tags = data.results;

			$.each(tags, function(_, tag) {
				var tagsHTML = TagView.visualizeTags(tag);
				tagsHTML.data("tag", tag);
				var count = 0;
				var countQuestionWithTag = QuestionModule.getAllQuestionRelatedToTag(tag.objectId);
				var countQuestion = countQuestionWithTag.success(function(data) {
					count = data.results.length;
					var tagId = tag.objectId;
					$('#'+tagId).css({"font-size": 16 + count + "px"});
				});
				tagsDiv.append(tagsHTML[0]);
			})
	}).error(function () {
        notyInCustomContainer($('#tags'), 'bottomCenter', 'error', 'Cannot connect to DB. Try again.', 3);
    });
}

	function visualizeQuestions(tagId, selector) {
		QuestionModule.getAllQuestionRelatedToTag(tagId).success(function (data) {
            QuestionController.getAndVisualizeSmallQuestions(data.results, selector);
        })
	}

	return {
		getAndVisualizeTags: getAndVisualizeTags,
        visualizeQuestions: visualizeQuestions
	}

})();