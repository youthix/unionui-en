app.controller('votingController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route,$http) {
 //  alert("newsLetterController");
	$scope.fotterTitle = constant.footer_title;
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
services.getAllSurvey(requestObject).then(function(data){
	var status = data.resStatus;
	if (status.code == "00" &&  status.msg =="SUCCESS") {
		$scope.surveyList = data.surveyListObj.surveydtoLs;
		$scope.surveyList.map(function(survey){
			var startDate = getDateObj(survey.createdate, survey.createtime).getTime();
			var endDate = getDateObj(survey.enddate, survey.endtime).getTime();
			/*var startDate =  new Date("12/1/2016 12:00:00");
			var endDate = new Date("12/13/2016 24:00:00");*/
			var hourDiff = endDate - startDate; //in ms
			var minDiff = hourDiff / 60 / 1000; //in minutes
			var hDiff = hourDiff / 3600 / 1000; //in hours
			var humanReadable = {};
			var hours = Math.floor(hDiff);
			var minutes = minDiff - 60 * hours;
			survey.deadlineDays = Math.floor(hours/24);
			survey.deadlineHours = hours%24;
			return survey;
		})
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
 function getDateObj(dateStr,timeStr){
 	var date = new Date();
 	var timeStr =timeStr!== null && timeStr !== undefined? timeStr: "";
 	if(dateStr !== null && dateStr !== undefined){
 		var date = new Date(dateStr.replace(/-/g,'/')+" "+timeStr);
 	}
 	return date;
 }

	$rootScope.surveyData={};
	$scope.questionList=function(ques){
		dataSharingService.addEditData(ques);
		$location.path('/surveyQuestions');
	}
	$scope.addNewSurvey = function(){
		$location.path("/newSurvey").search({"addNewSurvey":true})
	}
}]);
app.controller('questionController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route','$http', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route,$http) {
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
	$scope.showQues=false;
	var getDefaultQuestion = function (){
	  var defaultQuestion = {
	  	"subject": null,
	  "detail": null,
	  "questionid": null,
	  "optiondtoLs":[{
	    "detail": "Yes",
	    "responseid": null,
	    "responsecount": "5",
	    "optionid": null
	  },
	  {
	    "detail": "No",
	    "responseid": null,
	    "responsecount": null,
	    "optionid": null
	  }]
	}
	return defaultQuestion;
	};
	var getDefaultOption = function(){
      var defaultOption = {
      	"detail": null,
      	"responseid": null,
      	"responsecount": null,
      	"optionid": null
      }
      return defaultOption;
   	};
   	$scope.surveyData = dataSharingService.getEditData()[0] !== undefined? dataSharingService.getEditData()[0]: {} ;
   	$scope.questionList = [];
	if($scope.surveyData.hasOwnProperty("questiondtoLs")){
		$scope.surveyData.questiondtoLs.length>0? $scope.questionList = $scope.surveyData.questiondtoLs : $scope.questionList.push(getDefaultQuestion());;
	}
	else{
		$scope.questionList.push(getDefaultQuestion());
	}
	
	$scope.cancel = function(){
		
		if($scope.surveyData.questiondtoLs === undefined)
			$scope.surveyData.questiondtoLs = [];
		$scope.surveyData.questiondtoLs = $scope.questionList;
		dataSharingService.addEditData($scope.surveyData);
		$location.path("/newSurvey").search({"addNewSurvey":false});
	}
	
	$scope.save = function(survey){
		$scope.surveyData.questiondtoLs = $scope.questionList;
		var requestObject = {
			"bid": constant.bid,
			"surveyListObj": {
				"surveydtoLs": []
			}
		};
		requestObject.surveyListObj.surveydtoLs.push($scope.surveyData);
		services.createNewSurvey(requestObject).then(function(data){
			var status = data.resStatus;
			if (status.code == "00" &&  status.msg =="SUCCESS") {
	      		//allMeeitngsRequest();  
	      		$location.path('/voting');                     
	  		}
	  		else{
	  			alert("Service :"+ status.msg);
	  		}
		});
	};
	$scope.saveQuestion=function(){
		
	}
	$scope.addQuestion = function(){
		$scope.questionList.push(getDefaultQuestion());
	}
	$scope.addOption = function(i){
		$scope.questionList[i].optiondtoLs.push(getDefaultOption());
	}
	$scope.deleteQuestion = function(index){
		$scope.questionList.splice(index,1);
	}
	$scope.deleteOption = function(questionIndex,optionIndex){
		$scope.questionList[questionIndex].optiondtoLs.splice(optionIndex,1);
	}
}]);