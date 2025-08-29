var str1="hello"
var str2="olsleh"

var sorted1=str1.split('').sort().join('')
var sorted2=str2.split('').sort().join('')

if(sorted1==sorted2){
	console.log("yes, anagram.")

}else{ console.log("no.")}
