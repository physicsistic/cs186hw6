// Problem 4. Sort images

var pictures = ["WPLAo.jpg","Sbkem.jpg","SzBIk.jpg","ZiusC.jpg", "r53qG.jpg","RNfpa.jpg","XcGBz.jpg","YdL3d.jpg"]

// TO-DO: Add "http://i.imgur.com/"    at the beginning of every picture id
pictures = pictures.map(function(x) {return "http://i.imgur.com/"+x})

setTrace(2)

//  Creates a webpage of two images side-by-side
function getPicsPage(pic1, pic2) {
    default xml namespace = "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionForm.xsd";

var text=  "Which picture comes before the other chronologically? (Type 'Left' or 'Right')"

// TO-DO:   Expand on our HTML design. Do you think a different design could better?
// Provide evidence.
/*var webpage = createWebpageFromTemplate(<div>
        <img src={pic1} width="45%" alt="Image 1"></img>
       <img src={pic2}  width="45%" alt="Image 2"></img>
        <ul>
            <li>People will vote whether to approve your work.</li>
        </ul>
        <input type="radio" name="new" value="left">Left</input>
        <input type="radio" name="new" value="right">Right</input>
        <input type="submit" value="Submit"></input>
    </div>);

    return webpage;*/

    var q = <QuestionForm>
        <Question>
            <QuestionIdentifier>vote</QuestionIdentifier>
            <IsRequired>true</IsRequired>
            <QuestionContent>
                <Text>Which picture comes before the other chronologically?</Text>
<FormattedContent><![CDATA[
<img src="http://i.imgur.com/WPLAo.jpg" alt="Nuclei"></img>
]]></FormattedContent>
            </QuestionContent>
            <AnswerSpecification>
                <SelectionAnswer>
                    <Selections>
                    </Selections>
                </SelectionAnswer>
            </AnswerSpecification>
        </Question>
    </QuestionForm>

    var options = [{key:"1",value:pic1}, {key:"2",value:pic2}]
    shuffle(options)
    foreach(options, function (op) {
        default xml namespace = "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionForm.xsd";
        q.Question.AnswerSpecification.SelectionAnswer.Selections.Selection +=
            <Selection>
                <SelectionIdentifier>{op.key}</SelectionIdentifier>
                <Text>{op.value}</Text>
                
            </Selection>
    })
    return "" + q
}

// Problem 4. Sort images

var pictures2 = ["WPLAo.jpg","Sbkem.jpg","SzBIk.jpg"]

// TO-DO: Add "http://i.imgur.com/"    at the beginning of every picture id
pictures2 = pictures2.map(function(x) {return "http://i.imgur.com/"+x})

// TO-DO : Create a comparison HIT
var a = mturk.sort(pictures2, function (a, b) {
    var h = {
        title : "Sort Two Pictures", 
        desc : "Decide which photo was taken earlier", 
        question: getPicsPage(a, b), 
        reward : 0.01,
        maxAssignments : 2
    };


    var hit = mturk.createHIT(h)
    if (mturk.vote(hit, function (a) {return a.bestOption}).bestOption == "left") {
        return 1
    } else {
        return -1
    }
})

print("sorted = " + json(a))





// TO-DO: Expand code to order all provided images.