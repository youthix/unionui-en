app.controller('newContactController',['$scope','$location','services','constant','dataSharingService','$rootScope','$route', function ($scope,$location,services,constant,dataSharingService,$rootScope,$route) {


 $scope.activeMenu ="Contact List";



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

$scope.addProfile = function(){
   $location.path('/miniContactProfile');
};


$scope.save = function(summary){

  


};



$scope.validateExtension=function(oForm) {
  var _validFileExtensions = [".jpg", ".jpeg", ".png"];
    var sFileName = oForm.name;   
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
          var sCurExtension = _validFileExtensions[j];
          if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
              blnValid = true;
              return blnValid;
         }
    }
  } 
};  

    $scope.$watch('file', function (newVal) {
        try {
          if (newVal != undefined && newVal != null){
            
            if(!$scope.validateExtension(newVal)){
                alert($filter("i18n")("Invalid file extension! Only images with .png,.jpg,.jpeg extensions/formats are supported !"));
                return false;
              }  
            
                $scope.image = newVal;
                
                $scope.imageName=newVal.name;

                  var reader = new FileReader();
                     reader.onload = function (e) {

                       console.log("File data is:" + e.target.result);
                       
                        $scope.realImage = true;
                         $scope.defualtImage = false;
                         //newVal=

                       $scope.$apply(function() {
                            $("#blah").show();
                            $scope.uploadImageFlag=true;                            
                              $('#blah').attr('src', e.target.result);
                       });
                };
                reader.readAsDataURL(newVal);
          }
      } catch(error){
           console.log("File Error is:" + error);
        }
 });

$scope.save = function(){
var requestObject = {
              "bid": "123",
              "userListObj": {"ul": [   {
                "usNa":  $scope.profileData.usNa,
                "pwd":  $scope.profileData.pwd,
                "fn":  $scope.profileData.fn,
                "ln":  $scope.profileData.ln,
                "joinDt": $scope.profileData.joinDt,
                "age":  $scope.profileData.age,
                "gen":  $scope.profileData.gen,
                "add":  $scope.profileData.add,
                "city":  $scope.profileData.city,
                "zipcode": $scope.profileData.zipcode,
                "conNu": $scope.profileData.conNu,
                "emId":  $scope.profileData.emId,
                "role": $scope.profileData.role,
                "category":$scope.profileData.category,
                "title":$scope.profileData.title,
                "status":"a"
   }]}
};
}
   
}]);