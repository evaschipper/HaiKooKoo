

$(document).ready(function() {
    //each time you run, set syllable tally to 0
    var syllableTally = 0;
    
    
    //arrays that hold the haiku lines
    var line0 = ["test"];
    var line1 = ["test"];
    var line2 = ["test"];
    var x ;
    var noun;
    var starfish;
    var randNoun;
    
    
    var something = getNoun();
    console.log("something = " + something);
    
    
    
    
    function getNoun(){

        //create firebase reference
        var dbRef = new Firebase("https://nounrandomizer.firebaseio.com/");

        //set reference for nouns array (it's a child of the db tree)
        var nounsRef = dbRef.child('nouns');


        var randNum;

        // I used the "value" event here instead of child_added since content is static
        // Doc: https://firebase.google.com/docs/database/admin/retrieve-data#value
        
        nounsRef.on("value", function(childdata){
 
            
                //I could use .numChildren() to figure out how many noun objects I have in my entire DB
                // Doc: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#numChildren
                randNum = Math.floor(Math.random() * childdata.numChildren());
                console.log( "total noun objs: " + childdata.numChildren(), "// randNum: " + randNum);

                //generate randNoun object
                randNoun = childdata.child(randNum).val();
            
                //convert randNoun object into an array using the each() function we used before in our json class
                var selectedNouns = [];
                $.each(randNoun, function(key,value) {
                    //pushing the values into the array
                    selectedNouns.push(value);
                });

                //choose random noun from the nouns list
                //in our case, it's either singular/plural, but you can add more because we use .length
                var r = Math.floor(Math.random() * selectedNouns.length); 
            
                
            
            
                noun = selectedNouns[r];
            
                console.log(noun.toString());

                console.log( 'random noun array: ' + selectedNouns , '// random noun chosen from array: ' + noun);
                
                var inputType = $('#inputid').attr('type');
            
            
            
        
        
        });
        
        
    }
    

});

function new_count(word) {
    word = word.toLowerCase();                       
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');  
    word = word.replace(/^y/, '');  
    console.log("word syllables is" + word.match(/[aeiouy]{1,2}/g).length);  
    return word.match(/[aeiouy]{1,2}/g).length;                     
}





