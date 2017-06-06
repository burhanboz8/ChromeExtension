if (confirm('What is your opinion? Human/Bot'))
    chrome.runtime.sendMessage({type:'request_type'});
