app.controller('localAgreementsDashBoardController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
 //  alert("newsLetterController");
$scope.date = constant.Date;
$scope.time = constant.Time;
$scope.place = constant.Place;
$scope.comming = constant.Comming;
$scope.not_coming = constant.NotComming;
$scope.did_not_answer = constant.did_not_answer;
$scope.fotterTitle = constant.footer_title;
$scope.actions = constant.Actions;
$scope.edit = constant.Edit;
$scope.live = constant.Live;
$scope.offline = constant.Offline;
$scope.delete = constant.Delete;
$scope.add_new_meeting = constant.addNewMeeting;
$scope.next_meeting = constant.Next_Meeting;
$scope.currentPage = 1;
 //$scope.activeMenu ="News Letter";

 $scope.activeMenu ="Local Argeements";

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
        $location.path('/ideas');
    };

     $scope.LAGDashBoard = function(){
      $route.reload();
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

    
    $scope.createNewAgreement = function(){
        $location.path('/newAgreement');
    };

    $scope.editAgreement = function(agreementData){
       dataSharingService.addEditData(agreementData);
      $location.path('/editAgreement');
    };



      gettingData = function(){


      var requestObject = {
                      "bid": constant.bid,
                      "pageno":$scope.currentPage,
                      "userListObj": {"ul": [   {
                      "usNa": $rootScope.userName
                      }]},
                      "criteria":    {
                      "criteria": "FALSE"
                      }
                };

       services.getAllAgreements(requestObject).then(function(data) {
                                                    
             console.log("Data is:" + JSON.stringify(data));
             var status = data.resStatus;
             if (status.code == "00" &&  status.msg =="SUCCESS") {
                              $scope.agreementListData = data.agreementListObj.agreementdtoLs;
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


       $scope.statusUpdate = function(agreementStatus,agreement){

updateMeetingStatus = function(){
          
        var status;

        if (agreementStatus == "offline") {
            status = "online";
        }else if(agreementStatus =="online"){
              status = "offline";
        }  


              var requestObject ={
   "bid": constant.bid,
   "agreementListObj": {"agreementdtoLs": [   {
     "subject":agreement.subject,
      "detail": agreement.detail,
      "armdate": agreement.armdate,
      "armtime": "00:00:00",
      "creator":$rootScope.userName ,
      "status": status,
      "armid":agreement.armid
   }]}
};
     
                                
            services.AgreementUpdate(requestObject).then(function(data){
                                                    
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
                


        var date = agreement.armdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateMeetingStatus();
        /*if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           updateMeetingStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Agreement!");
                return;
        }*/

             
    };





    $scope.deleteAgreement = function (agreement) {

     if (confirm('Are you sure you want to delete Agreement?')) {


               // alert("Service need to intigreate.");
        console.log("deleteMeetingData:" + JSON.stringify(agreement));


            /*  var requestObject = {
                                    "bid": constant.bid,
                                    "summaryListObj": 
                                        {
                                            "summarydtoLs": 
                                                [
                                                    {
                                                    "subject":summaryData.subject,
                                                    "detail": agreement.detail,
                                                    "creator":$rootScope.userName,
                                                    "sumdate":summaryData.sumdate,
                                                    "sumtime":"00:00:00",
                                                    "status":"delete",
                                                    "sumid":summaryData.sumid
                                                        }
                                                ]
                                        }
                                };*/
            var requestObject ={
   "bid": constant.bid,
   "agreementListObj": {"agreementdtoLs": [   {
     "subject":agreement.subject,
      "detail": agreement.detail,
      "armdate": agreement.armdate,
      "armtime": "00:00:00",
      "creator":$rootScope.userName ,
      "status": "delete",
      "armid":agreement.armid
   }]}
};
     
                                
            services.AgreementUpdate(requestObject).then(function(data) {
                                                    
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

app.controller('newlocalAgreementController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {


 $scope.activeMenu ="Local Argeements";
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

 $scope.featureId ;
$scope.save = function(lag){

  $scope.detail = angular.element('#jqte-test5').val();

  newAgreementcall = function(){

var requestObject = {
   "bid": constant.bid,
   "agreementListObj": {"agreementdtoLs": [   {
      "subject": lag.subject,
      "detail": $scope.detail,
      "armdate": lag.armdate,
      "armtime": "00:00:00",
      "creator": $rootScope.userName,
      "status": "offline"
   }]}
};

    services.createNewAgreement(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {


                                  
                  if(attachmentList.length == 0){
                      $location.path('/localAgreements'); 
                    }else{

                  $scope.featureType = "agreement";
                  $scope.documentName;
                  $scope.featureId = data.agreementListObj.agreementdtoLs[0].armid;

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
                       $location.path('/localAgreements'); 
                       }                    
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

     var date = lag.armdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        newAgreementcall();
       /* if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           newAgreementcall();
        } else{
                alert("Sorry,You can't Update Past Date for Agreement!");
                return;
        }*/

             


};

$scope.cancel = function(){
   $location.path('/localAgreements'); 
};




   
}]);
app.controller('editlocalAgreementController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {
   
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


    
    $scope.activeMenu ="Local Argeements";

    $scope.agreement = dataSharingService.getEditData()[0];




     var attachmentList=[];
    $scope.fileNames =[];

 var listOfFileNames=  $scope.agreement.attachmentlist.attachmentdtoLs;

 $scope.fileNames = listOfFileNames;

 attachmentList =$scope.agreement.attachmentlist.attachmentdtoLs;



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


    
    angular.element('#jqte-test6').parent().parent().find(".jqte_editor").html( $scope.agreement.detail );


   $scope.save = function(agreement){

    updateNewsStatus = function(){

        $scope.detail = angular.element('#jqte-test6').val();
        

   



              var requestObject ={
   "bid": constant.bid,
   "agreementListObj": {"agreementdtoLs": [   {
     "subject":agreement.subject,
      "detail":$scope.detail,
      "armdate": agreement.armdate,
      "armtime": "00:00:00",
      "creator":$rootScope.userName ,
      "status":agreement.status,
      "armid":agreement.armid
   }]}
};
           
     
                                
            services.AgreementUpdate(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {

                 
                  if(attachmentList.length == 0){
                      $location.path('/localAgreements'); 
                    }else{

                  $scope.featureType = "agreement";
                  $scope.documentName;
                  $scope.featureId = data.agreementListObj.agreementdtoLs[0].armid;

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
                       
                      $location.path('/localAgreements'); 
                       }                    
             }
                else
            {
                //alert("Service :"+ status.msg);
                	 $location.path('/localAgreements'); 
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
                


        var date = agreement.armdate;


         var datearray = date.split("-");
        var newdate = datearray[1] + '-' + datearray[0] + '-' + datearray[2];
        var d1 = new Date(newdate);
        var d2 = new Date();
        d1.setHours(0,0,0,0);
        d2.setHours(0,0,0,0);
        updateNewsStatus();
        /*if ( (d1.getTime() == d2.getTime()) ||  (d1.getTime() > d2.getTime()) ) {
           //updateMeetingStatus();
           updateNewsStatus();
        } else{
                alert("Sorry,You can't Update Past Date for Summary!");
                return;
        }*/


    };

    $scope.cancel = function(){
   $location.path('/localAgreements'); 
};


    $scope.close = function(id){
       var deletedAttachment = $scope.agreement.attachmentlist.attachmentdtoLs.splice(id,1)[0];
       var fileName = deletedAttachment.url.split('/').pop();
       var attachmentType = deletedAttachment.type ==="doc"?"document":deletedAttachment.type;

      if(!deletedAttachment.hasOwnProperty("attachmentTitle")){
        var requestObject = {
          "bid": constant.bid,
          "deleteFileObj": {
            "featureType": "agreement",
            "featureId": $scope.agreement.armid,
            "fileName": fileName ,
            "attachmentType": attachmentType 
          }
        }
        services.deleteFile(requestObject).then(function(data){
                                                    
                console.log("Data is:" + JSON.stringify(data));
                var status = data.resStatus;
                if (status.code == "00" &&  status.msg =="SUCCESS") {
                 //newsLetterListCall();                     
             }
                else
            {
                alert("Service :"+ status.msg);
            }
        });

      }
       ///$scope.fileNames.splice(id,1);
       //attachmentList.splice(id,1);

         console.log("attachmentList" + JSON.stringify($scope.nl));
         console.log("fileNames:" + JSON.stringify($scope.fileNames));

      };


}]);