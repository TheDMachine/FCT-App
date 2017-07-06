(function(){
  angular
  .module('app')
  .service('userServices', userServices);

  function userServices() {
    var users = [];
    var publicAPI = {
      setUsers: _setUsers,
      getUsers: _getUsers,
      updateUsers: _updateUsers
    };
    return publicAPI;
    
    //Guardar alumno
    function _setUsers(newUser){
      var usersList = _getUsers();
      var position = searchUser(newUser);
      if (position == -1) {
        usersList.push(newUser);
        localStorage.setItem('lsUsersList', JSON.stringify(usersList));
      }
    }

    //buscar si la cédula se repite
    function searchUser(newUser){
      var usersList = _getUsers();
      var position = -1;

      for (var i = 0; i < usersList.length; i++) {
        if (newUser.id == usersList[i].id) {
          position = i;
        }
      }
      return position;
    }

    //muestra la informacion mas actual
    function _getUsers(){
      var usersList = JSON.parse(localStorage.getItem('lsUsersList'));
      if(usersList == null){
        usersList = users;
      }
      return usersList;
    }

    //editar la informacion del alumno ya registrada
    function _updateUsers(editUser){
      var usersList = _getUsers();
      for(var i = 0; i < usersList.length; i++){
        if(usersList[i].id == editUser.id){
          usersList[i] = editUser;
        }
      }
      localStorage.setItem('lsUsersList', JSON.stringify(usersList));
    }
  }
})();
