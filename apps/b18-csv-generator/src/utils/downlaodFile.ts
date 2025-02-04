// https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react
export function downloadFile({
  data,
  filename,
  fileType,
}: {
  data: any;
  filename: string;
  fileType: string;
}) {
  const blob = new Blob([data], { type: fileType });
  const a = document.createElement("a");
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
}
