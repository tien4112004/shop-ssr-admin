import Dropzone from 'dropzone';

new Dropzone('#dropzone-product-edit', {
  url: location.href, //Current Page
  maxFiles: 5,
  maxFilesize: 5,
  addRemoveLinks: true,
  init: function () {
    const files = [
      {
        id: 1,
        name: 'Product 1',
        size: 23986,
        url: '/images/product1.png',
      },
      {
        id: 2,
        name: 'Product 2',
        size: 33293,
        url: '/images/product2.png',
      },
      {
        id: 3,
        name: 'Product 3',
        size: 32377,
        url: '/images/product3.png',
      },
      {
        id: 4,
        name: 'Product 4',
        size: 36318,
        url: '/images/product7.png',
      },
      {
        id: 5,
        name: 'Product 5',
        size: 17526,
        url: '/images/product8.png',
      },
    ];

    files.forEach((file) => {
      const { id, name, size, url } = file;
      this.files.push(file);
      this.displayExistingFile({ id, name, size }, url);
    });

    this.options.maxFiles = this.options.maxFiles - files.length;

    this.on('removedfile', (file) => {
      this.files = this.files.filter((f) => f.id !== file.id);
      this.options.maxFiles = files.length - this.files.length;
    });
  },
});

