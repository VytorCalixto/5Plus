var fom = angular.module('5+', ['ionic']);

fom.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('menu', {
                url: '/menu',
                templateUrl: 'pages/menu.html'
            })
            .state('game',{
                url: '/game/:gameType',
                templateUrl: 'pages/game.html',
                controller: 'GameCtrl'
            });

    $urlRouterProvider.otherwise('/menu');
});