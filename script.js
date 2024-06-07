document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const btn = document.getElementById("download-images-button");

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];

  function loadImage(image) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    });
  }

  function downloadImages(images) {
    const promises = images.map(loadImage);
    return Promise.all(promises);
  }

  btn.addEventListener("click", () => {
    downloadImages(images)
      .then((loadedImages) => {
        output.innerHTML = '';  // Clear any existing content
        loadedImages.forEach((img) => {
          output.appendChild(img);
        });
      })
      .catch((error) => {
        console.error(error);
        output.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
