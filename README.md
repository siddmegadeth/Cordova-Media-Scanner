# Cordova-Media-Scanner
Scan Files/Folders on Android Storage Device/Internal Device


 # Installation
The following are required to make the Media Scanner work properly in a Android platform. Follow the below instruction.

- Install https://github.com/apache/cordova-plugin-file  using npm cordova
Refer to Android File System layout.
- Install https://github.com/dpa99c/cordova-diagnostic-plugin to manage external/internal storage for Marshmallow 6.0. It will ask for permission .For  < 6.0  it will automatically works.
- add reference to media-scan.js in HTML5 Markup
- Add reference to Angularjs . This is a Angularjs based cordova project
- After reference has been added then kindly add cordova.file.media as a DI 

```sh
var app = angular.module("myApp",["cordova.file.media"]);

```
Then in a Controller Inject Media

```sh
app.controller('globalCtrl', ['Media','$q',function (Media,$q) 
{

});
```
To call the Media Scanner.

```sh
    var url =   [
              "file:///storage/emulated/0/",
              "file:///mnt/sdcard/",
              "file:///sdcard/",
              cordova.file.dataDirectory,
              cordova.file.externalApplicationStorageDirectory,
              cordova.file.externalCacheDirectory,
              cordova.file.externalRootDirectory,
              cordova.file.externalDataDirectory,
              "file:///storage/emulated/0/"
              ];
              
    fileType = ["mp3","ogg","wav"];              
    
     Media.permission(function(resp)
     {
      if(resp=="GRANTED")
      {
         //load Loader
         var respArray =[];
         var file = Media.scan(url,fileType);
         
            file.then(function(resp)
            {
              if(resp.length!=0)
              {
  
                $scope.fileScan = Media.removeDuplicates(resp,"name");  //remove duplicaes based on Name
              }
          
            });
      }
      else if(resp=="NOT_REQUESTED")
      {
        Media.permission();
      }
      else if(resp=="DENIED")
      {
        Media.permission();
      }
      else if(resp=="DENIED_ALWAYS")
      {
         Media.permission();
      }
      else if(resp=="DENIED_ALWAYS")
      {
         Media.permission();    
      }

     });  //Func Ends



```

# Function Reference
 - Media.permission(cb) : this is a async func which check for permission if on marshmallow 6.0 and above. For <6.0 it will not ask for permission. cb is a callback function.
 
 -  var file = Media.scan(url,fileType) :  It is a promises which return all the files based on the file Type. Kindly refer to the above example. The fileType is a file extension as an array. for url please refer to Android File System.  
 
 -  Media.removeDuplicates  : this function removes duplicates from the promise returned from Media.scan(url,fileType)
 

# Suggestion
If you have any suggestion please feel free to ping me. Please file a bug report if you have some so that i can make it more future proof and fault tolerance. 

# License
This is for the people. MIT. 


