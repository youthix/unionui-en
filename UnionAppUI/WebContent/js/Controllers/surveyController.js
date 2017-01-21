app.controller('surveyController',['$scope','$timeout','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$timeout,$location,services,constant,dataSharingService,$rootScope,$route) {


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
    "subject": "",
    "createdate": "",
    "createtime": "",
    "enddate": "",
    "endtime": "",
    "detail": "",
    "creator": $rootScope.userName,
    "status": "offline",
    "responseid": "",
    "responsecount": 0,
    "totalusercount": 0,
    "userresponsestatus": "",
    "surveyid": "",
    "questiondtoLs": []
  }
$scope.editSurvey = false;
$scope.viewSurvey = false;
$scope.addNewSurvey = false;
if($route.current.params.addNewSurvey) {
  $scope.survey = $scope.defaultSurvey;
  $scope.addNewSurvey = true;
  $scope.editSurvey = false;
  $scope.viewSurvey = false;
}else if($route.current.params.editSurvey){
  getSurveyFromSharingService();
  $scope.editSurvey = true;
  $scope.viewSurvey = false;
  $scope.addNewSurvey = false;
}
else if($route.current.params.viewSurvey){
  getSurveyFromSharingService();
  $scope.viewSurvey = true;
  $scope.editSurvey = false;
  $scope.addNewSurvey = false;
}else{
  getSurveyFromSharingService();
}

function getSurveyFromSharingService(){
  $timeout(function (){
    $scope.survey = dataSharingService.getEditData()[0] !== undefined? dataSharingService.getEditData()[0]: $scope.defaultSurvey ;
  },0);
}
function getDateObj(dateStr,timeStr){
  var date = null;
  var timeStr = timeStr!== null && timeStr !== undefined ? timeStr: "00:00:00";
  
  if(dateStr !== null && dateStr !== undefined){
    var timeParts = timeStr.split(':');
    var dateParts = dateStr.split("-");
    date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0],timeParts[1],timeParts[2]); // month is 0-based
  }
  return date;
 }
 $scope.correctDate = undefined;
$scope.checkDate = function () {
  var startDate = getDateObj($scope.survey.createdate,$scope.survey.createtime);
  var endDate = getDateObj($scope.survey.enddate,$scope.survey.endtime);
  if(startDate == null || endDate == null){
    return;
  }
  if(startDate.getTime() < endDate.getTime()){
    $scope.correctDate = true;
  }
  else{
    $scope.correctDate = false;
  }
}
$scope.saveUpdate = function(survey){
  $scope.detail = angular.element('#jqte-test3').val();
  var requestObject = {
   "bid": constant.bid,
   "surveyListObj": {"surveydtoLs": []
    }
  };
  var surveyData = angular.merge({}, $scope.defaultSurvey, survey)
  delete surveyData.deadlineDays;
    delete surveyData.deadlineHours;
    delete surveyData.isExpired;
  requestObject.surveyListObj.surveydtoLs.push(surveyData);
  if($scope.editSurvey){
    services.updateSurvey(requestObject).then(function(data){

      var status = data.resStatus;
      if (status.code == "00" &&  status.msg =="SUCCESS") {
        $location.path('/voting');                     
      }
      else{
        alert("Service :"+ status.msg);
      }
    });
  }
  else if($scope.addNewSurvey){
    services.createNewSurvey(requestObject).then(function(data){

      var status = data.resStatus;
      if (status.code == "00" &&  status.msg =="SUCCESS") {
        $location.path('/voting');                     
      }
      else{
        alert("Service :"+ status.msg);
      }
    });
  }
};

$scope.cancel = function(){
   $location.path('/voting').search({"addNewSurvey":false}); 
};

  $scope.survey = undefined;
$scope.showQuestions = false;
$scope.addQuestions = function(){
  $scope.showQuestions = true;
}
  
  $scope.questionList=function(survey){
    var surveyData = angular.merge({}, $scope.defaultSurvey, survey)
    dataSharingService.addEditData(surveyData);
    var searchParam = {} 
    if($scope.editSurvey){
       searchParam.editSurvey = true;
    }else if($scope.addNewSurvey){
      searchParam.addNewSurvey = true;
    }else if($scope.viewSurvey){
      searchParam.viewSurvey = true;
    }
    $location.path('/surveyQuestions').search(searchParam);
  }
}]);