app.controller('newsLetterController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
 //  alert("newsLetterController");



$scope.fotterTitle = constant.footer_title;
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
 $scope.activeMenu ="News Letter";



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
        $route.reload();
         $location.path('/newsLetterList');
    };

    $scope.summaryDashBoard = function(){
       
        $location.path('/summary');
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
    $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };




      newsLetterListCall = function(){

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


       services.allnewsRequest(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                              $scope.newsLetterList = data.newsLetterListObj.newsletterdtoLs;
                              
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
    
  //  allMeeitngsRequest();
  newsLetterListCall();


    $scope.createNewsLetter = function(){
         $location.path('/createNewsLetter');
    };

    $scope.editNews = function (editNewsData) {

          try{
            dataSharingService.addEditData(editNewsData);
          }catch(error){
            console.log("error is :" + error);
          };
         $location.path('/editNewsLetter');
    };

    $scope.pageNumber = function(pageno){

     $scope.currentPage = pageno;
      newsLetterListCall();

    }

    $scope.deleteNews = function (newsData) {

     if (confirm('Are you sure you want to delete News?')) {



               // alert("Service need to intigreate.");
        console.log("delete news Data:" + JSON.stringify(newsData));


              var requestObject = {
                                    "bid": constant.bid,
                                    "newsLetterListObj": 
                                        {
                                            "newsletterdtoLs": 
                                                [
                                                    {
                                                    "subject":newsData.subject,
                                                    "detail": newsData.detail,
                                                    "creator":$rootScope.userName,
                                                    "status":"delete",
                                                    "nlid":newsData.nlid
                                                        }
                                                ]
                                        }
                                };

     
                                
            services.updateNewsLetter(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
               // alert("SUCCESS");
                             //  $location.path('/MeetingDashboard'); 
                            // allMeeitngsRequest();  
                            newsLetterListCall();                     
                            }else{
                                alert("Service :"+ status.msg);
                            }
        });




    
} else {
     return;
}

       

    };


    



    $scope.statusUpdate = function(newsStatus,newsData){

updateNewsStatus = function(){
          
        var status;

        if (newsStatus == "offline") {
            status = "online";
        }else if(newsStatus =="online"){
              status = "offline";
        }  

        var requestObject =
            {
                "bid": constant.bid,
                "newsLetterListObj": 
                {
                    "newsletterdtoLs": 
                    [
                        {
                            "subject":newsData.subject,
                            "nldate":newsData.nldate,
                            "nltime":"12:12:12",
                            "detail": newsData.detail,
                            "creator":$rootScope.userName,
                            "status":status,
                            "nlid":newsData.nlid
                        }
                    ]
                }
            };

     
                                
            services.updateNewsLetter(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 newsLetterListCall();                     
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = newsData.nldate;


         var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateNewsStatus();
        /*if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {           
           updateNewsStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Meetings!");
                return;
        }*/

             
    };


   
}]);
app.controller('createNewsLetterController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {

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
    $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };
   //var attachmentObject ={};




 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }
 
  var attachmentList =[];
  $scope.fileNames =[];

$scope.listOptions = ["Image","Document"];
$scope.selctedOption = "Document";
$scope.file = null;
$scope.files =[];
      $scope.$watch('file', function (newVal) {
        try {
          if (newVal != undefined || newVal != null){
             
              var _validFileExtensions = [".jpg", ".jpeg", ".png",".txt",".pdf",".doc",".docx",".xls",".xlsx"];
             

              function Validate(oForm) {

              var sFileName = oForm.name;
             
             if (sFileName.length > 0) {

                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                          $scope.fileNameIs = $scope.file.name;

                         if ( $scope.documentTitle == null || $scope.documentTitle == undefined || $scope.documentTitle == '') {
                  $scope.documentTitle = $scope.file.name;
                  $scope.fileNameIs = $scope.file.name;
              }

               $scope.fileNameIs = $scope.file.name;

                        var attachmentObject ={
                                  'attachmentTitle':$scope.documentTitle,
                                  'featureType': "newsletter",
                                  'attachmentName':$scope.file.name,
                                  'attachmentType': $scope.selctedOption,
                                  'file': newVal
                            }
                        attachmentList.push(attachmentObject);
                        $scope.fileNames.push({'title':$scope.documentTitle, 'name':$scope.file.name })

                        $scope.documentTitle = null;
                        $scope.file = null;

                       // alert("File Upload SUCCESSFully..");

                        break;
                    }
                }
                
                if (!blnValid) {
                    alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    $scope.documentTitle = null;
                    return false;
                }
            }
    return true;
};    
          Validate(newVal);

          }
      
      } catch(error){
           console.log("File Error is:" + error);
        }
      })


      $scope.close = function(id){
        attachmentList.splice(id, 1);
         $scope.fileNames.splice(id,1);

         console.log("attachmentList" + JSON.stringify(attachmentList));
         console.log("fileNames:" + JSON.stringify($scope.fileNames));

      };


//alert("createNewsLetterController");
$scope.date = constant.Date;
$scope.fotterTitle = constant.footer_title;
$scope.saveNewsLetter = function(newNews){


    $scope.detail = angular.element('#jqte-test').val();

    var requestObject = {
   "bid":constant.bid,
   "newsLetterListObj": {"newsletterdtoLs": [   {
      "subject": newNews.subject,
      "detail": $scope.detail,
      "nldate":newNews.meetdate,
      "nltime":"12:00:00",
      "creator":$rootScope.userName,
      "status": "offline"
   }]}
};
 $scope.featureId ;

     services.createNewsLetters(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                	
                	if(attachmentList.length == 0){
                		  $location.path('/newsLetterList'); 
                		}else{

                  $scope.featureType = "newsletter";
                  $scope.documentName;
                  $scope.featureId = data.newsLetterListObj.newsletterdtoLs[0].nlid;

                    var fd;

                    var j =0;

                       for(var i = 0; i < attachmentList.length;i++ ){
                       fd = new FormData();
                       fd.append("file",attachmentList[i].file);
                       $scope.eachDocName = attachmentList[i].attachmentName;
                       $scope.eachDocTitle = attachmentList[i].attachmentTitle;
                       $scope.eachDocSelectedType = attachmentList[i].attachmentType;
                       services.fileUpload($scope.eachDocTitle,$scope.featureType,$scope.featureId,$scope.eachDocName,fd,$scope.eachDocSelectedType).then(function(data1){           
                       console.log("Data is:" + JSON.stringify(data));
                       var status1 = data1.resStatus;
                      if (status1.code == "00" &&  status1.msg =="SUCCESS") {
                        j = j+ 1;
                       if (j == attachmentList.length) {
                       // alert("done....");
                       $location.path('/newsLetterList'); 
                       }

                 //allMeeitngsRequest();  
                // $location.path('/newsLetterList');                     
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });
                     }
          
                 }
              
                                
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });



};





 $scope.cancel = function(){
   $location.path('/newsLetterList'); 
 };


   
}]);
app.controller('newsLetterEditController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
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
    $scope.IdeaDashBoard = function(){
        $location.path('/ideas')
    };



 if ($rootScope.userName == undefined || $rootScope.userName == null) {
         $location.path('/login');
    }
   
    $scope.nl = dataSharingService.getEditData()[0];

     var attachmentList=[];
    $scope.fileNames =[];

 var listOfFileNames=  $scope.nl.attachmentlist.attachmentdtoLs;

 $scope.fileNames = listOfFileNames;

 attachmentList =$scope.nl.attachmentlist.attachmentdtoLs;

 $scope.detail = $scope.nl.detail;

$scope.listOptions = ["Image","Document"];
$scope.selctedOption = "Document";

$scope.file = null;
$scope.files =[];


      $scope.$watch('file', function (newVal) {
        try {
          if (newVal != undefined || newVal != null){
              $scope.fileNameIs = $scope.file.name;
              var _validFileExtensions = [".jpg", ".jpeg", ".png",".txt",".pdf",".doc",".docx",".xls",".xlsx"];
             

              function Validate(oForm) {

              var sFileName = oForm.name;
             
             if (sFileName.length > 0) {

                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {

                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                         if ( $scope.documentTitle == null || $scope.documentTitle == undefined || $scope.documentTitle == '') {
                $scope.documentTitle = $scope.file.name;
              }

                        var attachmentObject ={
                                  'attachmentTitle':$scope.documentTitle,
                                  'featureType': "newsletter",
                                  'attachmentName':$scope.file.name,
                                  'attachmentType': $scope.selctedOption,
                                  'file': newVal,
                                  'title':$scope.documentTitle
                            }
                        attachmentList.push(attachmentObject);
                       // $scope.fileNames.push({'title':$scope.documentTitle, 'name':$scope.file.name })

                        $scope.documentTitle = null;
                        $scope.file = null;

                        //alert("File Upload SUCCESSFully..");

                        break;
                    }
                }
                
                if (!blnValid) {
                    alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    $scope.documentTitle = null;
                    return false;
                }
            }
    return true;
};    
          Validate(newVal);

          }
      
      } catch(error){
           console.log("File Error is:" + error);
        }
      })

  $scope.cancel = function(){
   $location.path('/newsLetterList'); 
 };



                         angular.element('#jqte-test1').parent().parent().find(".jqte_editor").html( $scope.nl.detail );

                          $scope.featureId ;


   $scope.saveNewsLetter = function(nl){

    updateNewsStatus = function(){

        $scope.detail = angular.element('#jqte-test1').val();
          
        var requestObject =
            {
                "bid": constant.bid,
                "newsLetterListObj": 
                {
                    "newsletterdtoLs": 
                    [
                        {
                            "subject":nl.subject,
                            "nldate":nl.nldate,
                            "nltime":"00:00:00",
                            "detail": $scope.detail,
                            "creator":$rootScope.userName,
                            "status":nl.status,
                            "nlid":nl.nlid
                        }
                    ]
                }
            };

     
                                
            services.updateNewsLetter(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {

                  if(attachmentList.length == 0){
                      $location.path('/newsLetterList'); 
                    }else{

                  $scope.featureType = "newsletter";
                  $scope.documentName;
                  $scope.featureId = data.newsLetterListObj.newsletterdtoLs[0].nlid;

                    var fd;

                    var j =0;

                       for(var i = 0; i < attachmentList.length;i++ ){
                         
                         if (attachmentList[i].title == undefined) {
                          j = j + 1; 
                          
                         } else {

                       fd = new FormData();
                       fd.append("file",attachmentList[i].file);
                       $scope.eachDocName = attachmentList[i].attachmentName;
                       $scope.eachDocTitle = attachmentList[i].attachmentTitle;
                       $scope.eachDocSelectedType = attachmentList[i].attachmentType;
                       services.fileUpload($scope.eachDocTitle,$scope.featureType,$scope.featureId,$scope.eachDocName,fd,$scope.eachDocSelectedType).then(function(data1){           
                       console.log("Data is:" + JSON.stringify(data));
                       var status1 = data1.resStatus;
                      if (status1.code == "00" &&  status1.msg =="SUCCESS") {
                        j = j+ 1;
                       if (j == attachmentList.length) {
                       // alert("done....");
                       $location.path('/newsLetterList'); 
                       }

                 //allMeeitngsRequest();  
                // $location.path('/newsLetterList');                     
             }
                else
            {
                //alert("Service :"+ status.msg);
                $location.path('/newsLetterList'); 
            }
        });
                     }
                     }

          
                 }

             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

                                };
                


        var date = nl.nldate;


         var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateNewsStatus();/*
        if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
           updateNewsStatus();
        } else{
                alert("Sorry,You can't Update Past Date for News!");
                return;
        }*/


    };

       $scope.close = function(id){
  
       $scope.nl.attachmentlist.attachmentdtoLs.splice(id,1);
       $scope.fileNames.splice(id,1);
       attachmentList.splice(id,1);

         console.log("attachmentList" + JSON.stringify($scope.nl));
         console.log("fileNames:" + JSON.stringify($scope.fileNames));

      };

}]);
