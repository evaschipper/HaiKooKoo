$(document).ready(function() {
    
//    var noun = ["cat", "orange", "canada", "juice", "walrus", "knee", "obama", "kardashian", "blueberry", "toenail", "aleppo", "Putin", "droplet", "cherry", "anthill", "boat", "whale", "captain", "ship", "book", "sand", "grape", "ox", "bird", "shirt", "light", "cave", "hole", "house"]
    
    var verb = ["fling", "contemplate", "waiting", "swimming", "crying", "shoveling", "burying", "bury", "cry", "shovel", "sit", "stand", "roll", "walk", "pounce", "run", "sqeal", "stare", "observe", "neglect"]
    
    var adjective = ["yellow", "ugly", "lavender", "blue", "fat", "small", "protruding", "obnoxious", "sentient", "sparkly", "shimmering", "open", "vague", "angry", "red", "quiet", "simmering", "fallen", "dappled", "hairy", "peaceful"];
    
    var preposition = ["over", "under", "inside", "in", "out", "between", "with"];
    
    var syllableTally = 0;
    
    var line0 = ["test"];
    var line1 = ["test"];
    var line2 = ["test"];
    var nouns;
    var noun;
    var replacementWord;
    
    var dbRef = new Firebase("https://nounrandomizer.firebaseio.com/");

    //set reference for nouns array (it's a child of the db tree)
    var nounsRef = dbRef.child('nouns');


    var randNum;
      
    
    
for (var line = 0; line < 3 ; line ++ ){
    
    switch (line){
        case 0:
            var workingTemplate = ["noun", "noun", "noun"];
            var maxSyllables = 6;
            execute(maxSyllables, workingTemplate, line); 
            var haikuString1 = line0.join(" ");
        break;
            
            
        case 1:
            var workingTemplate = ["noun", "noun", "noun", "noun"];
            var maxSyllables = 8;
            execute(maxSyllables, workingTemplate, line); 
            var haikuString2 = line1.join(" ");
            
        break;
        case 2: 
            var workingTemplate = ["noun", "noun", "noun"];
            var maxSyllables = 6;
            execute(maxSyllables, workingTemplate, line); 
            var haikuString3 = line2.join(" ");
            
        break;
            
    }
}

$("#line1").html(haikuString1);
$("#line2").html(haikuString2);
$("#line3").html(haikuString3);




    
function execute(maxSyllables1, workingTemplate1, line){ 

var line = line;
        var maxSyllables = maxSyllables1;
        var workingTemplate = workingTemplate1;
        var templateLength = workingTemplate1.length;
        var currentTally = 0;
    
for (var x = 0; x < templateLength; x++){
     
    var position = x;
    var wordType =  (workingTemplate[position]);
    
    switch (wordType){
        case "noun":
            do {
                
//                var randomnumber = Math.floor(Math.random() * (noun.length - 0)); 
                
                
                replacementWord = getNounFromArray();
//                var replacementWord = noun[randomnumber];
                
                
                console.log(noun);
                
//               var replacementWordSyllables = new_count(replacementWord);
//               var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                
                }
            
            while (wordOutcome != true);
            currentTally = currentTally + replacementWordSyllables;
        break;    
    }
    
    replaceWord(line, position, replacementWord);
}
    
}
    
function replaceWord(line, position, replacementWord){
    
            switch (line){
                case 0:
                    line0[position]= replacementWord;
                break;
                   
                case 1:
                    line1[position]= replacementWord;
                break;
            
                case 2:
                    line2[position]= replacementWord;
                break;
     }
                
}    

function checkWord(replacementWord, position, templateLength, maxSyllables, currentTally){
    
        var currentTally = currentTally;
        var maxSyllables = maxSyllables;
        var templateLength = templateLength;
        var position = position;
        var replacementWordSyllables = new_count(replacementWord);
        var maxWordSyllablesTemp = 0;

        
        if (position !== templateLength){
            var maxWordSyllablesTemp = maxSyllables - currentTally - ((templateLength) - position);
            replacementWordSyllables = new_count(replacementWord);
            if (replacementWordSyllables <= maxWordSyllablesTemp){
                wordOutcome = true;
            }
            else {
                wordOutcome = false;
            }
        }
    
        else{

            maxWordSyllablesTemp = maxSyllables - currentTally;
            replacementWordSyllables = new_count(replacementWord);
            
            if (replacementWordSyllables == maxWordSyllablesTemp){
                
                wordOutcome = true;
            }
            else {
                wordOutcome = false;
            }
            
        }
        
        return wordOutcome;

}

    
    function getNounFromArray(){
    
        nounsRef.on("value", function(childdata){
        //I could use .numChildren() to figure out how many noun objects I have in my entire DB
        // Doc: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#numChildren
        randNum = Math.floor(Math.random() * childdata.numChildren());
        console.log( "total noun objs: " + childdata.numChildren(), "// randNum: " + randNum);

        //generate randNoun object
        var randNoun = childdata.child(randNum).val();
            
        console.log(randNoun);	

        //convert randNoun object into an array using the each() function we used before in our json class
        nouns = [];
        $.each(randNoun, function(key,value) {
            //pushing the values into the array
            nouns.push(value);
        });

        //choose random noun from the nouns list
        //in our case, it's either singular/plural, but you can add more because we use .length
        var r = Math.floor(Math.random() * nouns.length); 
            
        noun = nouns[r];
        console.log(noun);
            
        });
        
       
    }
    
       
function new_count(word) {
    word = word.toLowerCase();                       
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');  
    word = word.replace(/^y/, '');           
    return word.match(/[aeiouy]{1,2}/g).length;                     
}
    
});
    