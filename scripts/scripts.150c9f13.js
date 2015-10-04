"use strict";angular.module("prayForMeApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngSanitize","ngTouch","ui.router","angularMoment"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),b.when("/","/list/prayer"),a.state("new-request",{url:"/request/new",templateUrl:"views/new-request.html",controller:"NewRequestCtrl",controllerAs:"newRequest"}).state("request-detail",{url:"/request/:id",templateUrl:"views/request-detail.html",controller:"RequestDetailCtrl",controllerAs:"requestDetail"}).state("prayer-list",{url:"/list/prayer",templateUrl:"views/request-list.html",controller:"RequestListCtrl",controllerAs:"requestList",data:{list:"feed"}}).state("own-list",{url:"/list/own",templateUrl:"views/request-list.html",controller:"RequestListCtrl",controllerAs:"requestList",data:{list:"own"}}).state("closed-list",{url:"/list/closed",templateUrl:"views/request-list.html",controller:"RequestListCtrl",controllerAs:"requestList",data:{list:"own",filter:function(a){return a.is_closed}}})}]),angular.module("prayForMeApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("prayForMeApp").controller("LoginCtrl",["requests",function(a){this.username="",this.fullname="",this.login=function(){a.login(this.username),c()};var b=this;this.loading=!1;var c=function(){b.loading=!0,a.getUser().then(function(a){b.username=a.username,b.fullname=a.full_name})["finally"](function(){b.loading=!1})};c()}]),angular.module("prayForMeApp").controller("RequestListCtrl",["$rootScope","$state","requests",function(a,b,c){var d=this,e=b.current.data.list||"all";this.loading=!1;var f=function(){d.loading=!0,c.getList(e).then(function(a){d.requests=a})["finally"](function(){d.loading=!1})};this.filter=b.current.data.filter,this.reload=function(){c.loadRequests(),f()},a.$on("login",function(){f()}),f()}]),angular.module("prayForMeApp").controller("RequestDetailCtrl",["$stateParams","requests",function(a,b){angular.element('[data-toggle="tooltip"]').tooltip();var c=this;this.loading=!0,this.closable=!1,b.getRequest(a.id).then(function(a){c.request=a,c.closable="own"===a.list&&!a.is_closed})["finally"](function(){c.loading=!1}),this.getScopeIcon=function(a){var b={"public":"fa-globe",circles:"fa-group","private":"fa-lock"};return b[a]},this.getScopeName=function(a){var b={"public":"Public",circles:"Circles","private":"Private"};return b[a]},this.closing=!1,this.close=function(){this.closing=!0,b.closeRequest(this.request).then(function(){c.closable=!1})["finally"](function(){c.closing=!1})},this.creating=!1,this.createResponse=function(){this.creating=!0,b.createResponse(this.request,this.description).then(function(){c.description=""})["finally"](function(){c.creating=!1})}}]),angular.module("prayForMeApp").controller("NewRequestCtrl",["$state","requests",function(a,b){this["private"]=!1,this.visibility="public";var c=this;this.loading=!1,this.createRequest=function(){c.loading=!0,b.addRequest({description:this.description,title:this.title,"private":"private"===this.visibility}).then(function(b){c.description="",a.go("request-detail",{id:b.id})})["finally"](function(){c.loading=!1})}}]),angular.module("prayForMeApp").factory("requests",["$rootScope","$http","$q",function(a,b,c){var d="http://ec2-52-5-131-18.compute-1.amazonaws.com",e=function(a){a.scope=a.is_private?"private":"public",a.responses=a.prayer_responses.prayer_response||[]},f={},g={login:function(c){var e=f.user=b.get(d+"/users",{params:{username:c}}).then(function(b){return a.$emit("login"),b.data});return g.loadRequests(),e},getUser:function(){return f.user},loadRequests:function(){var a=null,c=f.requests=g.getUser().then(function(c){return a=c.id,b.get(d+"/users/"+a+"/prayer_requests/",{params:{scope:"all"}})}).then(function(a){var b=a.data.prayer_requests.prayer_request;return b.forEach(e),b}).then(function(b){var c={all:{},feed:[],own:[]};return b.forEach(function(b){var d=b.user_id===a?"own":"feed";b.list=d,c.all[b.id]=b,c[d].push(b)}),c});return f.lists={},["all","feed","own"].forEach(function(a){f.lists[a]=f.all=c.then(function(b){return b[a]})}),f.lists.all},getList:function(a){return f.lists[a]||c.reject(new Error("Unknown list name: "+a))},getRequest:function(a){return g.getList("all").then(function(b){return b[a]||null})},addRequest:function(a){return g.getUser().then(function(c){return b.post(d+"/prayer_requests",{user_id:c.id,title:a.title,description:a.description,is_private:a["private"]}).then(function(a){var b=a.data;return e(b),f.lists.all.then(function(a){a[b.id]=b}),f.lists.own.then(function(a){a.push(b)}),b})})},closeRequest:function(a){return b.put(d+"/prayer_requests/"+a.id,{update_action:"close"}).then(function(b){var c=b.data;return a.is_closed=c.is_closed,a.date_closed=c.date_closed,a})},createResponse:function(a,c){return g.getUser().then(function(e){return b.post(d+"/prayer_responses",{prayer_request_id:a.id,user_id:e.id,description:c}).then(function(b){var c=b.data;return a.responses.push(c),c})})}};return g.login("caleb"),g}]),angular.module("prayForMeApp").run(["$templateCache",function(a){a.put("views/new-request.html",'<div class="container"> <div class="panel panel-default"> <div class="panel-heading panel-title"> <h3 class="text-center">New Prayer Request</h3> </div> <div class="panel-body"> <form> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" ng-model="newRequest.title"> </div> <div class="form-group"> <label>Description</label> <textarea class="form-control" ng-model="newRequest.description"></textarea> </div> <div class="form-group"> <label>Visibility</label> <select class="form-control" ng-model="newRequest.visibility"> <option value="public">Anyone</option> <option value="private">Only me</option> </select> </div> <div class="form-group"> <button type="submit" class="btn btn-primary btn-lg center-block" ng-click="newRequest.createRequest()" ng-disabled="newRequest.loading"><i class="fa fa-spinner fa-spin" ng-class="{ hide: !newRequest.loading }"></i> Create</button> </div> </form> </div> </div> </div>'),a.put("views/request-detail.html",'<div class="container"> <div class="panel" ng-class="requestDetail.request.is_closed ? \'panel-success\' : \'panel-default\'" ng-hide="requestDetail.loading"> <div class="panel-heading"> <button class="btn btn-success pull-right" ng-show="requestDetail.closable" ng-disabled="requestDetail.closing" ng-click="requestDetail.close()"><i class="fa fa-check"></i> Close</button> <h3 class="panel-title">{{requestDetail.request.user_full_name}}</h3> <i class="fa" ng-class="requestDetail.getScopeIcon(requestDetail.request.scope)" data-toggle="tooltip" data-placement="bottom" ng-attr-data-original-title="{{requestDetail.getScopeName(requestDetail.request.scope)}}"></i> Created <span am-time-ago="requestDetail.request.date_created"></span><span ng-show="requestDetail.request.is_closed">, closed <span am-time-ago="requestDetail.request.date_closed"></span></span> </div> <div class="panel-body"> <div class="row col-xs-12"> <div class="well"> <h3 class="text-center" ng-show="requestDetail.request.title">{{requestDetail.request.title}}</h3> {{requestDetail.request.description}} </div> </div> <div class="row col-xs-12"> <form> <div class="form-group"> <textarea class="form-control" ng-model="requestDetail.description" placeholder="Add your own response"></textarea> </div> <div class="form-group"> <button type="submit" class="btn btn-success btn-lg center-block" ng-click="requestDetail.createResponse()" ng-disabled="requestDetail.creating"><i class="fa fa-spinner fa-spin" ng-class="{ hide: !requestDetail.creating }"></i> Post Response</button> </div> </form> </div> <div class="row col-xs-12"> <ul class="list-group"> <li class="list-group-item" ng-repeat="response in requestDetail.request.responses | orderBy:\'-date_created\'"> <h3>{{response.responder_full_name}} <small am-time-ago="response.date_created"></small></h3> {{response.description}} </li> </ul> </div> </div> </div> </div>'),a.put("views/request-list.html",'<div class="container-fluid"> <div class="row" style="margin-bottom: 2em"> <div class="col-xs-12"> <button class="btn btn-lg btn-primary center-block" ng-click="requestList.reload()" ng-disabled="requestList.loading"><i class="fa fa-refresh fa-spin" ng-class="{ hide: !requestList.loading }"></i> Refresh</button> </div> </div> <div class="row"> <div class="col-xs-12 col-md-6 col-lg-4" ng-repeat="request in requestList.requests | filter:requestList.filter | orderBy:\'-date_created\'"> <div class="panel" ng-class="request.is_closed ? \'panel-success\' : \'panel-default\'"> <div class="panel-heading"> <a ui-sref="request-detail({ id: request.id })">{{request.user_full_name}} (<span am-time-ago="request.date_created"></span>)</a> </div> <div class="panel-body"> <h3 ng-show="request.title">{{request.title}}</h3> {{request.description}} </div> </div> </div> </div> </div>')}]);