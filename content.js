// Listen for messages from the popup.
// params are request object showing where from and subject, sender knows the tab if needed,
// sendReponse is the name of the function in popup to send the DOM data to
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // First, validate the message's structure.
  if (request.from === "popup" && request.subject === "DOMInfo") {
    const schemeRegex = /^([a-z][a-z0-9+\-.]*):/;
    const anchors = document.getElementsByTagName("a");
    if (!anchors[0]) {
      sendResponse(undefined);
    } else {
      const links = new Array(anchors.length);

      for (let i = 0; i < links.length; i++) {
        let javascriptInHref =
          anchors[i].attributes.href &&
          anchors[i].attributes.href.value.indexOf("javascript") > -1
            ? true
            : false;
        let hasOnClick = anchors[i].attributes.getNamedItem("onclick") != null;
        let schemeMatch = anchors[i].href.match(schemeRegex);
        let schemeValue = schemeMatch ? schemeMatch[1] : "";
        let hrefValue = anchors[i].href;
        let textValue = anchors[i].text;
        links[i] = {
          href: hrefValue,
          text: textValue,
          scheme: schemeValue,
          hasHref: hrefValue ? true : false,
          hasNoJavascriptInHref: !javascriptInHref,
          hasNoOnclick: !hasOnClick,
          hasHrefUrl: hrefValue ? true : false,
          isEncrypted:
            schemeValue && schemeValue.indexOf("https") > -1 ? true : false,
          hasText: textValue ? true : false,
          anchorElString: anchors[i].outerHTML,
        };
      }
      sendResponse(links);
    }
  }
});
