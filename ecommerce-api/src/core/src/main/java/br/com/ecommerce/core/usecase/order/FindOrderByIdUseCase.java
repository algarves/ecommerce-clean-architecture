package br.com.ecommerce.core.usecase.order;

import br.com.ecommerce.core.entity.Order;
import br.com.ecommerce.core.exception.NotFoundException;
import br.com.ecommerce.core.repository.OrderRepository;

public class FindOrderByIdUseCase {

  private final OrderRepository repository;

  public FindOrderByIdUseCase(OrderRepository repository) {
    this.repository = repository;
  }

  public Order execute(long id) {
    Order order = this.repository.findById(id);
    if (order == null) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }
}