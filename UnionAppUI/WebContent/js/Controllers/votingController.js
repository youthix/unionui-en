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
$scope.statusUpdate = function(surveyStatus,surveyData){
	console.log(surveyData)
	updateSurveyStatus = function(){
		var status;
		if (surveyStatus == "offline") {
			status = "online";
		}else if(surveyStatus =="online"){
			status = "offline";
		}  
		/*var requestObject =
		{
			"bid": constant.bid,
			"suggestionIdeaListObj": 
			{
				"suggestionideadtoLs": 
				[
				{
					"subject":ideaData.subject,
					"detail": ideaData.detail,
					"suggideadate":ideaData.suggideadate,
					"suggideatime":"00:00:00",
					"creator":$rootScope.userName,
					"status":status,
					"suggideaid":ideaData.suggideaid
				}
				]
			}
		};
		services.updateIdea(requestObject).then(function(data){

			console.log("Data is:" + JSON.stringify(data));
			var status = data.resStatus;
			if (status.code == "00" &&  status.msg =="SUCCESS") {
				gettingData();                 
			}
			else
			{
				alert("Service :"+ status.msg);
			}
		});*/

	};
	updateSurveyStatus();
};
function gettingData(){
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
				//var startDate = getDateObj(survey.createdate, survey.createtime).getTime();
				var todayDate = new Date().getTime();
				var endDate = getDateObj(survey.enddate, survey.endtime).getTime();
				var hourDiff = endDate - todayDate; //in ms
				var minDiff = hourDiff / 60 / 1000; //in minutes
				var hDiff = hourDiff / 3600 / 1000; //in hours
				var humanReadable = {};
				var hours = Math.floor(hDiff);
				var minutes = minDiff - 60 * hours;
				survey.deadlineDays = Math.floor(hours/24);
				survey.deadlineHours = hours%24;
				console.log(survey)
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
}
$scope.pageNumber = function(pageno){

  $scope.currentPage = pageno;
  gettingData();

};
gettingData();
 function getDateObj(dateStr,timeStr){
 	var date = new Date();
 	var timeStr = timeStr!== null && timeStr !== undefined ? timeStr: "00:00:00";
 	
 	if(dateStr !== null && dateStr !== undefined){
 		var timeParts = timeStr.split(':');
		var dateParts = dateStr.split("-");
		var date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0],timeParts[1],timeParts[2]); // month is 0-based
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
		
		$scope.surveyData.questiondtoLs = [];
		dataSharingService.addEditData($scope.surveyData);
		$location.path("/newSurvey").search({"addNewSurvey":false});
	}
	
	$scope.save = function(){
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
	      		$location.path('/voting');                     
	  		}
	  		else{
	  			alert("Service :"+ status.msg);
	  		}
		});
	};
	
	$scope.addQuestion = function(){
		$scope.questionList.push(getDefaultQuestion());
	}
	$scope.addOption = function(i,$event){
		$scope.questionList[i].optiondtoLs.push(getDefaultOption());
		$ele = $($event.target);
		$ele.tooltip("hide");
	}
	$scope.deleteQuestion = function(index,$event){
		console.log($event.target);
		$ele = $($event.target);
		$ele.tooltip("hide");
		$scope.questionList.splice(index,1);
	}
	$scope.deleteOption = function(questionIndex,optionIndex,$event){
		$scope.questionList[questionIndex].optiondtoLs.splice(optionIndex,1);
		$ele = $($event.target);
		$ele.tooltip("hide");
	}
}]);