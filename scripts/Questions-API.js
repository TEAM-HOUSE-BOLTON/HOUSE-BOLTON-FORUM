    var questionsModule = (function () {

        function addQuestion(title, content, userID, categoryID, tags) {
            var question = {
                title: title,
                content: content,
                createdBy: {
                    __type: "Pointer",
                    className: "_User",
                    objectId: userID
                },
                category: {
                    __type: "Pointer",
                    className: "Category",
                    objectId: categoryID
                },
                visits: 0,
                votes: 0
                //TODO: IMPLEMENT TAGS
            };

            return $.ajax({
                type: "POST",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/classes/Question",
                data: JSON.stringify(question),
                contentType: 'application/json',
                dataType: 'json',
                success: questionAdded,
                error: questionAddingError
            });
        }

        function getQuestionByID(questionID) {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/classes/Question/" + questionID
            });
        }

        function getAllQuestions() {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/classes/Question"
            });
        }
		
        function getAllQuestionsFromCategory(categoryID) {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"category":{"__type":"Pointer","className":"Category","objectId":"' + categoryID + '"}}'
            });
        }

        function getAllQuestionsFromUser(userID) {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"createdBy":{"__type":"Pointer","className":"_User","objectId":"' + userID + '"}}'
            });
        }

        function searchQuestionsByTitle(keyword) {
            return $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": parseConstants.PARSE_APPLICATION_ID,
                    "X-Parse-REST-API-Key": parseConstants.PARSE_REST_API_KEY
                },
                url: 'https://api.parse.com/1/classes/Question?where={"title":{"$regex":"' + keyword + '", "$options":"i"}}'
            });
        }

        return {
            addQuestion: addQuestion,
            getQuestionByID: getQuestionByID,
            getAllQuestions: getAllQuestions,
            getAllQuestionsFromCategory: getAllQuestionsFromCategory,
            getAllQuestionsFromUser: getAllQuestionsFromUser,
            searchQuestionsByTitle: searchQuestionsByTitle
        }
    })();