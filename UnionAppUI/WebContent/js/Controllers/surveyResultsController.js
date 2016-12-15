app.controller('surveyResultsController',['$scope','$timeout','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$timeout,$location,services,constant,dataSharingService,$rootScope,$route) {


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


  $timeout(function (){
    $scope.surveyData = dataSharingService.getEditData()[0];
    $scope.surveyResponseCount = $scope.surveyData.responsecount; 
    $scope.surveyTotalUsers = $scope.surveyData.totalusercount;
    $scope.questionList = $scope.surveyData.questiondtoLs;
    if($scope.surveyResponseCount){
      drawResultsGraph($scope.surveyData.responsecount,$scope.surveyData.totalusercount);
      $scope.responsePercent = ($scope.surveyData.responsecount/$scope.surveyData.totalusercount)*100;
    }
  },10)
  
  function drawResultsGraph(resCount,totalUser){
    var responseCount = resCount;
    var nonResponseCount = totalUser-resCount;
    var data = {
      datasets: [
      {
        data: [resCount, nonResponseCount],
        backgroundColor: [
        "#7CDAC7",
        "#EEEEEE",
        ]
      }]
    };

    var usedSpace = new Chart(document.getElementById('surveyResults'), {
      type: 'doughnut',
      data: data,
      options: {
        cutoutPercentage: 80,
        responsive: true,
        legend: {
          display: false
        },
        tooltips:{
          mode:"disbaled"
        }
      }
    });
  }
  $scope.details = false;
  $scope.showDetails = function(){
    $scope.details = true;
  }
  $scope.back = function(){
    $scope.details = false;
  }

}]);