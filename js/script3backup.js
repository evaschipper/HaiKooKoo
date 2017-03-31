
$(document).ready(function() {
  
    makeHaiku();

        $("#haikubox").click(function(){
            makeHaiku();
        });

        $(document).click(function(){
            makeHaiku();
        });

        function makeHaiku(){

        var noun = ["cat", "orange", "canada", "juice", "walrus", "knee", "obama", "kardashian", "blueberry", "toenail", "aleppo", "Putin", "droplet", "cherry", "anthill", "boat", "whale", "captain", "ship", "book", "sand", "grape", "ox", "bird", "shirt", "light", "cave", "hole", "house", "celery", "lobster", "spoon", "lightbulb", "table", "kumquat", "octopus", "supernova", "stardust", "flake", "skin", "marshmallow", "fingernail", "door", "garden", "rose", "daisy", "peony", "arbutus", "tree", "leaves", "vine", "flower", "root", "dirt", "soil", "pinkie", "teacup", "mushroom", "fairy", "gnome", "dog", "sheep", "thimble", "almond", "needle", "peach", "perch", "trout", "tuna", "rope", "string", "tassle", "mirror", "pond", "ocean", "barnacle", "cucumber", "dumpling", "soap", "bubble", "basket", "ballerina", "truffle", "moon", "star", "pebble", "books", "dreams"]

        var verb = ["flings", "announces", "pinching", "brews", "brewing", "upends", "upsets", "displays", "show", "evoke", "contemplates", "waiting", "swimming", "crying", "shoveling", "burying", "buries", "cries", "shovels", "sits", "stands", "rolling", "walking", "pounces", "running", "sqealing", "staring", "observing", "neglecting", "eating", "spooning", "spoons", "sitting", "laughing", "laughing", "gazed", "pondering", "gazing", "observing", "foraging", "throwing", "tending", "guarding", "protecting", "avoiding"]

        var adjective = ["yellow", "ugly", "lavender", "blue", "fat", "small", "protruding", "obnoxious", "sentient", "sparkly", "shimmering", "open", "angry", "pink", "lazy", "quiet", "simmering", "fallen", "hairy", "peaceful", "caramel", "sticky", "angry", "poached", "puffy", "spotted", "marbled", "glazed", "thoughtful", "frustrating", "perplexing", "confusing", "mysterious", "chubby", "plump", "slight", "small", "grand", "massive", "miniature", "tiny", "childish", "swampy", "toasted", "beautiful", "colourful", "striped", "soft", "solid", "wooden", "steel", "metal", "glass", "copper", "gold", "delicate", "pink", "sparkling", "flaky", "rigid", "ugly", "smelly", "long", "fancy", "imaginary", "fake", "shiny", "glossy", "deep", "dark", "moist", "wet", "slippery", "graceful", "fragile", "steaming", "stubborn", "brass", "clear", "wild", "thin", "sneaky", "round", "pretty", "fragrant", "ambitious", "crabby", "ancient", "secret", "public", "famous", "shy", "flat", "real", "black", "dry", "bubbly", "sharp", "bad", "dead", "distant", "bitter"];

        var preposition = ["over", "under", "inside", "in", "between", "with", "beside", "at"];

        var fivetemplates = [
            ["verb", "adjective", "noun"],
            ["adjective", "adjective", "noun"],
            ["adjective", "noun"],
            ["adjective", "noun", "verb", "noun"],
            ["noun", "verb", "noun"],
            ["preposition", "adjective", "noun"]

        ];

        var seventemplates = [
            ["preposition", "adjective", "adjective", "noun"],
            ["verb", "adjective", "adjective", "noun"],
            ["adjective", "noun", "verb", "noun"],
            ["adjective", "adjective", "adjective", "noun"],
            ["noun", "verb", "adjective", "noun"],
            ["adjective", "noun", "verb", "preposition", "noun"]
        ];

        var syllableTally = 0;

        var line0 = ["test"];
        var line1 = ["test"];
        var line2 = ["test"];




    for (var line = 0; line < 3 ; line ++ ){

        switch (line){
            case 0:
                var workingTemplate = fivetemplates[ Math.floor(Math.random() * (fivetemplates.length - 0))];
                var maxSyllables = 5;
                execute(maxSyllables, workingTemplate, line); 
                var haikuString1 = line0.join(" ");
                console.log("line 1");
            break;


            case 1:
                var workingTemplate = seventemplates[ Math.floor(Math.random() * (seventemplates.length - 0))];
                var maxSyllables = 7;
                execute(maxSyllables, workingTemplate, line); 
                var haikuString2 = line1.join(" ");
                console.log("line 2");

            break;
            case 2: 
                var workingTemplate = fivetemplates[ Math.floor(Math.random() * (fivetemplates.length - 0))];
                var maxSyllables = 5;
                execute(maxSyllables, workingTemplate, line); 
                var haikuString3 = line2.join(" ");
                console.log("line 3");

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
            console.log("wordtype is " + wordType);


            switch (wordType){
                case "noun":
                    do {
                        var randomnumber = Math.floor(Math.random() * (noun.length - 0)); 
                        var replacementWord = noun[randomnumber];

                        var replacementWordSyllables = new_count(replacementWord);

                        var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                        }

                    while (wordOutcome != true);
                    currentTally = currentTally + replacementWordSyllables;

                break;

                case "verb":
                    do {
                        var randomnumber = Math.floor(Math.random() * (verb.length - 0)); 
                        var replacementWord = verb[randomnumber];
                        console.log("replacement word is " + replacementWord); 
                        var replacementWordSyllables = new_count(replacementWord);
                        console.log("replacement word has " + replacementWordSyllables + " syllables"); 
                        var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                        }

                    while (wordOutcome != true);
                    currentTally = currentTally + replacementWordSyllables;

                break;  

                case "adjective":
                    do {
                        var randomnumber = Math.floor(Math.random() * (adjective.length - 0)); 
                        var replacementWord = adjective[randomnumber];                            
                        var replacementWordSyllables = new_count(replacementWord);
                        var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                        }

                    while (wordOutcome != true);
                    currentTally = currentTally + replacementWordSyllables;

                break;  

                case "preposition":
                    do {
                        var randomnumber = Math.floor(Math.random() * (preposition.length - 0)); 
                        var replacementWord = preposition[randomnumber];
                        var replacementWordSyllables = new_count(replacementWord);
                        var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                        }
                    while (wordOutcome != true);
                    currentTally = currentTally + replacementWordSyllables;
                break;     
            }

            console.log("replacement word is " + replacementWord); 
            console.log("replacement word has " + replacementWordSyllables + "syllables"); 
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



            if ((position+1) == templateLength){
                 console.log("position is " + position + "and template length is " + templateLength);
                maxWordSyllablesTemp = maxSyllables - currentTally;
                replacementWordSyllables = new_count(replacementWord);

                if (replacementWordSyllables == maxWordSyllablesTemp){

                    wordOutcome = true;
                }
                else {
                    wordOutcome = false;
                }

            }

            else{
                console.log("position1 is " + position + "and template length is " + templateLength);
                var maxWordSyllablesTemp = maxSyllables - currentTally - ((templateLength) - position);
                replacementWordSyllables = new_count(replacementWord);
                    if (replacementWordSyllables <= maxWordSyllablesTemp){
                        wordOutcome = true;
                    }
                    else {
                        wordOutcome = false;
                    }
            }

            return wordOutcome;

        }

            function new_count(word) {
        word = word.toLowerCase();                       
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');  
        word = word.replace(/^y/, '');           
        return word.match(/[aeiouy]{1,2}/g).length;                     
    }
    }
    
});
