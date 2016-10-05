function WikipediaAPI() {
    return {
        getArticleText: function (title, id, isOpen) {
            title = title.replace(" ", "_");
            $.ajax({
                type: "GET",
                url: "https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&titles=" + title + "&callback=?",
                contentType: "application/json; charset=utf-8",
                async: true,
                cache: true,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    var marker = VM.markers().filter(function (marker) {
                        return marker.id === id;
                    })[0];

                    for (pageId in data.query.pages) {
                        if (data.query.pages.hasOwnProperty(pageId)) {
                            marker.infoViewContent = data.query.pages[pageId].extract;
                        }
                    }
                },
                error: function (errorMessage) {
                    marker.infoViewContent = "Couldn't fetch contents from Wikipedia. Check you console for more info";
                    console.log(errorMessage);
                }
            });
        },

        getArticleImage: function (title, id, isOpen) {
            title = title.replace(" ", "_");
            $.ajax({
                type: "GET",
                url: "  https://pt.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=200&format=json&titles=" + title + "&callback=?",
                contentType: "application/json; charset=utf-8",
                async: true,
                cache: true,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    var marker = VM.markers().filter(function (marker) {
                        return marker.id === id;
                    })[0];

                    for (pageId in data.query.pages) {
                        if (data.query.pages.hasOwnProperty(pageId)) {
                            marker.infoViewImage = data.query.pages[pageId].thumbnail.source;
                        }
                    }
                },
                error: function (errorMessage) {
                    marker.infoViewImage = "Couldn't fetch the picture from Wikipedia. Check you console for more info";
                    console.log(errorMessage);
                }
            });
        },

        fetchContent: function (title, id, isOpen) {
            var self = this;
            $.ajax({
                type: "GET",
                url: "https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + title + "&srprop=snippet&srinfo=&callback=?&format=json",
                contentType: "application/json; charset=utf-8",
                async: true,
                cache: true,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    self.getArticleText(data.query.search[0].title, id, isOpen);
                    self.getArticleImage(data.query.search[0].title, id, isOpen);
                },
                error: function (errorMessage) {
                    marker.infoViewContent = "Couldn't fetch contents from Wikipedia. Check you console for more info";
                    console.log(errorMessage);
                }
            });
        }
    };
}
