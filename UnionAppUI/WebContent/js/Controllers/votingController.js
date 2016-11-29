app.controller('votingController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route,$http) {
 //  alert("newsLetterController");

/*-------------------------------------*/
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
        $location.path('/ideas');
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

/*-------------------------------------*/


$scope.currentPage = 1;
$scope.activeMenu ="Voting";
var serviceUrl = "http://codeplay-dev6.cloud.cms500.com/unionapp/rest/service/";
   var requestObject ={
	   					"bid": constant.bid,
                        "pageno":$scope.currentPage,
                        "userListObj": {
							 "ul":[{
								 "usNa":$rootScope.userName
								 }]},
                         "criteria":{
							 "criteria": "FALSE"
							 }
					};
var request={
				  method:'POST',
				  data:requestObject,
				  headers:{'Content-Type':'application/json;charset=UTF-8'},
				  url:serviceUrl+'fetchsurvey'
			}
       $http(request).then(function(data) {
               var data = JSON.parse(JSON.stringify(data.data));                           
             	console.log("Data is:" + JSON.stringify(data.resStatus));
			
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
				  $scope.surveyList = data.surveyListObj.surveydtoLs;
				  
				  $scope.totalPagesCount = data.totalPage;
				  $scope.totalPages=[];
				  for(i =1; i<=$scope.totalPagesCount ; i ++){
						console.log(i);
					  $scope.totalPages.push(i);
					}

				}else{
					alert("Service :"+ status.msg);
				}
        });
	$rootScope.surveyData={};
	$scope.questionList=function(ques){
		dataSharingService.addEditData(ques);
		$location.path('/surveyQuestions');
	}
}]);
app.controller('questionController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route,$http) {
	$scope.surveyData=dataSharingService.getEditData()[0];
	$scope.showQues=false;
	$scope.addQuestion=function(){
		$scope.showQues=true;
	}
	$scope.cancle=function(){
		$scope.showQues=false;
	}
	
	$scope.saveQuestion=function(){
		
	}
}]);