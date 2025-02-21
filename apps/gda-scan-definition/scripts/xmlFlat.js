const { XMLParser } = require("fast-xml-parser");

const options = {
  ignoreAttributes: false, // Keep attributes if present
  alwaysCreateTextNode: true, // Ensures text nodes are explicitly stored
  isArray: (name, jpath, isLeafNode, isAttribute) => true, // Force arrays for duplicate keys
};

const parser = new XMLParser(options);

const xmlData = `
<root>
    <item>Value 1</item>
    <item>Value 2</item>
    <item>Value 3</item>
</root>`;

const parsedData = parser.parse(xmlData);

console.log(JSON.stringify(parsedData, null, 2));
