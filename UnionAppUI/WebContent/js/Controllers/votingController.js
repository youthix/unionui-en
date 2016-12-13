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
    if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }
/*-------------------------------------*/


$scope.currentPage = 1;
$scope.activeMenu ="Voting";
$scope.statusUpdate = function(surveyStatus,surveyData){
	
	var status;
	if (surveyStatus == "offline") {
		surveyData.status = "online";
	}else if(surveyStatus =="online"){
		surveyData.status = "offline";
	} 
	var requestObject = {
		"bid": constant.bid,
		"surveyListObj": {
			"surveydtoLs": [
			]
		}
	};
	var surveyData = angular.copy(surveyData);
	delete surveyData.deadlineDays;
	delete surveyData.deadlineHours;
	
	requestObject.surveyListObj.surveydtoLs.push(surveyData);

	services.updateSurvey(requestObject).then(function(data){
		console.log("Data is:" + JSON.stringify(data));
		var status = data.resStatus;
		if (status.code == "00" &&  status.msg =="SUCCESS") {
			gettingData();                 
		}
		else{
			alert("Service :"+ status.msg);
		}
	});

	
};
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

 

	$rootScope.surveyData={};
	$scope.questionList=function(ques){
		dataSharingService.addEditData(ques);
		$location.path('/surveyQuestions');
	}
	$scope.addNewSurvey = function(){
		$location.path("/survey").search({"addNewSurvey":true});
	}
	$scope.viewSurvey = function(index){
		dataSharingService.addEditData($scope.surveyList[index]);
		$location.path("/survey").search({"viewSurvey":true});
	}
	$scope.editSurvey = function(index){
		dataSharingService.addEditData($scope.surveyList[index]);
		$location.path("/survey").search({"editSurvey":true});
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
   	$scope.questionList = [];
   	$scope.editSurvey = false;
	$scope.viewSurvey = false;
	$scope.addNewSurvey = false;
	if($route.current.params.addNewSurvey) {
	  $scope.addNewSurvey = true;
	  $scope.editSurvey = false;
	  $scope.viewSurvey = false;
	}else if($route.current.params.editSurvey){
	  $scope.editSurvey = true;
	  $scope.viewSurvey = false;
	  $scope.addNewSurvey = false;
	}
	else if($route.current.params.viewSurvey){
	  $scope.viewSurvey = true;
	  $scope.editSurvey = false;
	  $scope.addNewSurvey = false;
	}
   	$scope.surveyData = dataSharingService.getEditData()[0] !== undefined? dataSharingService.getEditData()[0]: {} ;
   	
	if($scope.surveyData.hasOwnProperty("questiondtoLs")){
		$scope.surveyData.questiondtoLs.length>0? $scope.questionList = $scope.surveyData.questiondtoLs : $scope.questionList.push(getDefaultQuestion());;
	}
	else{
		$scope.questionList.push(getDefaultQuestion());
	}
	$scope.cancel = function(){
		
		$scope.surveyData.questiondtoLs = [];
		dataSharingService.addEditData($scope.surveyData);
		var searchParam = {};
		if($scope.editSurvey){
	       searchParam.editSurvey = true;
	    }else if($scope.addNewSurvey){
	      searchParam.addNewSurvey = true;
	    }else if($scope.viewSurvey){
	      searchParam.viewSurvey = true;
	    }
	    $location.path('/survey').search(searchParam);
		
	}
	$scope.back = function(){
		dataSharingService.addEditData($scope.surveyData);
		var searchParam = {};
		if($scope.editSurvey){
	       searchParam.editSurvey = true;
	    }else if($scope.addNewSurvey){
	      searchParam.addNewSurvey = true;
	    }else if($scope.viewSurvey){
	      searchParam.viewSurvey = true;
	    }
	    $location.path('/survey').search(searchParam);
	}
	
	$scope.saveUpdate = function(){
		$scope.surveyData.questiondtoLs = $scope.questionList;
		var requestObject = {
			"bid": constant.bid,
			"surveyListObj": {
				"surveydtoLs": []
			}
		};
		delete $scope.surveyData.deadlineDays;
		delete $scope.surveyData.deadlineHours;
		requestObject.surveyListObj.surveydtoLs.push($scope.surveyData);
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
	
	$scope.addQuestion = function(){
		$scope.questionList.push(getDefaultQuestion());
	}
	$scope.addOption = function(i,$event){
		$scope.questionList[i].optiondtoLs.push(getDefaultOption());
		$ele = $($event.target);
		$ele.tooltip("hide");
	}
	$scope.deleteQuestion = function(index,$event){
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