app.controller('newSurveyController',['$scope','$timeout','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$timeout,$location,services,constant,dataSharingService,$rootScope,$route) {


 $scope.activeMenu ="voting";

 $scope.fotterTitle = constant.footer_title;

   $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
    };

     $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };

     $scope.LAGDashBoard = function(){
        $location.path('/localAgreements');
    };

    $scope.PayRateDashBoard = function(){
        $location.path('/payRate');
    };

    $scope.ContactList = function(){
        $location.path('/ContactList');
    };

    $scope.AdminUserDasgBoard = function(){
        $location.path('/adminUser');
    };

  if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
  }


  $scope.defaultSurvey = {
    "subject": null,
    "createdate": null,
    "createtime": null,
    "enddate": null,
    "endtime": null,
    "detail": null,
    "creator": $rootScope.userName,
    "status": "offline",
    "responseid": null,
    "responsecount": null,
    "totalusercount": null,
    "userresponsestatus": null,
    "surveyid": null,
    "questiondtoLs": []
  }

if($route.current.params.addNewSurvey) {
  $scope.survey = $scope.defaultSurvey;
}else{
  $timeout(function (){
    $scope.survey = dataSharingService.getEditData()[0] !== undefined? dataSharingService.getEditData()[0]: $scope.defaultSurvey ;
  },0);
}
$scope.save = function(survey){

  $scope.detail = angular.element('#jqte-test3').val();
  var requestObject = {
   "bid": constant.bid,
   "surveyListObj": {"surveydtoLs": []
    }
  };
  requestObject.surveyListObj.surveydtoLs.push(survey);
  
  services.createNewSurvey(requestObject).then(function(data){
    var status = data.resStatus;
    if (status.code == "00" &&  status.msg =="SUCCESS") {
      $location.path('/voting');                     
    }
    else{
      alert("Service :"+ status.msg);
    }
  });
};

$scope.cancel = function(){
   $location.path('/voting').search({"addNewSurvey":false}); 
};

  $scope.survey = 
$scope.showQuestions = false;
$scope.addQuestions = function(){
  $scope.showQuestions = true;
}
  
  $scope.questionList=function(survey){
    
    dataSharingService.addEditData(survey);
    $location.path('/surveyQuestions');
  }
}]);