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
const addInfoButton = (data,row) => {
  col = document.createElement("div");
  col.append(createInfoButton(data));
  row.append(col);
};
const addTextContent = (data,row) =>{
  let col = document.createElement("div");
  col.textContent = data;
  row.append(col);
}
const addData = (i, row, data) => {
  addTextContent(i,row);
  addTextContent(data.scheme,row);
  addTextContent(data.text,row);

  // add anchor element string
  col = document.createElement("div");
  col.classList.add("anchor-el");
  col.textContent = data.anchorElString;
  row.append(col);

  // add href/URL
  col = document.createElement("div");
  col.textContent = data.href;
  row.append(col);
  row.classList.add("href");

  // add info buttons
  addInfoButton(data.hasHref,row);
  addInfoButton(data.hasNoJavascriptInHref,row);
  addInfoButton(data.hasHref,row);
  addInfoButton(data.hasHrefUrl,row);
  addInfoButton(data.isEncrypted,row);
  addInfoButton(data.hasText,row);
 
};
const appendRow = (i, data) => {
  const linkTable = document.querySelector("#links");
  let row = document.createElement("div");
  row.classList.add("row");
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
};

window.addEventListener("DOMContentLoaded", () => {
  // query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      // send a request to content for the DOM info
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        setDOMInfo
      );
    }
  );
});
