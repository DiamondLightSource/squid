"use client";
// based on https://github.com/microsoft/monaco-editor/issues/1509
// Sample XML Formatter Function
export const formatXml = (raw) => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    raw = raw.replace(reg, '$1\r\n$2$3');
    return raw
        .split('\r\n')
        .map((node) => {
            let indent = '';
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = PADDING.repeat(pad);
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) pad -= 1;
                indent = PADDING.repeat(pad);
            } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
                indent = PADDING.repeat(pad);
                pad += 1;
            } else {
                indent = PADDING.repeat(pad);
            }
            return indent + node;
        })
        .join('\r\n');
};
