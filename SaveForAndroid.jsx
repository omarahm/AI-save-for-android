/**
* Remixer 1: @herkulano (http://www.herkulano.com)
* Remixer 2: @hotappsfactory (http://www.hotappsfactory.com)
* Remixer 3: @omaryoussef (http://www.youssef.io)
* Thanks to: Niels Bosma (niels.bosma@motorola.com)
*/

var folder = Folder.selectDialog();
var document = app.activeDocument;
var suffix;

if (document && folder) {
	suffix = "";//prompt("Prefix", "") || "";
}

if (document && folder) {
	var documentName = document.name.replace(".ai","");
	
	//saveToRes(100, documentName, "", documentName + "Ios", false);
	//saveToRes(200, documentName, "@2x", documentName + "Ios", false);	
	
    saveToRes(37.5, "", "", "drawable-ldpi/", true);
	saveToRes(50, "", "", "drawable-mdpi/", true);
	saveToRes(75, "", "", "drawable-hdpi/", true);
	saveToRes(100, "", "", "drawable-xhdpi/", true);
    saveToRes(150, "", "", "drawable-xxhdpi/", true);
    saveToRes(200, "", "", "drawable-xxxhdpi/", true);
}

/**
* Scale and export file suffixed by densitySuffix, in a specific folder named folderName
*/
function saveToRes(scaleTo, preffix, densitySuffix, folderName, lowerCase) {
	var i, ab, file, options;
		
	var myFolder = new Folder(folder.absoluteURI + "/" + folderName);
	if(!myFolder.exists) myFolder.create();
	
	for (i = document.artboards.length - 1; i >= 0; i--) {
		document.artboards.setActiveArtboardIndex(i);
		ab = document.artboards[i];
		
		if(ab.name.substr(0,9) == "Artboard ") continue;
		
		var fileName = preffix + ab.name + suffix;
		
		if(lowerCase){
			var fileNameLowerCase = "";
			
			for (var j = 0; j < fileName.length; j++) {
				if(isUpperCase(fileName.charAt(j))){
					if(j > 0){
						//fileNameLowerCase += "_";
					}
					 fileNameLowerCase += fileName.charAt(j).toLowerCase();
				}
				else{
					fileNameLowerCase += fileName.charAt(j);
				}
			}
			fileName = fileNameLowerCase;
		}
	
		file = new File(myFolder.fsName + "/" + fileName  + ".png");
		
		options = new ExportOptionsPNG24();
		options.antiAliasing = true;
		options.transparency = true;
		options.artBoardClipping = true;
		options.verticalScale = scaleTo;
		options.horizontalScale = scaleTo;
		
		document.exportFile(file, ExportType.PNG24, options);
	}
}

function isUpperCase(myString) { 
      return (myString == myString.toUpperCase()); 
} 
