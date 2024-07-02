// chrome.runtime.onMessage.addListener((msg, sender) => {
//     // First, validate the message's structure.
//     if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//       // Enable the page-action for the requesting tab.
//       console.log("SW: ", sender.tab.id);
//       chrome.pageAction.show(sender.tab.id);
//     }
//   });

// message from content
//chrome.runtime.onMessage.addListener(({message, sender}) => {
  // First, validate the message's structure.
  //console.log("sv: message", message);
  //console.log("sv: sender", sender);
  //if ((sender === 'content') && (message === 'showPageAction')) {
    //console.log("acting on request from content");
    // Enable the page-action for the requesting tab.
    //chrome.pageAction.show(sender.tab.id);
  //} else {
    //console.log("NOT acting on request from content");
  //}
//});