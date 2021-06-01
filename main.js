Webcam.set ({
    height:300,
    width:300,
    image_format:"jpeg",
    jpeg_quality:90

})
Webcam.attach ("#camera")
function capture () {
    Webcam.snap(
        function (dataurl) {
            document.getElementById("snapshot").innerHTML = `<img src=${dataurl} id="capturedimage">`    
        }
    )
}
//Check ML5 Version
console.log("ml5 version: "+ml5.version )
//Import the model
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/lUzKDWWZC/model.json",modelLoaded)
//Define Function modelLoaded
function modelLoaded() {
    console.log("Model Loaded!")
}
function identify() {
    document.getElementById("objectResult").innerHTML = ""
    document.getElementById("accuracyResult").innerHTML = ""
    img = document.getElementById("capturedimage")
    classifier.classify(img, getResults)
}
function getResults(error, result) {
    if (error) {
        console.error(error)
    } else {
        console.log(result)
        document.getElementById("objectResult").innerHTML = result[0].label
        document.getElementById("accuracyResult").innerHTML = result[0].confidence.toFixed(3)
    }
}