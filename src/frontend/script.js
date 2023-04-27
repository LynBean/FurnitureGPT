const imagePreview = document.getElementById('image-preview');
const captureBtn = document.getElementById('capture-btn');
const fileInput = document.getElementById('file-input');
const description = document.getElementById('description');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById("loading");

captureBtn.addEventListener("click", () => {
  loading.style.display = "block";
  // Your existing code for handling the file input goes here
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    imagePreview.src = reader.result;
  };
});

captureBtn.addEventListener('click', () => {
  const imageUrl = imagePreview.src;
  if (imageUrl) {
    uploadImage(imageUrl);
  } else {
    console.error('No image selected');
  }
});

searchBtn.addEventListener('click', () => {
  const searchTerm = description.value;
  // Code to search using searchTerm goes here
  console.log('Search term:', searchTerm);
});

function uploadImage(imageUrl) {
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const furnitureCheckboxes = document.querySelectorAll('input[name="furniture"]:checked');
  const furnitureValues = Array.from(furnitureCheckboxes).map(cb => cb.value);
  const furnitureParam = furnitureValues.join(', ');
  formData.append('furniture', furnitureParam);

  formData.append('description', description.value);

  fetch('http://127.0.0.1:23450/imagine-furniture', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log('Image uploaded successfully');
      response.text().then(data => {
        console.log('Response:', data);
        const image = document.createElement('img');
        image.src = data;
        document.body.appendChild(image); // You can replace "document.body" with the element you want to append the image to.
      });
    } else {
      console.error('Error uploading image:', response.status);
    }
  })
  .catch(error => console.error('Error uploading image:', error));
}