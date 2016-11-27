app.controller('ideaDashBoardController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {



$scope.date = constant.Date;
$scope.time = constant.Time;
$scope.place = constant.Place;
$scope.comming = constant.Comming;
$scope.not_coming = constant.NotComming;
$scope.did_not_answer = constant.did_not_answer;
$scope.actions = constant.Actions;
$scope.edit = constant.Edit;
$scope.live = constant.Live;
$scope.offline = constant.Offline;
$scope.delete = constant.Delete;
$scope.add_new_meeting = constant.addNewMeeting;
$scope.next_meeting = constant.Next_Meeting;
$scope.currentPage = 1;


 $scope.activeMenu ="Suggestions and Ideas";


 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }


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
        $route.reload();
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


    $scope.createIdea = function(){
        $location.path('/newIdea');
    };

    $scope.editIdea = function(ideaData){
       dataSharingService.addEditData(ideaData);
      $location.path('/editIdea');
    };



      gettingData = function(){

         var requestObject ={
                                    "bid": constant.bid,
                                    "pageno":$scope.currentPage,
                                    "userListObj": 
                                    {
                                        "ul": 
                                            [   
                                                {
                                                    "usNa":$rootScope.userName
                                                }
                                            ]
                                    },
                                    "criteria":
                                        {
                                            "criteria": "FALSE"
                                        }
                                };

       services.getAllIdeas(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                              $scope.IdeasData = data.suggestionIdeaListObj.suggestionideadtoLs;
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
   };
    
    gettingData();


         

    $scope.pageNumber = function(pageno){

     $scope.currentPage = pageno;
      gettingData();

    };


       $scope.statusUpdate = function(ideaStatus,ideaData){

updateMeetingStatus = function(){
          
        var status;

        if (ideaStatus == "offline") {
            status = "online";
        }else if(ideaStatus =="online"){
              status = "offline";
        }  

        var requestObject =
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
        });

                                };
                


        var date = ideaData.suggideadate;


         var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateMeetingStatus();
        /*if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateMeetingStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Summary!");
                return;
        }*/

             
    };





    $scope.deleteIdea = function (ideaData) {

     if (confirm('Are you sure you want to delete Suggestions and Ideas?')) {


               // alert("Service need to intigreate.");
        console.log("deleteMeetingData:" + JSON.stringify(ideaData));


              var requestObject = {
                                    "bid": constant.bid,
                                    "suggestionIdeaListObj": 
                                        {
                                            "suggestionideadtoLs": 
                                                [
                                                    {
                                                    "subject":ideaData.subject,
                                                    "detail": ideaData.detail,
                                                    "creator":$rootScope.userName,
                                                    "suggideadate":ideaData.suggideadate,
                                                    "suggideatime":"00:00:00",
                                                    "status":"delete",
                                                    "suggideaid":ideaData.suggideaid
                                                        }
                                                ]
                                        }
                                };

     
                                
            services.deleteIdea(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                             //  $location.path('/MeetingDashboard'); 
                             //allMeeitngsRequest();
                              gettingData();                       
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });




    
} else {
     return;
}

       

    };




   
}]);

app.controller('newIdeaController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {


 $scope.activeMenu ="Suggestions and Ideas";



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



$scope.save = function(idea){

  $scope.detail = angular.element('#jqte-test4').val();

  var requestObject = {
   "bid": constant.bid,
   "suggestionIdeaListObj": {"suggestionideadtoLs": [   {
      "subject": idea.subject,
      "detail":  $scope.detail,
      "suggideadate": idea.date,
      "suggideatime": "00:00:00",
      "creator": $rootScope.userName,
      "status": "offline"
   }]}
};

    services.createNewsIdea(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 //allMeeitngsRequest();  
                 $location.path('/ideas');                     
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });


};

$scope.cancel = function(){
   $location.path('/ideas'); 
};




   
}]);
app.controller('editIdeaController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   
   

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

    $scope.activeMenu ="Suggestions and Ideas";

    $scope.idea = dataSharingService.getEditData()[0];
    
    angular.element('#jqte-test5').parent().parent().find(".jqte_editor").html( $scope.idea.detail );


   $scope.save = function(ideaData){

    updateNewsStatus = function(){

        $scope.detail = angular.element('#jqte-test5').val();
        

        var requestObject = {
                                    "bid": constant.bid,
                                    "suggestionIdeaListObj": 
                                        {
                                            "suggestionideadtoLs": 
                                                [
                                                    {
                                                    "subject":ideaData.subject,
                                                    "detail": ideaData.detail,
                                                    "creator":$rootScope.userName,
                                                    "suggideadate":ideaData.suggideadate,
                                                    "suggideatime":"00:00:00",
                                                    "status":ideaData.status,
                                                    "suggideaid":ideaData.suggideaid
                                                        }
                                                ]
                                        }
                                };

     
           
     
                                
            services.updateIdea(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                $location.path('/ideas');            
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = ideaData.suggideadate;


         var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateNewsStatus();
        /*if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
           updateNewsStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Suggestions and Ideas!");
                return;
        }*/


    };

    $scope.cancel = function(){
   $location.path('/ideas'); 
};


}]);