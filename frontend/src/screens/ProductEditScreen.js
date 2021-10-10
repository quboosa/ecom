import { parseRequestUrl, showLoading, showMessage, hideLoading, } from '../utils.js';
import { getProduct, updateProduct, uploadProductImage } from '../api.js';

let fileChanged = false;
const ProductEditScreen = {
  after_render: async () => {
    const request = parseRequestUrl();
    document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();

      const file = document.getElementById("image-file").files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('image', file);

      const updatedProduct = {
        _id: request.id,
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        countInStock: document.getElementById('countInStock').value,
        description: document.getElementById('description').value,
        numReviews: document.getElementById('numReviews').value,
        rating: document.getElementById('rating').value,
      }
      if (file)
        updatedProduct.image = "/images/" + document.getElementById('image').value;
      const data = await updateProduct(updatedProduct);
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        if (fileChanged) {
          fileChanged = false;
          const data = await uploadProductImage(formData);
        }
        document.location.hash = '/productlist';
      }
    });

    document.getElementById('image-file').addEventListener('change', async (e) => {
      fileChanged = true;
      e.preventDefault();
      const file = e.target.files[0];
      console.log(file);
      // const formData = new FormData();
      // formData.append('image', file);
      // const data = await uploadProductImage(formData);
      document.getElementById('image').value = file.name;
      // showMessage(data.error);
      // showMessage('Image uploaded successfully.');
      // document.getElementById('image').value = data.image;
      console.log("uploaded");
    }, false);
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
      <div class="content">
        <div>
          <a href="/#/productlist">Back to products</a>
        </div>
        <div class="form-container">
          <form id="edit-product-form">
            <ul class="form-items">
              <li>
                <h1>Edit Product ${product._id.substring(0, 8)}</h1>
              </li>
              <li>
                <label for="name">Name</label>
                <input type="text" name="name" value="${product.name}" id="name" />
              </li>
              <li>
                <label for="price">Price</label>
                <input type="number" name="price" value="${product.price}" id="price" />
              </li>
              <li>
                <label for="image">Image (680 x 830)</label>
                <input type="text" name="image" value="${product.image}" id="image" />
                <input type="file" name="image-file" id="image-file" />
              </li>
              <li>
                <label for="brand">Brand</label>
                <input type="text" name="brand" value="${product.brand}" id="brand" />
              </li>
              <li>
                <label for="countInStock">Count In Stock</label>
                <input type="text" name="countInStock" value="${product.countInStock}" id="countInStock" />
              </li>
              <li>
                <label for="category">Category</label>
                <input type="text" name="category" value="${product.category}" id="category" />
              </li>
              <li>
                <label for="description">Description</label>
                <input type="text" name="description" value="${product.description}" id="description" />
              </li>
              <li>
                <label for="numReviews">Number of Reviews</label>
                <input type="text" name="numReviews" value="${product.numReviews}" id="numReviews" />
              </li>
              <li>
                <label for="rating">Rating</label>
                <input type="text" name="rating" value="${product.rating}" id="rating" />
              </li>
              <li>
                <button type="submit" class="primary">Update</button>
              </li>
            </ul>
          </form>
        </div>
  
      </div>
      `;
  },
};
export default ProductEditScreen;