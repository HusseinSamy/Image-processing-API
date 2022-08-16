## 1. Install node modules. 
* `npm i`
## 2. Build and test code.
* `npm run test`
## 3. Start nodemon server.
* `npm run watch`
## 4. Building project 
* `npm run build`

## API endpoints: 
* [host]/api/images
### Endpoint query paramaters: 
* filename `string` -> The name of the image that needs to be processed by the server (without the file extention). 
* width `number` -> The width of the processed photo.
* height `number` -> The height of the processed photo.
* (optional)
  * **fit** `string` -> how the image should be resized to fit both provided dimensions, can hold only one value of `fill`, `contain`, `cover`, `inside`, `outside`, default is `cover`.
  * **position** `string` ->  position, gravity or strategy to use when `fit` is `cover` or `contain`.
  * **kernel** -> `string` the kernel to use for image reduction, default `lanczos3`.
  * **withoutEnlargement** `boolean` -> do not enlarge if the `width` or `height` are already less than the specified dimensions, equivalent to GraphicsMagick's `>` geometry option, default is `false`. 
  * **withoutReduction** `boolean` -> do not reduce if the `width` or `height` are already less than the specified dimensions, equivalent to GraphicsMagick's `>` geometry option, default is `false`.
  * **fastShrinkOnLoad** `boolean` -> take greater advantage of the JPEG and WebP shrink-on-load feature, which can lead to a slight moiré pattern on some images, default is true. 
