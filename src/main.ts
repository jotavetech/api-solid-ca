import { ApiExpress } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create.express.route";
import { ListProductRoute } from "./infra/api/express/routes/product/list.express.route";
import { ProductRepository } from "./infra/repositories/product/product.repository";
import { prisma } from "./package/prisma/prisma";

import { CreateProductUsecase } from "./usecases/product/create.usecase";
import { ListProductsUsecase } from "./usecases/product/list.usecase";

function main() {
  const port = 3000;
  const repository = ProductRepository.create(prisma);

  const createProductUsecase = CreateProductUsecase.create(repository);
  const listProductsUsecase = ListProductsUsecase.create(repository);

  const createRoute = CreateProductRoute.create(createProductUsecase);
  const listRoute = ListProductRoute.create(listProductsUsecase);

  const api = ApiExpress.create([createRoute, listRoute]);

  api.start(port);
}

main();
