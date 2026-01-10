/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
  // @TODO: Расчет выручки от операции
  const { discount, sale_price, quantity } = purchase;

  const discountCoefficient = 1 - (discount / 100);
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
  // @TODO: Проверка входных данных
  if (!data
    || !Array.isArray(data.sellers) || data.sellers.length === 0
    || !Array.isArray(data.products) || data.products.length === 0
    || !Array.isArray(data.purchase_records) || data.purchase_records.length === 0
) {
    throw new Error('Некорректные входные данные');
} 

  // @TODO: Проверка наличия опций
const { calculateRevenue, calculateBonus } = options;
if (typeof calculateRevenue !== 'function' || typeof calculateBonus !== 'function') {
  throw new Error('Некорректные опции');
}

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

  // @TODO: Индексация продавцов и товаров для быстрого доступа
  const sellerIndex = Object.fromEntries(sellerStats.map(s => [s.id, s]));
  const productIndex = Object.fromEntries(data.products.map(p => [p.sku, p]));

  // @TODO: Расчет выручки и прибыли для каждого продавца
  data.purchase_records.forEach(record => {
    const seller = sellerIndex[record.seller_id];
    if (!seller) return;

    seller.sales_count +=1;
    seller.revenue += record.total_amount;

    record.items.forEach (item => {
      const product = productIndex[item.sku];
      if (!product) return;

      const cost = product.purchase_price * item.quantity;
      const revenue = calculateRevenue(item, product);
      seller.profit += revenue - cost;

      seller.products_sold[item.sku] = (seller.products_sold[item. sku] || 0) + item.quantity;
    })
  })

  // @TODO: Сортировка продавцов по прибыли
  sellerStats.sort((a, b) => b.profit - a.profit/*функция сортировки*/);

  // @TODO: Назначение премий на основе ранжирования
  sellerStats.forEach((seller, index) => {
        seller.bonus = calculateBonus(index, sellerStats.length, seller);// Считаем бонус
        seller.top_products = Object.entries(seller.products_sold)
          .map(([sku, quantity]) => ({sku, quantity}))
          .sort((x,y) => y.quantity - x.quantity)
          .slice(0, 10); // Формируем топ-10 товаров
}); 

  // @TODO: Подготовка итоговой коллекции с нужными полями
  return sellerStats.map(seller => ({
        seller_id: seller.id,// Строка, идентификатор продавца
        name: seller.name,// Строка, имя продавца
        revenue: Number(seller.revenue.toFixed(2)),// Число с двумя знаками после точки, выручка продавца
        profit: Number(seller.profit.toFixed(2)),// Число с двумя знаками после точки, прибыль продавца
        sales_count: seller.sales_count,// Целое число, количество продаж продавца
        top_products: seller.top_products,// Массив объектов вида: { "sku": "SKU_008","quantity": 10}, топ-10 товаров продавца
        bonus: Number(seller.bonus.toFixed(2))// Число с двумя знаками после точки, бонус продавца
})); 
}