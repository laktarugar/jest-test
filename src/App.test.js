import React from 'react';
import ReactDOM from 'react-dom';
import { sortProductsByPrice as sortProducts, cleanCache } from './App';

describe('sort products', function () {
  describe('If there are less products than options.size we should get the null in the corresponding field', function () {
    let products;
    beforeEach(function () {
      products = [
        { id: 1, price: 10 },
        { id: 2, price: 11 },
        { id: 3, price: 1 }
      ];
    });

    it('empry value', function () {
      // {highest: null, lowest: null}
      expect(sortProducts(products, { size: 4 }))
        .toEqual({
          highest: null,
          lowest: null,
        });
    });

    it('Only higest', function () {
      // {highest: [...], lowest: null}
      const { highest, lowest } = sortProducts(products, { size: 3 });
      expect(highest).toHaveLength(3);
      expect(lowest).toBeNull();
    });

    it('Higest > lowest', function () {
      const { highest, lowest } = sortProducts(products, { size: 2 });
      // {highest: [...], lowest: [...]}
      expect(highest).toHaveLength(2);
      expect(lowest).toHaveLength(1);
    });

    it('Higest < lowest', function () {
      const { highest, lowest } = sortProducts(products, { size: 1 });
      // {highest: [...], lowest: [...]}
      expect(highest).toHaveLength(1);
      expect(lowest).toHaveLength(2);
    });

    it('Size 0(should use 5 as default!)', function () {
      const { highest, lowest } = sortProducts(products, { size: 0 });
      // {highest: null, lowest: null}
      expect(highest).toBeNull();
      expect(lowest).toBeNull();
    });

    it('Size undeifned (should use 5 as default!)', function () {
      const { highest, lowest } = sortProducts(products);
      // {highest: null, lowest: null}
      expect(highest).toBeNull();
      expect(lowest).toBeNull();
    });

    it('!!!Size less than 0', function () {
      const { highest, lowest } = sortProducts(products, { size: -5 });
      // {highest: null, lowest: null}
      expect(highest).toBeNull();
      expect(lowest).toBeNull();
    });
  });

  describe('When we call the function with unmodified params it should return null in data fields', function () {
    let products;

    beforeEach(function () {
      cleanCache();
      products = [
        { id: 1, price: 10 },
        { id: 2, price: 11 },
        { id: 3, price: 1 },
        { id: 4, price: 2 },
        { id: 5, price: 100 },
        { id: 6, price: 0.1 }
      ];
    });

    it('test not update item', function () {

      const result1 = sortProducts(products); // {highest: [...], lowest: [...]}
      expect(result1).not.toEqual({
        highest: null,
        lowest: null,
      });

      // call without modifications
      const result2 = sortProducts(products); // {highest: null, lowest: null}
      expect(result2).toEqual({
        highest: null,
        lowest: null,
      });
    });

    it('test update item', function () {
      sortProducts(products); // {highest: [...], lowest: [...]}

      // Modify1
      products[1] = { id: 2, price: 11.5 };

      // call without modifications
      const result = sortProducts(products); // {highest: null, lowest: null}
      expect(result).not.toEqual({
        highest: null,
        lowest: null,
      });
    });

    it('test add item', function () {
      // call without modifications
      sortProducts(products); // {highest: null, lowest: null}

      // Modify2
      products.push({ id: 7, price: 12 });

      // call with modified data
      const result4 = sortProducts(products); // {highest: [...], lowest: [...]
      expect(result4).not.toEqual({
        highest: null,
        lowest: null,
      });
    });
  });
});

