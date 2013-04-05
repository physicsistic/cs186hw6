// Problem 4. Sort images

var pictures = ["WPLAo.jpg","Sbkem.jpg","SzBIk.jpg","ZiusC.jpg", "r53qG.jpg","RNfpa.jpg","XcGBz.jpg","YdL3d.jpg"]

// TO-DO: Add "http://i.imgur.com/"    at the beginning of every picture id
pictures = pictures.map(function(x) {return "http://i.imgur.com/"+x})

//  Creates a webpage of two images side-by-side
function getPicsPage(pic1, pic2) {
    default xml namespace = "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionForm.xsd";

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
                <Text>Which picture (left or right) comes before the other chronologically?</Text>
                <FormattedContent><![CDATA[
                <img src="http://left" alt="left image" width="45%" />
                <img src="http://right" alt="right image" width="45%" />
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

    var options = [{key:"l",value:"left"}, {key:"r",value:"right"}]
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


// TO-DO : Create a comparison HIT
var a = mturk.sort(pictures, function (a, b) {
    var h = {
        title : "Sort Two Pictures", 
        desc : "Decide which photo was taken earlier", 
        question: getPicsPage(a, b).replace("http://left",a).replace("http://right",b), 
        reward : 0.02,
        maxAssignments : 3
    };

    var hit = mturk.createHIT(h)
    if (mturk.vote(hit, function (a) {return a.vote[0]}).bestOption == "l") {
        return -1
    } else {
        return 1
    }
})

print("sorted = " + json(a))





// TO-DO: Expand code to order all provided images.