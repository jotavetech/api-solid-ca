import { Request, Response } from "express";
import {
  ListProductInputDto,
  ListProductOutputDto,
  ListProductsUsecase,
} from "../../../../../usecases/product/list.usecase";
import { HttpMethod, Route } from "../route";

export type ListProductResponseDto = {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
};

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductsUsecase
  ) {}

  public static create(listProductService: ListProductsUsecase) {
    return new ListProductRoute(
      "/products",
      HttpMethod.GET,
      listProductService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listProductService.execute();

      const responseBody = this.present(output);

      response.status(200).json(responseBody);
    };
  }

  public getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  public present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
        };
      }),
    };

    return response;
  }
}
