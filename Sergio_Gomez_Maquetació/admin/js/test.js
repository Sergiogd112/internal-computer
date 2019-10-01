// // Test with an element.
// var initElement = document.getElementsByTagName("html")[0];
// var json = mapDOM(initElement, true);
// console.log(json);
//
// // Test with a string.
// initElement = "<div><span>text</span>Text2</div>";
// json = mapDOM(initElement, true);
// console.log(json);

// var request = new Request("http://cors-anywhere.herokuapp.com/https://www.meteoblue.com/es/tiempo/outdoorsports/seeing/madrid_espa%c3%b1a_3117735")

var quizUrl = "http://cors-anywhere.herokuapp.com/https://www.meteoblue.com/es/tiempo/outdoorsports/seeing/madrid_espa%c3%b1a_3117735";
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/html');
fetch(quizUrl,{
    mode: 'no-cors',
    method: 'get',
    headers: myHeaders
}).then(function(response) {
    console.log('inside');
    response.text().then(function(text) {
        console.log(text);
    })
}).catch(function(err) {
  console.log(err)
});
//json = mapDOM(, true);

async function mapDOM(element, json) {
    var treeObject = {};

    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser) {
              parser = new DOMParser();
              docNode = parser.parseFromString(element,"text/xml");
        } else { // Microsoft strikes again
              docNode = new ActiveXObject("Microsoft.XMLDOM");
              docNode.async = false;
              docNode.loadXML(element);
        }
        element = docNode.firstChild;
    }

    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["content"].push(nodeList[i].nodeValue);
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);

    return (json) ? JSON.stringify(treeObject) : treeObject;
}
