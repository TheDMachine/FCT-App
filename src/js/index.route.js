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
      controllerAs:'vm'
    })
    .state('admin.log',{
      url:'/log',
      views:{
        'log-sistem':{
          templateUrl:'components/log/log.view.html',
          controller:'adminCtrl',
          controllerAs:'vm'
        }
      }
    })
    .state('admin.partOne',{
      url:'/new-consult-part1',
      templateUrl:'components/admin/admin.consultR.views/admin.consultR.stepOne.view.html'
    })
    .state('admin.partTwo',{
      url:'/new-consult-part2',
      templateUrl:'components/admin/admin.consultR.views/admin.consultR.stepTwo.view.html'
    })
    .state('admin.partThree',{
      url:'/new-consult-part3',
      templateUrl:'components/admin/admin.consultR.views/admin.consultR.stepThree.view.html'
    })
    .state('assistant',{
      url : '/assistant', //ruta del url del estado
      templateUrl : 'components/assistant/assistant.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/assistant/assistant.controller.js')
        }]
      },
      controller: 'assistantCtrl'
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
      controller: 'competitorCtrl'
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
      controller: 'consulCtrl'
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
      controller: 'teacherCtrl'
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

    $urlRouterProvider.otherwise('/admin');
  }
})();
