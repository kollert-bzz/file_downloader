const fileInput = document.querySelector("input"),
    downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxyUrl + url)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.blob();
        })
        .then(file => {
            let tempUrl = URL.createObjectURL(file);
            const aTag = document.createElement("a");
            aTag.href = tempUrl;
            aTag.download = url.replace(/^.*[\\\/]/, '');
            document.body.appendChild(aTag);
            aTag.click();
            downloadBtn.innerText = "Download File";
            URL.revokeObjectURL(tempUrl);
            aTag.remove();
        })
        .catch(() => {
            alert("Failed to download file!");
            downloadBtn.innerText = "Download File";
        });
}
