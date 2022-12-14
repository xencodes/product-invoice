import { NextApiRequest, NextApiResponse } from 'next';
import {
  searchProducts,
  createProduct,
  findProducts,
} from '@product-invoice/services';

export default async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const dbResponse = await createProduct(data);
      res.status(200).json(dbResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    return;
  }

  const query = req.query.query;

  if (query) {
    // todo: cache value...
    const products = await searchProducts(query as string);
    res.status(200).json(products);
    return;
  }

  const products = await findProducts();
  res.status(200).json(products);
}
