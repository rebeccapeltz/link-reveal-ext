
const addData = (i,row, data) =>{
  let col = document.createElement('div');
  col.textContent = i;
  row.append(col);
  col = document.createElement('div');
  col.textContent = data.scheme;
  row.append(col);
  col = document.createElement('div');
  col.textContent = data.text;
  row.append(col);
  col = document.createElement('div');
  col.textContent = data.href;
  row.append(col);
  row.classList.add("href");
}
const appendRow = (i,data) =>{
  //console.log("append row: ", data);
  const linkTable = document.querySelector("#links");
  let row = document.createElement('div');
  row.classList.add("row");
  
  // add alert if not encrypted

  if (data.scheme.toLowerCase() == "http"){
    row.classList.add("alert");
  }
  // add warning if href points to javascript or there is an onclick in the url
  if (data.javascriptHref || data.useOnclick){
    row.classList.add("warn")
  }

  console.log(data.url);
  row.classList.add("grid");
  linkTable.append(row);

  addData(i,row,data);
}

// Update the relevant fields with the new data.
const setDOMInfo = (info) => {
  console.log("info: ",info);
  for (let i = 0; i < info.length; i++) {
    //console.log(info[i].href, info[i].text, info[i].scheme);
    appendRow(i,info[i]);
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
