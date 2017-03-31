//The following is a JS and Jquery based haiku generator, which generates poems in the traditional 5-7-5 pattern of the Japanese haiku.
//Version 1.0
//Author: Eva Schipper
//  www.evaschipper.com
//  sayhi at evaschipper.com
//  https://github.com/evaschipper 
//  Last updated March 30, 2017
//Built out for iOS
//  https://build.phonegap.com/apps/2547865/share



//NOTES FOR JOYCE:

//I thought about making each word type array multi-dimensional as we discussed in class, so I could include a syllable count with each word and avoid having to count which would make using words like Beyonce possible. It would mean fundamentally reworking how the code works and would be a better system for crowd-sourced words (or else words could be submitted that didn't work in the count function), but it's too late for that because I have to submit this this weekend. One way I could accomodate that is moving to a db system, and when a user submits words, they verify the number of syllables themselves. Instead of a full conversion, I could just filter to say IF there was a discrepency between the syllable counter and what the user said, follow what the user said (or flag it for me to check out). Overall I think that's the easiest solution. 

//The hardest part about this was not being able to reference arrays with a placeholder variable. For example, I can't do this:
//var thisarray = [];
//var placeholder = thisarray;
//var newword = placeholder[2];

//Because it won't recognize placeholder as a reference to an array. So in the case of my project, to pull from different arrays for the type of word, I had to make switch statements instead of just running the same code with a changing variable. Frustrating, not the worst, but it makes the code bulky. 

//I also tried to get it to recognize and ignore (but count the syllables of) articles in the sentence (the, a, etc.). I can't get that to run properly without running in an infinite loop and breaking my browser. My next freetime project is to learn how to make a timeout kill so if it doesn't run in two seconds, it ends the function completely. That would be handy. 




$(document).ready(function () {

    makeHaiku();

    //run makeHaiku when the letters are clicked
    $("#haikubox").click(function () {
        makeHaiku();
    });

    //run makeHaiku when you click anywhere else
    $(document).click(function () {
        makeHaiku();
    });

    //function to create a new haiku
    function makeHaiku() {


        //arrays of each word type
        var noun = ["cat", "orange", "canada", "juice", "walrus", "knee", "obama", "kardashian", "blueberry", "toenail", "aleppo", "Putin", "droplet", "cherry", "anthill", "boat", "whale", "captain", "ship", "book", "sand", "grape", "ox", "bird", "shirt", "light", "cave", "hole", "house", "celery", "lobster", "spoon", "lightbulb", "table", "kumquat", "octopus", "supernova", "stardust", "flake", "skin", "marshmallow", "fingernail", "door", "garden", "rose", "daisy", "peony", "arbutus", "tree", "leaves", "vine", "flower", "root", "dirt", "soil", "pinkie", "teacup", "mushroom", "fairy", "gnome", "dog", "sheep", "thimble", "almond", "needle", "peach", "perch", "trout", "tuna", "rope", "string", "tassle", "mirror", "pond", "ocean", "barnacle", "cucumber", "dumpling", "soap", "bubble", "basket", "ballerina", "truffle", "moon", "star", "pebble", "books", "dreams", "monsoon", "jungle", "eurovan", "train", "pirate ship", "dentist", "tsunami", "pod", "club", "juice cleanse", "horse", "mallard", "ice cream", "noodle", "fritter", "truth", "volcano", "personal trainer", "CRISPR", "cactus", "tea", "sunbeam", "carrot stick", "cotton ball", "bulldog", "antlers", "astronaut", "pepper", "sea cucumber", "chicken strip", "nugget", "scooter", "butter", "teapot", "sea otter", "persimmon", "mermaid", "beet juice", "beet farm", "toothpaste", "lemon", "olive", "pyramid", "pig", "broth", "starfish", "roses", "puppy", "crystal", "quartz", "rock", "fingers", "salmon", "latte", "corgi", "baby", "POTUS", "avocado", "foam", "porn", "mall cop", "toaster", "aloe vera", "banana bread", "banana", "sea monster", "kraken", "donut", "ciagrettes", "shoelace", "portabello", "yeast", "gatorade", "botanist", "lettuce", "milkshake", "spinach", "geese", "waves", "wallaby", "stardust", "software", "nachos", "nerd", "lawyyer", "architect", "tangerine", "horizon"]

        var verb = ["flings", "announces", "pinching", "brews", "brewing", "upends", "upsets", "displays", "shows", "evokes", "contemplates", "waiting", "swimming", "crying", "shoveling", "burying", "buries", "cries", "shovels", "sits", "stands", "rolling", "walking", "pounces", "running", "sqealing", "staring", "observing", "neglecting", "eating", "spooning", "spoons", "sitting", "laughing", "laughing", "gazed", "pondering", "gazing", "observing", "foraging", "throwing", "tending", "guarding", "protecting", "avoiding", "loves", "adores"]

        var article = ["a", "the"];

        var adjective = [ "primordial", "atlantic", "seafaring", "protective", "yellow", "ugly", "lavender", "blue", "fat", "small", "protruding", "obnoxious", "sentient", "sparkly", "shimmering", "open", "angry", "pink", "lazy", "quiet", "simmering", "fallen", "hairy", "peaceful", "caramel", "sticky", "angry", "poached", "puffy", "spotted", "marbled", "glazed", "thoughtful", "frustrating", "perplexing", "confusing", "mysterious", "chubby", "plump", "small", "grand", "massive", "miniature", "tiny", "childish", "swampy", "toasted", "beautiful", "colourful", "striped", "soft", "solid", "wooden", "steel", "metal", "glass", "copper", "gold", "delicate", "pink", "sparkling", "flaky", "rigid", "ugly", "smelly", "long", "fancy", "imaginary", "fake", "shiny", "glossy", "deep", "dark", "moist", "wet", "slippery", "graceful", "fragile", "steaming", "stubborn", "brass", "clear", "wild", "thin", "sneaky", "round", "pretty", "fragrant", "ambitious", "crabby", "ancient", "secret", "public", "famous", "shy", "flat", "real", "black", "dry", "bubbly", "sharp", "bad", "dead", "distant", "bitter"];

        var preposition = ["over", "under",  "inside", "in", "between", "with", "beside", "at", "from", "like", "before", "above", "across", "off", "near", "under", "beyond", "by"];


        //template array for 5-syllable lines
        var fivetemplates = [
            ["verb", "preposition", "article", "noun"],
            ["preposition", "article", "adjective", "noun"],
            ["article", "adjective", "noun"],
            ["adjective", "noun"],
            ["preposition", "article", "noun"],
            ["verb", "article", "noun"],
            ["verb", "article", "adjective", "noun"]

        ];
        //template array for 7-syllable lines
        var seventemplates = [
            ["preposition", "article", "adjective", "noun"],
            ["article", "adjective", "adjective", "noun"],
            ["article", "noun", "verb", "article", "noun"],
            ["preposition", "adjective", "adjective", "noun"],
            ["adjective", "noun", "verb", "noun"],
            ["adjective", "adjective", "adjective", "noun"],
            ["noun", "verb", "preposition", "adjective", "noun"],
            ["noun", "verb", "article", "adjective", "noun"],
            ["noun", "verb", "article", "noun"],
            ["adjective", "noun", "verb", "preposition", "noun"]
        ];



        //set empty line arrays to be filled
        var line0 = [];
        var line1 = [];
        var line2 = [];



        //function that loops through the haiku 5-7-5 lines
        for (var line = 0; line < 3; line++) {

            //switch statement to execute proper function - necessarily different make proper haikustring  
            switch (line) {
                case 0:
                    //choose a random 5-syllable template from the templates[]
                    var workingTemplate = fivetemplates[Math.floor(Math.random() * (fivetemplates.length - 0))];
                    //set max syllables for the line
                    var maxSyllables = 5;
                    //run execure function with the right template, syllable info, and on the right line
                    execute(maxSyllables, workingTemplate, line);
                    //stringify the specific line into var haikuString(x)
                    var haikuString1 = line0.join(" ");
                    //jump to end of switch
                    break;


                case 1:
                    var workingTemplate = seventemplates[Math.floor(Math.random() * (seventemplates.length - 0))];
                    var maxSyllables = 7;
                    execute(maxSyllables, workingTemplate, line);
                    var haikuString2 = line1.join(" ");
                    break;


                case 2:
                    var workingTemplate = fivetemplates[Math.floor(Math.random() * (fivetemplates.length - 0))];
                    var maxSyllables = 5;
                    execute(maxSyllables, workingTemplate, line);
                    var haikuString3 = line2.join(" ");
                    break;

            }
        }

        //upon completing loop through all three lines, print stringified arrays into HTML
        $("#line1").html(haikuString1);
        $("#line2").html(haikuString2);
        $("#line3").html(haikuString3);

        //main execution function
        function execute(maxSyllables1, workingTemplate1, line) {

            //pull line info
            var line = line;

            //pull the template to work with
            var workingTemplate = workingTemplate1;

            //pull max number of syllables
            var maxSyllables = maxSyllables1;

            var templateLength = workingTemplate1.length;

            //set tally to zero - there are no registered syllables in this template yet
            var currentTally = 0;

            //loop through each word in the template
            for (var x = 0; x < templateLength; x++) {

                //position in the template
                var position = x;

                //kind of word to work on – equal to the string value of the position in the template
                var wordType = (workingTemplate[position]);

                //checking in on myself to see if its working lol
                console.log("wordtype is " + wordType);

                //switch for the different word types - necessary because can't use a variable to reference an array :S 
                switch (wordType) {

                    //if x type, do this    
                    case "noun":

                        //run this until...
                        do {
                            //choose a random number between 0 and noun.length
                            var randomnumber = Math.floor(Math.random() * (noun.length - 0));

                            //choose the word at that position in noun[]
                            var replacementWord = noun[randomnumber];

                            //count the number of syllables in the word you selected
                            var replacementWordSyllables = new_count(replacementWord);

                            //function to check if the word meets the conditions it needs to meet to make it in this world as part of a dumb haiku
                            var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                        }

                        //do all of the above while the wordOutcome function returns false, which means do it until you pick a word that fits the parameters 
                        while (wordOutcome != true);

                        //when it does fit parameters, update the tally 
                        currentTally = currentTally + replacementWordSyllables;

                        //end - move on to next position in the template
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

                    case "article":
                        do {
                            var randomnumber = Math.floor(Math.random() * (article.length - 0));
                            var replacementWord = article[randomnumber];
                            var replacementWordSyllables = new_count(replacementWord);
                            var wordOutcome = checkWord(replacementWord, position, templateLength, maxSyllables, currentTally);
                        }
                        while (wordOutcome != true);


                        currentTally = currentTally + replacementWordSyllables;
                        break;
                }

                //just checking in again to make sure it runs properly
                console.log("replacement word is " + replacementWord);
                console.log("replacement word has " + replacementWordSyllables + "syllables");

                //run the replaceword function on this line, at this position, with the word that fits the parameters
                replaceWord(line, position, replacementWord);
            }

        }

        //function to replace the placeholder word in the proper line at the proper position with the proper word
        function replaceWord(line, position, replacementWord) {

            //do it for the proper line - must be separate functions because can't use a variable or formula to refernece an array. if it worked, 
            //"line"+line[position]=replacementWord;
            //would be easier

            switch (line) {
                case 0:
                    line0[position] = replacementWord;
                    break;

                case 1:
                    line1[position] = replacementWord;
                    break;

                case 2:
                    line2[position] = replacementWord;
                    break;
            }
        }

        //function to check if the word fits the parameters, - pass in the word, the position its in, how long the template is, how many syllables the template can have, and how many syllables are already in the haiku line. you need these things together to calculate if the word will fit or not.
        function checkWord(replacementWord, position, templateLength, maxSyllables, currentTally) {

            //pulling passed parameters
            var currentTally = currentTally;
            var maxSyllables = maxSyllables;
            var templateLength = templateLength;
            var position = position;

            //check the number of syllables in the word you've chosen, in order to see if it works
            var replacementWordSyllables = new_count(replacementWord);
            var maxWordSyllablesTemp = 0;


            //if you're in the last word of the template, do this
            if ((position + 1) == templateLength) {

                //the max number of syllables this word can have is equal to the max number of syllables in the template minus the number of syllables there already are
                maxWordSyllablesTemp = maxSyllables - currentTally;

                //check the syllables in the replacement word
                replacementWordSyllables = new_count(replacementWord);

                //if the number of syllables in the word is the same as the special case for max syllables
                if (replacementWordSyllables == maxWordSyllablesTemp) {
                    //if it is equal, the word is good and return true
                    wordOutcome = true;

                } else {
                    //if not, return false and find a new word
                    wordOutcome = false;
                }
                //when not trying to fill last word in the template
            } else {
                //max word syllables is the max number of syllables minus the number that exist, minus the number of words left in the template. for example, in a template with 5 syllables and 3 words, the following combinations of syllables in words are possible:
                //first, second, third
                // case one: 3, 1, 1
                // case 2: 1, 3, 1
                // case 3: 1, 1, 3
                // case 4: 2, 2, 1
                // case 5: 2, 1, 2
                // case 6: 1, 2, 2
                //so the first column is possibilities for the first word, the second is possibilities for the second word conditional on what the first word is, and the third is possibilities for the third word based on what the first and second word are. This means the first word can be a 1, 2, or 3, but if it's a 2 or 3, it limits what the next two words can be. Each word determines how many syllables can be in the word after it, along with the max number of syllables and the length of the template.
                var maxWordSyllablesTemp = maxSyllables - currentTally - ((templateLength) - position);

                //check syllables in the replacement word
                replacementWordSyllables = new_count(replacementWord);

                //check if it works
                if (replacementWordSyllables <= maxWordSyllablesTemp) {
                    //yes it does
                    wordOutcome = true;

                    //no it doesn't, find a new word
                } else {
                    wordOutcome = false;
                }
            }
            //return the true or false statement - true means the word fits the parameters, and false will call the function again until it returns a true
            return wordOutcome;
        }

        //function to count a word, from http://stackoverflow.com/a/8843915 (author: Mike Olsen- http://stackoverflow.com/users/588445/artfulhacker)
        function new_count(word) {
            if(word.length <= 3) { return 1; }  
            word = word.toLowerCase();
            word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            word = word.replace(/^y/, '');
            var result = word.match(/[aeiouy]{1,2}/g).length;
            return result;
        }
    }

});
