(function(){
  'use strict';
  angular
  .module('appRoutes', ['ui.router', 'oc.lazyLoad'])
  .config(configuration);

  configuration.$inject = ['$stateProvider','$urlRouterProvider'];

  function configuration($stateProvider,$urlRouterProvider){
    $stateProvider
    /*.state('login',{
      url : '/login', //ruta del url del estado
      templateUrl : 'login/login.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./login/login.controller.js')
        }]
      },
      controller: 'validationDemoCtrl'
    })*/
    .state('admin',{
      url : '/admin', //ruta del url del estado
      templateUrl : 'components/admin/admin.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/admin/admin.controller.js')
        }]
      },
      controller: 'adminCtrl',
      controllerAs: 'vm'
    })
    //Inicio de las vistas hijas del formulario de registro del administrador
    .state('admin.part1',{
      url : '/part1', //ruta del url del estado
      templateUrl : 'components/admin/admin.eventsR.views/admin-eventRpart1.view.html'//vista que se va a cargar para este estado
    })
    .state('admin.part2',{
      url : '/part2', //ruta del url del estado
      templateUrl : 'components/admin/admin.eventsR.views/admin-eventRpart2.view.html'//vista que se va a cargar para este estado
    })
    .state('admin.part3',{
      url : '/part3', //ruta del url del estado
      templateUrl : 'components/admin/admin.eventsR.views/admin-eventRpart3.view.html'//vista que se va a cargar para este estado
    })
    .state('admin.part4',{
      url : '/part4', //ruta del url del estado
      templateUrl : 'components/admin/admin.eventsR.views/admin-eventRpart4.view.html'//vista que se va a cargar para este estado
    })
    .state('admin.part5',{
      url : '/part5', //ruta del url del estado
      templateUrl : 'components/admin/admin.eventsR.views/admin-eventRpart5.view.html'//vista que se va a cargar para este estado
    })
    // Fin de las vistas hojas del formualrio de registro del administrador.

    .state('assistant',{
      url : '/assistant', //ruta del url del estado
      templateUrl : 'components/assistant/assistant.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/assistant/assistant.controller.js')
        }]
      },
      controller: 'assistantCtrl',
      controllerAs: 'vm'
    })
    .state('competitor',{
      url : '/competitor', //ruta del url del estado
      templateUrl : 'components/competitor/competitor.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/competitor/competitor.controller.js')
        }]
      },
      controller: 'competitorCtrl',
      controllerAs: 'vm'
    })
    .state('consul',{
      url : '/consul', //ruta del url del estado
      templateUrl : 'components/consul/consul.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/consul/consul.controller.js')
        }]
      },
      controller: 'consulCtrl',
      controllerAs: 'vm'
    })
    .state('teacher',{
      url : '/teacher', //ruta del url del estado
      templateUrl : 'components/profesor/teacher.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/profesor/teacher.controller.js')
        }]
      },
      controller: 'teacherCtrl',
      controllerAs: 'vm'
    })
        .state('login',{
      url : '/login', //ruta del url del estado
      templateUrl : 'components/login/login.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/login/login.controller.js')
        }]
      },
      controller: 'loginCtrl'
    })
        .state('landing',{
      url : '/landing', //ruta del url del estado
      templateUrl : 'components/landing/landing.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/landing/landing.controller.js')
        }]
      },
      controller: 'landingCtrl',
      controllerAs: 'vm'
    })
        .state('reserve',{
      url : '/reserve', //ruta del url del estado
      templateUrl : 'components/tickets/reserve.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/tickets/reserve.controller.js')
        }]
      },
      controller: 'reserveCtrl',
      controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/admin');
  }
})();