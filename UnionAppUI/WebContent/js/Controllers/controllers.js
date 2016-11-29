
app.controller('mainController',['$scope','$location', function ($scope,$location) {
	//alert("login loginController");
   
   $scope.headerVisable = true;
   $scope.loading = false;
   
   $scope.AmrDashBoard = function () {
       $location.path('/amr');
    };
   

}]);

app.controller('loginController',['$scope','$location','services','constant','$rootScope', function ($scope,$location,services,constant,$rootScope) {
	//alert("login loginController");
  
    $scope.title = constant.title;

    $scope.email = constant.email_placeHolder;
    $scope.password = constant.password_placeHolder;
    $scope.forget_password = constant.forget_password;
    $scope.login_button = constant.login_button;
    $scope.fotterTitle = constant.footer_title;

    // when click on logn button it will re direct to Dashboard.

    $scope.login = function (userData) {
         $scope.loading = true;
        
        var loginUserData = {
    "bid": constant.bid,
    "userListObj": {
        "ul": [
            {
                "pwd": userData.Password,
                "usNa":userData.Username
            }
        ]
    }
};

        console.log("userData:" + JSON.stringify(userData));
        services.login(loginUserData).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                   $rootScope.userName = data.userListObj.ul[0].usNa;
                               $location.path('/dashBoard');  
                                $scope.loading = false;                      
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

    	
    };

    $scope.forgotPassword = function () {
       $location.path('/forgotPassword');
    };

}]);

app.controller('dashBoardController',['$scope','$location','$rootScope', function ($scope,$location,$rootScope) {
      

      if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

    $scope.activeMenu ="Dashboard";

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

$scope.activeMenu ="Dashboard";
   
}]);


app.controller('MeetingDashboardController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   //alert("MeetingDashboardController");

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
 $scope.activeMenu ="Meetings";

 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

       $scope.MeetingDashboard = function(){
        // $scope.activeMenu ="Meetings";
        $route.reload();
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
      // $scope.activeMenu ="Activities";
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
        //  $scope.activeMenu ="News Letter";
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       //  $scope.activeMenu = "Summary";
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





      allMeeitngsRequest = function(){

         var fetchAllMeetingRequest ={
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

       services.allMeeitngsRequest(fetchAllMeetingRequest).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                              $scope.meetingsListData = data.meetingListObj.meetingdtoLs;
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
    
    allMeeitngsRequest();


    $scope.newMeeting = function(){
         $location.path('/newMeeting');
    };

    $scope.editMeeting = function (editMeetingData) {

          try{
            dataSharingService.addEditData(editMeetingData);
          }catch(error){
            console.log("error is :" + error);
          };
         $location.path('/editMeeting');
    };

    $scope.pageNumber = function(pageno){

     $scope.currentPage = pageno;
     allMeeitngsRequest();
    }

    $scope.deleteMeeting = function (meetingData) {

     if (confirm('Are you sure you want to delete Meeting?')) {


               // alert("Service need to intigreate.");
        console.log("deleteMeetingData:" + JSON.stringify(meetingData));


              var requestObject = {
                                    "bid": constant.bid,
                                    "meetingListObj": 
                                        {
                                            "meetingdtoLs": 
                                                [
                                                    {
                                                    "subject":meetingData.subject,
                                                    "detail": meetingData.detail,
                                                    "creator":$rootScope.userName,
                                                    "venue": meetingData.venue,
                                                    "status":"delete",
                                                    "meetingid":meetingData.meetingid
                                                        }
                                                ]
                                        }
                                };

     
                                
            services.updateMeeting(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                             //  $location.path('/MeetingDashboard'); 
                             allMeeitngsRequest();                       
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });




    
} else {
     return;
}

       

    };


    



    $scope.statusUpdate = function(meetingStatus,meetingData){

updateMeetingStatus = function(){
          
        var status;

        if (meetingStatus == "offline") {
            status = "online";
        }else if(meetingStatus =="online"){
              status = "offline";
        }  

        var requestObject =
            {
                "bid": constant.bid,
                "meetingListObj": 
                {
                    "meetingdtoLs": 
                    [
                        {
                            "subject":meetingData.subject,
                            "detail": meetingData.detail,
                            "creator":$rootScope.userName,
                            "venue": meetingData.venue,
                            "meetdate":meetingData.meetdate,
                            "meettime":meetingData.meettime,
                            "status":status,
                            "meetingid":meetingData.meetingid
                        }
                    ]
                }
            };

     
                                
            services.updateMeeting(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 allMeeitngsRequest();                       
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = meetingData.meetdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateMeetingStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Meetings!");
                return;
        }

             
    };


   
}]);

app.controller('newMeetingController',['$scope','$location','services','constant','$rootScope', function ($scope,$location,services,constant,$rootScope) {
  // alert("newMeetingController");
  
    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;
    $scope.activeMenu ="Meetings";


     $scope.MeetingDashboard = function(){
        // $scope.activeMenu ="Meetings";
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
      // $scope.activeMenu ="Activities";
         $location.path('/activitiesList');   // it will redirect to activities Page Activities
    };

    $scope.NewsLetterDashboard = function(){
         // $scope.activeMenu ="News Letter";
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
         //$scope.activeMenu = "Summary";
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



   // $scope.todayData = new Date();
 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

    $scope.saveMeeting = function(meeting){

      console.log( angular.element('#timepickerId').val() );

   $scope.timeIs = angular.element('#timepickerId').val();

    saveMeetingCall = function(){


         var requestObject = {
                                "bid": constant.bid,
                                "meetingListObj": 
                                    {
                                        "meetingdtoLs": 
                                            [
                                                {
                                                    "subject": meeting.subject,
                                                    "detail": meeting.detail,
                                                    "venue": meeting.venue,
                                                    "meetdate": meeting.meetdate,
                                                    "meettime": $scope.timeIs,
                                                    "creator": $rootScope.userName,
                                                    "status": "offline"
                                                }
                                            ]
                                    }
                                };

                                console.log("meeting requestObject is:" + JSON.stringify(requestObject));

            services.newMeetingCreate(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/MeetingDashboard');                        
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });


    };

      var date = meeting.meetdate;

      //d1.getTime() > d2.getTime()

        var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        d1.setHours(0,0,0,0);

        var d2 = new Date();
        d2.setHours(0,0,0,0);
       
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           saveMeetingCall();
        } else{
                alert("Sorry,You can't Create Past Date Meetings!");
                return;
        }
         
    };

    $scope.cancelMeeting = function(){
       $location.path('/MeetingDashboard');
    };

   
}]);

app.controller('forgotPasswordController',['$scope','$location','services','constant', function ($scope,$location,services,constant) {

 
    $scope.submit = function(user){
            var requestObject = {
                                    "bid": constant.bid,
                                    "userListObj": 
                                        {
                                            "ul":
                                                 [   
                                                    {
                                                        "usNa": user.email
                                                    }
                                                ]
                                        }
                                };

                                console.log("meeting requestObject is:" + JSON.stringify(requestObject));

            services.forgotPassword(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/login');                        
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

    };

   
}]); 

app.controller('editMeetingController',['$scope','$location','services','constant','$rootScope','dataSharingService', function ($scope,$location,services,constant,$rootScope,dataSharingService) {
  // alert("newMeetingController");

   if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

  $scope.activeMenu ="Meetings";

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


  
    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;


    $scope.meeting = dataSharingService.getEditData()[0];
    $scope.meeting_id = $scope.meeting.meetingid;
    $scope.meeting_status = $scope.meeting.status;

    $scope.saveMeeting = function(meeting){


     


        editDataSaveCall = function(){
            var requestObject = {
                                    "bid": constant.bid,
                                    "meetingListObj": 
                                        {
                                            "meetingdtoLs": 
                                                [
                                                    {
                                                    "subject":meeting.subject,
                                                    "detail": meeting.detail,
                                                    "meetdate":meeting.meetdate,
                                                    "meettime":meeting.meettime,
                                                    "creator":$rootScope.userName,
                                                    "venue": meeting.venue,
                                                    "status": $scope.meeting_status,
                                                    "meetingid":$scope.meeting_id
                                                        }
                                                ]
                                        }
                                };


                                console.log("meeting requestObject is:" + JSON.stringify(requestObject));

            services.updateMeeting(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/MeetingDashboard');                        
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });



        };

           var date = meeting.meetdate;

        var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           editDataSaveCall();
        } else{
                alert("Sorry,You can't Update Past Date for Meetings!");
                return;
        }
    };

    $scope.cancelMeeting = function(){
           $location.path('/MeetingDashboard'); 
    };

   
}]);
app.controller('newActivitieController',['$scope','$location','services','constant','$rootScope','dataSharingService', function ($scope,$location,services,constant,$rootScope,dataSharingService) {
  // alert("newMeetingController");
   if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }


    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;
    $scope.new_activity = constant.newActivity;
    $scope.save_activity = constant.saveActivity;

     $scope.activeMenu ="Activities";


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


    $scope.change = function(contents) {
    console.log('contents are changed:', contents, $scope.editable);
  };


    //$scope.meeting = dataSharingService.getEditData()[0];

    $scope.saveActivitie = function(activitie){
    
  // alert( $scope.text);

      saveActivitieCall = function(){

              console.log( angular.element('#timepickerId1').val() );

             $scope.timeIs = angular.element('#timepickerId1').val();


            


             var requestObject = {
                                "bid": "123",
                                "activityListObj": {"activitydtoLs": [   {
                                "subject": activitie.subject,
                                "detail": activitie.detail,
                                "venue": activitie.venue,
                                "actdate": activitie.meetdate,
                                "acttime":  $scope.timeIs,
                                "creator": $rootScope.userName,
                                "status": "offline"
                                 }]}
                             };

             console.log("activitie requestObject is:" + JSON.stringify(requestObject));

            services.newActivitieCreate(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/activitiesList');                      
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });
          };


              var date = activitie.meetdate;

         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           saveActivitieCall();
        } else{
                alert("Sorry,You can't Update Past Date for Actvities!");
                return;
        }
       
    };

    $scope.cancel = function(){
       $location.path('/activitiesList');
    };

   
}]);
app.controller('activitiesDashboardController',['$scope','$location','services','constant','$rootScope','dataSharingService','$route', function ($scope,$location,services,constant,$rootScope,dataSharingService,$route) {
  // alert("newMeetingController");
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
$scope.add_new_activity = constant.addNewActivity;
$scope.new_activity = constant.newActivity;
 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

 $scope.activeMenu ="Activities";
 
    $scope.MeetingDashboard = function(){
       
         $location.path('/MeetingDashboard'); //MeetingDashboardController
    };

    $scope.ActivitiesDashboard = function(){
     $route.reload();
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

   // getting all meeting service request:

   allActivitiesCall = function(){

      if ($scope.pageNumberIs == null || $scope.pageNumberIs == undefined) {
        $scope.pageNumberIs = 1;
      }else{
        $scope.pageNumberIs = $scope.pageNumberIs;
      }

   var fetchAllActivitiesRequest ={
                                    "bid": constant.bid,
                                    "pageno":$scope.pageNumberIs,
                                    "userListObj": {"ul": [   {
                                    "usNa":$rootScope.userName
                                  }]},
                                  "criteria":    {
                                  "criteria": "FALSE"
                                  }
                              };


       services.allActivities(fetchAllActivitiesRequest).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                              
                              $scope.allActivitiesListData = data.activityListObj.activitydtoLs;
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
     
      allActivitiesCall();


    $scope.newActivitie = function(){
         $location.path('/newActivitie');
    };

    $scope.pageNumber = function(pageno){
      $scope.pageNumberIs = pageno;
      allActivitiesCall();
    };

    $scope.editActivitie = function (editActivitieData) {

          try{
            dataSharingService.addEditData(editActivitieData);
          }catch(error){
            console.log("error is :" + error);
          };
         $location.path('/editActivitie');
    };

    $scope.deleteActivitie = function (deleteActivitieData) {
       // alert("Service need to intigreate.");
        console.log("deleteActivitieData:" + JSON.stringify(deleteActivitieData));

        if (confirm('Are you sure you want to delete Activity?')) {


              var requestObject = {
                                    "bid": constant.bid,
                                    "activityListObj": 
                                        {
                                            "activitydtoLs": 
                                                [
                                                    {
                                                    "subject":deleteActivitieData.subject,
                                                    "detail": deleteActivitieData.detail,
                                                    "creator":$rootScope.userName,
                                                    "venue": deleteActivitieData.venue,
                                                    "status":"Delete",
                                                    "activityid":deleteActivitieData.activityid
                                                        }
                                                ]
                                        }
                                };

     
                                
            services.updateActivitie(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                             //  $location.path('/MeetingDashboard'); 
                             allActivitiesCall();                      
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

          }else{
            return;
          }
    };


    $scope.statusUpdate = function(activityStatus,activityData){

              updateActivityStatus = function(){
          
                  var status;

        if (activityStatus == "offline") {
            status = "online";
        }else if(activityStatus =="online"){
              status = "offline";
        }  




var requestObject   = {
   "bid":constant.bid,
   "activityListObj": {"activitydtoLs": [   {
    "subject":activityData.subject,
    "detail": activityData.detail,
    "creator":$rootScope.userName,
    "venue": activityData.venue,
    "status":status,
    "actdate":activityData.actdate,
    "acttime":activityData.acttime,
    "activityid":activityData.activityid
   }]}
};

                                
            services.updateActivitie(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 allActivitiesCall();                       
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = activityData.actdate;
         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateActivityStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Activities!");
                return;
        }

             
    };


   
}]);
app.controller('editActivitieController',['$scope','$location','services','constant','$rootScope','dataSharingService', function ($scope,$location,services,constant,$rootScope,dataSharingService) {
  // alert("newMeetingController");
  
    $scope.date = constant.Date;
    $scope.time = constant.Time;
    $scope.place = constant.Place;
    //$scope.comming = constant.Comming;
    //$scope.not_coming = constant.NotComming;
    //$scope.did_not_answer = constant.did_not_answer;
    //$scope.actions = constant.Actions;
    $scope.edit = constant.Edit;
    $scope.live = constant.Live;
    $scope.offline = constant.Offline;
    $scope.delete = constant.Delete;
    //$scope.add_new_button = constant.addNewButton;
    $scope.next_meeting = constant.Next_Meeting;
    $scope.subject = constant.Subject;
    $scope.details = constant.Details;
    $scope.edit_activitiy = constant.editActivity;
    $scope.save_activity = constant.saveActivity;
     if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
      }

    $scope.activeMenu ="Activities";

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



    $scope.activitie = dataSharingService.getEditData()[0];

    $scope.saveActivitie = function(activitie){


      updateActivitieCall = function(){
            var requestObject = {
                                    "bid": constant.bid,
                                    "activityListObj": 
                                        {
                                            "activitydtoLs": 
                                                [
                                                    {
                                                    "subject":activitie.subject,
                                                    "detail": activitie.detail,
                                                    "creator":$rootScope.userName,
                                                    "actdate":activitie.actdate,
                                                    "acttime":activitie.acttime,
                                                    "venue": activitie.venue,
                                                    "status":activitie.status,
                                                    "activityid":activitie.activityid
                                                        }
                                                ]
                                        }
                                };

                                   services.updateActivitie(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                               $location.path('/activitiesList'); 
                                                
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });

      };

          var date = activitie.actdate;
         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateActivitieCall();
        } else{
                alert("Sorry,You can't Update Past Date for Activities!");
                return;
        }
    };


    $scope.cancel = function(){
      $location.path('/activitiesList'); 
    };

   
}]);