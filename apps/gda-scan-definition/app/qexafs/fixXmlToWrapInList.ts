/**
 * todo this might need deletion as the auto parser does ok and it's the jsonform that fails
 * @param xml
 * @param tagName
 * @param listName
 * @returns
 */

export function fixXmlToWrapInList(xml: string, tagName: string, listName: string): string {
    // Find the first occurrence of <myTagItem>
    const openingTag = `<${tagName}>`;
    const closingTag = `</${tagName}>`;
    const listOpeningTag = `<${listName}>`;
    const listClosingTag = `</${listName}>`;

    const firstIndex = xml.indexOf(openingTag);
    if (firstIndex === -1) {
        // No <myTagItem> found, return the original XML
        return xml;
    }

    // Insert <myTagList> before the first <myTagItem>
    let fixedXml = xml.substring(0, firstIndex) + listOpeningTag + xml.substring(firstIndex);

    // Find the last occurrence of </myTagItem> to close the list
    const lastIndex = fixedXml.lastIndexOf(closingTag);
    if (lastIndex !== -1) {
        // Insert </myTagList> after the last </myTagItem>
        fixedXml = fixedXml.substring(0, lastIndex + closingTag.length) + listClosingTag + fixedXml.substring(lastIndex + closingTag.length);
    }

    return fixedXml;
}
