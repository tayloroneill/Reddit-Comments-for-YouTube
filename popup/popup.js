var subredditPattern = new RegExp("^[a-zA-Z0-9_]+$");

$(function removeFromBlacklist() {
    $(document).on("click", ".remove", function() {
        $parent = $(this).parent();
        var sub = $parent.find(".name").text();
        chrome.storage.sync.get({subBlacklist: []}, function(result) {
            var subBlacklist = result.subBlacklist.filter(word => word != sub);
            chrome.storage.sync.set({subBlacklist: subBlacklist}, function() {
                $parent.remove();
            });
        });
    });
});

$(function clearBlacklist() {
    $(document).on("click", "#clearButton", function() {
        $("#duplicateError").hide();
        chrome.storage.sync.remove("subBlacklist", function() {
            $("#blacklist").empty();
        });
    });
});

$(function addToBlacklist() {;
    $(document).on("click", "#blacklistButton", function() {
        $("#duplicateError").hide()
        sub = document.getElementById('blacklistInput').value.toLowerCase();
        if (subredditPattern.test(sub)) {
            $("#inputError").hide();
            chrome.storage.sync.get({subBlacklist: []}, function(result) {
                var subBlacklist = result.subBlacklist;
                if (subBlacklist.includes(sub.toLowerCase())) {
                    $("#duplicateError").show();
                } else {
                    subBlacklist.push(sub);
                    chrome.storage.sync.set({subBlacklist: subBlacklist}, function() {
                        $("#blacklist").append("<p class='subEntry'><span class='remove'>&#10006; </span><span class='name'>" + sub + "</span></p>");
                        $("#blacklistInput").val("");
                    });
                }
            });
        } else {
            $("#inputError").show();
        }
    });
});

$(document).ready(function() {
    chrome.storage.sync.get({subBlacklist: []}, function(result) {
        result.subBlacklist.forEach(element => {
            $("#blacklist").append("<p class='subEntry'><span class='remove'>&#10006; </span><span class='name'>" + element + "</span></p>");
        });
    });
})