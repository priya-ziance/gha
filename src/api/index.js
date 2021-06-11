import client from './client';


//============================= CUSTOMER API'S=============================
function CustomerOrdersApi() {}

CustomerOrdersApi.prototype.getPublicOrder = function(publicId) {
  return client.get(`/customer/orders/${publicId}`); 
}



//============================= STOREFRONT API'S=============================

//--------Orders API
function StorefrontOrdersApi() {}

StorefrontOrdersApi.prototype.findOrders = function(query) {
  return client.get('/storefront/orders', { q: query }); 
}

StorefrontOrdersApi.prototype.getAll = function(params) {
  return client.get('/storefront/orders', params);
}

StorefrontOrdersApi.prototype.getOrder = function(orderId) {
  return client.get(`/storefront/orders/${orderId}`);
}

StorefrontOrdersApi.prototype.getQueue = function(params) {
  return client.get('/storefront/orders/queue', params);
}

StorefrontOrdersApi.prototype.createOrder = function(data) {
  return client.put('/storefront/orders', data);
}

StorefrontOrdersApi.prototype.updateOrder = function(orderId, data) {
  return client.post(`/storefront/orders/${orderId}`, data);
}

StorefrontOrdersApi.prototype.setStatus = function(orderId, status) {
  return client.post(`/storefront/orders/${orderId}/setstatus/${status}`);
}

StorefrontOrdersApi.prototype.addDelay = function(orderId, seconds) {
  return client.post(`/storefront/orders/${orderId}/adddelay/${seconds}`);
}

//--------Accounts API
function StorefrontAccountApi() {}

StorefrontAccountApi.prototype.info = function() {
  return client.get('/storefront/account/info');
}



//--------Items API
function StorefrontItemsApi() {}

StorefrontItemsApi.prototype.getAll = function() {
  return client.get('/storefront/items');
}


//--------Menus API
function StorefrontMenusApi() {}

StorefrontMenusApi.prototype.getAll = function() {
  return client.get('/storefront/menus');
}


//--------Customers API
function StorefrontCustomersApi() {}

StorefrontCustomersApi.prototype.create = function(info = {}) {
  return client.put(`/storefront/customers`, info);
}

StorefrontCustomersApi.prototype.find = function(params) {
  return client.get('/storefront/customers', params);
}

StorefrontCustomersApi.prototype.findOne = function(customerId) {
  return client.get(`/storefront/customers/${customerId}`);
}

StorefrontCustomersApi.prototype.findCustomerOrders = function(_query, options = {}) {
  let opts = options;
  let query = _query;
  
  if (typeof query === 'object') {
    const { q, ...others } = query;
    query = q || '';
    
    opts = {...opts, ...others};
  }

  return client.get(`/storefront/customers/ordersearch?q=${query}`, opts);
}

StorefrontCustomersApi.prototype.getCustomerOrders = function(customerId, params) {
  return client.get(`/storefront/customers/${customerId}/orders`, params);
}

StorefrontCustomersApi.prototype.updateCustomer = function(id, info = {}) {
  return client.post(`/storefront/customers/${id}`, info);
}


//============================= ADMIN API'S=============================

//--------Admin Info API
function AdminAccountApi() {}

AdminAccountApi.prototype.getInfo = function() {
  return client.get(`/admin/account/info`);
}


//--------Admin Billing API
function AdminSubscriptionsApi() {}

AdminSubscriptionsApi.prototype.createSubscription = function(paymentMethodId) {
  return client.put(`/admin/subscriptions`, {payment_method_id: paymentMethodId});
}

AdminSubscriptionsApi.prototype.createCustomerPortalSession = function() {
  return client.put(`/admin/subscriptions/customerportalsession`);
}


//========================================================================

export default (() => ({
  storefront: {
    account: new StorefrontAccountApi(),
    customers: new StorefrontCustomersApi(),
    items: new StorefrontItemsApi(),
    menus: new StorefrontMenusApi(),
    orders: new StorefrontOrdersApi(),
  },
  customer: {
    orders: new CustomerOrdersApi()
  },
  admin: {
    account: new AdminAccountApi(),
    subscriptions: new AdminSubscriptionsApi()
  }
}))()
