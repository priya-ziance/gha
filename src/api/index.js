import client from './client';


//============================= USER API'S=============================
function UsersApi() {}

UsersApi.prototype.getPublicOrder = function(id) {
  return client.get(`/users/${id}`); 
}


//========================================================================

export default (() => ({
  users: {
    user: new UsersApi()
  }
}))()
