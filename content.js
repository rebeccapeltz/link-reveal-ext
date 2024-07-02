// Listen for messages from the popup.
// params are request object showing where from and subject, sender knows the tab if needed,
// sendReponse is the name of the function in popup to send the DOM data to
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // First, validate the message's structure.
  console.log(request);
  if (request.from === "popup" && request.subject === "DOMInfo") {
    const schemeRegex = /^([a-z][a-z0-9+\-.]*):/;
    const anchors = document.getElementsByTagName("a");
   
    // look for onclick; document.getElementsByTagName("a")[2].attributes.getNamedItem("onclick") == "onclick"
    // look for JS in href: document.getElementsByTagName("a")[3].attributes.href && document.getElementsByTagName("a")[3].attributes.href.value == "javascript:doSomething"

    const links = new Array(anchors.length);
    for (let i = 0; i < links.length; i++) {
      console.log("i: ",i)
      console.log("anchors[i].attributes.href: ",anchors[i].attributes.href)
      console.log("anchors[i].attributes.href.value: ",anchors[i].attributes.href ? anchors[i].attributes.href.value : "no href")
      let javascriptInHref = (anchors[i].attributes.href && anchors[i].attributes.href.value.indexOf("javascript") > -1) ? true : false;
      console.log("anchors[i].attributes.getNamedItem(onclick): ", anchors[i].attributes.getNamedItem("onclick"))
      let useOnClick = anchors[i].attributes.getNamedItem("onclick") != null;
      let schemeMatch = anchors[i].href.match(schemeRegex);
      links[i] = {
        href: anchors[i].href,
        text: anchors[i].text,
        scheme: schemeMatch ? schemeMatch[1]: "",
        javascriptHref: javascriptInHref,
        useOnclick: useOnClick
      };
    }
    console.log(links);
    sendResponse(links);
  }
});
