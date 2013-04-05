// Problem 4. Sort images

var pictures = ["WPLAo.jpg","Sbkem.jpg","SzBIk.jpg","ZiusC.jpg", "r53qG.jpg","RNfpa.jpg","XcGBz.jpg","YdL3d.jpg"]

// TO-DO: Add "http://i.imgur.com/"    at the beginning of every picture id
pictures = pictures.map(function(x) {return "http://i.imgur.com/"+x})

//  Creates a webpage of two images side-by-side
function getPicsPage(pic1, pic2) {
/*    default xml namespace = "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionForm.xsd";
    var q = <QuestionForm>
        <Question>
            <QuestionIdentifier>vote</QuestionIdentifier>
            <IsRequired>true</IsRequired>
            <QuestionContent>
                <Text>Which picture comes before the other chronologically?</Text>
            </QuestionContent>
            <AnswerSpecification>
                <SelectionAnswer>
                    <Selections>
                    </Selections>
                </SelectionAnswer>
            </AnswerSpecification>
        </Question>
    </QuestionForm>

    var options = [{key:"a",value:pic1}, {key:"b",value:pic2}]
    shuffle(options)
    foreach(options, function (op) {
        default xml namespace = "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionForm.xsd";
        q.Question.AnswerSpecification.SelectionAnswer.Selections.Selection +=
            <Selection>
                <SelectionIdentifier>{op.key}</SelectionIdentifier>
                <img src={op.value} width="45%"></img>
            </Selection>
    })
    return "" + q;*/

    var text=  "Which picture comes before the other chronologically? (Type 'Left' or 'Right')"

    // TO-DO:   Expand on our HTML design. Do you think a different design could better?
    // Provide evidence.
    var webpage = createWebpageFromTemplate(<div>
            <img src={pic1} width="45%" alt="Image 1"></img>
    	   <img src={pic2}  width="45%" alt="Image 2"></img>
            <ul>
                <li>People will vote whether to approve your work.</li>
            </ul>
            <textarea style="width:500px;height:50px" name="newText">{text}</textarea>
            <input type="submit" value="Submit"></input>
        </div>);

	return webpage;
}

// TO-DO : Create a comparison HIT
var a = mturk.sort(pictures, function (a, b) {
    var h = {title : "Sort Two Pictures", 
        desc : "Decide which photo was taken earlier", 
        url: ""+getPicsPage(a, b), 
        height : 480, 
        reward : 0.1,
        maxAssignments : 2}

    var hit = mturk.createHIT(h)
    if (mturk.vote(hit, function (a) {return a.vote[0]}).bestOption == "a") {
        return -1
    } else {
        return 1
    }
})
print("sorted = " + json(a))





// TO-DO: Expand code to order all provided images.