document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var type = document.getElementById('name').value;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setPassword(type);
        window.close();     // Close dialog
    });
};
