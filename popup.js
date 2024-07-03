const isUnencrypted = (scheme) => {
  return scheme.toLowerCase() == "http";
};
const containsJavaScript = (javascriptHref, useOnclick) => {
  return javascriptHref || useOnclick;
};
const createInfoButton = (flag) => {
  let button = document.createElement("button");
  button.classList.add("info-button");
  if (flag) {
    button.classList.add("info-button-green");
  } else {
    button.classList.add("info-button-red");
  }
  return button;
};
const addData = (i, row, data) => {
  let col = document.createElement("div");
  col.textContent = i;
  row.append(col);
  col = document.createElement("div");
  col.textContent = data.scheme;
  row.append(col);
  col = document.createElement("div");
  col.textContent = data.text;
  row.append(col);
  col = document.createElement("div");
  col.textContent = data.href;
  row.append(col);
  row.classList.add("href");

  //info button 1 hasHref
  col = document.createElement("div");
  col.append(createInfoButton(data.hasHref));
  row.append(col);

  //info button 2 !href:javascript
  col = document.createElement("div");
  col.append(createInfoButton(data.hasNoJavascriptInHref));
  row.append(col);

  //info button 3 !onclick
  col = document.createElement("div");
  col.append(createInfoButton(data.hasHref));
  row.append(col);

  //info button 4 hasHrefUrl
  col = document.createElement("div");
  col.append(createInfoButton(data.hasHrefUrl));
  row.append(col);

  //info button 5 isEncrypted
  col = document.createElement("div");
  col.append(createInfoButton(data.isEncrypted));
  row.append(col);

  //info button 6 hasText
  col = document.createElement("div");
  col.append(createInfoButton(data.hasText));
  row.append(col);

};
const appendRow = (i, data) => {
  //console.log("append row: ", data);
  const linkTable = document.querySelector("#links");
  let row = document.createElement("div");
  row.classList.add("row");

  // if (
  //   isUnencrypted(data.scheme) &&
  //   containsJavaScript(data.javascriptHref, data.useOnclick)
  // ) {
  //   row.classList.add("attention");
  // } else if (isUnencrypted(data.scheme)) {
  //   row.classList.add("unencrypted-url");
  // } else if (containsJavaScript(data.javascriptHref, data.useOnclick)) {
  //   row.classList.add("link-contains-javascript");
  // }
  // add unencrypted-url if not encrypted

  // if (data.scheme.toLowerCase() == "http"){
  //   row.classList.add("unencrypted-url");
  // }
  // // add warning if href points to javascript or there is an onclick in the url
  // if (data.javascriptHref || data.useOnclick){
  //   row.classList.add("link-contains-javascript")
  // }

  //console.log(data.url);
  row.classList.add("grid");
  linkTable.append(row);

  addData(i, row, data);
};

// Update the relevant fields with the new data.
const setDOMInfo = (info) => {
  console.log("info: ", info);
  for (let i = 0; i < info.length; i++) {
    //console.log(info[i].href, info[i].text, info[i].scheme);
    appendRow(i, info[i]);
  }
  //document.querySelector('#anchor-data').textContent = JSON.stringify(info)
};

window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // ...and send a request to content for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        setDOMInfo
      );
    }
  );
});
