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
    .state('proposes',{
      url : '/proposes', //ruta del url del estado
      templateUrl : 'components/consul/consul.view.html',//vista que se va a cargar para este estado
        // El resolve sirve para el controlador junto con la vista
        resolve: {
          load: ['$ocLazyLoad', function($ocLazyLoad){
            return $ocLazyLoad.load('components/consul/consul.controller.js')
          }]
        },
        controller: 'consulCtrl',
        controllerAs:'vm'
      })
      .state('proposes.proposeOne',{
        url:'/proposeOne',
        templateUrl:'components/consul/consul.eventsR.views/consul-eventRpart1.view.html'
      })
      .state('proposes.proposeTwo',{
        url:'/proposeTwo',
        templateUrl:'components/consul/consul.eventsR.views/consul-eventRpart2.view.html'
      })
      .state('proposes.proposeThree',{
        url:'/proposeThree',
        templateUrl:'components/consul/consul.eventsR.views/consul-eventRpart3.view.html'
      })
      .state('proposes.proposeFourth',{
        url:'/proposeFourth',
        templateUrl:'components/consul/consul.eventsR.views/consul-eventRpart4.view.html'
      })
      .state('proposes.proposeFive',{
        url:'/proposeFive',
        templateUrl:'components/consul/consul.eventsR.views/consul-eventRpart5.view.html'
      })
      .state('proposes.proposeSix',{
        url:'/proposeSix',
        templateUrl:'components/consul/consul.eventsR.views/consul-eventRpart6.view.html'
      })

      .state('consul.displayProposes',{
        url:'/displayProposes',
        templateUrl:'components/consul/propose.view.html'
      })
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
    .state('admin.sponsorPartOne', {
      url : '/sponsorPartOne',
      templateUrl : 'components/admin/sponsor.register.views/admin-sponsor1.view.html'
    })
    .state('admin.sponsorPartTwo', {
      url : '/sponsorPartTwo',
      templateUrl : 'components/admin/sponsor.register.views/admin-sponsor2.view.html'
    })

    // Fin de las vistas hojas del formualrio de registro del administrador.

    //Inicio de las vistas hijas del formulario de registro del profesor
    .state('admin.teachpart1',{
      url : '/teachpart1', //ruta del url del estado
      templateUrl : 'components/admin/admin.teachers.views/admin-teachersregpart1.view.html'//vista que se va a cargar para este estado
    })
    .state('admin.teachpart2',{
      url : '/teachpart2', //ruta del url del estado
      templateUrl : 'components/admin/admin.teachers.views/admin-teachersregpart2.view.html'//vista que se va a cargar para este estado
    })
    .state('admin.teachpart3',{
      url : '/teachpart3', //ruta del url del estado
      templateUrl : 'components/admin/admin.teachers.views/admin-teachersregpart3.view.html'//vista que se va a cargar para este estado
    })
    // Fin de las vistas hojas del formualrio de registro del profesor.

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
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
        .state('landing',{
      url : '/', //ruta del url del estado
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
        .state('cancelRsv',{
      url : '/cancelRsv', //ruta del url del estado
      templateUrl : 'components/tickets/cancelRsv.view.html',//vista que se va a cargar para este estado
      // El resolve sirve para el controlador junto con la vista
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('components/tickets/cancelRsv.controller.js')
        }]
      },
      controller: 'cancelRsvCtrl',
      controllerAs: 'vm'
    })
    .state('profile',{
      url : '/profile', //ruta del url del estado
      templateUrl : 'components/profile/profile.view.html',//vista que se va a cargar para este estado
        // El resolve sirve para el controlador junto con la vista
        resolve: {
          load: ['$ocLazyLoad', function($ocLazyLoad){
            return $ocLazyLoad.load('components/profile/profile.controller.js')
          }]
        },
        controller: 'profileCtrl',
        controllerAs:'vm'
      })
    $urlRouterProvider.otherwise('/');
  }
})();
