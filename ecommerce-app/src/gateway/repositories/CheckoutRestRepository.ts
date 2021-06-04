import { TItem, TCreditCard } from "../../domain/entities"
import { ICheckoutRepository, TCheckoutResult, CheckoutStatus } from "../../domain/repositories"
import { IHttpClient, HttpPost } from "../http";

export class CheckoutRestRepository implements ICheckoutRepository {
  private httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async finalize(creditCard: TCreditCard, items: Array<TItem>): Promise<TCheckoutResult> {
    const params: HttpPost.Params = {
      uri: `/orders`,
      headers: {
        "content-type": "application/json"
      },
      body: {items, creditCard}
    };
    const response = await this.httpClient.post<Array<Number>>(params);

    if (response.status === 201) {
      return Promise.resolve({
        status: CheckoutStatus.Successful, 
        itemsWithInsuficientStock: []
      });
    }
    if (response.status === 400) {
      return Promise.resolve({
        status: CheckoutStatus.InsuficientStock, 
        itemsWithInsuficientStock: response.data
      });
    }
    if (response.status === 402) {
      return Promise.resolve({
        status: CheckoutStatus.InvalidCreditCard, 
        itemsWithInsuficientStock: []
      });
    }
    throw new Error(`Unexpected error: ${response.status}`);
  }

}