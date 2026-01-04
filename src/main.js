/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
  // @TODO: Расчет выручки от операции
  const { discount, sale_price, quantity } = purchase;

  const discountCoefficient = 1 - discount / 100;
  const revenue = sale_price * quantity * discountCoefficient;
  return revenue;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
  // @TODO: Расчет бонуса от позиции в рейтинге
  const { profit } = seller;

  if (index === 0) {
    return profit * 0.15;
  } else if (index === 1 || index === 2) {
    return profit * 0.1;
  } else if (index === total-1) {
    return 0;
  } else { // Для всех остальных
    return profit * 0.05;
  }
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
  const { calculateRevenue, calculateBonus } = options;
  // @TODO: Проверка входных данных                         поменять
  if (!data
    || condition1
    || condition2
) {
    throw new Error('Некорректные входные данные');
} 

  // @TODO: Проверка наличия опций

  // @TODO: Подготовка промежуточных данных для сбора статистики
  const sellerStats = data.sellers.map((seller) => ({
    // Заполним начальными данными
    id: seller.id,
    name: `${seller.first_name} ${seller.last_name}`,
    revenue: 0,
    profit: 0,
    sales_count: 0,
    products_sold: {},
  }));

  // @TODO: Индексация продавцов и товаров для быстрого доступа                  поменять
  const someIndex = Object.fromEntries(someArr.map(item => [item.ID, item]));

  // @TODO: Расчет выручки и прибыли для каждого продавца

  // @TODO: Сортировка продавцов по прибыли
  sellerStats.sort(/*функция сортировки*/);

  // @TODO: Назначение премий на основе ранжирования
  sellerStats.forEach((seller, index) => {
        seller.bonus = // Считаем бонус
        seller.top_products = // Формируем топ-10 товаров
}); 

  // @TODO: Подготовка итоговой коллекции с нужными полями
  return sellerStats.map(seller => ({
        seller_id: // Строка, идентификатор продавца
        name: // Строка, имя продавца
        revenue: // Число с двумя знаками после точки, выручка продавца
        profit: // Число с двумя знаками после точки, прибыль продавца
        sales_count: // Целое число, количество продаж продавца
        top_products: // Массив объектов вида: { "sku": "SKU_008","quantity": 10}, топ-10 товаров продавца
        bonus: // Число с двумя знаками после точки, бонус продавца
})); 
}
