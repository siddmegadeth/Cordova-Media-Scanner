
angular.module("cordova.file.media",[]).service('Media',['$q','$rootScope',function ($q,$rootScope) {

	//var permission =undefined;
	
return {
		permission : function(callback)
		{
			var READ,WRITE=undefined;
			var permissionType =undefined;

			if(window.cordova)
			{ 
						/*Request Runtime PErmissions*/
				cordova.plugins.diagnostic.requestRuntimePermissions(function(statuses)
				{
			    for (var permission in statuses)
			    {
			        switch(statuses[permission])
			        {
			            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
			             {   
			             //	permission ="GRANTED";
			                log("Permission granted to use "+permission);
			                if(permission=="WRITE_EXTERNAL_STORAGE")
			               	{
			               			WRITE =true;
									//defer.resolve(fileTypeCollection);
							}
							 if(permission=="READ_EXTERNAL_STORAGE")
			               	{
			               			READ =true;
									//defer.resolve(fileTypeCollection);
							}
			                break;
			            	/*Case Ends*/
			             }
			             

			            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
			            {
			                log("Permission to use "+permission+" has not been requested yet");
							permissionType ="NOT_REQUESTED";
			                break;
			            }
			            case cordova.plugins.diagnostic.permissionStatus.DENIED:
			            {
			             	permissionType ="DENIED";
			                log("Permission denied to use "+permission+" - ask again?");
			                break;
			            }
			            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
			            {
			            	permissionType ="DENIED_ALWAYS";
			                log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
			                break;
			        	}
			        }
			    }

			    /*Check Permission*/
			    if(WRITE && READ)
			    {
			    	permissionType = "GRANTED";
			    	callback(permissionType);
			    }
			    else
			    {
			    	callback(permissionType);
			    }


			}, function(error)
			{
			    console.error("The following error occurred: "+error);
			    callback(error);
			},
			[
			    cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE,
			    cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE
			]);
		 log("EO Permission Scan in Cordova ENV");
		}
		else
		{
			log("No Cordova Installed.Cannot Seek Permission");
			callback();
		}

		log("Permission ENDS");

		},
		scan : function(url,fileType)
		{
			var defer = $q.defer();

			if(window.cordova)
			{

					var fileTypeCollection = [];

					url.forEach(function(element, index) 
					{
					//requestLocalFileSystemURL
					log(element);
					window.resolveLocalFileSystemURL(element,onRequestFileSystem, fail);

					log("Ends resolve");
					});


					function onRequestFileSystem(fileSystem) 
					{
					//log(fileSystem.toURL());
					log(fileSystem.toInternalURL());
					var directoryReader = fileSystem.createReader();
					directoryReader.readEntries(onReadEntries,fail);


					} /*onRequestFile Ends*/

					function onReadEntries(entries) 
					{

					entries.forEach( function(element, index) 
					{

						if (element.isDirectory === true) 
						{
						// Recursive -- call back into this subdirectory
							onRequestFileSystem(element);
						} 
						else if(element.isFile == true) 
						{

							fileType.forEach(function(type)
							{
								if(element.name.indexOf(type) != -1)
								{
									log(element.toURL());
									fileTypeCollection.push(element);
									defer.resolve(fileTypeCollection);
									//callback(fileTypeCollection);
								}
							});	
					} /*is File ENds*/

					});  /*Entries For Each Ends*/

					}  /*OnRead Ends*/

					function fail(resp)
					{

					log(resp);
					defer.resolve(fileTypeCollection);

					}  /*Fail Ends*/

			}
			else
			{
				log("No Cordova Installed.Cannot Seek File");
				defer.reject();
				//callback(undefined);

			}
			log(fileTypeCollection);
			log("Before Resolve");
			return  defer.promise;

		},  //Scan Function Ends
	
		removeDuplicates : function(originalArray, prop) 
		{
     		var newArray = [];
     		var lookupObject  = {};

		     for(var i in originalArray) {
        		lookupObject[originalArray[i][prop]] = originalArray[i];
     		}

     		for(i in lookupObject) {
         		newArray.push(lookupObject[i]);
     		}
      			return newArray;
 		}  //Remove Ends


	}  //Return Ends

}]);

